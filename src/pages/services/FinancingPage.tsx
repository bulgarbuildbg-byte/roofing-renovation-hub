import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustIndicators from "@/components/TrustIndicators";
import Testimonials from "@/components/Testimonials";
import FinancingCalculator from "@/components/FinancingCalculator";
import CalculatorDialog from "@/components/CalculatorDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  CheckCircle, Phone, Eye, Shield, Clock, Users, FileText, Building2,
  Banknote, Calculator, ArrowRight, BadgeCheck, Landmark, HandCoins,
  Zap, CircleDollarSign, Wrench, Droplets, Sun, HardHat
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FinancingPage = () => {
  const { getPath } = useLocalizedPath();

  const processSteps = [
    { step: 1, title: "Запитване", desc: "Свържете се с нас по телефон, имейл или онлайн формуляр. Споделете какъв ремонт планирате и ориентировъчния бюджет.", icon: FileText },
    { step: 2, title: "Безплатна консултация", desc: "Нашият финансов консултант обсъжда с вас нуждите, бюджета и предпочитанията. Обяснява всички възможности за финансиране.", icon: Users },
    { step: 3, title: "Оферти от банки", desc: "Събираме и сравняваме оферти от TBI Bank, BNP Paribas, ДСК и други финансови институции. Вие не търсите сами.", icon: Landmark },
    { step: 4, title: "Избирате най-добрата", desc: "Представяме ви всички оферти с ясни условия. Вие избирате тази, която е най-подходяща за вас — без натиск.", icon: BadgeCheck },
    { step: 5, title: "Започва ремонтът", desc: "След одобрение на финансирането стартираме работа. Вие плащате удобни месечни вноски, без голям първоначален разход.", icon: HardHat },
  ];

  const advantages = [
    { icon: Shield, title: "Без обикаляне по банки", desc: "Ние правим всичко вместо вас. Не губите време в опашки и офиси — работим директно с банките партньори." },
    { icon: FileText, title: "Няколко оферти наведнъж", desc: "Получавате оферти от различни финансови институции на едно място. Сравнявате условия, лихви и срокове лесно." },
    { icon: Zap, title: "Бързо одобрение", desc: "Процесът на одобрение е значително по-бърз, защото работим с предварително договорени партньори и познаваме изискванията им." },
    { icon: HandCoins, title: "Гъвкави вноски", desc: "Изберете срок от 12 до 60 месеца. Месечните вноски се определят според вашия бюджет и възможности." },
    { icon: CircleDollarSign, title: "Без скрити такси", desc: "Всички условия са ясни от самото начало. Няма допълнителни такси от наша страна за услугата по намиране на финансиране." },
    { icon: Users, title: "Експертна помощ", desc: "Нашият финансов консултант ви съветва на всяка стъпка — от избора на оферта до подписването на договора с банката." },
  ];

  const paymentExamples = [
    { amount: "10 000 €", monthly: "~150 €/мес", term: "36 месеца", total: "~16 200 €" },
    { amount: "15 000 €", monthly: "~220 €/мес", term: "36 месеца", total: "~17 920 €" },
    { amount: "20 000 €", monthly: "~290 €/мес", term: "36 месеца", total: "~20 440 €" },
    { amount: "30 000 €", monthly: "~430 €/мес", term: "36 месеца", total: "~25 480 €" },
    { amount: "10 000 €", monthly: "~105 €/мес", term: "60 месеца", total: "~16 300 €" },
    { amount: "20 000 €", monthly: "~205 €/мес", term: "60 месеца", total: "~22 300 €" },
  ];

  const useCases = [
    { icon: Wrench, title: "Ремонт на покрив", desc: "Подмяна на керемиди, ремонт на конструкция, отстраняване на течове — всичко може да се финансира на вноски.", link: 'roofRepair' as const },
    { icon: Droplets, title: "Хидроизолация", desc: "Битумна, PVC мембранна или течна хидроизолация за плоски и наклонени покриви — без голям еднократен разход.", link: 'waterproofing' as const },
    { icon: Sun, title: "Соларни системи", desc: "Фотоволтаични панели за дома или бизнеса. Инвестицията се връща чрез спестени сметки за ток.", link: 'solarSystems' as const },
    { icon: HardHat, title: "Цялостно строителство", desc: "Нов покрив, реконструкция или разширение — финансирайте по-мащабни проекти с удобни месечни вноски.", link: 'newRoof' as const },
  ];

  const faqs = [
    { q: "Какви са условията за кредит за ремонт на покрив?", a: "Условията зависят от финансовата институция. Обикновено се изисква лична карта, доказателство за доход и кратка кредитна история. Нашият консултант ще ви помогне да подготвите всички документи и ще ви насочи към банката с най-добрите условия за вашия случай." },
    { q: "Колко бързо се одобрява финансирането?", a: "В повечето случаи одобрението отнема между 24 и 72 часа. При предварително одобрени клиенти на банките партньори процесът може да бъде още по-бърз. Ние подготвяме документацията предварително, за да ускорим максимално процеса." },
    { q: "Трябва ли да имам поръчител или обезпечение?", a: "При суми до 15 000–20 000 € обикновено не се изисква поръчител. За по-големи суми банката може да поиска допълнително обезпечение. Нашият консултант ще ви информира предварително какви са изискванията за конкретната оферта." },
    { q: "Каква е лихвата по кредит за ремонт?", a: "Ориентировъчният годишен процент на разходите (ГПР) е около 5.9%, но точната стойност зависи от банката, сумата и срока. Някои банки предлагат промоционални лихви за определени периоди. Ние ви представяме всички варианти, за да изберете най-изгодния." },
    { q: "Мога ли да погася кредита предсрочно?", a: "Да, при повечето банки партньори е възможно предсрочно погасяване без допълнителни такси или с минимална такса (обикновено 1% от остатъка). Уточнете това с нашия консултант при избора на оферта." },
    { q: "Какви видове ремонт могат да бъдат финансирани?", a: "Всички видове покривни услуги — от малък ремонт на течове, през подмяна на керемиди и хидроизолация, до изграждане на нов покрив и монтаж на соларни системи. Можете да финансирате и комбинирани проекти." },
    { q: "Вие банка ли сте? Отпускате ли кредити?", a: "Не, ние не сме банка и не отпускаме кредити. Ние сме строителна компания, която съдейства на клиентите си да получат финансиране чрез лицензирани банкови партньори. Нашата роля е да улесним процеса и да ви предоставим избор." },
    { q: "Какво е разсрочено плащане за ремонт на покрив?", a: "Разсроченото плащане означава, че вместо да заплатите цялата сума наведнъж, разделяте я на удобни месечни вноски за период от 12 до 60 месеца. Това ви позволява да направите необходимия ремонт веднага, без да чакате да спестите цялата сума." },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Финансиране на ремонт на покрив",
    "description": "Финансиране на покривни ремонти чрез банки партньори — TBI Bank, BNP Paribas, ДСК. Месечни вноски от 105 €.",
    "provider": {
      "@type": "Organization",
      "name": "RemontNaPokriviVarna",
      "telephone": "+359884997659",
      "email": "remontnapokrivivarna@abv.bg",
    },
    "areaServed": { "@type": "City", "name": "Варна" },
    "annualPercentageRate": 5.9,
    "currency": "EUR",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.remontnapokrivivarna.bg/bg/services" },
      { "@type": "ListItem", "position": 3, "name": "Финансиране на ремонт на покрив", "item": "https://www.remontnapokrivivarna.bg/bg/finansirane-remont-na-pokriv" },
    ]
  };

  return (
    <>
      <Helmet>
        <title>Финансиране на Ремонт на Покрив | Кредит за Покрив на Вноски | Варна 2026</title>
        <meta name="description" content="Ремонт на покрив на вноски от 105 €/месец. Съдействаме за кредит от TBI Bank, BNP Paribas, ДСК. Безплатна консултация и сравнение на оферти. ☎ 088 499 7659" />
        <meta property="og:title" content="Финансиране на Ремонт на Покрив – Вноски от 105 €/мес | Варна" />
        <meta property="og:description" content="Ремонт на покрив на изплащане. Сравняваме оферти от банки партньори и ви предлагаме най-доброто финансиране." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/finansirane-remont-na-pokriv" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="keywords" content="кредит за ремонт на покрив, финансиране на ремонт, ремонт на покрив на изплащане, строителен кредит, разсрочено плащане ремонт, вноски за покрив, TBI Bank ремонт, BNP Paribas строителство" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* 1. HERO */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15)_0%,_transparent_60%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-white/70">
              <Link to={getPath('home')} className="hover:text-white">Начало</Link>
              <span className="mx-2">/</span>
              <Link to={getPath('services')} className="hover:text-white">Услуги</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Финансиране</span>
            </nav>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-1.5 text-sm text-green-300 mb-6">
                <Banknote className="w-4 h-4" />
                Без голям първоначален разход
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 [text-shadow:_0_3px_16px_rgba(0,0,0,0.5)]">
                Ремонт на покрив на вноски – без голям първоначален разход
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-4 [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]">
                Намираме най-доброто финансиране за вас от различни банки и финансови институции. Вие избирате — ние съдействаме.
              </p>
              <p className="text-lg text-white/70 max-w-3xl mb-8">
                Кредит за ремонт на покрив с месечни вноски от 105 €. Работим с TBI Bank, BNP Paribas, ДСК и други лицензирани партньори.
              </p>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 shadow-lg">
                    <Link to={getPath('contact')}>
                      <Eye className="w-5 h-5 mr-2" />
                      Провери финансиране
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="bg-primary/40 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white/20">
                    <a href="tel:0884997659">
                      <Phone className="w-5 h-5 mr-2" />
                      Вземи оферта
                    </a>
                  </Button>
                </div>
                <div className="lg:self-end">
                  <CalculatorDialog type="roof" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Trust Indicators */}
        <TrustIndicators />

        {/* 3. КАК РАБОТИ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Как Работи Финансирането?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Финансирането на ремонт на покрив чрез нас е лесен и прозрачен процес. Ние свършваме цялата работа с банките — вие само избирате най-добрата оферта.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-0">
              {processSteps.map((step, i) => (
                <div key={step.step} className="relative flex gap-6 pb-12 last:pb-0">
                  {i < processSteps.length - 1 && (
                    <div className="absolute left-7 top-16 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent" />
                  )}
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
                    {step.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                      <step.icon className="w-5 h-5 text-primary" />
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Важно: Вие не търсите сами банка</h3>
                  <p className="text-green-700 leading-relaxed">
                    Нашият финансов консултант събира оферти от всички партньорски банки, сравнява условията (лихви, срокове, такси) и ви представя най-добрите варианти. 
                    Вие избирате спокойно — без натиск, без бързане, с пълна информация.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ПРЕДИМСТВА */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Защо Да Финансирате Чрез Нас?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Разсрочено плащане за ремонт на покрив с реални предимства — без скрити условия и излишна бюрокрация.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {advantages.map((adv, i) => (
                <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-card">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <adv.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{adv.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ПРИМЕРИ ЗА ВНОСКИ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Примери за Месечни Вноски</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ориентировъчни стойности при ГПР ~5.9%. Крайните условия зависят от одобрението на банката.
              </p>
            </div>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-6 py-4 text-left font-semibold rounded-tl-xl">Стойност</th>
                    <th className="px-6 py-4 text-center font-semibold">Срок</th>
                    <th className="px-6 py-4 text-center font-semibold">Месечна вноска</th>
                    <th className="px-6 py-4 text-right font-semibold rounded-tr-xl">Обща сума</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentExamples.map((ex, i) => (
                    <tr key={i} className={`border-b border-border ${i % 2 === 0 ? 'bg-green-50/50' : 'bg-background'}`}>
                      <td className="px-6 py-4 font-semibold text-foreground">{ex.amount}</td>
                      <td className="px-6 py-4 text-center text-muted-foreground">{ex.term}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xl font-bold text-green-600">{ex.monthly}</span>
                      </td>
                      <td className="px-6 py-4 text-right text-muted-foreground">{ex.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              * Стойностите са ориентировъчни и служат за информация. Крайната оферта се определя от финансовата институция.
            </p>
          </div>
        </section>

        {/* 6. КАЛКУЛАТОР */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Изчислете Вашата Месечна Вноска</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Използвайте нашия калкулатор, за да видите ориентировъчна месечна вноска за вашия ремонт.
              </p>
            </div>
            <div className="max-w-xl mx-auto">
              <FinancingCalculator />
            </div>
          </div>
        </section>

        {/* 7. ЗА КАКВО МОЖЕ ДА СЕ ПОЛЗВА */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">За Какво Може Да Се Ползва Финансирането?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Кредит за ремонт на покрив може да покрие широк спектър от строителни дейности — от малък ремонт до цялостна реконструкция.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {useCases.map((uc, i) => (
                <Link key={i} to={getPath(uc.link)} className="group">
                  <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all group-hover:border-primary/30 group-hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <uc.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{uc.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{uc.desc}</p>
                      <span className="text-sm font-semibold text-primary flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                        Научете повече <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 8. БАНКИ ПАРТНЬОРИ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Нашите Банки Партньори</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Работим с водещи финансови институции в България, за да ви осигурим най-добрите условия за строителен кредит.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { name: "TBI Bank", desc: "Бързо онлайн одобрение. Специализирани в потребителски кредити за строителство и ремонт. Гъвкави срокове до 60 месеца." },
                { name: "BNP Paribas", desc: "Международна банкова група с конкурентни лихви. Предлага индивидуални условия за по-големи проекти." },
                { name: "Банка ДСК", desc: "Една от най-големите банки в България. Сигурност и стабилност с дълга история на кредитиране." },
              ].map((bank, i) => (
                <Card key={i} className="text-center border shadow-sm">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-8 h-8 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{bank.name}</h3>
                    <p className="text-sm text-muted-foreground">{bank.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8 text-sm">
              + други лицензирани финансови институции. Списъкът на партньорите се обновява регулярно.
            </p>
          </div>
        </section>

        {/* 9. ВАЖНО ОБЯСНЕНИЕ */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4">
                <Shield className="w-10 h-10 text-amber-600 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-amber-900 mb-4">Важно: Ние Не Сме Банка</h2>
                  <div className="space-y-3 text-amber-800 leading-relaxed">
                    <p>
                      <strong>RemontNaPokriviVarna</strong> (подразделение на Булгар Билд ЕООД) е строителна компания, специализирана в покривни услуги. 
                      Ние <strong>не сме финансова институция</strong> и <strong>не отпускаме кредити</strong>.
                    </p>
                    <p>
                      Нашата роля е да <strong>съдействаме</strong> на клиентите си, като работим с лицензирани банки и финансови институции партньори. 
                      Намираме, сравняваме и представяме оферти за финансиране — <strong>вие избирате</strong> най-подходящата.
                    </p>
                    <p>
                      Всички кредитни договори се сключват директно между вас и съответната финансова институция. 
                      Ние не носим отговорност за решенията на банките по одобрение или отказ на финансиране.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Често Задавани Въпроси за Финансиране</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Отговори на най-честите въпроси за кредит за ремонт на покрив и разсрочено плащане.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 shadow-sm">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* 11. CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Готови ли сте да Финансирате Ремонта?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Заявете безплатна консултация. Нашият финансов специалист ще ви помогне да намерите най-добрата оферта за вашия бюджет.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 shadow-lg">
                <Link to={getPath('contact')}>
                  <FileText className="w-5 h-5 mr-2" />
                  Заяви безплатна консултация
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white/20 text-lg px-8">
                <a href="tel:0884997659">
                  <Phone className="w-5 h-5 mr-2" />
                  088 499 7659
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 12. Testimonials */}
        <Testimonials />

        {/* SEO Content Block */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
              <h2>Кредит за Ремонт на Покрив: Пълно Ръководство за 2026</h2>
              
              <p>
                Финансирането на ремонт на покрив е модерно и практично решение за домовладелци и бизнеси, които не искат да отлагат необходимия ремонт заради липса на средства. 
                Вместо да чакате месеци или години, докато спестите нужната сума, можете да започнете ремонта веднага и да плащате удобни месечни вноски.
              </p>

              <h3>Защо е Важно Да Не Отлагате Ремонта на Покрива?</h3>
              <p>
                Покривът е най-важният елемент от конструкцията на всяка сграда. Когато има повреди — дори малки — те бързо се влошават. 
                Малък теч днес може да означава гниене на дървената конструкция, мокра изолация и плесен утре. 
                Разходите за отложен ремонт нарастват експоненциално. Проучване на Българската строителна камара показва, че отлагането на покривен ремонт с 2 години увеличава крайната цена средно с 40-60%.
              </p>

              <h3>Какви Видове Финансиране Съществуват?</h3>
              <p>
                В България има няколко основни начина за финансиране на строителни дейности:
              </p>
              <ul>
                <li><strong>Потребителски кредит</strong> — най-често използваният вариант за ремонти до 30 000 €. Бързо одобрение, без обезпечение при по-малки суми.</li>
                <li><strong>Целеви строителен кредит</strong> — специализиран продукт за строителство и ремонт. Може да предлага по-ниски лихви, но изисква повече документация.</li>
                <li><strong>Ипотечен кредит</strong> — подходящ за по-мащабни проекти (нов покрив + реконструкция). По-ниска лихва, но по-дълъг процес на одобрение.</li>
                <li><strong>Разсрочено плащане към строителя</strong> — някои компании предлагат директно разсрочване. Ние работим с банки партньори, за да осигурим по-гъвкави условия.</li>
              </ul>

              <h3>Колко Струва Ремонтът на Покрив във Варна?</h3>
              <p>
                Цената на покривен ремонт варира значително в зависимост от вида работа, материалите и площта:
              </p>
              <ul>
                <li><strong>Частичен ремонт</strong> (течове, единични керемиди): 2 000 – 5 000 €</li>
                <li><strong>Пълна подмяна на покривно покритие</strong> (100 м²): 8 000 – 15 000 €</li>
                <li><strong>Нов покрив с конструкция</strong> (100 м²): 15 000 – 30 000 €</li>
                <li><strong>Хидроизолация на плосък покрив</strong> (100 м²): 3 000 – 7 000 €</li>
                <li><strong>Соларна система</strong> (5-10 kWp): 5 000 – 15 000 €</li>
              </ul>
              <p>
                С месечни вноски от 105 € до 430 € (в зависимост от сумата и срока), ремонтът става достъпен за повечето домакинства. 
                Важно е да се отбележи, че <Link to={getPath('calculator')} className="text-primary hover:underline">нашият калкулатор за покривен ремонт</Link> може да ви даде по-точна ориентировъчна цена.
              </p>

              <h3>Процесът на Кандидатстване Стъпка по Стъпка</h3>
              <p>
                Кандидатстването за кредит за ремонт на покрив чрез нас е значително по-лесно от самостоятелното търсене на банка:
              </p>
              <ol>
                <li><strong>Свържете се с нас</strong> — по телефон (088 499 7659), имейл или онлайн формуляр</li>
                <li><strong>Безплатна консултация</strong> — обсъждаме вашите нужди и бюджет</li>
                <li><strong>Подготовка на документи</strong> — помагаме ви да подготвите необходимите документи</li>
                <li><strong>Подаване на заявки</strong> — изпращаме заявки до няколко банки едновременно</li>
                <li><strong>Получаване на оферти</strong> — обикновено в рамките на 24-72 часа</li>
                <li><strong>Сравнение и избор</strong> — представяме всички оферти с ясно обяснение на условията</li>
                <li><strong>Подписване на договор</strong> — директно с избраната финансова институция</li>
                <li><strong>Старт на ремонта</strong> — започваме работа веднага след одобрението</li>
              </ol>

              <h3>Съвети при Избор на Финансиране за Покривен Ремонт</h3>
              <ul>
                <li><strong>Сравнявайте ГПР, не само лихвата</strong> — годишният процент на разходите включва всички такси и дава реална картина на цената на кредита</li>
                <li><strong>Обърнете внимание на таксите</strong> — такса за одобрение, месечна такса, такса за предсрочно погасяване</li>
                <li><strong>Изберете удобен срок</strong> — по-дълъг срок означава по-ниска вноска, но по-висока обща цена</li>
                <li><strong>Планирайте буфер</strong> — при ремонт на покрив може да се открият допълнителни проблеми, затова е добре да имате резерв от 10-15%</li>
                <li><strong>Не отлагайте заради цената</strong> — всеки месец забавяне увеличава риска от по-сериозни (и по-скъпи) повреди</li>
              </ul>

              <h3>Варна и Региони: Специфики на Покривния Ремонт</h3>
              <p>
                Варна и Черноморието имат специфичен климат — висока влажност, солен морски въздух и силни ветрове. Тези фактори ускоряват износването на покривните материали и правят 
                навременния ремонт още по-важен. Покривите в крайморските райони (Аспарухово, Златни Пясъци, Свети Константин) изискват специализирани материали с повишена устойчивост 
                на корозия и UV лъчение.
              </p>
              <p>
                Нашият екип обслужва Варна и околностите — Аксаково, Белослав, Девня, Провадия. Независимо от локацията, процесът на финансиране е еднакъв и достъпен за всички.
              </p>

              <h3>Ремонт на Покрив на Изплащане: За Кого е Подходящо?</h3>
              <p>
                Разсроченото плащане за ремонт на покрив е подходящо за:
              </p>
              <ul>
                <li><strong>Домовладелци с ограничен бюджет</strong> — не е нужно да чакате, за да спестите цялата сума</li>
                <li><strong>Собственици на етажна собственост</strong> — разпределяне на разходите между съседите става по-лесно</li>
                <li><strong>Бизнес клиенти</strong> — запазвате оборотния си капитал и оптимизирате данъчното облагане</li>
                <li><strong>Инвеститори в имоти</strong> — финансирайте ремонта и го включете в цената на имота</li>
                <li><strong>Клиенти с аварийни нужди</strong> — когато ремонтът не може да чака, финансирането е решение</li>
              </ul>

              <p>
                За повече информация за нашите услуги, посетете страниците ни за <Link to={getPath('roofRepair')} className="text-primary hover:underline">ремонт на покриви</Link>, 
                {' '}<Link to={getPath('waterproofing')} className="text-primary hover:underline">хидроизолация</Link> и <Link to={getPath('solarSystems')} className="text-primary hover:underline">соларни системи</Link>. 
                Или използвайте нашия <Link to={getPath('calculator')} className="text-primary hover:underline">калкулатор за покривен ремонт</Link>, за да получите ориентировъчна цена.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FinancingPage;
