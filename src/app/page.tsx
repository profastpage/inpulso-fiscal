import Header from "@/components/ipf/Header";
import HeroSection from "@/components/ipf/HeroSection";
import ServicesSection from "@/components/ipf/ServicesSection";
import CTASection from "@/components/ipf/CTASection";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}