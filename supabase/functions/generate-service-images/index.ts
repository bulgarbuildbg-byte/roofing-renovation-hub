import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ALL_PROMPTS: Record<string, string[]> = {
  "roof-repair": [
    "Professional roofer inspecting ceramic tile roof with measuring tape, European residential house, daylight, photorealistic",
    "Construction estimator writing cost calculation on clipboard on a rooftop, blueprints visible, photorealistic",
    "Metal scaffolding erected around European house for roof repair work, photorealistic",
    "Worker carefully removing old damaged clay roof tiles by hand, exposed battens visible, photorealistic",
    "Roofer installing new terracotta ceramic tiles on wooden battens, European house, photorealistic",
    "Completed repaired tile roof on European residential house, clean and pristine, photorealistic",
  ],
  waterproofing: [
    "Worker cleaning and preparing flat concrete roof surface for waterproofing, broom and tools, photorealistic",
    "Roofer applying bitumen primer with roller on flat concrete roof surface, photorealistic",
    "Worker applying torch-on bitumen waterproofing membrane with gas torch on flat roof, flames visible, photorealistic",
    "Close-up of waterproofing detail work around chimney base with bitumen membrane and sealing tape, photorealistic",
    "Worker laying second layer of bitumen waterproofing membrane perpendicular to first layer on flat roof, photorealistic",
    "Completed flat roof waterproofing, smooth black bitumen surface, European apartment building, photorealistic",
  ],
  "new-roof": [
    "Architect reviewing roof construction blueprints and plans on table, calculator and pencil, photorealistic",
    "Stack of new ceramic roof tiles and timber battens delivered to construction site, photorealistic",
    "Workers building wooden roof truss framework on European house, timber rafters and beams, photorealistic",
    "Installing breathable membrane and counter-battens on roof structure, underlayment visible, photorealistic",
    "Workers laying ceramic tiles on new roof, tile rows visible, European residential house, photorealistic",
    "Worker installing mineral wool insulation between roof rafters from inside attic, photorealistic",
  ],
  "tile-replacement": [
    "Professional roofer closely inspecting ceramic tile condition on sloped roof, checking for cracks, photorealistic",
    "Various ceramic and concrete tile samples laid out for comparison, different colors and profiles, photorealistic",
    "Scaffolding setup around European house with protective covers for tile replacement work, photorealistic",
    "Worker removing old worn ceramic tiles from roof, exposing wooden battens underneath, photorealistic",
    "Roofer mounting new ceramic tiles onto battens, precise alignment, European house, photorealistic",
    "Beautifully completed tile roof on European villa, terracotta tiles gleaming in sunlight, photorealistic",
  ],
  "metal-roof": [
    "Roofer measuring metal roof with tape measure, surveying slope and dimensions, photorealistic",
    "Worker installing wooden battens and breathable membrane for metal roof preparation, photorealistic",
    "Truck delivering stacks of colored metal roofing panels to construction site, photorealistic",
    "Worker fastening metal roofing panel with power drill and self-tapping screws on roof, photorealistic",
    "Installing metal ridge cap and flashing on metal roof peak, worker with tools, photorealistic",
    "Completed modern metal roof with gutters and downpipes on European building, photorealistic",
  ],
  maintenance: [
    "Professional with binoculars inspecting residential roof from ground level, clipboard in hand, photorealistic",
    "Roofer walking on tile roof doing close-up inspection, checking tiles and flashing, photorealistic",
    "Worker cleaning roof gutter by hand, removing leaves and debris, ladder visible, photorealistic",
    "Worker removing green moss from roof tiles with brush and spray, cleaning in progress, photorealistic",
    "Roofer replacing single cracked ceramic tile on otherwise intact roof, photorealistic",
    "Professional writing roof maintenance report on clipboard, pen and camera nearby, photorealistic",
  ],
};

async function generateImage(prompt: string, apiKey: string): Promise<string> {
  console.log(`Generating image for prompt: ${prompt.substring(0, 60)}...`);

  const response = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [
          {
            role: "user",
            content: `Generate a high-quality, photorealistic photograph: ${prompt}. The image should look like a real professional photograph, not AI-generated. Natural lighting, realistic textures, no text overlays.`,
          },
        ],
        modalities: ["image", "text"],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`AI gateway error: ${response.status} ${errorText}`);
    throw new Error(`AI gateway error: ${response.status}`);
  }

  const data = await response.json();
  const imageUrl =
    data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

  if (!imageUrl) {
    console.error("No image in response:", JSON.stringify(data).substring(0, 200));
    throw new Error("No image returned from AI gateway");
  }

  // Extract base64 data
  const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
  return base64Data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase config missing");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { service, step } = await req.json();

    // Validate service parameter
    const validServices = Object.keys(ALL_PROMPTS);
    if (!service || !validServices.includes(service)) {
      return new Response(
        JSON.stringify({
          error: `Invalid service. Must be one of: ${validServices.join(", ")}`,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // If step is specified, only generate that one step (1-indexed)
    const stepIndex = step ? Number(step) - 1 : null;

    const prompts = ALL_PROMPTS[service];
    const results: { step: number; url: string; status: string }[] = [];

    const startIdx = stepIndex !== null ? stepIndex : 0;
    const endIdx = stepIndex !== null ? stepIndex + 1 : prompts.length;

    for (let i = startIdx; i < endIdx; i++) {
      const stepNum = i + 1;
      const filePath = `${service}/step-${stepNum}.png`;

      try {
        // Check if already exists
        const { data: existing } = await supabase.storage
          .from("service-images")
          .list(service, { search: `step-${stepNum}.png` });

        if (existing && existing.length > 0) {
          const { data: urlData } = supabase.storage
            .from("service-images")
            .getPublicUrl(filePath);
          results.push({
            step: stepNum,
            url: urlData.publicUrl,
            status: "already_exists",
          });
          console.log(`Step ${stepNum} already exists, skipping`);
          continue;
        }

        const base64Data = await generateImage(prompts[i], LOVABLE_API_KEY);

        // Decode base64 to Uint8Array
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let j = 0; j < binaryString.length; j++) {
          bytes[j] = binaryString.charCodeAt(j);
        }

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from("service-images")
          .upload(filePath, bytes, {
            contentType: "image/png",
            upsert: true,
          });

        if (uploadError) {
          console.error(`Upload error for step ${stepNum}:`, uploadError);
          results.push({
            step: stepNum,
            url: "",
            status: `upload_error: ${uploadError.message}`,
          });
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("service-images")
          .getPublicUrl(filePath);

        results.push({
          step: stepNum,
          url: urlData.publicUrl,
          status: "generated",
        });

        console.log(`Step ${stepNum} generated and uploaded successfully`);
      } catch (err) {
        console.error(`Error generating step ${stepNum}:`, err);
        results.push({
          step: stepNum,
          url: "",
          status: `error: ${err instanceof Error ? err.message : "Unknown"}`,
        });
      }
    }

    return new Response(
      JSON.stringify({ service, results }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
