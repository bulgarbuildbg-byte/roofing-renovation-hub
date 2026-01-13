import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import Contact from "@/components/Contact";

const ContactPage = () => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "RemontNaPokriviVarna",
    "description": "Професионални покривни услуги във Варна - ремонт, хидроизолация, изграждане на нови покриви",
    "url": "https://remontnapokrivivarna.com",
    "telephone": "+359892701176",
    "email": "remontnapokrivivarna@abv.bg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Уста Колю Фичето 25 А",
      "addressLocality": "Варна",
      "postalCode": "9000",
      "addressCountry": "BG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.2141",
      "longitude": "27.9147"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": "Варна"
    }
  };

  return (
    <>
      <Helmet>
        <title>Контакти Покриви Варна - 089 270 1176</title>
        <meta name="description" content="Свържете се за безплатен оглед. Адрес: ул. Уста Колю Фичето 25А, Варна. Работим 7 дни. Бърз отговор." />
        <meta name="keywords" content="контакти ремонт покриви варна, телефон покриви варна, адрес покривни услуги варна" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/контакти" />
        <meta property="og:title" content="Контакти Покриви Варна - 089 270 1176" />
        <meta property="og:description" content="Свържете се за безплатен оглед. Телефон: 089 270 1176" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Контакти - Ремонт на Покриви Варна
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto text-center">
              Безплатен оглед и консултация за вашия покрив
            </p>
          </div>
        </section>

        {/* Contact Component */}
        <Contact />

        {/* Map Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Локация и Адрес във Варна</h2>
            <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.8856270051813!2d27.9121!3d43.2141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDEyJzUwLjgiTiAyN8KwNTQnNTIuNCJF!5e0!3m2!1sbg!2sbg!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RemontNaPokriviVarna локация на картата"
              />
            </div>
          </div>
        </section>

        {/* Working Hours */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-8">Работно Време - 7 Дни в Седмицата</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-foreground font-medium">Понеделник - Петък</span>
                  <span className="text-primary font-semibold">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-foreground font-medium">Събота</span>
                  <span className="text-primary font-semibold">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-foreground font-medium">Неделя</span>
                  <span className="text-muted-foreground">При спешни случаи</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-6">
                * При аварийни ситуации сме на разположение 24/7
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default ContactPage;
