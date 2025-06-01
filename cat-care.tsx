import { Utensils, Scissors, Stethoscope, Gamepad2, PlayCircle } from "lucide-react";

export default function CatCare() {
  const careTypes = [
    {
      icon: Utensils,
      title: "Proper Nutrition",
      description: "Feed your cat high-quality cat food appropriate for their age. Provide fresh water daily and avoid feeding them human food that could be toxic."
    },
    {
      icon: Scissors,
      title: "Regular Grooming", 
      description: "Brush your cat regularly to prevent matting and reduce shedding. Trim their nails every 2-3 weeks and maintain good dental hygiene."
    },
    {
      icon: Stethoscope,
      title: "Healthcare",
      description: "Schedule regular vet checkups, keep vaccinations up to date, and watch for signs of illness or behavioral changes."
    },
    {
      icon: Gamepad2,
      title: "Mental Stimulation",
      description: "Provide interactive toys, scratching posts, and climbing trees. Play with your cat daily to keep them mentally and physically active."
    }
  ];

  const videos = [
    { title: "Kitten Care 101" },
    { title: "Understanding Cat Behavior" },
    { title: "Cat Health & Wellness" }
  ];

  return (
    <section id="care" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            Essential Cat Care Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to provide the best care for your feline friend with these expert tips and guidelines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            {careTypes.map((care, index) => {
              const IconComponent = care.icon;
              return (
                <div key={index} className="bg-cream rounded-xl p-8">
                  <div className="flex items-start space-x-4">
                    <IconComponent className="text-coral h-8 w-8 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-warm-brown mb-3">{care.title}</h3>
                      <p className="text-gray-600">{care.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-8">
            <img 
              src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="Cat being groomed with brush" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
            
            {/* Video Section Placeholder */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
              <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <PlayCircle className="h-16 w-16 text-coral mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Cat Care Basics</h4>
                  <p className="text-gray-300">Watch our comprehensive guide</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Gallery Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-warm-brown text-center mb-12">Educational Videos</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <PlayCircle className="h-12 w-12 text-coral mx-auto mb-2" />
                    <p className="text-sm">{video.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
