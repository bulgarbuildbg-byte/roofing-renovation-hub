import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  const faqs = [
    {
      question: "Колко струва ремонтът на покрив във Варна?",
      answer: "Цената за ремонт на покрив зависи от много фактори: вида на покрива, площта, състоянието и необходимите материали. Цените започват от 8-10 €/кв.м за прост ремонт и могат да достигнат 40-50 €/кв.м за цялостна подмяна. Препоръчваме безплатен оглед за точна оценка."
    },
    {
      question: "Колко време отнема ремонтът на покрив?",
      answer: "Времето за ремонт зависи от обема на работата. Малки ремонти (течове, подмяна на керемиди) се извършват за 1-2 дни. Цялостен ремонт на покрив отнема между 5-14 дни в зависимост от площта и сложността."
    },
    {
      question: "Предлагате ли гаранция за извършената работа?",
      answer: "Да, предоставяме гаранция за всички извършени услуги. Стандартната ни гаранция е 5 години за хидроизолация и 10 години за нови покривни конструкции. Използваме само качествени материали от доказани производители."
    },
    {
      question: "Работите ли през зимата?",
      answer: "Да, работим целогодишно. Въпреки това, някои дейности като хидроизолация изискват температури над 5°C. При аварийни ситуации като течове, реагираме незабавно независимо от сезона."
    },
    {
      question: "Как да разбера дали покривът ми се нуждае от ремонт?",
      answer: "Признаци, че покривът се нуждае от ремонт: петна от влага по тавана, липсващи или счупени керемиди, мухъл в тавана, високи сметки за отопление, видими пукнатини или деформации. Препоръчваме профилактичен преглед на всеки 2-3 години."
    },
    {
      question: "Каква е разликата между различните видове хидроизолация?",
      answer: "Основните видове са: битумна хидроизолация (традиционна, подходяща за повечето покриви), PVC мембрана (по-дълготрайна, идеална за плоски покриви), течна хидроизолация (за труднодостъпни места и детайли). Ще ви препоръчаме най-подходящия вариант според вашия покрив."
    },
    {
      question: "Правите ли безплатни огледи?",
      answer: "Да, предлагаме безплатен оглед и консултация за всички потенциални клиенти във Варна и региона. След огледа ще получите детайлна оферта с описание на необходимите работи и материали."
    },
    {
      question: "Трябва ли да се изнасям от дома по време на ремонта?",
      answer: "В повечето случаи не е необходимо. Работим отвън и не нарушаваме ежедневието ви. При по-големи ремонти, включващи подмяна на дървена конструкция, може да се наложи кратко изнасяне от таванските помещения."
    },
    {
      question: "Какви методи на плащане приемате?",
      answer: "Приемаме плащане в брой, банков превод и картови плащания. При по-големи проекти предлагаме възможност за разсрочено плащане на етапи."
    },
    {
      question: "В кои райони работите?",
      answer: "Обслужваме Варна и целия регион, включително: Аксаково, Девня, Провадия, Долни чифлик, Бяла, Аврен, Белослав, Суворово и околните села."
    }
  ];

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

  return (
    <>
      <Helmet>
        <title>Въпроси за Покриви Варна - Отговори и Съвети</title>
        <meta name="description" content="Отговори на често задавани въпроси за ремонт на покриви, цени и гаранции във Варна. Полезна информация." />
        <meta name="keywords" content="ремонт покриви въпроси, цени покриви варна, хидроизолация въпроси, гаранция покрив" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/въпроси" />
        <meta property="og:title" content="Въпроси за Покриви Варна - Отговори и Съвети" />
        <meta property="og:description" content="Отговори на често задавани въпроси за ремонт на покриви във Варна." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Въпроси за Ремонт на Покриви Варна
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto text-center">
              Намерете отговори на най-често задаваните въпроси за нашите услуги
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left text-lg font-medium text-card-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Имате Допълнителни Въпроси?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Свържете се с нас директно и ще отговорим на всички ваши въпроси
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="tel:+359892701176">Обадете се: 089 270 1176</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/контакти">Изпратете запитване</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default FAQPage;
