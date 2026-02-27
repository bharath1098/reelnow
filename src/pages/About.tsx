import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Users, Target, Zap, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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

  const values = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Speed",
      description: "We believe in instant delivery without compromising on quality.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion",
      description: "Every reel we create is infused with creativity and dedication.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Excellence",
      description: "We strive for perfection in every frame we capture.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "We're building a network of talented creators worldwide.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6 gradient-text-white">
            Our Story
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            We're on a mission to revolutionize content creation. Reel Now delivers 
            professional-quality video content in minutes, not days.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              id="mission-content"
              data-reveal
              className={`transition-all duration-700 ${isVisible["mission-content"] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6 text-white">
                Your Stories, <span className="gradient-text">Told Instantly</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                At Reel Now, we believe every moment deserves to be captured and told instantly, 
                with creativity and impact. Founded with a passion for visual storytelling, 
                we specialize in creating quick, engaging, and professional reels that bring 
                events, celebrations, and promotions to life.
              </p>
              <p className="text-white/60 leading-relaxed mb-6">
                From film promotions and corporate events to weddings and personal celebrations, 
                we craft reels that not only capture attention but also leave a lasting impression. 
                With a commitment to speed, creativity, and quality, Reel Now transforms raw 
                moments into powerful stories—delivered instantly, when it matters the most.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div
              id="mission-image"
              data-reveal
              className={`transition-all duration-700 ${isVisible["mission-image"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="glass-card p-2 rounded-3xl">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FIMG_4523%20(2).png?alt=media&token=4c0dcc67-9bcb-4717-93aa-d36ecd936e33"
                  alt="Reel Now Team"
                  className="w-full aspect-square object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div
            id="values-header"
            data-reveal
            className={`text-center mb-16 transition-all duration-700 ${isVisible["values-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 gradient-text-white">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                id={`value-${index}`}
                data-reveal
                className={`glass-card p-6 text-center transition-all duration-700 hover:bg-white/10 ${
                  isVisible[`value-${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                  {value.icon}
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 text-white">{value.title}</h3>
                <p className="text-white/60 text-sm">{value.description}</p>
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
              Ready to Create Something Amazing?
            </h2>
            <p className="text-white/60 mb-8">
              Join thousands of brands and creators who trust Reel Now for their content needs.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold rounded-full text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
