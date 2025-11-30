import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FloatingCallButton from "@/components/FloatingCallButton";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Index;
