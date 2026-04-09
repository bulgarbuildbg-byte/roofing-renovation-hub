import { Helmet } from "react-helmet";
import { Check, ArrowLeft, Phone, ClipboardCheck, FileText, Hammer, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import type { RouteKey } from "@/i18n/routes";

import roofRepairImg from "@/assets/services/roof-repair.jpg";
import leakRepairImg from "@/assets/services/leak-repair.jpg";
import waterproofingImg from "@/assets/services/waterproofing.jpg";
import newRoofImg from "@/assets/services/new-roof.jpg";
import tileReplacementImg from "@/assets/services/tile-replacement.jpg";
import flatRoofImg from "@/assets/services/flat-roof.jpg";
import metalRoofImg from "@/assets/services/metal-roof.jpg";
import maintenanceImg from "@/assets/services/maintenance.jpg";

const serviceCards: { image: string; key: string; routeKey: RouteKey; price: string }[] = [
  { image: roofRepairImg, key: "roofRepair", routeKey: "roofRepair", price: "19 €/м²" },
  { image: waterproofingImg, key: "waterproofing", routeKey: "waterproofing", price: "9 €/м²" },
  { image: newRoofImg, key: "newRoof", routeKey: "newRoof", price: "68 €/м²" },
  { image: tileReplacementImg, key: "tileReplacement", routeKey: "tileReplacement", price: "18 €/м²" },
  { image: leakRepairImg, key: "leakRepair", routeKey: "leakRepair", price: "22 €" },
  { image: flatRoofImg, key: "flatRoof", routeKey: "flatRoof", price: "9 €/м²" },
  { image: metalRoofImg, key: "metalRoof", routeKey: "metalRoof", price: "18 €/м²" },
  { image: maintenanceImg, key: "maintenance", routeKey: "maintenance", price: "69 €/месец" },
];

const servicePackages = [
  {
    title: "Основен Ремонт",
    price: "от 13 €/м²",
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
    price: "от 28 €/м²",
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
    price: "от 46 €/м²",
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
    price: "от 13 €/м²",
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
    price: "от 28 €/м²",
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
    price: "от 14 €/м²",
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
    price: "от 6 €/м²",
    includes: [
      "Годишен преглед",
      "Почистване на покрив",
      "Проверка на водостоци",
      "Малки ремонти при нужда"
    ]
  }
];

const howWeWorkSteps = [
  { icon: ClipboardCheck, title: "Оглед и Консултация", description: "Безплатен оглед на място и професионална оценка" },
  { icon: FileText, title: "Оферта", description: "Ясна оферта без скрити разходи" },
  { icon: Hammer, title: "Изпълнение", description: "Качествено изпълнение с договор и срок" },
  { icon: Shield, title: "Гаранция", description: "10-15 години гаранция и протокол" },
];

const ServicesPage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  return (
    <>
      <Helmet>
        <title>Покривни Услуги Варна - Цени от 8 €/кв.м</title>
        <meta name="description" content="Ремонт, хидроизолация и изграждане на покриви във Варна. Прозрачни цени, безплатен оглед. Вижте нашите пакети." />
        <meta name="keywords" content="ремонт покриви варна цени, монтаж покриви варна, хидроизолация покриви, покривни услуги варна, цени покриви" />
        <meta property="og:title" content="Покривни Услуги Варна - Цени от 8 €/кв.м" />
        <meta property="og:description" content="Ремонт, хидроизолация и изграждане на покриви във Варна. Прозрачни цени, безплатен оглед." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-16 bg-secondary">
            <div className="container mx-auto px-4">
              <Link to={getPath('home')} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Обратно към начало
              </Link>
              
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Покривни Услуги Варна
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Изберете услугата, от която имате нужда. Безплатна консултация и оглед за всеки проект.
                </p>
                <Button size="lg" className="gap-2" asChild>
                  <a href="tel:0884997659"><Phone className="w-5 h-5" />088 499 7659</a>
                </Button>
              </div>
            </div>
          </section>

          {/* All 8 Services Grid */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Нашите Услуги
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Всички покривни решения на едно място — изберете и разберете повече
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {serviceCards.map((service, index) => (
                  <Link key={index} to={getPath(service.routeKey)} className="block group">
                    <Card className="bg-background hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border flex flex-col overflow-hidden cursor-pointer h-full">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={service.image}
                          alt={t(`services.${service.key}.title`)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {t(`services.${service.key}.title`)}
                        </h3>
                        <div className="mb-3">
                          <span className="inline-flex items-center bg-green-50 text-green-700 border border-green-200 font-extrabold text-sm px-3 py-1 rounded-full">
                            от {service.price}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 flex-grow">
                          {t(`services.${service.key}.problem`)}
                        </p>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-auto">
                          Научете повече
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* How We Work - Compact */}
          <section className="py-16 bg-secondary">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                Как Работим
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {howWeWorkSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-sm font-bold text-primary mb-1">Стъпка {index + 1}</div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                ))}
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
                      <Button className="w-full" variant={pkg.popular ? "default" : "outline"} asChild>
                        <Link to={getPath('contact')}>Заявка за оферта</Link>
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
                <Button size="lg" variant="secondary" className="gap-2" asChild>
                  <a href="tel:0884997659"><Phone className="w-5 h-5" />088 499 7659</a>
                </Button>
                <Button size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20" asChild>
                  <Link to={getPath('contact')}>Изпратете запитване</Link>
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
