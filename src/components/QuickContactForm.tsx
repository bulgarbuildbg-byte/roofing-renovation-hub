import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const QuickContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявката е изпратена!",
      description: "Ще се свържем с вас в рамките на 24 часа.",
    });
    setFormData({ name: "", phone: "", service: "" });
  };

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-border">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-accent" />
        <span className="text-sm font-medium text-foreground">Отговаряме до 24 часа</span>
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
        Заявете безплатен оглед
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Вашето име"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="h-14 text-base bg-background border-input"
        />
        <Input
          type="tel"
          placeholder="Телефон за връзка"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="h-14 text-base bg-background border-input"
        />
        <Select 
          value={formData.service} 
          onValueChange={(value) => setFormData({ ...formData, service: value })}
        >
          <SelectTrigger className="h-14 text-base bg-background border-input">
            <SelectValue placeholder="Изберете услуга (по избор)" />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="emergency" className="text-accent font-medium">🚨 Спешен случай</SelectItem>
            <SelectItem value="repair">Ремонт на покрив</SelectItem>
            <SelectItem value="leak">Ремонт на течове</SelectItem>
            <SelectItem value="waterproofing">Хидроизолация</SelectItem>
            <SelectItem value="new-roof">Нов покрив</SelectItem>
            <SelectItem value="tiles">Смяна на керемиди</SelectItem>
            <SelectItem value="inspection">Безплатна инспекция</SelectItem>
            <SelectItem value="other">Друго</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          type="submit" 
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold"
        >
          <Send className="w-5 h-5 mr-2" />
          Изпрати заявка
        </Button>
      </form>
      
      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-muted-foreground text-sm mb-3">Или ни се обадете директно:</p>
        <a 
          href="tel:0892701176" 
          className="inline-flex items-center gap-2 text-xl font-bold text-accent hover:text-accent/80 transition-colors"
        >
          <Phone className="w-5 h-5" />
          089 270 1176
        </a>
      </div>
    </div>
  );
};

export default QuickContactForm;
