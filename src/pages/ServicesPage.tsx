import { Helmet } from "react-helmet";
import { Check, ArrowLeft, Phone, ClipboardCheck, FileText, Hammer, Shield, Search, CreditCard, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import PriceCalculator from "@/components/PriceCalculator";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import type { RouteKey } from "@/i18n/routes";

import roofRepairImg from "@/assets/services/roof-repair.jpg";
import leakRepairImg from "@/assets/services/leak-repair.jpg";
import waterproofingImg from "@/assets/services/waterproofing.jpg";
import newRoofImg from "@/assets/services/new-roof.jpg";
import tileRoofRepairImg from "@/assets/services/tile-replacement.jpg";
import flatRoofImg from "@/assets/services/flat-roof.jpg";
import metalRoofImg from "@/assets/services/metal-roof.jpg";
import maintenanceImg from "@/assets/services/maintenance.jpg";

const serviceCards: { image: string; key: string; routeKey: RouteKey; price: string }[] = [
  { image: roofRepairImg, key: "roofRepair", routeKey: "roofRepair", price: "19 €/м²" },
  { image: waterproofingImg, key: "waterproofing", routeKey: "waterproofing", price: "9 €/м²" },
  { image: newRoofImg, key: "newRoof", routeKey: "newRoof", price: "68 €/м²" },
  { image: tileRoofRepairImg, key: "tileRoofRepair", routeKey: "tileRoofRepair", price: "18 €/м²" },
  { image: leakRepairImg, key: "leakRepair", routeKey: "leakRepair", price: "22 €" },
  { image: flatRoofImg, key: "flatRoof", routeKey: "flatRoof", price: "9 €/м²" },
  { image: metalRoofImg, key: "metalRoof", routeKey: "metalRoof", price: "18 €/м²" },
  { image: maintenanceImg, key: "maintenance", routeKey: "maintenance", price: "69 €/месец" },
];

const servicePackages = [
  {
    title: "Частичен ремонт",
    price: "35–65 €/м²",
    description: "Локални ремонти и отстраняване на конкретни проблеми",
    features: [
      "Смяна на керемиди",
      "Локални ремонти",
      "Спиране на течове",
      "Ремонт на обшивки"
    ],
    popular: false
  },
  {
    title: "Среден ремонт",
    price: "65–110 €/м²",
    description: "Частичен демонтаж и подмяна на основни елементи",
    features: [
      "Частичен демонтаж",
      "Нова хидроизолационна мембрана",
      "Нови летви",
      "Подмяна на керемиди",
      "Ремонт на дървена конструкция"
    ],
    popular: true
  },
  {
    title: "Пълна реконструкция",
    price: "110–180 €/м²",
    description: "Цялостна подмяна на покривната конструкция",
    features: [
      "Пълен демонтаж",
      "Нова конструкция",
      "Нови материали",
      "Хидроизолация",
      "Топлоизолация",
      "Завършен покрив"
    ],
    popular: false
  }
];

const howWeWorkSteps = [
  { icon: ClipboardCheck, title: "Заявка", description: "Обадете се или попълнете формата" },
  { icon: Search, title: "Оглед", description: "Безплатен оглед на място" },
  { icon: FileText, title: "Оферта", description: "Ясна оферта без скрити разходи" },
  { icon: Hammer, title: "Изпълнение", description: "Качествено изпълнение с договор" },
  { icon: Shield, title: "Гаранция", description: "15 години гаранция" },
];

const paymentSteps = [
  { percent: "30%", label: "Аванс", description: "При подписване на договора" },
  { percent: "40%", label: "По време на работа", description: "При напредък на дейностите" },
  { percent: "30%", label: "При завършване", description: "След приемане на работата" },
];

const blogLinks = [
  { title: "Кога да ремонтирате покрива?", href: "/bg/blog/5-priznaka-remont-na-pokriv" },
  { title: "Как да разпознаете проблем навреме", href: "/bg/blog/proletna-inspekcia-na-pokriva" },
  { title: "Подготовка на покрива за зимата", href: "/bg/blog/podgotovka-na-pokriva-za-zimata" },
];

const ServicesPage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  return (
    <>
      <Helmet>
        <title>Покривни Услуги Варна – Ремонт, Хидроизолация, Нов Покрив | 15г Гаранция</title>
        <meta name="description" content="Пълен спектър покривни услуги във Варна: ремонт от 19 €/м², хидроизолация от 9 €/м², нови покриви. 15 години гаранция. ☎ 088 499 7659" />
        <meta name="keywords" content="ремонт покриви варна цени, монтаж покриви варна, хидроизолация покриви, покривни услуги варна" />
        <meta property="og:title" content="Покривни Услуги Варна – Ремонт, Хидроизолация, Нов Покрив | 15г Гаранция" />
        <meta property="og:description" content="Пълен спектър покривни услуги: ремонт, хидроизолация, нови покриви. 15 години гаранция." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/services" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Начало","item":"https://www.remontnapokrivivarna.bg"},{"@type":"ListItem","position":2,"name":"Услуги","item":"https://www.remontnapokrivivarna.bg/bg/services"}]})}</script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* 1. Hero Section */}
          <section className="pt-32 pb-16 bg-secondary">
            <div className="container mx-auto px-4">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to={getPath('home')} className="hover:text-primary transition-colors">Начало</Link>
                <span>/</span>
                <span className="text-foreground font-medium">Услуги</span>
              </nav>
              
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Покривни Услуги Варна – Пълен Спектър от Решения
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Решаваме течове, подменяме керемиди и изграждаме нови покриви. Безплатен оглед и честна оферта.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="gap-2" asChild>
                    <Link to={getPath('contact')}>Безплатен оглед</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <a href="tel:0884997659"><Phone className="w-5 h-5" />088 499 7659</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. All 8 Services Grid */}
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

          {/* 3. How We Work - 5 Steps */}
          <section className="py-16 bg-secondary">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                Как Работим
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
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

          {/* 4. Pricing Packages */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Пакети за ремонт на покриви
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Изберете най-подходящия пакет за вашия проект
                </p>
              </div>

              {/* Orientation note */}
              <div className="max-w-3xl mx-auto mb-12">
                <div className="bg-muted/50 border border-border rounded-xl p-5 text-center">
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-foreground">Всеки покрив е различен.</strong> Крайната цена се определя след безплатен оглед на място. Посочените цени са ориентировъчни и зависят от площ, състояние и сложност.
                  </p>
                </div>
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

          {/* 5. Calculator Section */}
          <section className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Изчислете ориентировъчна цена
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Въведете площ и тип ремонт, за да получите ориентировъчна цена
                </p>
              </div>
              <PriceCalculator />
              <div className="max-w-2xl mx-auto mt-6">
                <p className="text-sm text-muted-foreground text-center">
                  Това е ориентировъчна цена. За точна оферта е необходим <strong className="text-foreground">безплатен оглед</strong> на място.
                </p>
              </div>
            </div>
          </section>

          {/* 6. CTA after Calculator */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Получете точна оферта
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Безплатен оглед на място и честна оферта без скрити разходи
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="gap-2" asChild>
                  <Link to={getPath('contact')}>Заяви безплатен оглед</Link>
                </Button>
                <Button size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20 gap-2" asChild>
                  <a href="tel:0884997659"><Phone className="w-5 h-5" />088 499 7659</a>
                </Button>
              </div>
            </div>
          </section>

          {/* 7. Payment Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  <CreditCard className="w-8 h-8 inline-block mr-2 text-primary" />
                  Условия за плащане
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Разделно плащане за вашето спокойствие
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {paymentSteps.map((step, index) => (
                  <div key={index} className="text-center p-6 bg-card rounded-xl border border-border">
                    <div className="text-4xl font-bold text-primary mb-2">{step.percent}</div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{step.label}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Blog Section */}
          <section className="py-16 bg-secondary">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  <BookOpen className="w-8 h-8 inline-block mr-2 text-primary" />
                  Научете повече
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Полезни статии за покриви, ремонти и поддръжка
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {blogLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="block p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">{link.title}</h3>
                    <span className="text-primary text-sm font-medium">Прочетете →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 9. Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Готови за безплатен оглед?
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
