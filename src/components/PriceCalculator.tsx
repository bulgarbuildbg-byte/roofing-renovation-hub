import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Phone, Calculator, Shield, Eye, Clock, ArrowLeft, Home, Layers, HardHat, HelpCircle, Droplets, Wrench, PlusCircle, Search, Hammer, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface PriceCalculatorProps {
  variant?: "full" | "compact";
}

// Step 1: Roof types
const roofTypes = [
  { id: "sloped", label: "Скатен", icon: Home, multiplier: 1.0 },
  { id: "flat", label: "Плосък", icon: Layers, multiplier: 0.9 },
  { id: "metal", label: "Метален", icon: HardHat, multiplier: 1.1 },
  { id: "unsure", label: "Не съм сигурен", icon: HelpCircle, multiplier: 1.0 },
];

// Step 2: Materials (conditional)
const materialOptions: Record<string, { id: string; label: string }[]> = {
  sloped: [
    { id: "tiles", label: "Керемиди" },
    { id: "bitumen_shingles", label: "Битумни керемиди" },
    { id: "other", label: "Друг / стар тип (Onduline и др.)" },
    { id: "unsure", label: "Не съм сигурен" },
  ],
  flat: [
    { id: "bitumen_membrane", label: "Битумна мембрана" },
    { id: "liquid", label: "Течна хидроизолация" },
    { id: "unsure", label: "Не съм сигурен" },
  ],
};

// Step 3: Problems
const problems = [
  { id: "leak", label: "Имам теч", icon: Droplets },
  { id: "repair", label: "Нужен е ремонт", icon: Wrench },
  { id: "new_roof", label: "Искам нов покрив", icon: Home },
  { id: "inspection", label: "Искам оглед / проверка", icon: Search },
  { id: "unsure", label: "Не съм сигурен", icon: HelpCircle },
];

// Step 4: Scope (conditional)
const scopeOptions: Record<string, { id: string; label: string }[]> = {
  leak: [
    { id: "local", label: "Локален ремонт" },
    { id: "partial", label: "Частичен ремонт" },
    { id: "full", label: "Цялостен ремонт" },
    { id: "unsure", label: "Не съм сигурен" },
  ],
  repair: [
    { id: "local", label: "Локален ремонт" },
    { id: "partial", label: "Частичен ремонт" },
    { id: "full", label: "Цялостен ремонт" },
    { id: "unsure", label: "Не съм сигурен" },
  ],
  new_roof: [
    { id: "replacement", label: "Пълна подмяна" },
    { id: "replacement_insulation", label: "Подмяна + изолация" },
  ],
};

// Step 5: Access
const accessOptions = [
  { id: "easy", label: "Лесен", multiplier: 1.0 },
  { id: "medium", label: "Среден", multiplier: 1.1 },
  { id: "hard", label: "Труден", multiplier: 1.2 },
];

const sizePresets = [50, 100, 150, 200];

// Price matrix: [problem][scope] => { min, max } per m²
const priceMatrix: Record<string, Record<string, { min: number; max: number }>> = {
  leak: {
    local: { min: 15, max: 35 },
    partial: { min: 35, max: 65 },
    full: { min: 65, max: 110 },
    unsure: { min: 25, max: 65 },
  },
  repair: {
    local: { min: 15, max: 35 },
    partial: { min: 35, max: 65 },
    full: { min: 65, max: 110 },
    unsure: { min: 25, max: 65 },
  },
  new_roof: {
    replacement: { min: 110, max: 150 },
    replacement_insulation: { min: 130, max: 180 },
  },
  unsure: {
    _default: { min: 35, max: 90 },
  },
};

type WizardStep = "roofType" | "material" | "problem" | "scope" | "size" | "result";

