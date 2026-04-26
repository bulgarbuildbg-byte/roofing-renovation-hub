import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sun, Zap, TrendingDown, Clock, Calculator, ArrowRight, HardHat } from "lucide-react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import roofPitchedImg from "@/assets/roof-types/roof-pitched.jpg";
import roofFlatImg from "@/assets/roof-types/roof-flat.png";

const roofTypeMultiplier: Record<string, number> = {
  pitched: 1.0,
  flat: 0.85,
  metal: 0.95,
};

const SolarCalculator = () => {
  const { getPath } = useLocalizedPath();
  const [monthlyBill, setMonthlyBill] = useState([200]);
  const [roofArea, setRoofArea] = useState([100]);
  const [roofType, setRoofType] = useState<string>("pitched");

  const results = useMemo(() => {
    const bill = monthlyBill[0];
    const area = roofArea[0];
    const mult = roofTypeMultiplier[roofType] || 1;

    const billKw = bill / 25;
    const areaKw = (area * 0.15);
    const recommendedKw = Math.round(Math.min(billKw, areaKw) * mult * 10) / 10;
    const clampedKw = Math.max(3, Math.min(recommendedKw, 30));
    const price = Math.round(clampedKw * 1100);
    const annualSaving = Math.round(bill * 0.8 * 12 / 2);
    const payback = annualSaving > 0 ? Math.round((price / annualSaving) * 10) / 10 : 0;

    return { kw: clampedKw, price, annualSaving, payback };
  }, [monthlyBill, roofArea, roofType]);

  return (
    <section id="solar-calculator" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Соларен Калкулатор
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Изчислете Вашата Спестяване
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Въведете данните за вашия дом и вижте колко можете да спестите с фотоволтаична система
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Вашите Данни</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Monthly bill */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">Месечна сметка за ток</label>
                  <span className="text-lg font-bold text-primary">{monthlyBill[0]} лв</span>
                </div>
                <Slider
                  value={monthlyBill}
                  onValueChange={setMonthlyBill}
                  min={50}
                  max={500}
                  step={10}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50 лв</span><span>500 лв</span>
                </div>
              </div>

              {/* Roof area */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">Покривна площ</label>
                  <span className="text-lg font-bold text-primary">{roofArea[0]} м²</span>
                </div>
                <Slider
                  value={roofArea}
                  onValueChange={setRoofArea}
                  min={30}
                  max={300}
                  step={5}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>30 м²</span><span>300 м²</span>
                </div>
              </div>

              {/* Roof type */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Тип покрив</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "pitched", label: "Скатен", image: roofPitchedImg },
                    { id: "flat", label: "Плосък", image: roofFlatImg },
                    { id: "metal", label: "Метален", icon: HardHat },
                  ].map((rt) => (
                    <button
                      key={rt.id}
                      onClick={() => setRoofType(rt.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        roofType === rt.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <div className="w-full h-20 rounded-md overflow-hidden bg-white border border-border/40 flex items-center justify-center">
                        {rt.image ? (
                          <img src={rt.image} alt={rt.label} loading="lazy" className="w-full h-full object-contain" />
                        ) : rt.icon ? (
                          <rt.icon className="w-10 h-10 text-muted-foreground" />
                        ) : null}
                      </div>
                      {rt.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4">
                    <Sun className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Препоръчана мощност</p>
                    <p className="text-3xl font-bold text-foreground">{results.kw} <span className="text-lg">kW</span></p>
                  </div>
                  <div className="text-center p-4">
                    <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Ориентировъчна цена</p>
                    <p className="text-3xl font-bold text-green-600">{results.price.toLocaleString()} <span className="text-lg">€</span></p>
                  </div>
                  <div className="text-center p-4">
                    <TrendingDown className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Годишно спестяване</p>
                    <p className="text-3xl font-bold text-green-600">{results.annualSaving.toLocaleString()} <span className="text-lg">€</span></p>
                  </div>
                  <div className="text-center p-4">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Изплащане за</p>
                    <p className="text-3xl font-bold text-foreground">{results.payback} <span className="text-lg">год.</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">Искате точна оферта, съобразена с вашия покрив?</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="flex-1">
                    <Link to={getPath('contact')}>
                      Получи Точна Оферта <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="flex-1 border-primary text-primary hover:bg-primary/10">
                    <a href="tel:0884997659">📞 088 499 7659</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground text-center">
              * Стойностите са ориентировъчни. Точната цена се определя след безплатен оглед на място.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
