import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Какво Казват Нашите Клиенти
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Над 500 доволни клиенти във Варна и региона
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-accent mb-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
