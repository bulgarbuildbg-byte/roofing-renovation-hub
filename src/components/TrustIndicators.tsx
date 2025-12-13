import { Award, ShieldCheck, FileCheck, Search } from "lucide-react";

const indicators = [
  {
    icon: Award,
    text: "15+ години опит"
  },
  {
    icon: ShieldCheck,
    text: "Гаранция на всички работи"
  },
  {
    icon: FileCheck,
    text: "Лицензирани и застраховани"
  },
  {
    icon: Search,
    text: "Безплатен оглед на място"
  }
];

const TrustIndicators = () => {
  return (
    <section className="bg-primary py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {indicators.map((indicator, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 justify-center text-primary-foreground"
            >
              <indicator.icon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              <span className="text-sm md:text-base font-medium">{indicator.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
