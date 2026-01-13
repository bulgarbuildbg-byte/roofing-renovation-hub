import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, Layers, Shield, Droplets, Sun, MapPin, Clock, Wrench, AlertTriangle, ThermometerSun, Wind, Home } from "lucide-react";
import { Link } from "react-router-dom";

const FlatRoofPage = () => {
  const services = [
    "Хидроизолация на плосък покрив",
    "Ремонт на течове и пукнатини",
    "Полагане на битумни мембрани",
    "PVC и TPO мембрани",
    "Течна хидроизолация",
    "Ремонт на тераси и балкони",
    "Топлоизолация на плосък покрив",
    "Отводняване и дренаж",
    "Ремонт на воронки и сифони",
    "Монтаж на парапети и ръбове"
  ];

  const materials = [
    {
      name: "Битумни мембрани",
      description: "Най-разпространеното решение за плоски покриви в България. Изработват се от модифициран битум (APP или SBS), армиран с полиестерна или стъклотъканна основа. Полагат се чрез нагряване с газова горелка.",
      icon: Layers,
      advantages: ["Доказана надеждност", "Икономично решение", "Лесен за ремонт", "Дълготрайност 15-25 години"],
      brands: ["IKO", "Icopal", "Siplast", "Katepal", "Tegola"],
      price: "от 14 €/кв.м"
    },
    {
      name: "PVC мембрани",
      description: "Модерно и високотехнологично решение с изключителна еластичност и дълготрайност. PVC мембраните се заваряват с горещ въздух, създавайки напълно водонепропускливи шевове. Идеални за търговски и индустриални сгради.",
      icon: Shield,
      advantages: ["Дълъг живот 25-30+ години", "Устойчивост на химикали", "Еластичност", "Светла повърхност охлажда сградата"],
      brands: ["Sika Sarnafil", "Firestone", "Protan", "Renolit Alkorplan"],
      price: "от 23 €/кв.м"
    },
    {
      name: "Течна хидроизолация",
      description: "Иновативно безшевно решение, идеално за сложни форми и труднодостъпни места. Полиуретановата течна мембрана се нанася с четка или валяк и създава еластичен, монолитен защитен слой.",
      icon: Droplets,
      advantages: ["Безшевно покритие", "Перфектно за детайли", "Бързо нанасяне", "Висока еластичност"],
      brands: ["Sika", "Mapei", "Hyperdesmo", "Alchimica"],
      price: "от 18 €/кв.м"
    },
    {
      name: "EPDM каучукови мембрани",
      description: "Синтетични каучукови мембрани с изключителна издръжливост и устойчивост на екстремни температури. EPDM е предпочитан за покриви с голяма площ и минимални изисквания за поддръжка.",
      icon: Sun,
      advantages: ["Живот 40+ години", "Издържа от -40°C до +120°C", "Минимална поддръжка", "Екологично чист"],
      brands: ["Firestone", "Carlisle", "GACO"],
      price: "от 26 €/кв.м"
    }
  ];

  const problems = [
    {
      title: "Течове и проникване на вода",
      description: "Плоските покриви са особено уязвими към течове поради минималния наклон. Водата се задържа по-дълго и може да проникне през всяка слабост в хидроизолацията - пукнатини, надигнати шевове или повредени детайли.",
      solution: "Локализираме източника на течa с помощта на визуална инспекция или термокамера. Възстановяваме хидроизолацията чрез кръпки или пълна подмяна при сериозни повреди.",
      signs: ["Мокри петна на тавана", "Локви на покрива след дъжд", "Видими пукнатини в хидроизолацията"]
    },
    {
      title: "Надута и отлепена хидроизолация",
      description: "Балончета и подутини в хидроизолацията показват проникване на влага между слоевете. Това се случва при некачествен монтаж, недостатъчна адхезия към основата или капилярна влага отдолу.",
      solution: "Разрязваме надутите участъци, изсушаваме подложката и полагаме нов хидроизолационен слой с правилна подготовка на основата.",
      signs: ["Видими балончета на повърхността", "Меки участъци при ходене", "Звук на въздух при натиск"]
    },
    {
      title: "Запушени водоотводи и сифони",
      description: "Листа, отломки и мъх запушват водосточните воронки и сифони, причинявайки застояване на вода. Тежестта на застоялата вода натоварва конструкцията и увеличава риска от течове.",
      solution: "Почистваме и профилактираме всички водоотводни елементи. При необходимост монтираме предпазни мрежи и подобряваме наклона за по-добро оттичане.",
      signs: ["Локви след дъжд", "Видимо запушени воронки", "Бавно оттичане на водата"]
    },
    {
      title: "Термични повреди от слънце",
      description: "Плоските покриви са изложени на интензивно слънчево греене, което причинява прегряване и ускорено стареене на хидроизолацията. UV лъчите разрушават битума, правейки го крехък и напукан.",
      solution: "Нанасяме UV защитни покрития или рефлектиращи бои. При сериозно износване препоръчваме подмяна с материали с вградена UV защита.",
      signs: ["Напукана повърхност", "Загуба на еластичност", "Промяна в цвета на хидроизолацията"]
    }
  ];

  const process = [
    {
      step: 1,
      title: "Инспекция и оценка на състоянието",
      description: "Извършваме цялостен преглед на плоския покрив - проверяваме хидроизолацията за пукнатини, надутини и износване, инспектираме водоотводните елементи, оценяваме състоянието на парапетите и примикванията. Документираме всички проблеми с фотоснимки.",
      image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&q=80",
      imageAlt: "Инспекция на плосък покрив - професионална оценка на хидроизолацията Варна"
    },
    {
      step: 2,
      title: "Почистване и подготовка",
      description: "Почистваме покрива от натрупани отломки, мъх и стара хидроизолация при необходимост. Ремонтираме пукнатини в бетоновата основа с подходящи ремонтни смеси. Проверяваме и подобряваме наклона за оттичане. Нанасяме грунд за по-добра адхезия.",
      image: "https://images.unsplash.com/photo-504307651254-35680f356dfd?w=800&q=80",
      imageAlt: "Подготовка на плосък покрив за хидроизолация - почистване и грундиране"
    },
    {
      step: 3,
      title: "Обработка на детайли и примиквания",
      description: "Детайлите са критичните точки при плоските покриви. Полагаме усилващи ленти около всички вертикални стени, комини, вентилационни елементи и водоотводни воронки. Използваме течна хидроизолация за сложните форми и ъгли.",
      image: "https://images.unsplash.com/photo-558618666-fcd25c85cd64?w=800&q=80",
      imageAlt: "Обработка на детайли при хидроизолация на плосък покрив - примиквания към стени"
    },
    {
      step: 4,
      title: "Полагане на хидроизолация",
      description: "В зависимост от избрания материал - полагаме битумна мембрана с газова горелка, заваряваме PVC мембрана с горещ въздух или нанасяме течна хидроизолация с валяк. Осигуряваме правилно застъпване на платната и херметичност на всички шевове.",
      image: "https://images.unsplash.com/photo-635424710928-0544e8512eae?w=800&q=80",
      imageAlt: "Полагане на хидроизолация на плосък покрив - битумна мембрана с горелка"
    },
    {
      step: 5,
      title: "Втори слой (при двуслойна система)",
      description: "За максимална защита препоръчваме двуслойна хидроизолация. Вторият слой се полага перпендикулярно на първия, осигурявайки допълнителна сигурност. Шевовете на двата слоя не се застъпват, елиминирайки слабите точки.",
      image: "https://images.unsplash.com/photo-621905252507-b35492cc74b4?w=800&q=80",
      imageAlt: "Полагане на втори слой хидроизолация - двуслойна система за плосък покрив"
    },
    {
      step: 6,
      title: "Финализиране и защита",
      description: "Нанасяме защитен слой - UV защита за битумна изолация, рефлектиращо покритие за охлаждане или баластен слой от чакъл. Почистваме работната зона и извършваме финална проверка. Предоставяме гаранционна документация.",
      image: "https://images.unsplash.com/photo-600585154340-be6161a56a0c?w=800&q=80",
      imageAlt: "Завършена хидроизолация на плосък покрив - защитно покритие и финална проверка"
    }
  ];

  const benefits = [
    { icon: Shield, title: "До 10 години гаранция", description: "Предоставяме дълготрайна гаранция за материали и труд. Производителите дават допълнителна гаранция за материалите." },
    { icon: Wrench, title: "Опитни специалисти", description: "Нашият екип има богат опит с плоски покриви на жилищни сгради, търговски обекти и индустриални халета." },
    { icon: Layers, title: "Качествени материали", description: "Работим само с доказани марки - Sika, IKO, Icopal, Firestone. Без компромиси с качеството." },
    { icon: Clock, title: "Бързо изпълнение", description: "Благодарение на опита и организацията, изпълняваме проектите в кратки срокове без забавяния." }
  ];

  const roofTypes = [
    {
      title: "Жилищни сгради и блокове",
      description: "Плоските покриви на панелни блокове и жилищни сгради са изложени на специфични предизвикателства - големи площи, множество проходки за вентилация и антени, достъп за обитатели. Препоръчваме двуслойна битумна хидроизолация или еднослойна PVC мембрана с минимум 1.5 мм дебелина. Важно е да се осигури правилно отводняване с минимум 1.5% наклон.",
      price: "от 14 €/кв.м"
    },
    {
      title: "Търговски и офис сгради",
      description: "За търговски обекти препоръчваме PVC или TPO мембрани заради дълготрайността и минималната поддръжка. При наличие на отоплително/охладително оборудване на покрива, мембраните осигуряват по-добра устойчивост на механични натоварвания. Рефлектиращите покрития намаляват разходите за климатизация.",
      price: "от 23 €/кв.м"
    },
    {
      title: "Тераси и балкони",
      description: "Терасите и балконите изискват хидроизолация, която да издържа на пешеходен трафик. Използваме течна полиуретанова хидроизолация или специализирани системи, върху които може да се положи финишно покритие - плочки, декинг или камък. Осигуряваме правилни наклони за оттичане и качествени сифони.",
      price: "от 18 €/кв.м"
    },
    {
      title: "Индустриални халета",
      description: "Големите площи на индустриалните халета изискват бързо и икономично решение. Препоръчваме EPDM мембрани или TPO за минимална поддръжка и дълъг живот. При съществуващи метални покриви е възможно полагане на хидроизолация върху тях.",
      price: "от 13 €/кв.м"
    }
  ];

  const priceRanges = [
    { service: "Ремонт на локален теч", price: "от 40 €", note: "Диагностика и кръпка" },
    { service: "Битумна хидроизолация (еднослойна)", price: "от 11 €/кв.м", note: "Материал и труд" },
    { service: "Битумна хидроизолация (двуслойна)", price: "от 14 €/кв.м", note: "Препоръчително" },
    { service: "PVC/TPO мембрана", price: "от 23 €/кв.м", note: "С топлоизолация" },
    { service: "Течна хидроизолация", price: "от 18 €/кв.м", note: "Идеална за детайли" },
    { service: "Топлоизолация на покрив", price: "от 9 €/кв.м", note: "XPS или минерална вата" }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина", "Гръцка махала", "Чаталджа"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост", "кв. Възраждане", "кв. Трошево"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Суворово", "Златни пясъци", "Св. Константин", "Каменар"] }
  ];

  const faqs = [
    {
      question: "Какъв е животът на хидроизолацията на плосък покрив?",
      answer: "Зависи от типа материал и условията. Битумната хидроизолация издържа 15-25 години, PVC мембраните 25-30 години, а EPDM може да достигне 40+ години. Качеството на монтажа и редовната поддръжка удължават живота значително."
    },
    {
      question: "Може ли да се полага хидроизолация върху старата?",
      answer: "Да, ако старата хидроизолация е здрава и добре залепена към основата. Ако е надута, напукана или отлепена, трябва да се премахне. Полагането върху стара изолация спестява време и разходи, но не винаги е възможно."
    },
    {
      question: "Каква е разликата между битумна и PVC хидроизолация?",
      answer: "Битумната е по-икономична и традиционна, полага се с горелка, издържа 15-25 години. PVC е по-модерна, заварява се с горещ въздух, по-еластична е и издържа 25-30+ години. За търговски сгради препоръчваме PVC, за жилищни - битумна е често достатъчна."
    },
    {
      question: "Колко време отнема хидроизолацията на 100 кв.м покрив?",
      answer: "При добро време и подготвена основа, екипът може да изпълни 100 кв.м за 1-2 работни дни. Ако е необходимо премахване на стара изолация или ремонт на основата, времето се удължава до 3-4 дни."
    },
    {
      question: "Може ли да се работи през зимата?",
      answer: "Битумната хидроизолация изисква температури над 5°C. PVC мембраните могат да се заваряват до -5°C. През зимата можем да извършваме аварийни ремонти и подготвителни работи, но пълна хидроизолация препоръчваме при по-топло време."
    },
    {
      question: "Имам течове само при силен дъжд. Какъв е проблемът?",
      answer: "Това обикновено показва проблем с детайлите - примиквания към стени, около воронки или вентилации. При слаб дъжд водата се оттича достатъчно бързо, но при силен се натрупва и намира слабите точки. Препоръчваме инспекция на всички детайли."
    },
    {
      question: "Колко струва хидроизолацията на покрив на блок 500 кв.м?",
      answer: "При двуслойна битумна хидроизолация бюджетът е приблизително 14 000-18 000 лв. При PVC мембрана е 22 000-28 000 лв. Цената зависи от състоянието на основата, сложността на детайлите и достъпността."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ремонт на плоски покриви Варна",
    "provider": {
      "@type": "RoofingContractor",
      "name": "RemontNaPokriviVarna",
      "telephone": "+359892701176",
      "email": "remontnapokrivivarna@abv.bg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Уста Колю Фичето 25 А",
        "addressLocality": "Варна",
        "addressCountry": "BG"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Варна" },
      { "@type": "Place", "name": "Аксаково" },
      { "@type": "Place", "name": "Златни пясъци" },
      { "@type": "Place", "name": "Белослав" }
    ],
    "description": "Професионален ремонт и хидроизолация на плоски покриви във Варна. Битумни и PVC мембрани, течна хидроизолация. До 10 години гаранция.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "22",
      "highPrice": "50",
      "priceCurrency": "EUR",
      "offerCount": "6"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://remontnapokrivivarna.com" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://remontnapokrivivarna.com/услуги" },
      { "@type": "ListItem", "position": 3, "name": "Плоски покриви", "item": "https://remontnapokrivivarna.com/плоски-покриви" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Плоски Покриви Варна - от 11 €/кв.м | 10г</title>
        <meta name="description" content="Хидроизолация на плоски покриви и тераси. Битумни и PVC мембрани. До 10 години гаранция. ☎ 089 270 1176" />
        <meta name="keywords" content="плосък покрив варна, хидроизолация плосък покрив, ремонт плосък покрив, битумна хидроизолация варна, PVC мембрана варна" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/плоски-покриви" />
        <meta property="og:title" content="Плоски Покриви Варна - от 11 €/кв.м" />
        <meta property="og:description" content="Битумни и PVC мембрани. До 10г гаранция." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="bg_BG" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-primary-foreground/70">
              <Link to="/" className="hover:text-primary-foreground">Начало</Link>
              <span className="mx-2">/</span>
              <Link to="/услуги" className="hover:text-primary-foreground">Услуги</Link>
              <span className="mx-2">/</span>
              <span>Плоски покриви</span>
            </nav>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Плоски Покриви и Тераси във Варна
              </h1>
              
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                Специализирани решения за хидроизолация и ремонт на плоски покриви, 
                тераси и балкони. Работим с битумни и PVC мембрани, течна хидроизолация. 
                Гарантираме сухо и защитено пространство с до 10 години гаранция.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <a href="tel:+359892701176">
                    <Phone className="w-5 h-5 mr-2" />
                    Обадете се
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                  <Link to="/контакти">Безплатен Оглед</Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Безплатен оглед</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span>До 10г гаранция</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent" />
                  <span>Всички видове материали</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Специалисти по Плоски Покриви във Варна и Региона
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Плоските покриви са разпространено решение за жилищни блокове, търговски сгради и индустриални обекти 
                  във Варна и региона. Въпреки името си, те имат минимален наклон от 1-3% за оттичане на водата, което 
                  прави правилната хидроизолация критично важна за предпазване от течове.
                </p>
                <p>
                  Морският климат на Варна създава специфични предизвикателства за плоските покриви - високата влажност, 
                  солените аерозоли, интензивното слънце и честите дъждове ускоряват износването на хидроизолацията. 
                  Затова е изключително важно да се използват качествени материали и да се спазват правилните технологии 
                  при полагане.
                </p>
                <p>
                  Нашият екип има богат опит с плоски покриви на всякакви сгради - от малки тераси до покриви на големи 
                  жилищни блокове и индустриални халета. Работим с всички съвременни хидроизолационни материали - битумни 
                  мембрани, PVC и TPO мембрани, течна хидроизолация. Гарантираме качествено изпълнение с писмена гаранция 
                  до 10 години.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Материали и Технологии
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Работим с всички съвременни хидроизолационни материали от водещи производители
              </p>
            </div>
            
            <div className="space-y-6">
              {materials.map((material, index) => (
                <Card key={index} className="bg-background overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-3">
                        <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                          <material.icon className="w-8 h-8 text-primary" />
                          {material.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">{material.description}</p>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Предимства:</h4>
                            <ul className="space-y-1">
                              {material.advantages.map((adv, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                  {adv}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Марки:</h4>
                            <p className="text-sm text-muted-foreground">{material.brands.join(", ")}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center lg:border-l lg:border-border lg:pl-6">
                        <div className="text-center">
                          <span className="text-2xl font-bold text-primary">{material.price}</span>
                          <p className="text-muted-foreground text-sm mt-1">с материал и труд</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Common Problems */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Проблеми, Които Решаваме
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Най-честите проблеми с плоските покриви и как ги отстраняваме
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {problems.map((problem, index) => (
                <Card key={index} className="bg-secondary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-accent" />
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{problem.description}</p>
                    
                    <div className="bg-background rounded-lg p-4 mb-4">
                      <p className="text-foreground">
                        <span className="font-semibold text-primary">Решение: </span>
                        {problem.solution}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Признаци:</h4>
                      <ul className="space-y-1">
                        {problem.signs.map((sign, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-accent" />
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Процес на Работа
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Професионален подход стъпка по стъпка за качествен и дълготраен резултат
              </p>
            </div>
            
            <div className="space-y-12">
              {process.map((item, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  <div className="lg:w-1/2">
                    <img 
                      src={item.image} 
                      alt={item.imageAlt}
                      className="rounded-lg shadow-lg w-full h-64 object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roof Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Типове Плоски Покриви
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Специализирани решения за различни типове сгради
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {roofTypes.map((type, index) => (
                <Card key={index} className="bg-secondary">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-3">
                        <Home className="w-6 h-6 text-primary" />
                        {type.title}
                      </h3>
                      <span className="text-primary font-bold">{type.price}</span>
                    </div>
                    <p className="text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Нашите Услуги за Плоски Покриви
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Защо Да Изберете Нас
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-secondary">
                  <CardContent className="p-6 text-center">
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Цени за Плоски Покриви
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Прозрачно ценообразуване. Точната цена се определя след безплатен оглед.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-background rounded-lg overflow-hidden">
                {priceRanges.map((item, index) => (
                  <div key={index} className={`flex flex-col md:flex-row md:items-center justify-between p-4 ${index !== priceRanges.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="mb-2 md:mb-0">
                      <span className="font-semibold text-foreground">{item.service}</span>
                      <span className="text-muted-foreground text-sm block md:inline md:ml-2">({item.note})</span>
                    </div>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                * Цените са ориентировъчни и могат да варират в зависимост от състоянието на покрива и сложността
              </p>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Райони, Които Обслужваме
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Извършваме хидроизолация на плоски покриви в цяла Варна и околните населени места
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              {serviceAreas.map((area, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {area.area}
                  </h3>
                  <ul className="space-y-2">
                    {area.neighborhoods.map((neighborhood, idx) => (
                      <li key={idx} className="text-muted-foreground text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {neighborhood}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93422.83869498367!2d27.8261!3d43.2141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4538baaf3f891%3A0x5765ae67f35e9f47!2z0JLQsNGA0L3QsA!5e0!3m2!1sbg!2sbg!4v1699524000000!5m2!1sbg!2sbg"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Карта на Варна - райони за хидроизолация на плоски покриви"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Често Задавани Въпроси за Плоски Покриви
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Отговори на най-честите въпроси относно хидроизолацията на плоски покриви
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-background rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection 
          title="Нуждаете се от Ремонт на Плосък Покрив?"
          subtitle="Получете безплатен оглед и честна оферта без задължение"
        />
      </main>
      
      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default FlatRoofPage;