const PriceCalculator = ({ variant = "full" }: PriceCalculatorProps) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>("roofType");
  const [roofType, setRoofType] = useState("");
  const [material, setMaterial] = useState("");
  const [problem, setProblem] = useState("");
  const [scope, setScope] = useState("");
  const [roofSize, setRoofSize] = useState(100);
  const [access, setAccess] = useState("easy");

  // Determine which steps are active
  const steps = useMemo((): WizardStep[] => {
    const s: WizardStep[] = ["roofType"];
    // Material step only for sloped/flat
    if (roofType === "sloped" || roofType === "flat") s.push("material");
    s.push("problem");
    // Scope step only for leak/repair/new_roof
    if (problem === "leak" || problem === "repair" || problem === "new_roof") s.push("scope");
    s.push("size", "result");
    return s;
  }, [roofType, problem]);

  const currentStepIndex = steps.indexOf(currentStep);
  const totalSteps = steps.length - 1; // exclude result from count
  const progressValue = currentStep === "result" ? 100 : (currentStepIndex / totalSteps) * 100;

  const goNext = useCallback(() => {
    const idx = steps.indexOf(currentStep);
    if (idx < steps.length - 1) setCurrentStep(steps[idx + 1]);
  }, [steps, currentStep]);

  const goBack = useCallback(() => {
    const idx = steps.indexOf(currentStep);
    if (idx > 0) setCurrentStep(steps[idx - 1]);
  }, [steps, currentStep]);

  const selectRoofType = (id: string) => {
    setRoofType(id);
    setMaterial("");
    // If metal or unsure, skip material
    if (id === "metal" || id === "unsure") {
      setCurrentStep("problem");
    } else {
      setCurrentStep("material");
    }
  };

  const selectMaterial = (id: string) => {
    setMaterial(id);
    setCurrentStep("problem");
  };

  const selectProblem = (id: string) => {
    setProblem(id);
    setScope("");
    if (id === "inspection" || id === "unsure") {
      setCurrentStep("size");
    } else {
      setCurrentStep("scope");
    }
  };

  const selectScope = (id: string) => {
    setScope(id);
    setCurrentStep("size");
  };

  const priceRange = useMemo(() => {
    if (problem === "inspection") return { min: 0, max: 0, isInspection: true };

    const problemKey = problem || "unsure";
    const scopeKey = scope || "_default";
    const rates = priceMatrix[problemKey]?.[scopeKey] || priceMatrix[problemKey]?.["_default"] || priceMatrix.unsure._default;

    const roofMult = roofTypes.find(r => r.id === roofType)?.multiplier || 1.0;
    const accessMult = accessOptions.find(a => a.id === access)?.multiplier || 1.0;

    return {
      min: Math.round(rates.min * roofSize * roofMult * accessMult),
      max: Math.round(rates.max * roofSize * roofMult * accessMult),
      isInspection: false,
    };
  }, [problem, scope, roofType, roofSize, access]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const resetWizard = () => {
    setCurrentStep("roofType");
    setRoofType("");
    setMaterial("");
    setProblem("");
    setScope("");
    setRoofSize(100);
    setAccess("easy");
  };

  const OptionCard = ({ id, label, icon: Icon, isSelected, onClick }: {
    id: string; label: string; icon?: any; isSelected: boolean; onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
      }`}
    >
      {Icon && <Icon className={`w-5 h-5 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />}
      <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>{label}</span>
    </button>
  );

  const StepHeader = ({ title, stepNum }: { title: string; stepNum: number }) => (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        {currentStepIndex > 0 && (
          <button onClick={goBack} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">Изберете най-близкия вариант – ще уточним детайлите на място</p>
    </div>
  );

  return (
    <section className="py-16 bg-muted/30" id="calculator">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Онлайн калкулатор
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Изчислете Ориентировъчна Цена
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Отговорете на няколко въпроса и получете незабавна оценка. Точната цена се определя след безплатен оглед.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-border/50">
            <CardContent className="p-6 md:p-8">
              {/* Progress */}
              {currentStep !== "result" && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Стъпка {currentStepIndex + 1} от {totalSteps}
                    </span>
                  </div>
                  <Progress value={progressValue} className="h-2" />
                </div>
              )}

              {/* STEP 1: Roof Type */}
              {currentStep === "roofType" && (
                <div>
                  <StepHeader title="Какъв е вашият покрив?" stepNum={1} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {roofTypes.map(rt => (
                      <OptionCard key={rt.id} id={rt.id} label={rt.label} icon={rt.icon} isSelected={roofType === rt.id} onClick={() => selectRoofType(rt.id)} />
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Material */}
              {currentStep === "material" && (
                <div>
                  <StepHeader title="Какъв е материалът?" stepNum={2} />
                  <div className="grid grid-cols-1 gap-3">
                    {(materialOptions[roofType] || []).map(m => (
                      <OptionCard key={m.id} id={m.id} label={m.label} isSelected={material === m.id} onClick={() => selectMaterial(m.id)} />
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Problem */}
              {currentStep === "problem" && (
                <div>
                  <StepHeader title="Какъв е проблемът в момента?" stepNum={3} />
                  <div className="grid grid-cols-1 gap-3">
                    {problems.map(p => (
                      <OptionCard key={p.id} id={p.id} label={p.label} icon={p.icon} isSelected={problem === p.id} onClick={() => selectProblem(p.id)} />
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Scope */}
              {currentStep === "scope" && (
                <div>
                  <StepHeader title="Какъв е обхватът?" stepNum={4} />
                  <div className="grid grid-cols-1 gap-3">
                    {(scopeOptions[problem] || []).map(s => (
                      <OptionCard key={s.id} id={s.id} label={s.label} isSelected={scope === s.id} onClick={() => selectScope(s.id)} />
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Size & Access */}
              {currentStep === "size" && (
                <div>
                  <StepHeader title="Размер и достъп" stepNum={5} />
                  <div className="space-y-6">
                    {/* Area */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">Приблизителна площ на покрива</label>
                      <div className="flex items-center gap-4 mb-3">
                        <Slider
                          value={[roofSize]}
                          onValueChange={(v) => setRoofSize(v[0])}
                          min={10} max={500} step={5}
                          className="flex-1"
                        />
                        <div className="w-24 text-center">
                          <span className="text-2xl font-bold text-primary">{roofSize}</span>
                          <span className="text-muted-foreground ml-1 text-sm">м²</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {sizePresets.map(p => (
                          <Button key={p} variant={roofSize === p ? "default" : "outline"} size="sm" onClick={() => setRoofSize(p)}>
                            {p} м²
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Access */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">Достъп до покрива</label>
                      <div className="grid grid-cols-3 gap-3">
                        {accessOptions.map(a => (
                          <button
                            key={a.id}
                            onClick={() => setAccess(a.id)}
                            className={`px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                              access === a.id ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50 text-foreground"
                            }`}
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button size="lg" className="w-full" onClick={() => { trackEvent("calculator_complete", "calculator"); goNext(); }}>
                      Вижте ориентировъчна цена
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 6: Result */}
              {currentStep === "result" && (
                <div>
                  {priceRange.isInspection ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Безплатен оглед</h3>
                      <p className="text-muted-foreground mb-6">
                        Ще направим професионален оглед на вашия покрив и ще ви предоставим точна оферта — напълно безплатно.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 md:p-8 text-center mb-6">
                      <p className="text-muted-foreground mb-2">Ориентировъчна цена</p>
                      <p className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        {priceRange.min.toLocaleString()} – {priceRange.max.toLocaleString()} €
                      </p>
                      <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5 text-foreground">
                          <Eye className="w-4 h-4 text-primary" />
                          Безплатен оглед
                        </span>
                        <span className="flex items-center gap-1.5 text-foreground">
                          <Shield className="w-4 h-4 text-primary" />
                          Гаранция за изпълнение
                        </span>
                        <span className="flex items-center gap-1.5 text-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          Включва труд и материали
                        </span>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <Button asChild size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                      <a href="tel:0884997659">
                        <Phone className="w-5 h-5 mr-2" />
                        Обадете се сега
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1" onClick={() => { trackEvent("button_click", "calculator_cta"); scrollToContact(); }}>
                      <Eye className="w-5 h-5 mr-2" />
                      Заявете безплатен оглед
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center mb-4">
                    ⚠️ Това е ориентировъчна цена. Точната оферта се изготвя след безплатен оглед на място.
                  </p>

                  <button onClick={resetWizard} className="text-sm text-primary hover:underline mx-auto block">
                    ← Изчисли отново
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
