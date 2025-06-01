import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Hero overlay */}
      <div className="absolute inset-0 bg-warm-brown bg-opacity-40"></div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your Purr-fect Companion
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-cream">
          Give a loving cat a forever home and fill your life with joy, purrs, and unconditional love.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => scrollToSection("adoption")}
            className="bg-coral hover:bg-coral/80 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <Heart className="mr-2 h-5 w-5" />
            Adopt a Cat Today
          </Button>
          <Button 
            onClick={() => scrollToSection("about")}
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-warm-brown font-semibold py-4 px-8 rounded-full transition-all duration-300"
          >
            Learn About Cat Care
          </Button>
        </div>
      </div>
    </section>
  );
}
