import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import AboutCats from "@/components/about-cats";
import AdoptionSection from "@/components/adoption-section";
import CatCare from "@/components/cat-care";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-warm-white min-h-screen">
      <Navigation />
      <Hero />
      <AboutCats />
      <AdoptionSection />
      <CatCare />
      <ContactForm />
      <Footer />
    </div>
  );
}
