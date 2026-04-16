import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import RelatedServices from "@/components/RelatedServices";
import HowWeWork from "@/components/HowWeWork";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import PriceCalculator from "@/components/PriceCalculator";
import CalculatorDialog from "@/components/CalculatorDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, Shield, Zap, Clock, Palette, Layers, Wind, MapPin, Wrench, AlertTriangle, Search, Eye, Hammer, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

import metalRoofSurvey from "@/assets/process/metal-roof-tiles-before-after-01.jpg";
import membraneBattens from "@/assets/process/metal-roof-tiles-installation-01.jpg";
import metalDelivery from "@/assets/process/metal-roof-trapezoidal-installation-01.jpg";
import metalInstallation from "@/assets/process/metal-roof-sheet-installation-01.jpg";
import metalRidgeCap from "@/assets/process/metal-roof-ridge-installation-01.jpg";
import gutterInstallation from "@/assets/process/metal-roof-tiles-complete-01.jpg";

const MetalRoofPage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const relatedServices = [
    { title: "Изграждане на Нов Покрив", description: "Пълно проектиране и изграждане на нова покривна конструкция.", href: getPath('newRoof') },
    { title: "Ремонт на Покриви", description: "Професионален ремонт на всички видове покриви.", href: getPath('roofRepair') },
    { title: "Поддръжка на Покриви", description: "Редовна поддръжка за дълъг живот на металния покрив.", href: getPath('maintenance') }
  ];
  const learnMoreLinks = [
    { title: "Как да изберем правилните керемиди", href: "/блог/как-да-изберем-керемиди-за-нов-покрив" },
    { title: "Подготовка на покрива за зимата", href: "/блог/как-да-подготвим-покрива-за-зимата" }
  ];

  const services = ["Монтаж на метални керемиди", "Монтаж на ламаринени покриви", "Монтаж на трапецовидна ламарина", "Монтаж на стоящ фалц", "Монтаж на сандвич панели", "Ремонт на метални покриви", "Боядисване и антикорозионна защита", "Монтаж на водосточни системи", "Подмяна на износени панели", "Уплътняване на фуги и винтове"];

  const metalTypes = [
    { name: "Метални керемиди", advantages: ["Автентичен вид на керемиди", "Много по-леки", "Богат избор на цветове", "Бърз монтаж"], specs: { weight: "4-6 кг/кв.м", warranty: "до 50 години", slope: "от 14°" }, price: "от 9 €/кв.м" },
    { name: "Трапецовидна ламарина", advantages: ["Най-икономичен вариант", "Много бърз монтаж", "Голяма носимоспособност", "Идеален за големи площи"], specs: { weight: "3-5 кг/кв.м", warranty: "до 30 години", slope: "от 7°" }, price: "от 6 €/кв.м" },
    { name: "Стоящ фалц", advantages: ["Елегантен модерен вид", "Без видими крепежи", "Изключителна водоустойчивост", "Подходящ за нисък наклон"], specs: { weight: "5-7 кг/кв.м", warranty: "до 50 години", slope: "от 3°" }, price: "от 18 €/кв.м" },
    { name: "Сандвич панели", advantages: ["Покритие + изолация в едно", "Най-бърз монтаж", "Отлична топлоизолация", "Икономия на време и труд"], specs: { weight: "10-15 кг/кв.м", warranty: "до 25 години", slope: "от 5°" }, price: "от 14 €/кв.м" }
  ];

  const problems = [
    { title: "Корозия и ръжда", description: "С времето металните покриви могат да развият корозия, особено в морски климат като Варна." },
    { title: "Течове при винтовете", description: "Уплътнителните шайби се втвърдяват и губят еластичността си." },
    { title: "Кондензация и влага", description: "Металът провежда топлината, което може да доведе до кондензация при липса на правилна изолация." },
    { title: "Деформации от температура", description: "Металът се разширява и свива при промяна на температурата." }
  ];

  const consequences = [
    { title: "Разпространение на корозията", description: "Малко петно ръжда бързо се разраства и компрометира цели панели." },
    { title: "Проникване на вода", description: "Износените уплътнения позволяват на водата да прониква и поврежда изолацията." },
    { title: "Повреда на конструкцията", description: "Продължителната влага причинява гниене на дървените елементи под металното покритие." },
    { title: "Увеличени разходи за отопление", description: "Мократа изолация и кондензацията намаляват енергийната ефективност на сградата." },
  ];

  const solutionSteps = [
    { title: "Детайлен оглед", description: "Проверяваме покритието, крепежните елементи, изолацията и конструкцията." },
    { title: "Антикорозионна обработка", description: "Почистваме засегнатите места и нанасяме защитни покрития." },
    { title: "Подмяна на износени елементи", description: "Сменяме повредени панели, винтове и уплътнения." },
    { title: "15 години гаранция", description: "Предоставяме 15 години писмена гаранция за извършената работа." },
  ];


  const benefits = [
    { icon: Clock, title: "Дълъг живот", description: "Металните покриви издържат 40-50+ години." },
    { icon: Zap, title: "Леки конструкции", description: "Теглото е 5-10 пъти по-малко от керемидите." },
    { icon: Shield, title: "Издръжливи", description: "Устойчиви на вятър до 200 км/ч, градушка, сняг и огън." },
    { icon: Palette, title: "Богат избор", description: "Над 30 цвята и различни профили." },
    { icon: Wind, title: "Бърз монтаж", description: "2-3 пъти по-бърз от керемиден покрив." },
    { icon: Layers, title: "Икономични", description: "Отлично съотношение цена-качество." }
  ];

  const process = [
    { step: 1, title: "Оглед и проектиране", description: "Детайлен оглед, измервания и изготвяне на проект.", image: metalRoofSurvey, imageAlt: "Проектиране на метален покрив" },
    { step: 2, title: "Подготовка на конструкцията", description: "Проверка и монтаж на летви, обрешетка и мембрана.", image: membraneBattens, imageAlt: "Подготовка на конструкция за метален покрив" },
    { step: 3, title: "Доставка на материали", description: "Организираме доставката на панелите, произведени по поръчка.", image: metalDelivery, imageAlt: "Доставка на метални панели" },
    { step: 4, title: "Монтаж на покривните панели", description: "Полагаме панелите с правилно застъпване и качествени саморези.", image: metalInstallation, imageAlt: "Монтаж на метални панели" },
    { step: 5, title: "Монтаж на аксесоари", description: "Монтираме билни капаци, снегозадържатели, вентилационни елементи.", image: metalRidgeCap, imageAlt: "Монтаж на аксесоари" },
    { step: 6, title: "Водосточна система и финализиране", description: "Монтаж на улуци, водосточни тръби и финална проверка.", image: gutterInstallation, imageAlt: "Монтаж на водосточна система" }
  ];

  const priceRanges = [
    { service: "Метални керемиди (монтаж)", price: "от 9 €/кв.м", note: "Без материал" },
    { service: "Трапецовидна ламарина", price: "от 6 €/кв.м", note: "Без материал" },
    { service: "Стоящ фалц", price: "от 18 €/кв.м", note: "Без материал" },
    { service: "Сандвич панели", price: "от 14 €/кв.м", note: "Без материал" },
    { service: "Ремонт/боядисване", price: "от 4 €/кв.м", note: "Почистване + боя" },
    { service: "Водосточна система", price: "от 9 €/м", note: "Улук + тръба + монтаж" }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина", "Гръцка махала", "Чаталджа"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост", "кв. Възраждане", "кв. Трошево", "кв. Галата"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Суворово", "Долни чифлик", "Златни пясъци", "Каменар", "Тополи"] }
  ];

  const faqs = [
    { question: "Колко дълго издържа металният покрив?", answer: "Качественият метален покрив издържа 40-50+ години. Гаранцията обикновено е 25-30 години за покритието." },
    { question: "Шумен ли е металният покрив при дъжд?", answer: "При правилен монтаж с подпокривна изолация шумът е минимален." },
    { question: "Безопасен ли е при мълнии?", answer: "Да, металният покрив е безопасен и дори по-добър — не гори и разпределя електричеството равномерно." },
    { question: "Може ли да се монтира върху стар керемиден покрив?", answer: "В много случаи да, ако старата конструкция е в добро състояние." },
    { question: "Какъв наклон е необходим?", answer: "Зависи от типа: трапецовидна ламарина — от 7°, метални керемиди — от 14°, стоящ фалц — от 3°." },
    { question: "Колко струва метален покрив за къща 120 кв.м?", answer: "За метални керемиди с монтаж — приблизително 2300-3300 €. За трапецовидна ламарина — 1500-2000 €." },
    { question: "Какво покритие е най-подходящо за морски климат?", answer: "Препоръчваме Pural, PVDF или полиестер с висока UV защита — издържат на солените аерозоли." }
  ];

  const schemaData = { "@context": "https://schema.org", "@type": "Service", "name": "Метални покриви Варна", "provider": { "@type": "RoofingContractor", "name": "RemontNaPokriviVarna", "telephone": "+359884997659", "email": "remontnapokrivivarna@abv.bg", "address": { "@type": "PostalAddress", "streetAddress": "ул. Уста Колю Фичето 25 А", "addressLocality": "Варна", "addressCountry": "BG" } }, "areaServed": [{ "@type": "City", "name": "Варна" }], "description": "Професионален монтаж и ремонт на метални покриви във Варна. Гаранция до 50 години.", "offers": { "@type": "AggregateOffer", "lowPrice": "6", "highPrice": "18", "priceCurrency": "EUR", "offerCount": "6" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg" }, { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.remontnapokrivivarna.bg/services" }, { "@type": "ListItem", "position": 3, "name": "Метални покриви", "item": "https://www.remontnapokrivivarna.bg/метални-покриви" }] };

  return (
    <>
      <Helmet>
        <title>Метални Покриви Варна - от 18 €/кв.м | До 50г Гаранция</title>
        <meta name="description" content="Монтаж на метални покриви — керемиди, ламарина, стоящ фалц. От 18 €/кв.м. До 50 години гаранция. ☎ 088 499 7659" />
        <meta property="og:title" content="Метални Покриви Варна - от 18 €/кв.м | До 50г Гаранция" />
        <meta property="og:description" content="Монтаж на метални покриви — керемиди, ламарина, стоящ фалц. До 50 години гаранция." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/metalni-pokrivi" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="метални покриви варна, метални керемиди варна, ламаринен покрив, трапецовидна ламарина варна, монтаж метален покрив" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      <main className="pt-20">
        {/* 1. HERO */}
        <section className="relative bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-primary-foreground/70">
              <Link to={getPath('home')} className="hover:text-primary-foreground">Начало</Link><span className="mx-2">/</span>
              <Link to={getPath('services')} className="hover:text-primary-foreground">Услуги</Link><span className="mx-2">/</span><span>Метални покриви</span>
            </nav>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Метални Покриви Варна — Монтаж и Ремонт</h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">Модерни и издръжливи метални покривни решения с гаранция до 50 години. Метални керемиди, трапецовидна ламарина, стоящ фалц, сандвич панели.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"><Link to={getPath('contact')}><Eye className="w-5 h-5 mr-2" />Заяви безплатен оглед</Link></Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20"><a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обади се сега</a></Button>
              </div>
              <CalculatorDialog type="roof" />
              <div className="flex flex-wrap gap-4 text-sm">
                {["Безплатен оглед", "Работа по договор", "Гаранция за изпълнение", "Реални снимки от обекти"].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-primary-foreground/10 px-3 py-1.5 rounded-full"><CheckCircle className="w-4 h-4 text-accent" /><span className="text-primary-foreground/90">{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Проблеми с Метални Покриви</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Дори най-издръжливите покриви могат да имат проблеми</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {problems.map((problem, index) => (
                <Card key={index} className="bg-card border-border"><CardContent className="p-6">
                  <AlertTriangle className="w-8 h-8 text-accent mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground text-sm">{problem.description}</p>
                </CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CONSEQUENCES */}
        <section className="py-16 bg-destructive/5 border-y border-destructive/20">
          <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Какво се случва, ако проблемът се отложи</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">Навременният ремонт предотвратява сериозни последствия</p>
            <div className="grid md:grid-cols-2 gap-6">
              {consequences.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-5 bg-background rounded-xl border border-destructive/20">
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <div><h3 className="font-semibold text-foreground mb-1">{item.title}</h3><p className="text-muted-foreground text-sm">{item.description}</p></div>
                </div>
              ))}
            </div>
          </div></div>
        </section>

        {/* 4. SOLUTION */}
        <section className="py-16 bg-primary/5 border-b border-primary/20">
          <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Как решаваме проблема</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">Професионален подход за дълготраен резултат</p>
            <div className="grid md:grid-cols-2 gap-6">
              {solutionSteps.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-5 bg-background rounded-xl border border-primary/20">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div><h3 className="font-semibold text-foreground mb-1">{item.title}</h3><p className="text-muted-foreground text-sm">{item.description}</p></div>
                </div>
              ))}
            </div>
          </div></div>
        </section>

        {/* 5. PROCESS */}
        <HowWeWork />

        {/* 6. MID CTA */}
        <section className="py-12 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Интересувате се от метален покрив?</h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">Свържете се за безплатна консултация и оферта.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground"><Link to={getPath('contact')}>Заяви безплатен оглед</Link></Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20"><a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />088 499 7659</a></Button>
            </div>
          </div>
        </section>

        {/* 7. CALCULATOR */}
        <PriceCalculator />

        {/* 8. SERVICE DETAILS */}
        {/* Metal Types */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Видове Метални Покриви</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Пълната гама метални покривни решения</p>
            <div className="space-y-6 max-w-5xl mx-auto">
              {metalTypes.map((type, index) => (
                <Card key={index} className="bg-card overflow-hidden border-border"><CardContent className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                      <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3"><Layers className="w-6 h-6 text-primary" />{type.name}</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><h4 className="font-medium text-foreground mb-2">Предимства:</h4><ul className="space-y-1">{type.advantages.map((adv, idx) => (<li key={idx} className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />{adv}</li>))}</ul></div>
                        <div><h4 className="font-medium text-foreground mb-2">Спецификации:</h4><ul className="space-y-1 text-sm text-muted-foreground"><li>Тегло: {type.specs.weight}</li><li>Гаранция: {type.specs.warranty}</li><li>Мин. наклон: {type.specs.slope}</li></ul></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center lg:border-l lg:border-border lg:pl-6"><div className="text-center"><span className="text-2xl font-bold text-primary">{type.price}</span><p className="text-muted-foreground text-sm mt-1">само монтаж</p></div></div>
                  </div>
                </CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Процес на Монтаж</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Стъпка по стъпка за качествен резултат</p>
            <div className="space-y-12 max-w-5xl mx-auto">
              {process.map((item, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  <div className="lg:w-1/2"><img src={item.image} alt={item.imageAlt} className="rounded-lg shadow-lg w-full h-64 object-cover" /></div>
                  <div className="lg:w-1/2">
                    <div className="flex items-center gap-4 mb-4"><div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">{item.step}</div><h3 className="text-xl font-semibold text-foreground">{item.title}</h3></div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Нашите Услуги за Метални Покриви</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm">{service}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Цени за Метални Покриви</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">Прозрачно ценообразуване. Точната цена се определя след оглед.</p>
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-lg overflow-hidden border border-border">
                {priceRanges.map((item, index) => (
                  <div key={index} className={`flex flex-col md:flex-row md:items-center justify-between p-4 ${index !== priceRanges.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="mb-2 md:mb-0"><span className="font-semibold text-foreground">{item.service}</span><span className="text-muted-foreground text-sm block md:inline md:ml-2">({item.note})</span></div>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. TRUST */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Предимства на Металните Покриви</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-card border-border"><CardContent className="p-6">
                  <benefit.icon className="w-12 h-12 text-primary mb-4" /><h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3><p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent></Card>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {["15+ години опит", "Работа по договор", "Реални обекти", "Член на КСБ"].map((item) => (
                <div key={item} className="flex items-center gap-2 justify-center p-3 bg-background rounded-lg border border-border"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{item}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Райони, Които Обслужваме</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Монтираме метални покриви в цяла Варна и околните места</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              {serviceAreas.map((area, index) => (
                <div key={index}><h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" />{area.area}</h3>
                <ul className="space-y-2">{area.neighborhoods.map((n, idx) => (<li key={idx} className="text-muted-foreground text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" />{n}</li>))}</ul></div>
              ))}
            </div>
            <div className="max-w-4xl mx-auto"><div className="rounded-lg overflow-hidden shadow-lg">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93422.83869498367!2d27.8261!3d43.2141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4538baaf3f891%3A0x5765ae67f35e9f47!2z0JLQsNGA0L3QsA!5e0!3m2!1sbg!2sbg!4v1699524000000!5m2!1sbg!2sbg" width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Карта на Варна" />
            </div></div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Често Задавани Въпроси</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Отговори на най-честите въпроси</p>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (<div key={index} className="bg-background rounded-lg p-6 border border-border"><h3 className="font-semibold text-foreground mb-3 text-lg">{faq.question}</h3><p className="text-muted-foreground">{faq.answer}</p></div>))}
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <CTASection title="Интересувате се от Метален Покрив?" subtitle="Получете безплатна консултация и оферта без задължение" />
        <div className="container mx-auto px-4 py-12"><LearnMoreLinks links={learnMoreLinks} /></div>
        <RelatedServices services={relatedServices} />
      </main>
      <Footer />
    </>
  );
};

export default MetalRoofPage;
