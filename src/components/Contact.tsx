import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, CheckCircle, Star } from "lucide-react";
import QuickContactForm from "./QuickContactForm";

const Contact = () => {
  return (
    <section id="contact" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Свържете се с нас
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Готови сме да ви помогнем с всеки покривен проблем
          </p>
          
          {/* Rating badge */}
          <div className="inline-flex items-center gap-2 mt-4 bg-accent/10 px-4 py-2 rounded-full">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">4.9/5 от 127 отзива</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Contact Info - Mobile optimized */}
          <div className="space-y-4 md:space-y-6 order-2 md:order-1">
            {/* Response guarantee */}
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
              <p className="text-foreground font-medium">
                Отговаряме в рамките на 24 часа
              </p>
            </div>

            {/* Phone - Prominent */}
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6">
                <a href="tel:0892701176" className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="text-xl md:text-2xl font-bold text-accent">089 270 1176</p>
                  </div>
                </a>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-4 md:p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground mb-1">Email</h3>
                  <a href="mailto:remontnapokrivivarna@abv.bg" className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base break-all">
                    remontnapokrivivarna@abv.bg
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-4 md:p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground mb-1">Адрес</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    ул. Уста Колю Фичето 25 А, Варна
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Обслужваме Варна и региона в радиус от 50 км
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-4 md:p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground mb-1">Работно Време</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Понеделник - Събота: 08:00 - 18:00
                  </p>
                  <p className="text-sm text-accent font-medium mt-1">
                    🚨 Аварийни случаи: 24/7
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Contact Form */}
          <div className="order-1 md:order-2">
            <QuickContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
