import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSessionId, getFirstReferrerSource } from "@/lib/analytics";

// ---------- Types ----------
export interface FunnelButton {
  label: string;
  value: string;
  icon?: string;
}

export interface ResultCard {
  kw?: number;
  price?: number;
  saving?: number;
  payback?: number;
  priceMin?: number;
  priceMax?: number;
}

export interface FunnelMessage {
  role: "bot" | "user";
  content: string;
  buttons?: FunnelButton[];
  contactForm?: "quick" | "full" | "callback";
  resultCard?: ResultCard;
  confirmation?: boolean;
}

type FlowType = "LEAK" | "QUOTE" | "CALLBACK" | "INSPECTION" | "ROOF_REPAIR" | "SOLAR" | "QUESTION" | null;

interface CollectedData {
  roofType?: string;
  area?: number;
  address?: string;
  propertyType?: string;
  problem?: string;
  serviceNeed?: string;
  roofCondition?: string;
  monthlyBill?: number;
  solarProject?: string;
  name?: string;
  phone?: string;
  email?: string;
  hasLeak?: boolean;
  topic?: string;
}

// ---------- Price matrix (from PriceCalculator) ----------
const ROOF_PRICE_MATRIX: Record<string, { min: number; max: number }> = {
  leak: { min: 19, max: 35 },
  tiles: { min: 22, max: 40 },
  full: { min: 35, max: 65 },
};

