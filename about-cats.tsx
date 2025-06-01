import { Heart, Home, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutCats() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            Why Cats Make Amazing Companions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the wonderful world of feline friendship and learn why cats have been beloved companions for thousands of years.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-cream rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <Heart className="text-coral h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-warm-brown mb-4">Emotional Support</h3>
            <p className="text-gray-600">
              Cats provide incredible emotional support and companionship. Their purring has been scientifically proven to reduce stress and lower blood pressure.
            </p>
          </div>

          <div className="bg-cream rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <Home className="text-coral h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-warm-brown mb-4">Low Maintenance</h3>
            <p className="text-gray-600">
              Cats are naturally clean animals that groom themselves. They're perfect for busy lifestyles while still providing love and companionship.
            </p>
          </div>

          <div className="bg-cream rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <Shield className="text-coral h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-warm-brown mb-4">Natural Protectors</h3>
            <p className="text-gray-600">
              Cats help keep your home free from pests and provide a sense of security. They're naturally alert and protective of their territory.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Orange tabby cat in sunny window" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-warm-brown mb-6">The Science Behind Cat Love</h3>
            <p className="text-gray-600 mb-4">
              Research shows that cat owners live longer, healthier lives. The bond between humans and cats releases oxytocin, the same hormone released when we fall in love.
            </p>
            <p className="text-gray-600 mb-6">
              Cats communicate with us in unique ways - from purring and meowing to head bonks and slow blinks, each gesture is a sign of affection and trust.
            </p>
            <Button 
              onClick={() => scrollToSection("adoption")}
              className="bg-warm-orange hover:bg-warm-orange/80 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
            >
              Ready to Adopt? <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
