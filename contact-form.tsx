import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Cat } from "@shared/schema";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  interestedCatId: z.string().optional(),
  livingSituation: z.string().min(10, "Please provide more details about your living situation"),
  agreeTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: cats } = useQuery<Cat[]>({
    queryKey: ["/api/cats"],
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      interestedCatId: "",
      livingSituation: "",
      agreeTerms: false,
    },
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: FormData) => {
      const submitData = {
        ...data,
        interestedCatId: data.interestedCatId && data.interestedCatId !== "0" ? parseInt(data.interestedCatId) : null,
      };
      return apiRequest("POST", "/api/adoption-inquiries", submitData);
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted!",
        description: "Thank you for your adoption inquiry! We will contact you within 24 hours to discuss the next steps.",
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit adoption inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    submitInquiry.mutate(data);
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-12">
                <Heart className="h-16 w-16 text-coral mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-warm-brown mb-4">Thank You!</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Your adoption inquiry has been submitted successfully. We're excited to help you find your perfect feline companion!
                </p>
                <p className="text-gray-600">
                  We will contact you within 24 hours to discuss the next steps in the adoption process.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 bg-coral hover:bg-coral/80 text-white"
                >
                  Submit Another Inquiry
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-warm-brown mb-6">Ready to Adopt?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take the first step towards giving a loving cat their forever home. Fill out our adoption inquiry form and we'll get back to you soon!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div>
            <Card className="bg-white shadow-lg mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-warm-brown mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-coral h-6 w-6" />
                    <div>
                      <h4 className="font-semibold text-warm-brown">Visit Us</h4>
                      <p className="text-gray-600">123 Cat Haven Lane, Pet City, PC 12345</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Phone className="text-coral h-6 w-6" />
                    <div>
                      <h4 className="font-semibold text-warm-brown">Call Us</h4>
                      <p className="text-gray-600">(555) CAT-LOVE (228-5683)</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Mail className="text-coral h-6 w-6" />
                    <div>
                      <h4 className="font-semibold text-warm-brown">Email Us</h4>
                      <p className="text-gray-600">adopt@whiskersandhearts.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Clock className="text-coral h-6 w-6" />
                    <div>
                      <h4 className="font-semibold text-warm-brown">Hours</h4>
                      <p className="text-gray-600">Mon-Sat: 10AM-6PM<br />Sun: 12PM-4PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <img 
              src="https://images.unsplash.com/photo-1522108233-15ac670d6cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Happy family with adopted cat" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </div>

          {/* Adoption Inquiry Form */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-warm-brown mb-6">Adoption Inquiry Form</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-warm-brown font-semibold">First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-warm-brown font-semibold">Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-warm-brown font-semibold">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-warm-brown font-semibold">Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interestedCatId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-warm-brown font-semibold">Which cat interests you?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a cat" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">I'd like to meet all available cats</SelectItem>
                            {cats?.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id.toString()}>
                                {cat.name} - {cat.breed}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="livingSituation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-warm-brown font-semibold">Tell us about your living situation</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder="Do you have other pets? What's your home like? Any specific questions about adoption?" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-gray-600 font-normal">
                          I agree to the adoption terms and understand that a home visit may be required
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={submitInquiry.isPending}
                    className="w-full bg-coral hover:bg-coral/80 text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    {submitInquiry.isPending ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        Submit Adoption Inquiry
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
