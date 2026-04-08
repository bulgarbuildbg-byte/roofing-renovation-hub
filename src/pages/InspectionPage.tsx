import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Triangle, Minus, Phone, Mail, MapPin, Clock, Shield, CheckCircle, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n/config";
import { trackCallClick } from "@/lib/analytics";

type RoofType = "flat" | "pitched" | null;

const InspectionPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) ? lang : 'bg') as SupportedLanguage;

  const [roofType, setRoofType] = useState<RoofType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", notes: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roofType || !form.name.trim() || !form.phone.trim()) return;

    setIsSubmitting(true);
    try {
      const serviceType = roofType === "flat" ? "flat_roof" as const : "repair" as const;
      const { error } = await supabase.from("inquiries").insert({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || "не е посочен",
        address: form.address.trim() || null,
        description: `[Безплатен оглед] Тип покрив: ${roofType === "flat" ? "Плосък" : "С наклон"}. ${form.notes.trim()}`,
        service_type: serviceType,
        referrer_source: "inspection_landing",
        session_id: sessionStorage.getItem("analytics_session_id") || undefined,
      });

      if (error) throw error;
      setSubmitted(true);

      // Track conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", { send_to: "AW-17872435541/inspection_form" });
        (window as any).gtag("event", "conversion", { send_to: "AW-18066399675/inspection_form" });
      }
    } catch {
      toast({ title: t("inspection.errorTitle"), description: t("inspection.errorDesc"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const domain = "https://www.remontnapokrivivarna.bg";
  const pagePath = `/${currentLang}/${currentLang === 'bg' ? 'безплатен-оглед' : 'free-inspection'}`;
  const pageUrl = `${domain}${pagePath}`;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: "RemontNaPokriviVarna",
    telephone: "+359884997659",
    email: "remontnapokrivivarna@abv.bg",
    address: { "@type": "PostalAddress", streetAddress: "ул. Уста Колю Фичето 25 А", addressLocality: "Варна", postalCode: "9000", addressCountry: "BG" },
    areaServed: { "@type": "City", name: "Варна" },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Roof Inspection",
    name: t("inspection.heroTitle"),
    description: t("inspection.meta.desc"),
    provider: { "@type": "RoofingContractor", name: "RemontNaPokriviVarna" },
    areaServed: { "@type": "City", name: "Varna, Bulgaria" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "BGN", description: "Безплатен оглед на покрив" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home") || "Начало", item: `${domain}/${currentLang}` },
      { "@type": "ListItem", position: 2, name: t("inspection.heroTitle"), item: pageUrl },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{t("inspection.meta.title")}</title>
        <meta name="description" content={t("inspection.meta.desc")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("inspection.meta.title")} />
        <meta property="og:description" content={t("inspection.meta.desc")} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${domain}/og-image.jpg`} />
        <meta property="og:locale" content={currentLang === 'bg' ? 'bg_BG' : currentLang === 'en' ? 'en_US' : `${currentLang}_${currentLang.toUpperCase()}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("inspection.meta.title")} />
        <meta name="twitter:description" content={t("inspection.meta.desc")} />
        <meta name="twitter:image" content={`${domain}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">{t("inspection.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("inspection.heroTitle")}</h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">{t("inspection.heroSubtitle")}</p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {submitted ? (
                <div className="text-center py-16">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-foreground mb-4">{t("inspection.successTitle")}</h2>
                  <p className="text-lg text-muted-foreground">{t("inspection.successDesc")}</p>
                </div>
              ) : (
                <>
                  {/* Step 1: Roof Type */}
                  <h2 className="text-2xl font-bold text-foreground text-center mb-2">{t("inspection.step1Title")}</h2>
                  <p className="text-muted-foreground text-center mb-8">{t("inspection.step1Desc")}</p>

                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <button
                      type="button"
                      onClick={() => setRoofType("flat")}
                      className={`flex flex-col items-center gap-4 p-8 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${
                        roofType === "flat"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className={`p-4 rounded-full ${roofType === "flat" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        <Minus className="h-10 w-10" strokeWidth={3} />
                      </div>
                      <span className="font-semibold text-foreground text-lg">{t("inspection.flatRoof")}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRoofType("pitched")}
                      className={`flex flex-col items-center gap-4 p-8 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${
                        roofType === "pitched"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className={`p-4 rounded-full ${roofType === "pitched" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        <Triangle className="h-10 w-10" />
                      </div>
                      <span className="font-semibold text-foreground text-lg">{t("inspection.pitchedRoof")}</span>
                    </button>
                  </div>

                  {/* Step 2: Contact Form (visible after roof type selection) */}
                  {roofType && (
                    <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h3 className="text-xl font-semibold text-foreground mb-4">{t("inspection.step2Title")}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">{t("inspection.name")} *</Label>
                          <Input id="name" name="name" value={form.name} onChange={handleChange} required maxLength={100} />
                        </div>
                        <div>
                          <Label htmlFor="phone">{t("inspection.phone")} *</Label>
                          <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required maxLength={20} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">{t("inspection.email")}</Label>
                          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} maxLength={255} />
                        </div>
                        <div>
                          <Label htmlFor="address">{t("inspection.address")}</Label>
                          <Input id="address" name="address" value={form.address} onChange={handleChange} maxLength={200} placeholder={t("inspection.addressPlaceholder")} />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">{t("inspection.notes")}</Label>
                        <Textarea id="notes" name="notes" value={form.notes} onChange={handleChange} maxLength={1000} rows={3} placeholder={t("inspection.notesPlaceholder")} />
                      </div>

                      <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={isSubmitting}>
                        <Send className="h-5 w-5 mr-2" />
                        {isSubmitting ? t("inspection.sending") : t("inspection.submitBtn")}
                      </Button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { icon: Shield, label: t("inspection.trust1") },
                { icon: CheckCircle, label: t("inspection.trust2") },
                { icon: Clock, label: t("inspection.trust3") },
                { icon: MapPin, label: t("inspection.trust4") },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Icon className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">{t("inspection.contactTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <a href="tel:+359884997659" onClick={() => trackCallClick("+359884997659")} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary transition-colors">
                <Phone className="h-8 w-8 text-primary" />
                <span className="font-semibold text-foreground">088 499 7659</span>
                <span className="text-sm text-muted-foreground">{t("inspection.callUs")}</span>
              </a>
              <a href="mailto:remontnapokrivivarna@abv.bg" className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary transition-colors">
                <Mail className="h-8 w-8 text-primary" />
                <span className="font-semibold text-foreground">remontnapokrivivarna@abv.bg</span>
                <span className="text-sm text-muted-foreground">{t("inspection.emailUs")}</span>
              </a>
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border">
                <MapPin className="h-8 w-8 text-primary" />
                <span className="font-semibold text-foreground text-center">{t("inspection.officeAddress")}</span>
                <span className="text-sm text-muted-foreground">{t("inspection.city")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">{t("inspection.mapTitle")}</h2>
            <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.8856270051813!2d27.9121!3d43.2141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDEyJzUwLjgiTiAyN8KwNTQnNTIuNCJF!5e0!3m2!1sbg!2sbg!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RemontNaPokriviVarna location"
              />
            </div>
          </div>
        </section>

        {/* Working Hours */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-8">{t("inspection.hoursTitle")}</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-foreground font-medium">{t("inspection.weekdays")}</span>
                  <span className="text-primary font-semibold">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-foreground font-medium">{t("inspection.saturday")}</span>
                  <span className="text-primary font-semibold">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-foreground font-medium">{t("inspection.sunday")}</span>
                  <span className="text-muted-foreground">{t("inspection.emergencyOnly")}</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-6">{t("inspection.emergencyNote")}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default InspectionPage;
