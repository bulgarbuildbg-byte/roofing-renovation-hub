import { Helmet } from "react-helmet";
import { Check, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";

const servicePackages = [
  {
    title: "Основен Ремонт",
    price: "от 25 лв/м²",
    description: "Основен ремонт и възстановяване на покривни повреди",
    features: [
      "Оглед и диагностика",
      "Ремонт на керемиди",
      "Смяна на повредени елементи",
      "Почистване на улуци",
      "1 година гаранция"
    ],
    popular: false
  },
  {
    title: "Пълна Реконструкция",
    price: "от 55 лв/м²",
    description: "Цялостна реконструкция на покривната конструкция",
    features: [
      "Пълна диагностика",
      "Демонтаж на стар покрив",
      "Изграждане на нова конструкция",
      "Хидроизолация",
      "Монтаж на нов покрив",
      "Олуци и водосточни тръби",
      "3 години гаранция"
    ],
    popular: true
  },
  {
    title: "VIP Поддръжка",
    price: "от 90 лв/м²",
    description: "Премиум услуги с най-високо качество материали",
    features: [
      "Премиум материали",
      "Професионален екип",
      "Термоизолация",
      "Хидроизолация",
      "Пълна конструкция",
      "Декоративни елементи",
      "5 години гаранция",
      "Безплатни годишни прегледи"
    ],
    popular: false
  }
];

const detailedServices = [
  {
    title: "Ремонт на Покриви",
    description: "Професионален ремонт на всички видове покривни конструкции - керемидни, метални, битумни. Отстраняваме течове, подменяме повредени елементи и възстановяваме целостта на покрива.",
    price: "от 25 лв/м²",
    includes: [
      "Диагностика на повреди",
      "Ремонт на керемиди и метални листове",
      "Подмяна на дървени елементи",
      "Почистване на улуци и водостоци"
    ]
  },
  {
    title: "Монтаж на Нови Покриви",
    description: "Изграждане на нови покривни конструкции с качествени материали. Работим с керемиди, метални покриви, битумни хидроизолации и други съвременни материали.",
    price: "от 55 лв/м²",
    includes: [
      "Изготвяне на проект",
      "Изграждане на покривна конструкция",
      "Монтаж на покривни материали",
      "Монтаж на олуци и водостоци"
    ]
  },
  {
    title: "Хидроизолация",
    description: "Надеждна хидроизолация за дълготрайна защита на вашия покрив от влага и атмосферни условия. Използваме качествени материали с доказана издръжливост.",
    price: "от 28 лв/м²",
    includes: [
      "Почистване и подготовка",
      "Нанасяне на хидроизолация",
      "Изпитване за течове",
      "Гаранция за изпълнение"
    ]
  },
  {
    title: "Редовна Поддръжка",
    description: "Профилактика и редовна поддръжка за запазване качеството и дълготрайността на вашия покрив. Препоръчваме годишни прегледи за превенция на проблеми.",
    price: "от 12 лв/м²",
    includes: [
      "Годишен преглед",
      "Почистване на покрив",
      "Проверка на водостоци",
      "Малки ремонти при нужда"
    ]
  }
];

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Покривни Услуги Варна - Цени от 15лв/кв.м</title>
        <meta name="description" content="Ремонт, хидроизолация и изграждане на покриви във Варна. Прозрачни цени, безплатен оглед. Вижте нашите пакети." />
        <meta name="keywords" content="ремонт покриви варна цени, монтаж покриви варна, хидроизолация покриви, покривни услуги варна, цени покриви" />
        <meta property="og:title" content="Покривни Услуги Варна - Цени от 15лв/кв.м" />
        <meta property="og:description" content="Ремонт, хидроизолация и изграждане на покриви във Варна. Прозрачни цени, безплатен оглед." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/услуги" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-16 bg-secondary">
            <div className="container mx-auto px-4">
              <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Обратно към начало
              </Link>
              
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Покривни Услуги Варна - Цени и Пакети
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Предлагаме пълен спектър от покривни услуги с конкурентни цени и гаранция за качество. Безплатна оценка и консултация!
                </p>
                <Button size="lg" className="gap-2">
                  <Phone className="w-5 h-5" />
                  089 270 1176
                </Button>
              </div>
            </div>
          </section>

          {/* Pricing Packages */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Пакети за Ремонт на Покриви Варна
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Изберете най-подходящия пакет за вашия проект
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {servicePackages.map((pkg, index) => (
                  <Card 
                    key={index}
                    className={`relative ${pkg.popular ? 'border-primary border-2 shadow-xl' : 'border-border'}`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                          Популярен
                        </span>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                      <CardDescription className="text-base">{pkg.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                        Заявка за оферта
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Detailed Services */}
          <section className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Услуги по Ремонт и Изграждане на Покриви
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Детайлна информация за всяка услуга и какво включва тя
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                {detailedServices.map((service, index) => (
                  <article key={index} className="bg-background rounded-lg p-8 shadow-md border border-border">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                      <span className="text-2xl font-bold text-primary shrink-0">{service.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">
                      {service.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Включва:</h4>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {service.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Готови за Безплатна Оценка?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Свържете се с нас днес за професионална консултация и безплатна оценка на вашия проект
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Phone className="w-5 h-5" />
                  089 270 1176
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  remontnapokrivivarna@abv.bg
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingCallButton />
      </div>
    </>
  );
};

export default ServicesPage;
