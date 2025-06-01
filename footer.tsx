import { Heart, Facebook, Instagram, Twitter, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { href: "home", label: "Home" },
    { href: "about", label: "About Cats" },
    { href: "adoption", label: "Adoption" },
    { href: "care", label: "Cat Care" },
    { href: "contact", label: "Contact" },
  ];

  return (
    <footer className="bg-warm-brown text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="text-coral h-8 w-8" />
              <h3 className="text-xl font-bold">Whiskers & Hearts</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting loving cats with loving families since 2020. Every cat deserves a chance at happiness.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-coral transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-coral transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-coral transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-coral transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support Our Mission</h4>
            <p className="text-gray-300 mb-4">
              Help us care for more cats while they wait for their forever homes.
            </p>
            <Button className="bg-coral hover:bg-coral/80 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300">
              <DollarSign className="mr-2 h-4 w-4" />
              Donate Now
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 Whiskers & Hearts Cat Adoption Center. All rights reserved. Made with{" "}
            <Heart className="inline h-4 w-4 text-coral" /> for cats in need.
          </p>
        </div>
      </div>
    </footer>
  );
}
