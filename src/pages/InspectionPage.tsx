import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle, Send, ArrowLeft, ArrowRight, Upload, X, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n/config";
import { trackCallClick } from "@/lib/analytics";
import { getSessionId, getFirstReferrerSource } from "@/lib/analytics";
import roofPitchedImg from "@/assets/roof-types/roof-pitched.jpg";
import roofFlatImg from "@/assets/roof-types/roof-flat.png";

type RoofType = "flat" | "pitched" | null;

const TOTAL_STEPS = 5;

const materialOptions = [
  { value: "tiles" }, { value: "metal" }, { value: "bitumen" },
  { value: "pvc_membrane" }, { value: "shingles" }, { value: "other" },
];

const complexityOptions = [
  { value: "single_pitch" }, { value: "gable" }, { value: "hip" }, { value: "complex" },
];

const RoofImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden bg-white border border-border/40 flex items-center justify-center">
    <img src={src} alt={alt} loading="lazy" className="w-full h-full object-contain" />
  </div>
);

const InspectionPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) ? lang : 'bg') as SupportedLanguage;

  const [roofType, setRoofType] = useState<RoofType>(null);
  const [step, setStep] = useState(0); // 0 = roof selection (not counted in progress)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "",
    area_sqm: "", preferred_material: "", roof_complexity: "", description: "",
  });
  const formRef = useRef<HTMLDivElement>(null);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const selectRoof = (type: RoofType) => {
    setRoofType(type);
    setTimeout(() => {
      setStep(1);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const canNext = () => {
    if (step === 1) return form.name.trim() && form.phone.trim() && form.email.trim() && form.address.trim();
    return true;
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
  };

  const removeFile = (i: number) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    if (!roofType || !form.name.trim() || !form.phone.trim() || !form.email.trim()) return;
    setIsSubmitting(true);
    try {
      const serviceType = roofType === "flat" ? "flat_roof" as const : "repair" as const;
      const { data: inquiry, error } = await supabase.from("inquiries").insert({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim() || null,
        service_type: serviceType,
        area_sqm: form.area_sqm ? Number(form.area_sqm) : null,
        preferred_material: (form.preferred_material as any) || null,
        roof_complexity: (form.roof_complexity as any) || null,
        description: form.description.trim() ? `[Безплатен оглед] Тип: ${roofType === "flat" ? "Плосък" : "С наклон"}. ${form.description.trim()}` : `[Безплатен оглед] Тип: ${roofType === "flat" ? "Плосък" : "С наклон"}`,
        referrer_source: "inspection_landing",
        session_id: getSessionId(),
      }).select().single();

      if (error || !inquiry) throw error;

      // Upload files
      for (const file of files) {
        const path = `${inquiry.id}/${Date.now()}_${file.name}`;
        const { data: uploaded } = await supabase.storage.from("inquiry-attachments").upload(path, file);
        if (uploaded) {
          const { data: urlData } = supabase.storage.from("inquiry-attachments").getPublicUrl(uploaded.path);
          await supabase.from("inquiry_files").insert({
            inquiry_id: inquiry.id, file_url: urlData.publicUrl, file_name: file.name, file_type: file.type,
          });
        }
      }

      // Auto-log phone to call_log
      try {
        await supabase.from("call_log" as any).insert({
          client_name: form.name.trim(),
          client_phone: form.phone.trim(),
          client_email: form.email.trim() || null,
          call_direction: "inbound",
          notes: "Автоматично от безплатен оглед",
          inquiry_id: inquiry.id,
          created_by: "00000000-0000-0000-0000-000000000000",
        });
      } catch {}

      setSubmitted(true);

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", { send_to: "AW-17872435541/inspection_form" });
        (window as any).gtag("event", "conversion", { send_to: "AW-18066399675/inspection_form" });
      }
    } catch {
      toast({ title: t("inspection.errorTitle"), description: t("inspection.errorDesc"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const domain = "https://www.remontnapokrivivarna.bg";
  const pagePath = `/${currentLang}/${currentLang === 'bg' ? 'безплатен-оглед' : 'free-inspection'}`;
  const pageUrl = `${domain}${pagePath}`;

  const businessSchema = {
    "@context": "https://schema.org", "@type": "RoofingContractor",
    name: "RemontNaPokriviVarna", telephone: "+359884997659", email: "remontnapokrivivarna@abv.bg",
    address: { "@type": "PostalAddress", streetAddress: "ул. Уста Колю Фичето 25 А", addressLocality: "Варна", postalCode: "9000", addressCountry: "BG" },
    areaServed: { "@type": "City", name: "Варна" },
  };

  const serviceSchema = {
    "@context": "https://schema.org", "@type": "Service",
    serviceType: "Roof Inspection", name: t("inspection.heroTitle"), description: t("inspection.meta.desc"),
    provider: { "@type": "RoofingContractor", name: "RemontNaPokriviVarna" },
    areaServed: { "@type": "City", name: "Varna, Bulgaria" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "BGN", description: "Безплатен оглед на покрив" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home") || "Начало", item: `${domain}/${currentLang}` },
      { "@type": "ListItem", position: 2, name: t("inspection.heroTitle"), item: pageUrl },
    ],
  };

  const roofLabel = roofType === "flat" ? t("inspection.flatRoof") : t("inspection.pitchedRoof");

  return (
    <>
      <Helmet>
        <title>{t("inspection.meta.title")}</title>
        <meta name="description" content={t("inspection.meta.desc")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("inspection.meta.title")} />
        <meta property="og:description" content={t("inspection.meta.desc")} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${domain}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">{t("inspection.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("inspection.heroTitle")}</h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">{t("inspection.heroSubtitle")}</p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-background" ref={formRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {submitted ? (
                <div className="text-center py-16">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-foreground mb-4">{t("inspection.successTitle")}</h2>
                  <p className="text-lg text-muted-foreground">{t("inspection.successDesc")}</p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-muted-foreground text-sm mb-3">{t("inspection.callDirect")}</p>
                    <a href="tel:0884997659" className="inline-flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                      <Phone className="w-5 h-5" /> 088 499 7659
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-border">
                  {/* Progress bar (visible after step 1) */}
                  {step >= 1 && (
                    <div className="mb-6">
                      <div className="flex gap-1">
                        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < step ? "bg-primary" : i === step ? "bg-primary/50" : "bg-border"}`} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 0: Roof Type Selection */}
                  {step === 0 && (
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t("inspection.step1Title")}</h2>
                      <p className="text-muted-foreground mb-2">{t("inspection.step1Desc")}</p>
                      <p className="text-sm text-primary font-medium mb-8 animate-pulse">{t("inspection.step1Hint")}</p>

                      <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <button
                          type="button"
                          onClick={() => selectRoof("flat")}
                          className={`group flex flex-col items-center gap-3 p-6 md:p-8 rounded-xl border-3 transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 ${
                            roofType === "flat"
                              ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                              : "border-border bg-card hover:border-primary/60 hover:bg-primary/5"
                          }`}
                        >
                          <FlatRoofIcon active={roofType === "flat"} />
                          <span className="font-bold text-foreground text-lg">{t("inspection.flatRoof")}</span>
                          <span className="text-xs text-muted-foreground">{t("inspection.flatRoofDesc")}</span>
                          {roofType === "flat" && <CheckCircle className="h-5 w-5 text-primary" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => selectRoof("pitched")}
                          className={`group flex flex-col items-center gap-3 p-6 md:p-8 rounded-xl border-3 transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 ${
                            roofType === "pitched"
                              ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                              : "border-border bg-card hover:border-primary/60 hover:bg-primary/5"
                          }`}
                        >
                          <PitchedRoofIcon active={roofType === "pitched"} />
                          <span className="font-bold text-foreground text-lg">{t("inspection.pitchedRoof")}</span>
                          <span className="text-xs text-muted-foreground">{t("inspection.pitchedRoofDesc")}</span>
                          {roofType === "pitched" && <CheckCircle className="h-5 w-5 text-primary" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Contact Info */}
                  {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-400">
                      <p className="text-sm text-muted-foreground">{t("inspection.step2Desc")}</p>
                      <h3 className="text-xl font-bold text-foreground">{t("inspection.step2Title")}</h3>
                      <div><Label>{t("inspection.name")} *</Label><Input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Иван Иванов" required className="h-12" /></div>
                      <div><Label>{t("inspection.phone")} *</Label><Input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="088 123 4567" required className="h-12" /></div>
                      <div><Label>{t("inspection.email")} *</Label><Input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="ivan@example.com" required className="h-12" /></div>
                      <div><Label>{t("inspection.address")} *</Label><Input value={form.address} onChange={e => update("address", e.target.value)} placeholder={t("inspection.addressPlaceholder")} required className="h-12" /></div>
                    </div>
                  )}

                  {/* Step 2: Technical Details */}
                  {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-400">
                      <p className="text-sm text-muted-foreground">{t("inspection.step3Desc")}</p>
                      <h3 className="text-xl font-bold text-foreground">{t("inspection.step3Title")}</h3>
                      <div><Label>{t("inspection.areaSqm")}</Label><Input type="number" value={form.area_sqm} onChange={e => update("area_sqm", e.target.value)} placeholder={t("inspection.areaPlaceholder")} className="h-12" /></div>
                      <div>
                        <Label>{t("inspection.material")}</Label>
                        <Select value={form.preferred_material} onValueChange={v => update("preferred_material", v)}>
                          <SelectTrigger className="h-12"><SelectValue placeholder={t("inspection.materialPlaceholder")} /></SelectTrigger>
                          <SelectContent>
                            {materialOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{t(`inspection.materialOptions.${opt.value}`)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>{t("inspection.complexity")}</Label>
                        <Select value={form.roof_complexity} onValueChange={v => update("roof_complexity", v)}>
                          <SelectTrigger className="h-12"><SelectValue placeholder={t("inspection.complexityPlaceholder")} /></SelectTrigger>
                          <SelectContent>
                            {complexityOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{t(`inspection.complexityOptions.${opt.value}`)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Files & Description */}
                  {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-400">
                      <p className="text-sm text-muted-foreground">{t("inspection.step4Desc")}</p>
                      <h3 className="text-xl font-bold text-foreground">{t("inspection.step4Title")}</h3>
                      <div>
                        <Label>{t("inspection.uploadLabel")}</Label>
                        <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{t("inspection.uploadHint")}</span>
                          <input type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFiles} className="hidden" />
                        </label>
                        {files.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {files.map((f, i) => (
                              <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                                <span className="truncate">{f.name}</span>
                                <button onClick={() => removeFile(i)} type="button"><X className="h-4 w-4 text-muted-foreground hover:text-foreground" /></button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label>{t("inspection.description")}</Label>
                        <Textarea value={form.description} onChange={e => update("description", e.target.value)} placeholder={t("inspection.descriptionPlaceholder")} rows={4} />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review */}
                  {step === 4 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-400">
                      <p className="text-sm text-muted-foreground">{t("inspection.step5Desc")}</p>
                      <h3 className="text-xl font-bold text-foreground">{t("inspection.step5Title")}</h3>
                      <div className="space-y-2 text-sm">
                        <ReviewRow label={t("inspection.reviewRoofType")} value={roofLabel} />
                        <ReviewRow label={t("inspection.reviewName")} value={form.name} />
                        <ReviewRow label={t("inspection.reviewPhone")} value={form.phone} />
                        <ReviewRow label={t("inspection.reviewEmail")} value={form.email} />
                        {form.address && <ReviewRow label={t("inspection.reviewAddress")} value={form.address} />}
                        {form.area_sqm && <ReviewRow label={t("inspection.reviewArea")} value={`${form.area_sqm} кв.м`} />}
                        {form.preferred_material && <ReviewRow label={t("inspection.reviewMaterial")} value={t(`inspection.materialOptions.${form.preferred_material}`)} />}
                        {form.roof_complexity && <ReviewRow label={t("inspection.reviewComplexity")} value={t(`inspection.complexityOptions.${form.roof_complexity}`)} />}
                        {files.length > 0 && <ReviewRow label={t("inspection.reviewFiles")} value={`${files.length} ${t("inspection.reviewFilesCount")}`} />}
                        {form.description && <div className="p-3 bg-muted rounded-lg"><span className="text-muted-foreground">{t("inspection.description")}:</span><p className="font-medium mt-1">{form.description}</p></div>}
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  {step >= 1 && (
                    <div className="flex justify-between mt-6 pt-4 border-t border-border">
                      <Button variant="outline" onClick={() => setStep(step === 1 ? 0 : step - 1)}>
                        <ArrowLeft className="h-4 w-4 mr-1" /> {t("inspection.btnBack")}
                      </Button>
                      {step < TOTAL_STEPS - 1 ? (
                        <Button onClick={() => setStep(step + 1)} disabled={!canNext()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          {t("inspection.btnNext")} <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      ) : (
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          {isSubmitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t("inspection.sending")}</> : <><Send className="h-4 w-4 mr-2" /> {t("inspection.submitBtn")}</>}
                        </Button>
                      )}
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-border text-center">
                    <p className="text-muted-foreground text-sm mb-3">{t("inspection.callDirect")}</p>
                    <a href="tel:0884997659" className="inline-flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                      <Phone className="w-5 h-5" /> 088 499 7659
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { icon: Shield, label: t("inspection.trust1") },
                { icon: CheckCircle, label: t("inspection.trust2") },
                { icon: Clock, label: t("inspection.trust3") },
                { icon: MapPin, label: t("inspection.trust4") },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Icon className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">{t("inspection.contactTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <a href="tel:+359884997659" onClick={() => trackCallClick("+359884997659")} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary transition-colors">
                <Phone className="h-8 w-8 text-primary" />
                <span className="font-semibold text-foreground">088 499 7659</span>
                <span className="text-sm text-muted-foreground">{t("inspection.callUs")}</span>
              </a>
              <a href="mailto:remontnapokrivivarna@abv.bg" className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary transition-colors">
                <Mail className="h-8 w-8 text-primary" />
                <span className="font-semibold text-foreground">remontnapokrivivarna@abv.bg</span>
                <span className="text-sm text-muted-foreground">{t("inspection.emailUs")}</span>
              </a>
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border">
                <MapPin className="h-8 w-8 text-primary" />
                <span className="font-semibold text-foreground text-center">{t("inspection.officeAddress")}</span>
                <span className="text-sm text-muted-foreground">{t("inspection.city")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">{t("inspection.mapTitle")}</h2>
            <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.8856270051813!2d27.9121!3d43.2141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDEyJzUwLjgiTiAyN8KwNTQnNTIuNCJF!5e0!3m2!1sbg!2sbg!4v1234567890"
                width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="RemontNaPokriviVarna location"
              />
            </div>
          </div>
        </section>

        {/* Working Hours */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-8">{t("inspection.hoursTitle")}</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-foreground font-medium">{t("inspection.weekdays")}</span>
                  <span className="text-primary font-semibold">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-foreground font-medium">{t("inspection.saturday")}</span>
                  <span className="text-primary font-semibold">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-foreground font-medium">{t("inspection.sunday")}</span>
                  <span className="text-muted-foreground">{t("inspection.emergencyOnly")}</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-6">{t("inspection.emergencyNote")}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between p-3 bg-muted rounded-lg">
    <span className="text-muted-foreground">{label}:</span>
    <span className="font-medium text-foreground">{value}</span>
  </div>
);

export default InspectionPage;
