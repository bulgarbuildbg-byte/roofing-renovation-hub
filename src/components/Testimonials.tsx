import { Star, Quote, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    text: "Бърза реакция, ясни цени и отлично качество. Покривът беше ремонтиран за два дни. Горещо препоръчвам!",
    author: "Иван Димитров",
    location: "кв. Левски, Варна",
    rating: 5
  },
  {
    text: "Много съм доволен от работата. Покривът вече не тече и получих 5 години гаранция. Професионално отношение от начало до край.",
    author: "Петър Стоянов",
    location: "кв. Чайка, Варна",
    rating: 5
  },
  {
    text: "Професионална работа по хидроизолацията. Екипът беше точен, изряден и много вежлив. Ще ги препоръчам на приятели.",
    author: "Мария Колева",
    location: "кв. Аспарухово, Варна",
    rating: 5
  },
  {
    text: "Отлична работа по ремонта на керемидите. Цената беше честна и работата беше свършена качествено. Благодаря!",
    author: "Георги Петров",
    location: "с. Константиново",
    rating: 5
  },
  {
    text: "Бързо дойдоха за оглед и дадоха честна оценка. Ремонтът беше завършен преди обещаното. Препоръчвам!",
    author: "Елена Иванова",
    location: "кв. Младост, Варна",
    rating: 5
  },
  {
    text: "Хидроизолацията на терасата беше направена перфектно. Вече няма течове дори при най-силните дъждове.",
    author: "Николай Василев",
    location: "кв. Владиславово, Варна",
    rating: 5
  }
];

const Testimonials = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-3 bg-accent/10 px-5 py-3 rounded-full mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-lg font-bold text-foreground">4.9/5</span>
            <span className="text-muted-foreground">от 127 отзива</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Какво Казват Нашите Клиенти
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Над 500 доволни клиенти във Варна и региона
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6">
                <Quote className="w-7 h-7 md:w-8 md:h-8 text-accent mb-3 md:mb-4" />
                <div className="flex gap-0.5 mb-3 md:mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border pt-3 md:pt-4">
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-lg text-foreground font-medium mb-4">
            Станете следващият доволен клиент
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              asChild
              size="lg"
              className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-8"
            >
              <a href="tel:0884997659" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Обадете се сега
              </a>
            </Button>
            <Button 
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="h-14 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-bold px-8"
            >
              Заявете оглед
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