// ---------- Hook ----------
export function useChatFunnel() {
  const [messages, setMessages] = useState<FunnelMessage[]>([]);
  const [currentFlow, setCurrentFlow] = useState<FlowType>(null);
  const [flowStep, setFlowStep] = useState(0);
  const [data, setData] = useState<CollectedData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const addBot = useCallback((msg: Partial<FunnelMessage> & { content: string }) => {
    setMessages(prev => [...prev, { role: "bot", ...msg }]);
  }, []);

  const addUser = useCallback((content: string) => {
    setMessages(prev => [...prev, { role: "user", content }]);
  }, []);

  const updateData = useCallback((patch: Partial<CollectedData>) => {
    setData(prev => ({ ...prev, ...patch }));
  }, []);

  // ---- Submit lead to Supabase ----
  const submitLead = useCallback(async (leadData: CollectedData, serviceType: string) => {
    setIsSubmitting(true);
    try {
      const desc = [
        leadData.problem && `Проблем: ${leadData.problem}`,
        leadData.roofType && `Покрив: ${leadData.roofType}`,
        leadData.area && `Площ: ${leadData.area} м²`,
        leadData.roofCondition && `Състояние: ${leadData.roofCondition}`,
        leadData.monthlyBill && `Месечна сметка: ${leadData.monthlyBill} лв`,
        leadData.solarProject && `Проект: ${leadData.solarProject}`,
        leadData.topic && `Тема: ${leadData.topic}`,
        leadData.hasLeak && "Има теч",
      ].filter(Boolean).join("; ");

      await supabase.from("inquiries").insert({
        name: leadData.name || "Чатбот клиент",
        phone: leadData.phone || "",
        email: leadData.email || "chatbot@noemail.bg",
        address: leadData.address || null,
        service_type: serviceType as any,
        area_sqm: leadData.area || null,
        description: `[Chatbot] ${desc}`,
        session_id: getSessionId(),
        referrer_source: getFirstReferrerSource(),
      });
    } catch (e) {
      console.error("Lead submit error:", e);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // ---- Show confirmation ----
  const showConfirmation = useCallback((leadData: CollectedData, serviceType: string) => {
    submitLead(leadData, serviceType);
    addBot({
      content: "✅ Благодарим ви! Ще се свържем с вас възможно най-скоро.",
      confirmation: true,
    });
    setCurrentFlow(null);
    setShowInput(false);
  }, [addBot, submitLead]);

  // ---- Roof calculator result ----
  const showRoofCalcResult = useCallback((d: CollectedData) => {
    const problem = d.problem === "Теч" ? "leak" : d.problem === "Смяна на керемиди" ? "tiles" : "full";
    const prices = ROOF_PRICE_MATRIX[problem] || ROOF_PRICE_MATRIX.full;
    const area = d.area || 80;
    addBot({
      content: "📊 Ориентировъчна цена за вашия покрив:",
      resultCard: {
        priceMin: Math.round(prices.min * area),
        priceMax: Math.round(prices.max * area),
      },
    });
    setTimeout(() => {
      addBot({
        content: "Искате ли да получите точна оферта?",
        buttons: [
          { label: "Да, искам оферта", value: "want_quote" },
          { label: "Не, благодаря", value: "no_thanks" },
        ],
      });
    }, 500);
  }, [addBot]);

  // ---- Solar calculator result ----
  const showSolarCalcResult = useCallback((d: CollectedData) => {
    const bill = d.monthlyBill || 200;
    const kw = Math.max(3, Math.round(bill / 25));
    const price = kw * 1100;
    const saving = Math.round((bill * 0.8 * 12) / 2);
    const payback = Math.round((price / saving) * 10) / 10;
    addBot({
      content: "☀️ Вашата препоръчана соларна система:",
      resultCard: { kw, price, saving, payback },
    });
    setTimeout(() => {
      addBot({
        content: "Искате ли да получите точна оферта с оглед на място?",
        buttons: [
          { label: "Да, искам оферта", value: "want_quote" },
          { label: "Не, благодаря", value: "no_thanks" },
        ],
      });
    }, 500);
  }, [addBot]);

  // ---- Start flow ----
  const startFlow = useCallback((flow: FlowType) => {
    setCurrentFlow(flow);
    setFlowStep(0);
    setData({});
    setShowInput(false);

    switch (flow) {
      case "LEAK":
        addBot({
          content: "⚠️ Разбираме, че е спешно. Какъв е покривът ви?",
          buttons: [
            { label: "Скатен (керемиди)", value: "Скатен" },
            { label: "Плосък", value: "Плосък" },
            { label: "Не съм сигурен", value: "Не знам" },
          ],
        });
        break;
      case "QUOTE":
        addBot({
          content: "Какво ви трябва?",
          buttons: [
            { label: "Ремонт на покрив", value: "repair" },
            { label: "Хидроизолация", value: "waterproofing" },
            { label: "Соларна система", value: "solar" },
          ],
        });
        break;
      case "CALLBACK":
        addBot({ content: "Чудесно! Моля, оставете данните си и ще ви се обадим.", contactForm: "callback" });
        break;
      case "INSPECTION":
        addBot({ content: "Безплатен оглед на място! Моля, споделете адреса и проблема.", contactForm: "full" });
        break;
      case "ROOF_REPAIR":
        addBot({
          content: "Какъв е проблемът с покрива?",
          buttons: [
            { label: "Теч", value: "Теч" },
            { label: "Смяна на керемиди", value: "Смяна на керемиди" },
            { label: "Цялостен ремонт", value: "Цялостен ремонт" },
          ],
        });
        break;
      case "SOLAR":
        addBot({
          content: "За какъв проект е соларната система?",
          buttons: [
            { label: "Къща", value: "Къща" },
            { label: "Блок / сграда", value: "Блок" },
            { label: "Инвестиция", value: "Инвестиция" },
          ],
        });
        break;
      case "QUESTION":
        addBot({ content: "Разбира се! Напишете вашия въпрос и ще ви отговорим." });
        setShowInput(true);
        break;
    }
  }, [addBot]);

  // ---- Process button click ----
  const handleButtonClick = useCallback((value: string) => {
    addUser(value);

    // After calc result → want quote or no thanks
    if (value === "want_quote") {
      addBot({ content: "Моля, оставете данните си за точна оферта:", contactForm: "full" });
      return;
    }
    if (value === "no_thanks") {
      addBot({ content: "Благодарим ви! Ако имате нужда — ние сме тук. 😊" });
      setCurrentFlow(null);
      return;
    }

    // After leak flow callback prompt
    if (value === "call_me_now") {
      addBot({ content: "Ще ви се обадим веднага! Оставете телефон и име:", contactForm: "callback" });
      return;
    }

    switch (currentFlow) {
      case "LEAK":
        if (flowStep === 0) {
          updateData({ roofType: value });
          setFlowStep(1);
          addBot({
            content: "Каква е приблизителната квадратура?",
            buttons: [
              { label: "До 50 м²", value: "50" },
              { label: "50–100 м²", value: "80" },
              { label: "100–200 м²", value: "150" },
              { label: "Над 200 м²", value: "250" },
            ],
          });
        } else if (flowStep === 1) {
          updateData({ area: parseInt(value) });
          setFlowStep(2);
          addBot({ content: "Моля, напишете адреса (град и район):" });
          setShowInput(true);
        } else if (flowStep === 3) {
          // After address → callback prompt answer
          // handled by want_quote / call_me_now above
        }
        break;

      case "QUOTE":
        if (flowStep === 0) {
          updateData({ serviceNeed: value });
          setFlowStep(1);
          addBot({
            content: "Какъв е типът на имота?",
            buttons: [
              { label: "Къща", value: "Къща" },
              { label: "Блок", value: "Блок" },
              { label: "Друго", value: "Друго" },
            ],
          });
        } else if (flowStep === 1) {
          updateData({ propertyType: value });
          setFlowStep(2);
          addBot({
            content: "Какъв е покривът?",
            buttons: [
              { label: "Скатен", value: "Скатен" },
              { label: "Плосък", value: "Плосък" },
            ],
          });
        } else if (flowStep === 2) {
          updateData({ roofType: value });
          setFlowStep(3);
          addBot({
            content: "Приблизителна квадратура?",
            buttons: [
              { label: "До 50 м²", value: "50" },
              { label: "50–100 м²", value: "80" },
              { label: "100–200 м²", value: "150" },
              { label: "Над 200 м²", value: "250" },
            ],
          });
        } else if (flowStep === 3) {
          updateData({ area: parseInt(value) });
          setFlowStep(4);
          addBot({ content: "Моля, попълнете данните си за офертата:", contactForm: "full" });
        }
        break;

      case "ROOF_REPAIR":
        if (flowStep === 0) {
          updateData({ problem: value });
          setFlowStep(1);
          addBot({
            content: "Какъв е покривът?",
            buttons: [
              { label: "Скатен (керемиди)", value: "Скатен" },
              { label: "Плосък", value: "Плосък" },
            ],
          });
        } else if (flowStep === 1) {
          updateData({ roofType: value });
          setFlowStep(2);
          addBot({
            content: "Приблизителна квадратура?",
            buttons: [
              { label: "До 50 м²", value: "50" },
              { label: "50–100 м²", value: "80" },
              { label: "100–200 м²", value: "150" },
              { label: "Над 200 м²", value: "250" },
            ],
          });
        } else if (flowStep === 2) {
          const area = parseInt(value);
          updateData({ area });
          setFlowStep(3);
          addBot({ content: "Моля, напишете адреса (град и район):" });
          setShowInput(true);
        }
        break;

      case "SOLAR":
        if (flowStep === 0) {
          updateData({ solarProject: value });
          setFlowStep(1);
          addBot({
            content: "Какво е състоянието на покрива?",
            buttons: [
              { label: "Добро", value: "Добро" },
              { label: "Нуждае се от ремонт", value: "Нуждае се от ремонт" },
              { label: "Нов", value: "Нов" },
            ],
          });
        } else if (flowStep === 1) {
          updateData({ roofCondition: value });
          setFlowStep(2);
          if (value === "Нуждае се от ремонт") {
            addBot({ content: "💡 Чудесно! Можем да направим покрива + соларната система като едно решение — спестявате време и пари." });
          }
          setTimeout(() => {
            addBot({
              content: "Каква е месечната ви сметка за ток?",
              buttons: [
                { label: "До 100 лв", value: "80" },
                { label: "100–200 лв", value: "150" },
                { label: "200–400 лв", value: "300" },
                { label: "Над 400 лв", value: "450" },
              ],
            });
          }, value === "Нуждае се от ремонт" ? 600 : 0);
        } else if (flowStep === 2) {
          updateData({ monthlyBill: parseInt(value) });
          setFlowStep(3);
          addBot({ content: "Моля, напишете адреса (град и район):" });
          setShowInput(true);
        }
        break;
    }
  }, [currentFlow, flowStep, addBot, addUser, updateData]);

  // ---- Process text input ----
  const handleTextInput = useCallback((text: string) => {
    addUser(text);
    setShowInput(false);

    // LEAK flow — address step
    if (currentFlow === "LEAK" && flowStep === 2) {
      const newData = { ...data, address: text };
      setData(newData);
      setFlowStep(3);
      addBot({
        content: "Можем да реагираме бързо. Искате ли да ви се обадим?",
        buttons: [
          { label: "Да, веднага", value: "call_me_now" },
          { label: "Искам оферта", value: "want_quote" },
        ],
      });
      return;
    }

    // ROOF_REPAIR — address → show calc
    if (currentFlow === "ROOF_REPAIR" && flowStep === 3) {
      const newData = { ...data, address: text };
      setData(newData);
      setFlowStep(4);
      showRoofCalcResult(newData);
      return;
    }

    // SOLAR — address → show calc
    if (currentFlow === "SOLAR" && flowStep === 3) {
      const newData = { ...data, address: text };
      setData(newData);
      setFlowStep(4);
      showSolarCalcResult(newData);
      return;
    }

    // QUESTION flow — free text (will be handled by AI via parent)
    if (currentFlow === "QUESTION") {
      // Return the text so parent can send to AI
      return text;
    }
  }, [currentFlow, flowStep, data, addBot, addUser, showRoofCalcResult, showSolarCalcResult]);

  // ---- Handle contact form submission ----
  const handleFormSubmit = useCallback((formData: { name: string; phone: string; email?: string; address?: string; topic?: string }) => {
    const merged = { ...data, ...formData };
    setData(merged);

    let serviceType = "other";
    if (currentFlow === "LEAK") serviceType = "leak_repair";
    else if (currentFlow === "QUOTE") {
      if (data.serviceNeed === "repair") serviceType = "repair";
      else if (data.serviceNeed === "waterproofing") serviceType = "waterproofing";
      else if (data.serviceNeed === "solar") serviceType = "other";
      else serviceType = "other";
    }
    else if (currentFlow === "CALLBACK") serviceType = "other";
    else if (currentFlow === "INSPECTION") serviceType = "maintenance";
    else if (currentFlow === "ROOF_REPAIR") serviceType = "repair";
    else if (currentFlow === "SOLAR") serviceType = "other";

    showConfirmation(merged, serviceType);
  }, [data, currentFlow, showConfirmation]);

  // ---- After AI answers a question, show CTA ----
  const showAfterQuestionCTA = useCallback(() => {
    setTimeout(() => {
      addBot({
        content: "Искате ли да ви дадем оферта или да се свържем с вас?",
        buttons: [
          { label: "Да, искам оферта", value: "want_quote" },
          { label: "Не, благодаря", value: "no_thanks" },
        ],
      });
    }, 800);
  }, [addBot]);

  // ---- Reset ----
  const reset = useCallback(() => {
    setMessages([]);
    setCurrentFlow(null);
    setFlowStep(0);
    setData({});
    setShowInput(false);
  }, []);

  return {
    messages,
    currentFlow,
    showInput,
    isSubmitting,
    startFlow,
    handleButtonClick,
    handleTextInput,
    handleFormSubmit,
    showAfterQuestionCTA,
    reset,
    addBot,
    addUser,
  };
}
