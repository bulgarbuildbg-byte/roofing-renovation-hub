import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "Колко време отнема ремонтът на покрив?",
    answer: "Времето зависи от обхвата на работата. Малки ремонти (течове, повредени керемиди) се извършват за 1-2 дни. По-големи проекти като пълна реконструкция могат да отнемат 1-2 седмици."
  },
  {
    question: "Предлагате ли гаранция?",
    answer: "Да, предлагаме писмена гаранция на всички наши услуги - от 2 до 10 години в зависимост от типа работа. Хидроизолацията получава 10 години гаранция."
  },
  {
    question: "Безплатен ли е огледът?",
    answer: "Да, първоначалният оглед и оценка са напълно безплатни. Ще дойдем на място, ще прегледаме покрива и ще ви дадем честна оферта без задължение."
  },
  {
    question: "Какви материали използвате?",
    answer: "Работим само с качествени материали от водещи производители като Bramac, Tondach, Onduline, и Sika. Всички материали имат сертификати за качество."
  },
  {
    question: "Работите ли при лошо време?",
    answer: "За безопасност на екипа и качество на работата, избягваме работа при дъжд или силен вятър. При аварийни ситуации обаче можем да направим временни мерки за защита."
  }
];

const HomeFAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Често Задавани Въпроси
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Отговори на най-честите въпроси за нашите услуги
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-secondary rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Link to="/въпроси">
              <Button variant="outline" className="gap-2">
                Вижте всички въпроси
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
