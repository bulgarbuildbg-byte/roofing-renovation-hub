import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Phone, FileText, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const TERMS = [12, 24, 36, 48, 60];
const APR = 0.059;

const FinancingCalculator = () => {
  const [amount, setAmount] = useState(15000);
  const [months, setMonths] = useState(36);
  const { getPath } = useLocalizedPath();

  const result = useMemo(() => {
    const monthlyRate = APR / 12;
    const payment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = payment * months;
    const totalInterest = totalAmount - amount;
    return { payment: Math.round(payment), totalAmount: Math.round(totalAmount), totalInterest: Math.round(totalInterest) };
  }, [amount, months]);

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-slate-50 to-blue-50 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-blue-700 p-4 text-white text-center">
        <Calculator className="w-6 h-6 mx-auto mb-1" />
        <h3 className="text-xl font-bold">Калкулатор за Вноски</h3>
        <p className="text-sm text-white/80">Изчислете ориентировъчна месечна вноска</p>
      </div>
      <CardContent className="p-6 space-y-6">
        {/* Amount slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold text-foreground">Стойност на ремонта</label>
            <span className="text-2xl font-bold text-green-600">{amount.toLocaleString('bg-BG')} €</span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={(v) => setAmount(v[0])}
            min={5000}
            max={50000}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5 000 €</span>
            <span>50 000 €</span>
          </div>
        </div>

        {/* Term radio */}
        <div>
          <label className="font-semibold text-foreground block mb-3">Срок на изплащане</label>
          <RadioGroup
            value={String(months)}
            onValueChange={(v) => setMonths(Number(v))}
            className="flex flex-wrap gap-3"
          >
            {TERMS.map((t) => (
              <label
                key={t}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                  months === t ? 'border-primary bg-primary/10 font-semibold' : 'border-border hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value={String(t)} />
                <span>{t} мес.</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
            <p className="text-sm text-muted-foreground">Месечна вноска</p>
            <p className="text-3xl font-bold text-green-600">~{result.payment} €</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
            <p className="text-sm text-muted-foreground">Обща сума</p>
            <p className="text-2xl font-bold text-foreground">{result.totalAmount.toLocaleString('bg-BG')} €</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
            <p className="text-sm text-muted-foreground">Лихва общо</p>
            <p className="text-xl font-semibold text-muted-foreground">{result.totalInterest.toLocaleString('bg-BG')} €</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
            <p className="text-sm text-muted-foreground">Ориент. ГПР</p>
            <p className="text-xl font-semibold text-muted-foreground">~5.9%</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          * Калкулацията е ориентировъчна. Крайните условия зависят от одобрението на финансовата институция.
        </p>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-5 text-center border border-primary/10">
          <p className="font-semibold text-lg mb-3">Искате точна оферта за финансиране?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to={getPath('contact')}>
                <FileText className="w-4 h-4 mr-2" />
                Да, свържете се
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
              <a href="tel:0884997659">
                <Phone className="w-4 h-4 mr-2" />
                Обади ми се
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancingCalculator;
