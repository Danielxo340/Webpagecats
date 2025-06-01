import { useQuery } from "@tanstack/react-query";
import { Heart, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Cat } from "@shared/schema";

export default function AdoptionSection() {
  const { data: cats, isLoading } = useQuery<Cat[]>({
    queryKey: ["/api/cats"],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      alt: "Kitten sleeping in basket"
    },
    {
      src: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      alt: "Two cats cuddling on blanket"
    },
    {
      src: "https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      alt: "Kitten playing with toy mouse"
    },
    {
      src: "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      alt: "Majestic long-haired cat"
    }
  ];

  return (
    <section id="adoption" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            Meet Our Beautiful Cats
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each of these wonderful cats is looking for their forever home. Could one of them be your new best friend?
          </p>
        </div>

        {/* Featured Cats Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 animate-pulse mb-2 rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse mb-2 rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse mb-4 rounded"></div>
                  <div className="h-10 bg-gray-200 animate-pulse rounded-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : cats && cats.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {cats.map((cat) => (
              <Card key={cat.id} className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <img 
                  src={cat.imageUrl} 
                  alt={`${cat.name} - ${cat.breed}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-warm-brown mb-2">{cat.name}</h3>
                  <p className="text-gray-600 mb-2">{cat.breed}</p>
                  <p className="text-gray-600 mb-4">{cat.age}</p>
                  <Button 
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-coral hover:bg-coral/80 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
                  >
                    Learn More <Heart className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center mb-16">
            <p className="text-gray-600 text-lg">No cats available for adoption at the moment. Please check back soon!</p>
          </div>
        )}

        {/* Cute Cats Gallery */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-warm-brown text-center mb-12">More Adorable Friends</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <img 
                key={index}
                src={image.src} 
                alt={image.alt}
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full h-48 object-cover" 
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">Ready to welcome a new family member?</p>
          <Button 
            onClick={() => scrollToSection("contact")}
            className="bg-warm-orange hover:bg-warm-orange/80 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <PawPrint className="mr-2 h-5 w-5" />
            Start Adoption Process
          </Button>
        </div>
      </div>
    </section>
  );
}
