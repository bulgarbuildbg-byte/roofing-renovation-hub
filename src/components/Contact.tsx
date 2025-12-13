import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявката е изпратена!",
      description: "Ще се свържем с вас в рамките на 24 часа.",
    });
    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Свържете се с нас
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Готови сме да отговорим на вашите въпроси и да предложим най-доброто решение
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            {/* Response guarantee */}
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
              <p className="text-foreground font-medium">
                Отговаряме в рамките на 24 часа
              </p>
            </div>

            <Card className="border-border bg-card">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground mb-1">Телефон</h3>
                  <a href="tel:0892701176" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                    089 270 1176
                  </a>
                </div>
              </CardContent>
            </Card>

            <a href="tel:0892701176" className="block">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6" size="lg">
                <Phone className="w-5 h-5" />
                Обадете се сега
              </Button>
            </a>

            <Card className="border-border bg-card">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground mb-1">Email</h3>
                  <a href="mailto:remontnapokrivivarna@abv.bg" className="text-muted-foreground hover:text-primary transition-colors">
                    remontnapokrivivarna@abv.bg
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground mb-1">Адрес и Зона на Обслужване</h3>
                  <p className="text-muted-foreground mb-1">
                    ул. Уста Колю Фичето 25 А, Варна
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Обслужваме Варна и региона в радиус от 50 км
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground mb-1">Работно Време</h3>
                  <p className="text-muted-foreground">
                    Понеделник - Събота: 08:00 - 18:00
                  </p>
                  <p className="text-sm text-accent font-medium mt-1">
                    Аварийни случаи: 24/7
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-card-foreground mb-4">
                Изпратете запитване
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Вашето име"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background border-input"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-background border-input"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background border-input"
                  />
                </div>
                <div>
                  <Select 
                    value={formData.service} 
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger className="bg-background border-input">
                      <SelectValue placeholder="Изберете услуга" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="repair">Ремонт на покрив</SelectItem>
                      <SelectItem value="new-roof">Нов покрив</SelectItem>
                      <SelectItem value="waterproofing">Хидроизолация</SelectItem>
                      <SelectItem value="maintenance">Поддръжка</SelectItem>
                      <SelectItem value="inspection">Безплатна инспекция</SelectItem>
                      <SelectItem value="emergency">Аварийно ремонт</SelectItem>
                      <SelectItem value="other">Друго</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea
                    placeholder="Опишете вашия проблем или запитване..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="min-h-32 bg-background border-input"
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6" size="lg">
                  Изпрати заявка
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Безплатна консултация • Без задължение
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
