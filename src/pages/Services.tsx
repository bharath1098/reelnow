
import React from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      title: "Portrait Photography",
      description: "Capture your authentic self with our professional portrait photography services.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      pricing: "From ₹4,999",
      link: "/contact",
      features: [
        "Indoor & outdoor sessions",
        "Multiple outfit changes",
        "Professional retouching",
        "Digital files included",
        "Print packages available",
      ],
    },
    {
      title: "Wedding Photography",
      description: "Document every precious moment of your special day with our wedding photography packages.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      pricing: "From ₹49,999",
      link: "/contact",
      features: [
        "Full day coverage",
        "Second photographer option",
        "Engagement session included",
        "Online gallery & high-res downloads",
        "Custom wedding album design",
      ],
    },
    {
      title: "Commercial Photography",
      description: "Elevate your brand with professional commercial photography tailored to your business needs.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      pricing: "Custom Quotes",
      link: "/contact",
      features: [
        "Product photography",
        "Corporate headshots",
        "Architecture & interior",
        "Brand lifestyle imagery",
        "Marketing campaign assets",
      ],
    },
  ];
  

  const additionalServices = [
    {
      title: "Event Coverage",
      description: "Complete documentation of your special events, from corporate gatherings to milestone celebrations.",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      pricing: "From ₹14,999",
      link: "/contact",
    },
    {
      title: "Family Portraits",
      description: "Preserve precious family moments with beautiful, natural family portrait sessions.",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      pricing: "From ₹5,999",
      link: "/contact",
    },
    {
      title: "Fine Art Prints",
      description: "Premium quality prints of our landscape and fine art photography for your home or office.",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
      pricing: "From ₹1,499",
      link: "/contact",
    },
  ];
  

  const pricingPackages = [
    {
      name: "Essential",
      price: "₹4,999",
      description: "Perfect for individuals needing professional portraits",
      features: [
        "1-hour session",
        "1 location",
        "2 outfit changes",
        "10 digital images",
        "Basic retouching",
      ],
    },
    {
      name: "Premium",
      price: "₹8,999",
      description: "Ideal for families and extended portrait sessions",
      features: [
        "2-hour session",
        "2 locations",
        "Multiple outfit changes",
        "25 digital images",
        "Advanced retouching",
        "Online gallery",
        "Print credit (₹2,000)",
      ],
      highlighted: true,
    },
    {
      name: "Ultimate",
      price: "₹14,999",
      description: "Comprehensive package for complete coverage",
      features: [
        "4-hour session",
        "Multiple locations",
        "Unlimited outfit changes",
        "All digital images",
        "Premium retouching",
        "Online gallery",
        "Print credit (₹5,000)",
        "Fine art album",
      ],
    },
  ];
  

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 bg-photo-dark text-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Our Services</h1>
            <div className="w-24 h-1 bg-photo-accent mb-8"></div>
            <p className="max-w-3xl text-gray-300 text-lg">
              Explore our comprehensive range of professional photography services tailored to meet your unique needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Main Services</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Our core photography services provide exceptional quality and value for all your important moments.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <AnimatedSection key={service.title} animation="fade-up" delay={index * 100}>
                <ServiceCard {...service} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Additional Services</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Beyond our main offerings, we provide specialized photography services to meet diverse needs.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <AnimatedSection key={service.title} animation="fade-up" delay={index * 100}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2">{service.title}</h3>
                    <p className="text-photo-accent font-medium mb-3">{service.pricing}</p>
                    <p className="text-gray-600 mb-6 h-16">{service.description}</p>
                    <Button
                      asChild
                      className="bg-photo-accent hover:bg-photo-accent/90 text-white w-full"
                    >
                      <Link to={service.link}>Learn More</Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Portrait Photography Packages</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Choose the perfect package to suit your portrait photography needs and budget.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) => (
              <AnimatedSection key={pkg.name} animation="fade-up" delay={index * 100}>
                <Card 
                  className={`h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    pkg.highlighted ? "border-photo-accent shadow-md" : ""
                  }`}
                >
                  {pkg.highlighted && (
                    <div className="bg-photo-accent text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-6 text-center">
                      <h3 className="font-serif text-2xl">{pkg.name}</h3>
                      <div className="mt-3 mb-2">
                        <span className="text-3xl font-bold text-photo-accent">{pkg.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{pkg.description}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8 flex-grow">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-photo-accent mr-2 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      asChild
                      className={`w-full mt-auto ${
                        pkg.highlighted 
                          ? "bg-photo-accent hover:bg-photo-accent/90 text-white" 
                          : "bg-white border border-photo-accent text-photo-accent hover:bg-gray-50"
                      }`}
                    >
                      <Link to="/contact">Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Our Process</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-full mx-auto text-gray-600">
              From initial consultation to final delivery, here's how we bring your photography vision to life.
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto flex flex-col gap-5">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "We begin with an in-depth discussion to understand your vision, goals, and specific requirements.",
              },
              {
                step: "2",
                title: "Planning",
                description: "We meticulously plan every aspect of your shoot, from location scouting to styling recommendations.",
              },
              {
                step: "3",
                title: "The Shoot",
                description: "On the day of your shoot, our team provides direction while creating a comfortable environment.",
              },
              {
                step: "4",
                title: "Editing & Retouching",
                description: "Your images undergo professional editing and retouching to achieve the perfect look and feel.",
              },
              {
                step: "5",
                title: "Delivery",
                description: "Receive your final images through a beautiful online gallery with easy downloading and sharing options.",
              },
            ].map((item, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="flex mb-12 last:mb-0">
                  <div className="mr-6">
                    <div className="w-12 h-12 rounded-full bg-photo-accent text-white flex items-center justify-center text-xl font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
          </AnimatedSection>

          <div className="max-w-full mx-auto space-y-6">
            {[
              {
                question: "How far in advance should I book my photography session?",
                answer: "We recommend booking at least 4-6 weeks in advance for portrait sessions and 6-12 months in advance for weddings to ensure availability, especially during peak seasons."
              },
              {
                question: "What happens if it rains on the day of an outdoor shoot?",
                answer: "We monitor weather conditions closely and will contact you 24-48 hours before your session if there's concern. We can either reschedule or move to an indoor location, depending on your preference."
              },
              {
                question: "How long until I receive my photos?",
                answer: "Portrait sessions are typically delivered within 2 weeks, while weddings and larger events may take 4-6 weeks. We always provide a few preview images within days of your shoot."
              },
              {
                question: "Do you provide photo printing services?",
                answer: "Yes, we offer high-quality professional printing services through our lab partners. You can order prints directly through your online gallery, ensuring color accuracy and archival quality."
              },
              {
                question: "Do you travel for photography sessions?",
                answer: "Absolutely! We're available for travel nationwide and internationally. Travel fees vary based on location and duration - contact us for a custom quote."
              }
            ].map((faq, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-photo-dark text-white">
        <div className="container mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Ready to Book Your Session?</h2>
            <p className="max-w-2xl mx-auto text-gray-300 mb-8">
              Contact us today to discuss your photography needs and secure your date.
            </p>
            <Button 
              asChild 
              className="bg-photo-accent hover:bg-photo-accent/90 text-white"
              size="lg"
            >
              <Link to="/contact">Contact Us Now</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
