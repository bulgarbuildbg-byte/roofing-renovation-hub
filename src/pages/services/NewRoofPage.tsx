import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { CheckCircle, Home, Shield, Phone, MapPin, Search, Layers, Ruler, HardHat, Clock, Banknote, Hammer } from "lucide-react";

// Process images - New roof construction
import roofPlanning from "@/assets/process/new-roof-design-plan-01.jpg";
import roofingMaterials from "@/assets/process/new-roof-structure-diagram-01.jpg";
import roofFrameConstruction from "@/assets/process/new-roof-wooden-structure-02.jpg";
import woodenStructure1 from "@/assets/process/new-roof-wooden-structure-01.jpg";
import woodenStructure2 from "@/assets/process/new-roof-wooden-structure-03.jpg";
import woodenStructure3 from "@/assets/process/new-roof-wooden-structure-04.jpg";
import woodenDecking from "@/assets/process/new-roof-wooden-decking-01.jpg";
import membraneBattens from "@/assets/process/new-roof-underlayment-battens-01.jpg";
import tilePreparation from "@/assets/process/new-roof-tile-preparation-01.jpg";
import tileInstallation from "@/assets/process/new-roof-tile-installation-01.jpg";
import tileInstallation2 from "@/assets/process/new-roof-tile-installation-02.jpg";
import roofComplete from "@/assets/process/new-roof-tile-complete-01.jpg";

const relatedServices = [
  {
    title: "Метални Покриви",
    description: "Леки и издръжливи метални покриви с дълга гаранция.",
    href: "/метални-покриви"
  },
  {
    title: "Смяна на Керемиди",
    description: "Подмяна на стари керемиди с нови качествени материали.",
    href: "/смяна-на-керемиди"
  },
  {
    title: "Хидроизолация",
    description: "Професионална хидроизолация за дълготрайна защита.",
    href: "/хидроизолация"
  }
];

const NewRoofPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Изграждане на покриви Варна",
    "provider": {
      "@type": "RoofingContractor",
      "name": "RemontNaPokriviVarna",
      "telephone": "+359884997659",
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
      { "@type": "AdministrativeArea", "name": "Област Варна" },
      { "@type": "Place", "name": "Североизточна България" }
    ],
    "description": "Професионално изграждане на нови покриви, дървени конструкции и монтаж на покривни системи във Варна и региона. Над 15 години опит и гаранция за качество.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "55",
      "highPrice": "120",
      "priceCurrency": "BGN",
      "offerCount": "5"
    }
  };

  const faqData = [
    {
      question: "Колко струва изграждането на нов покрив?",
      answer: "Цената за изграждане на нов покрив варира значително в зависимост от избраните материали, сложността на конструкцията и квадратурата. Ориентировъчните цени за труд и материали започват от 80-90 лв./кв.м за икономични варианти и могат да достигнат до 180-200 лв./кв.м за премиум решения с керамични керемиди или висококачествена ламарина. Важно е да се отбележи, че крайната оферта се изготвя след детайлен оглед на място, където нашите специалисти оценяват спецификите на обекта, достъпа и необходимите допълнителни работи като изграждане на комини, монтаж на улуци и обшивки. Ние предлагаме прозрачно ценообразуване без скрити такси."
    },
    {
      question: "Колко време отнема цялостното изграждане на покрив?",
      answer: "Времето за изграждане на нов покрив зависи от площта и сложността на проекта, както и от атмосферните условия. За стандартна еднофамилна къща с площ на покрива около 100-150 кв.м, процесът обикновено отнема между 7 и 14 работни дни. Този срок включва демонтаж на старата конструкция (ако има такава), изграждане на нова дървена конструкция, полагане на хидроизолация, летви, керемиди и завършващи елементи. При по-сложни покриви с много скатове, капандури или при лоши метеорологични условия, срокът може да се удължи. Ние винаги предоставяме реалистичен график преди започване на работата и се стремим да го спазваме стриктно."
    },
    {
      question: "Каква гаранция получавам за новия покрив?",
      answer: "Като професионална строителна фирма с дългогодишен опит, ние предоставяме писмена гаранция за всички извършени от нас дейности. Стандартната гаранция за изграждане на нов покрив е между 10 и 15 години за изпълнението. Отделно от това, влаганите материали имат собствена фабрична гаранция, която може да достигне до 30-40 години за керамични керемиди и до 50 години за определени видове метални покриви. Гаранцията покрива водонепропускливост, устойчивост на конструкцията и целостта на монтажа при нормални експлоатационни условия. Всички условия са ясно описани в договора, който подписваме преди започване на обекта."
    },
    {
      question: "Какви материали са най-подходящи за климата във Варна?",
      answer: "Климатът във Варна и региона се характеризира с висока влажност, силни ветрове и солен морски въздух. Това изисква използването на материали с висока корозионна устойчивост и ветроустойчивост. За скатни покриви препоръчваме качествени керамични или бетонни керемиди със здрави заключващи системи, които издържат на бурни ветрове. За плоски покриви е задължително използването на висококласни битумни или синтетични (PVC/TPO) мембрани с UV защита. При металните покриви е критично важно ламарината да има специално защитно покритие (пурал или PVDF) срещу корозията от морския въздух. Ние работим само с доказани производители, чиито продукти са сертифицирани за нашите климатични условия."
    },
    {
      question: "Работите ли в цяла област Варна и Североизточна България?",
      answer: "Да, нашата дейност покрива целия град Варна, както и всички населени места в областта и Североизточна България. Редовно изпълняваме обекти в Аксаково, Белослав, Девня, Провадия, Долни чифлик, Бяла, както и в курортните комплекси Златни пясъци, Св. Св. Константин и Елена и Камчия. Разполагаме със собствен транспорт и логистика, което ни позволява да бъдем мобилни и да доставяме материали и оборудване до всяка точка на региона. За обекти извън рамките на град Варна се начисляват минимални транспортни разходи, които са предварително уточнени в офертата."
    },
    {
      question: "Издавате ли договор и фактура за услугата?",
      answer: "Абсолютно. Ние сме легитимна строителна компания и работим на светло. За всеки обект, независимо от неговия обем, подписваме договор за строителство, който защитава интересите и на двете страни. В договора са описани подробно всички видове работи, срокове за изпълнение, използвани материали, цена и гаранционни условия. Издаваме данъчни фактури за всички плащания. Това е вашата сигурност, че работите с професионалисти, които носят отговорност за действията си, и ви дава възможност да ползвате гаранцията си в бъдеще."
    },
    {
      question: "Включва ли цената почистване и извозване на отпадъците?",
      answer: "Стандартната ни оферта винаги включва ежедневно почистване на работната площадка. Относно извозването на строителните отпадъци (стари керемиди, греди, изолации), това обикновено се договаря като отделна позиция или се включва в пакетна цена, в зависимост от желанието на клиента. Ние разполагаме с контакти на лицензирани фирми за контейнери и сметища и можем да организираме целия процес по изхвърляне на отпадъците, така че вие да не се занимавате с това. Всичко това се уточнява предварително и се записва в договора."
    },
    {
      question: "Можете ли да направите покрив през зимата?",
      answer: "Изграждането на покрив през зимата е възможно, но крие своите рискове и предизвикателства. Технически, монтажът на дървена конструкция и керемиди може да се извършва и при ниски температури, стига да няма валежи и силен вятър. Обаче, някои процеси като полагане на битумни лепила или мазилки изискват положителни температури. Основният риск е отварянето на къщата към атмосферните влияния. Ако се налага спешен ремонт или изграждане през зимата, ние вземаме специални мерки за защита на сградата (временни покрития, работа на етапи), но като цяло препоръчваме планиране на мащабните ремонти за пролетта, лятото или ранната есен."
    },
    {
      question: "Каква е разликата между дървена и метална конструкция?",
      answer: "Дървената конструкция е класическо, изпитано решение, което е по-леко, екологично и осигурява добра топлоизолация. Тя е по-лесна за обработка на място и обикновено е по-евтина. Изисква обаче периодична обработка срещу вредители и огън. Металната конструкция е изключително здрава, негорима и не се поддава на гниене или дървояди. Тя позволява премостване на по-големи разстояния без междинни подпори. Металът обаче е по-тежък и по-скъп, и изисква по-прецизно проектиране. За жилищни сгради най-често препоръчваме дървена конструкция, докато за индустриални халета металната е предпочитан избор."
    },
    {
      question: "Какво включва безплатният оглед?",
      answer: "Нашият безплатен оглед е изчерпателна техническа консултация на място. Екипът ни посещава вашия обект, за да направи точни замервания на покривната площ, да оцени състоянието на съществуващата конструкция (при ремонт) или да се запознае с архитектурните планове (при ново строителство). Обсъждаме вашите изисквания, предпочитания за материали и бюджет. Консултираме ви за най-подходящите технически решения за вашия конкретен случай. На база на този оглед изготвяме подробна, индивидуална оферта, която е напълно необвързваща за вас."
    },
    {
      question: "Как се плаща - аванс или след завършване?",
      answer: "Стандартната ни схема на плащане е разделена на етапи, за да гарантира сигурност и за двете страни. Обикновено изискваме авансово плащане при подписване на договора (около 30-40%), което покрива закупуването и доставката на основните материали. Следва междинно плащане при завършване на конструкцията (около 30-40%) и финално плащане (остатъкът) след приемане на обекта без забележки. Тази схема може да бъде гъвкаво договорена в зависимост от размера на проекта и специфичните условия."
    },
    {
      question: "Предлагате ли и топлоизолация на покрива?",
      answer: "Да, цялостното изграждане на покрив включва не само хидроизолация, но и ефективна топлоизолация. Това е ключов елемент за енергийната ефективност на сградата. Предлагаме различни решения: минерална вата (каменна или стъклена) между ребрата, надребрена изолация с PIR/PUR плочи или екструдиран пенополистирол (XPS) за плоски покриви. Правилното изпълнение на топлоизолацията, заедно с подходящите паропропускливи и пароизолационни мембрани, гарантира комфорт в подпокривното пространство през всички сезони и драстично намалява сметките за отопление и охлаждане."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
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
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.remontnapokrivivarna.bg/услуги" },
      { "@type": "ListItem", "position": 3, "name": "Изграждане на покриви", "item": "https://www.remontnapokrivivarna.bg/bg/изграждане-на-покрив" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Изграждане на Покриви Варна | Професионален Монтаж & Ремонт</title>
        <meta name="description" content="Професионално изграждане на покриви във Варна и региона. Дървени конструкции, нови покриви, хидроизолация. Над 15г опит. Безплатен оглед: 088 499 7659" />
        <meta property="og:title" content="Изграждане на Нов Покрив Варна | Професионален Монтаж" />
        <meta property="og:description" content="Професионално изграждане на покриви. Дървени конструкции, всички материали, хидроизолация. Над 15г опит. Безплатен оглед: 088 499 7659" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/изграждане-на-покрив" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Изграждане на Нов Покрив Варна | Професионален Монтаж" />
        <meta name="twitter:description" content="Професионално изграждане на покриви. Дървени конструкции, всички материали, хидроизолация. Над 15г опит." />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={roofFrameConstruction} 
            alt="Изграждане на дървена покривна конструкция Варна" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Изграждане на покриви – професионално строителство и монтаж
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Лицензирана строителна компания с над 15 години опит в проектирането и изграждането на покривни конструкции във Варна и Североизточна България. Ние създаваме покриви, които издържат на времето.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>15+ години опит</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                <Shield className="w-5 h-5 text-accent" />
                <span>Писмена гаранция</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                <HardHat className="w-5 h-5 text-accent" />
                <span>Сертифицирани екипи</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                <Layers className="w-5 h-5 text-accent" />
                <span>Качествени материали</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-6 text-lg h-auto">
                <Phone className="mr-2 h-5 w-5" />
                Безплатен оглед и оферта
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg h-auto bg-transparent">
                Вижте цени и услуги
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Introduction */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-l-4 border-accent pl-4">
              Експертно изграждане на покривни конструкции
            </h2>
            
            <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
              <p>
                Покривът е най-важният конструктивен елемент на всяка сграда, изпълняващ ролята на щит срещу атмосферните влияния. <strong>Изграждането на покрив</strong> не е просто подреждане на керемиди, а сложен инженерен процес, който изисква дълбоки познания в статиката, материалознанието и строителната физика. Качествено изпълненият покрив гарантира дълготрайността на цялата сграда, предпазва от влага, мухъл и конструктивни деформации, и играе ключова роля за енергийната ефективност на дома.
              </p>

              <p>
                Разликата между новото изграждане и реконструкцията на покрив е съществена. При новото строителство имаме свободата да проектираме и изпълним <strong>носещата конструкция</strong> според най-съвременните стандарти, осигурявайки оптимално разпределение на товарите. При реконструкцията често се налага да се съобразяваме със съществуващи дадености, което изисква още по-голям професионализъм и прецизност при усилването на старите елементи или тяхната подмяна.
              </p>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-accent" />
                  Ключови елементи на покривната конструкция
                </h3>
                <ul className="grid md:grid-cols-2 gap-4 text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <span><strong>Мауерлат:</strong> Основната греда, която лежи върху зидарията и поема тежестта на целия покрив.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <span><strong>Ребра:</strong> Наклонените греди, които оформят ската и носят покривното покритие.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <span><strong>Столици:</strong> Хоризонтални греди (подложна, междинна, билна), които подпират ребрата.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <span><strong>Попове:</strong> Вертикални носещи елементи, предаващи товара към плочата.</span>
                  </li>
                </ul>
              </div>

              <p>
                Рисковете при неправилно изпълнение са огромни. Некачествено закрепената <strong>мауерлат</strong> греда може да доведе до отлепяне на покрива при силен вятър. Неправилното оразмеряване на <strong>ребрата</strong> и <strong>столиците</strong> може да причини провисване на конструкцията под тежестта на снега. Липсата на вентилация или неправилно положената <strong>хидроизолационна мембрана</strong> и <strong>пароизолация</strong> водят до образуване на конденз, гниене на дървесината и компрометиране на топлоизолацията, което драстично намалява живота на покрива и увеличава сметките за отопление.
              </p>

              <p>
                Ние обръщаме специално внимание на всеки детайл – от правилния избор на <strong>битумни материали</strong> и <strong>керемиди</strong>, до прецизното изпълнение на <strong>ламаринените обшивки</strong> около комини и бордове, и ефективното <strong>водоотвеждане</strong>. Само така можем да гарантираме, че вашата инвестиция е защитена за десетилетия напред.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Roofs */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Видове покривни конструкции
            </h2>
            <p className="text-lg text-slate-600">
              Изберете най-подходящото решение за вашата сграда
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pitched Roofs */}
            <Card className="border-t-4 border-t-accent shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Home className="w-6 h-6 text-accent" />
                  Скатен покрив (Наклонен)
                </h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Скатните покриви са най-разпространеният вид в жилищното строителство в България. Те предлагат класическа визия и отлично естествено оттичане на водата.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">Двускатен покрив</h4>
                      <p className="text-sm">Класически "островърх" покрив с две наклонени повърхности. Лесен за изпълнение, икономичен и ефективен.</p>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">Четирискатен покрив</h4>
                      <p className="text-sm">По-сложна конструкция с четири наклона. По-устойчив на ветрове, но с по-малко използваемо подпокривно пространство.</p>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <p className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <strong>Предимства:</strong> Дълъг живот, лесна поддръжка, допълнително пространство (таван).
                    </p>
                    <p className="flex items-center gap-2 text-sm text-red-700">
                      <CheckCircle className="w-4 h-4" />
                      <strong>Недостатъци:</strong> По-сложна конструкция, по-голям разход на материали.
                    </p>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-slate-500">Ориентировъчна цена за труд и материали:</p>
                    <p className="text-xl font-bold text-accent">от 90 лв./кв.м</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flat Roofs */}
            <Card className="border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-blue-500" />
                  Плосък покрив
                </h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Плоските покриви са символ на модерната архитектура. Те са предпочитани за офис сгради, блокове и съвременни еднофамилни къщи.
                  </p>
                  
                  <div className="bg-slate-100 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-slate-900 mb-2">Особености при изграждане</h4>
                    <p className="text-sm">Критично важна е качествената хидроизолация (битумна или синтетична) и правилното изпълнение на наклоните за отводняване.</p>
                  </div>

                  <div className="space-y-2 mt-4">
                    <p className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <strong>Предимства:</strong> Използваема площ (тераса, градина), лесен достъп, модерен вид.
                    </p>
                    <p className="flex items-center gap-2 text-sm text-red-700">
                      <CheckCircle className="w-4 h-4" />
                      <strong>Недостатъци:</strong> Изисква перфектна хидроизолация и редовна поддръжка.
                    </p>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-slate-500">Ориентировъчна цена за труд и материали:</p>
                    <p className="text-xl font-bold text-accent">от 65 лв./кв.м</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metal Structures */}
            <Card className="border-t-4 border-t-slate-500 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <HardHat className="w-6 h-6 text-slate-500" />
                  Покриви с метална конструкция
                </h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Идеално решение за индустриални халета, складове и големи търговски площи, където се изискват големи подпорни разстояния.
                  </p>

                  <div className="space-y-2 mt-4">
                    <p className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <strong>Предимства:</strong> Изключителна здравина, негоримост, бърз монтаж.
                    </p>
                    <p className="flex items-center gap-2 text-sm text-red-700">
                      <CheckCircle className="w-4 h-4" />
                      <strong>Недостатъци:</strong> По-висока цена на метала, нужда от антикорозионна защита.
                    </p>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-slate-500">Ориентировъчна цена за труд и материали:</p>
                    <p className="text-xl font-bold text-accent">по запитване</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wooden Structures */}
            <Card className="border-t-4 border-t-amber-600 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Hammer className="w-6 h-6 text-amber-600" />
                  Дървена покривна конструкция
                </h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Най-често използваният тип конструкция за жилищни сгради. Изработва се от качествен иглолистен материал (смърч, бор).
                  </p>

                  <div className="space-y-2 mt-4">
                    <p className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <strong>Предимства:</strong> Екологичност, добри изолационни свойства, гъвкавост на формите.
                    </p>
                    <p className="flex items-center gap-2 text-sm text-red-700">
                      <CheckCircle className="w-4 h-4" />
                      <strong>Недостатъци:</strong> Нужда от импрегнация срещу вредители и огън.
                    </p>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-slate-500">Време за изграждане:</p>
                    <p className="text-xl font-bold text-accent">7-14 дни</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Construction Process */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              Етапи на изграждане на нов покрив
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
              Нашият процес е оптимизиран и прозрачен, гарантиращ качество на всяка стъпка.
            </p>

            <div className="relative border-l-4 border-slate-200 ml-4 md:ml-8 space-y-12">
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-sm" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Оглед и конструктивен анализ</h3>
                <p className="text-slate-700">
                  Процесът започва с детайлен оглед на обекта. Нашите инженери извършват измервания и оценяват състоянието на сградата, за да се уверят, че тя може да поеме товарите от новия покрив. Извършваме конструктивен анализ и обсъждаме с вас най-добрите варианти за конструкция и материали.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <img src={roofPlanning} alt="Проектиране на нов покрив Варна" className="w-full h-48 object-cover rounded-lg" loading="lazy" />
                  <img src={roofingMaterials} alt="Схема на покривна конструкция" className="w-full h-48 object-cover rounded-lg" loading="lazy" />
                </div>
              </div>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-sm" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Проектиране</h3>
                <p className="text-slate-700">
                  Изготвяме работен проект, който включва план на покривната конструкция, спецификация на материалите и детайли на изпълнение. Този етап е критичен за избягване на грешки и оптимизиране на разходите.
                </p>
              </div>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-sm" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Изграждане на носеща конструкция</h3>
                <p className="text-slate-700">
                  Монтираме мауерлатите, ребрата, столиците и поповете. Всички дървени елементи се обработват предварително с инсектициди и фунгициди. Използваме само поцинковани крепежни елементи за максимална здравина и устойчивост на корозия.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <img src={woodenStructure1} alt="Дървена покривна конструкция - монтаж" className="w-full h-40 object-cover rounded-lg" loading="lazy" />
                  <img src={woodenStructure2} alt="Дървена конструкция на покрив" className="w-full h-40 object-cover rounded-lg" loading="lazy" />
                  <img src={woodenStructure3} alt="Завършена дървена конструкция" className="w-full h-40 object-cover rounded-lg" loading="lazy" />
                </div>
              </div>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-sm" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">4. Полагане на хидроизолация и летви</h3>
                <p className="text-slate-700">
                  Върху ребрата полагаме висококачествена паропропусклива мембрана (дифузионно фолио), която защитава от вода отвън, но позволява на конструкцията да "диша". След това монтираме контралетви (за вентилация) и носещи летви за керемидите.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <img src={woodenDecking} alt="Дъсчена обшивка на покрив" className="w-full h-48 object-cover rounded-lg" loading="lazy" />
                  <img src={membraneBattens} alt="Хидроизолация и летви на покрив" className="w-full h-48 object-cover rounded-lg" loading="lazy" />
                </div>
              </div>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-sm" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">5. Полагане на покривно покритие</h3>
                <p className="text-slate-700">
                  Монтираме избраното от вас покритие – керамични, бетонни или битумни керемиди, метални листи или друго. Спазваме стриктно инструкциите на производителя за застъпване и закрепване.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <img src={tilePreparation} alt="Подготовка за полагане на керемиди" className="w-full h-40 object-cover rounded-lg" loading="lazy" />
                  <img src={tileInstallation} alt="Монтаж на керемиди на покрив" className="w-full h-40 object-cover rounded-lg" loading="lazy" />
                  <img src={tileInstallation2} alt="Полагане на покривно покритие" className="w-full h-40 object-cover rounded-lg" loading="lazy" />
                </div>
              </div>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-sm" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">6. Довършителни работи и контрол</h3>
                <p className="text-slate-700">
                  Монтираме улуци, водосточни тръби, обшивки около комини и капандури. Извършваме финален оглед и водна проба (ако е приложимо), за да гарантираме, че покривът е 100% водоплътен. Обектът се предава с гаранционна карта.
                </p>
                <div className="mt-4">
                  <img src={roofComplete} alt="Завършен нов покрив Варна" className="w-full h-56 object-cover rounded-lg" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              Цени за изграждане на покриви
            </h2>
            <p className="text-lg text-slate-600 mb-8 text-center">
              Прозрачно ценообразуване, съобразено с пазарните условия в България
            </p>
            
            <div className="prose prose-lg max-w-none text-slate-700 mb-10">
              <p>
                Цената за изграждане на нов покрив зависи от множество фактори:
              </p>
              <ul className="grid md:grid-cols-2 gap-4 list-none pl-0">
                <li className="flex items-center gap-2"><Banknote className="w-5 h-5 text-accent"/> <strong>Материали:</strong> Видът на керемидите и изолацията е основен перо.</li>
                <li className="flex items-center gap-2"><Ruler className="w-5 h-5 text-accent"/> <strong>Квадратура:</strong> По-големите покриви често имат по-ниска цена на кв.м.</li>
                <li className="flex items-center gap-2"><HardHat className="w-5 h-5 text-accent"/> <strong>Сложност:</strong> Брой скатове, капандури, комини.</li>
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-accent"/> <strong>Достъп:</strong> Височина на сградата, възможност за механизация.</li>
              </ul>
            </div>

            <Card>
              <CardContent className="p-0 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-100">
                    <TableRow>
                      <TableHead className="w-[300px] font-bold">Вид услуга</TableHead>
                      <TableHead className="font-bold">Описание</TableHead>
                      <TableHead className="text-right font-bold">Ориентировъчна цена</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Дървена конструкция (труд)</TableCell>
                      <TableCell>Изграждане на носеща конструкция без материали</TableCell>
                      <TableCell className="text-right">30 - 45 лв./кв.м</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Цялостен нов покрив (Икономик)</TableCell>
                      <TableCell>Конструкция, битумни керемиди, труд и материали</TableCell>
                      <TableCell className="text-right">80 - 110 лв./кв.м</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Цялостен нов покрив (Стандарт)</TableCell>
                      <TableCell>Конструкция, метални керемиди/профил, труд и материали</TableCell>
                      <TableCell className="text-right">100 - 140 лв./кв.м</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Цялостен нов покрив (Премиум)</TableCell>
                      <TableCell>Конструкция, керамични керемиди, висок клас изолация</TableCell>
                      <TableCell className="text-right">150 - 200 лв./кв.м</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <p className="text-sm text-slate-500 mt-4 text-center">* Посочените цени са ориентировъчни и без ДДС. Окончателна оферта се изготвя след оглед.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Защо да изберете нас за вашия нов покрив?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">Доказан опит</h3>
              <p className="text-slate-600">Над 15 години на пазара и стотици успешно завършени обекти във Варна и региона. Познаваме спецификите на местното строителство.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">Реална гаранция</h3>
              <p className="text-slate-600">Предоставяме пълна писмена гаранция за изпълнението и съдействаме за гаранцията на материалите от производителите.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <HardHat className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">Професионален екип</h3>
              <p className="text-slate-600">Работим със собствени, постоянно обучени бригади. Не наемаме случайни работници и спазваме трудовото законодателство.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Placeholder */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Какво споделят нашите клиенти</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic mb-4">"Изключително доволен съм от бързината и качеството. Момчетата смениха целия покрив на вилата за 10 дни, въпреки лошото време."</p>
              <div className="font-bold text-accent">- Иван Петров, Варна</div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic mb-4">"Професионално отношение от огледа до края. Офертата беше ясна, нямаше скрити разходи. Препоръчвам!"</p>
              <div className="font-bold text-accent">- Мария Георгиева, Аксаково</div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic mb-4">"Най-добрата фирма за покриви във Варна. Направиха ни сложен четирискатен покрив без забележки."</p>
              <div className="font-bold text-accent">- Стефан Николов, Св. Константин</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Често задавани въпроси
          </h2>
          <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm p-2">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold px-4 text-slate-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 px-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Готови ли сте за нов, надежден покрив?"
        subtitle="Свържете се с нас днес за безплатна консултация и професионална оферта."
      />

      {/* Local SEO & Internal Links */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-sm text-slate-600">
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Нашите услуги</h4>
              <ul className="space-y-2">
                <li><Link to="/ремонт-на-покриви" className="hover:text-accent">[Ремонт на покриви]</Link></li>
                <li><Link to="/хидроизолация" className="hover:text-accent">[Хидроизолация]</Link></li>
                <li><Link to="/смяна-на-керемиди" className="hover:text-accent">[Смяна на керемиди]</Link></li>
                <li><Link to="/метални-покриви" className="hover:text-accent">Метални покриви</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Обслужвани райони</h4>
              <ul className="space-y-2">
                <li>Покриви Варна</li>
                <li>Изграждане на покрив Аксаково</li>
                <li>Ремонт на покриви Златни пясъци</li>
                <li>Покривни конструкции Девня</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Полезно</h4>
              <ul className="space-y-2">
                <li><Link to="/блог" className="hover:text-accent">Блог за строителство</Link></li>
                <li><Link to="/въпроси" className="hover:text-accent">Чести въпроси</Link></li>
                <li><Link to="/контакти" className="hover:text-accent">Контакти</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default NewRoofPage;
