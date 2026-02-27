import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { 
  Camera, 
  Video, 
  Users, 
  Building2, 
  PartyPopper, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const Services = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Event Reels",
      description: "Capture the energy of your events with dynamic, shareable reels.",
      features: ["Live event coverage", "Same-day delivery", "Multi-camera angles"],
      price: "From ₹4,999",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Corporate Content",
      description: "Professional reels for brands, product launches, and corporate events.",
      features: ["Brand storytelling", "Product showcases", "Team highlights"],
      price: "From ₹9,999",
    },
    {
      icon: <PartyPopper className="w-8 h-8" />,
      title: "Weddings & Celebrations",
      description: "Turn your special moments into beautiful, emotional reels.",
      features: ["Ceremony highlights", "Reception coverage", "Guest interviews"],
      price: "From ₹14,999",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Influencer Content",
      description: "Quick, high-quality reels for social media influencers.",
      features: ["Trend-focused", "Platform optimized", "Fast turnaround"],
      price: "From ₹2,999",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Product Photography",
      description: "Stunning product reels that showcase your offerings.",
      features: ["360° views", "Lifestyle shots", "E-commerce ready"],
      price: "From ₹3,999",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team & Culture",
      description: "Show off your company culture with authentic team reels.",
      features: ["Behind-the-scenes", "Employee spotlights", "Office tours"],
      price: "From ₹7,999",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your vision, goals, and specific requirements.",
    },
    {
      step: "02",
      title: "Planning",
      description: "We plan every aspect of your shoot from location to styling.",
    },
    {
      step: "03",
      title: "The Shoot",
      description: "Our team arrives and captures all the magic with precision.",
    },
    {
      step: "04",
      title: "Editing",
      description: "Professional editing happens on-the-spot for instant delivery.",
    },
    {
      step: "05",
      title: "Delivery",
      description: "Receive your polished reel within 10 minutes of finishing.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Our Services</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6 gradient-text-white">
            What We Offer
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            Professional reel creation for every occasion. Fast, beautiful, and ready to share.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                id={`service-${index}`}
                data-reveal
                className={`glass-card p-8 transition-all duration-700 hover:bg-white/10 hover:border-cyan-500/30 group ${
                  isVisible[`service-${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-white/60 mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/50 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-cyan-400 font-semibold">{service.price}</span>
                  <Link
                    to="/"
                    className="text-white/60 hover:text-cyan-400 transition-colors text-sm flex items-center gap-1"
                  >
                    Book Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div
            id="process-header"
            data-reveal
            className={`text-center mb-16 transition-all duration-700 ${isVisible["process-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 gradient-text-white">
              Our Process
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {process.map((step, index) => (
              <div
                key={step.step}
                id={`process-${index}`}
                data-reveal
                className={`glass-card p-6 flex items-start gap-6 transition-all duration-700 hover:bg-white/10 ${
                  isVisible[`process-${index}`] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-black font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-white/60">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10" />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white">
              Ready to Book Your Session?
            </h2>
            <p className="text-white/60 mb-8">
              Contact us today to discuss your project and secure your date.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold rounded-full text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
