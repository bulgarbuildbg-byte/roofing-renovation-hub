import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Phone, Calculator, Shield, Eye, Clock, Wrench, Droplets, Home, Layers, SquareStack, HardHat, Settings } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface PriceCalculatorProps {
  variant?: "full" | "compact";
}

const services = [
  { id: "repair", label: "Ремонт на покрив", icon: Wrench, priceMin: 8, priceMax: 18 },
  { id: "leak", label: "Ремонт на течове", icon: Droplets, priceMin: 40, priceMax: 100, isFixed: true },
  { id: "waterproofing", label: "Хидроизолация", icon: Layers, priceMin: 13, priceMax: 26 },
  { id: "new-roof", label: "Нов покрив", icon: Home, priceMin: 40, priceMax: 90 },
  { id: "tiles", label: "Смяна керемиди", icon: SquareStack, priceMin: 10, priceMax: 23 },
  { id: "flat", label: "Плоски покриви", icon: Layers, priceMin: 15, priceMax: 30 },
  { id: "metal", label: "Метални покриви", icon: HardHat, priceMin: 23, priceMax: 46 },
  { id: "maintenance", label: "Поддръжка", icon: Settings, priceMin: 3, priceMax: 8 },
];

const roofTypes = [
  { id: "sloped", label: "Скатен покрив", multiplier: 1 },
  { id: "flat", label: "Плосък покрив", multiplier: 0.9 },
  { id: "mansard", label: "Мансарден", multiplier: 1.15 },
];

const sizePresets = [50, 100, 150, 200];

const PriceCalculator = ({ variant = "full" }: PriceCalculatorProps) => {
  const [selectedService, setSelectedService] = useState("repair");
  const [roofSize, setRoofSize] = useState(100);
  const [roofType, setRoofType] = useState("sloped");
  const [isUrgent, setIsUrgent] = useState(false);
  const [addHydro, setAddHydro] = useState(false);
  const [addThermal, setAddThermal] = useState(false);

  const priceRange = useMemo(() => {
    const service = services.find((s) => s.id === selectedService);
    const roofTypeData = roofTypes.find((r) => r.id === roofType);

    if (!service || !roofTypeData) return { min: 0, max: 0 };

    let minPrice: number;
    let maxPrice: number;

    if (service.isFixed) {
      // Fixed price services (like leak repair)
      minPrice = service.priceMin;
      maxPrice = service.priceMax;
    } else {
      // Per sq.m services
      minPrice = service.priceMin * roofSize * roofTypeData.multiplier;
      maxPrice = service.priceMax * roofSize * roofTypeData.multiplier;
    }

    // Add additional services
    if (addHydro) {
      minPrice += 8 * roofSize;
      maxPrice += 13 * roofSize;
    }
    if (addThermal) {
      minPrice += 10 * roofSize;
      maxPrice += 18 * roofSize;
    }

    // Urgency surcharge
    if (isUrgent) {
      minPrice *= 1.2;
      maxPrice *= 1.2;
    }

    return {
      min: Math.round(minPrice),
      max: Math.round(maxPrice),
    };
  }, [selectedService, roofSize, roofType, isUrgent, addHydro, addThermal]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            Получете незабавна оценка за вашия проект. Точната цена се определя след безплатен оглед.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-border/50">
            <CardContent className="p-6 md:p-8">
              {/* Step 1: Service Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                  Изберете услуга
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {services.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedService === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        <p className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {service.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Roof Size */}
              {!services.find((s) => s.id === selectedService)?.isFixed && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                    Площ на покрива
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[roofSize]}
                        onValueChange={(value) => setRoofSize(value[0])}
                        min={10}
                        max={500}
                        step={5}
                        className="flex-1"
                      />
                      <div className="w-24 text-center">
                        <span className="text-2xl font-bold text-primary">{roofSize}</span>
                        <span className="text-muted-foreground ml-1">кв.м</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-sm text-muted-foreground mr-2">Бързи опции:</span>
                      {sizePresets.map((preset) => (
                        <Button
                          key={preset}
                          variant={roofSize === preset ? "default" : "outline"}
                          size="sm"
                          onClick={() => setRoofSize(preset)}
                        >
                          {preset} кв.м
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Roof Type */}
              {!services.find((s) => s.id === selectedService)?.isFixed && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">3</span>
                    Тип покрив
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {roofTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setRoofType(type.id)}
                        className={`px-5 py-3 rounded-lg border-2 transition-all ${
                          roofType === type.id
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50 text-foreground"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Additional Options */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                    {services.find((s) => s.id === selectedService)?.isFixed ? "2" : "4"}
                  </span>
                  Допълнителни опции
                </h3>
                <div className="space-y-3">
                  {!services.find((s) => s.id === selectedService)?.isFixed && (
                    <>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="hydro"
                          checked={addHydro}
                          onCheckedChange={(checked) => setAddHydro(checked === true)}
                        />
                        <Label htmlFor="hydro" className="text-foreground cursor-pointer">
                          Хидроизолация (+8-13 €/кв.м)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="thermal"
                          checked={addThermal}
                          onCheckedChange={(checked) => setAddThermal(checked === true)}
                        />
                        <Label htmlFor="thermal" className="text-foreground cursor-pointer">
                          Топлоизолация (+10-18 €/кв.м)
                        </Label>
                      </div>
                    </>
                  )}
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="urgent"
                      checked={isUrgent}
                      onCheckedChange={(checked) => setIsUrgent(checked === true)}
                    />
                    <Label htmlFor="urgent" className="text-foreground cursor-pointer">
                      Спешен ремонт (+20%)
                    </Label>
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 md:p-8 text-center mb-6">
              <p className="text-muted-foreground mb-2">Ориентировъчна цена</p>
                <p className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  {priceRange.min.toLocaleString()} - {priceRange.max.toLocaleString()} €
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Eye className="w-4 h-4 text-primary" />
                    Безплатен оглед
                  </span>
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Shield className="w-4 h-4 text-primary" />
                    До 10 год. гаранция
                  </span>
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    Включва труд и материали
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="tel:0884997659">
                    <Phone className="w-5 h-5 mr-2" />
                    Обадете се сега
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="flex-1" onClick={() => { trackEvent("button_click", "calculator_button"); scrollToContact(); }}>
                  <Eye className="w-5 h-5 mr-2" />
                  Заявете безплатен оглед
                </Button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground text-center mt-6">
                ⚠️ Това е ориентировъчна цена. Точната оферта се изготвя след безплатен оглед на място.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
