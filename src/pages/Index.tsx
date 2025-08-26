import React, { useState } from "react";
import Layout from "@/components/Layout";
import ImageCarousel from "@/components/ImageCarousel";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { projects } from "./Projects";
import { Dialog, DialogContent } from "@/components/ui/dialog";


export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  width?: number;
  height?: number;
}


const Index = () => {
  const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    alt: "Beautiful mountain landscape at dawn",
    title: "Capturing Life's Precious Moments",
    subtitle: "Elegant photography that tells your unique story",
  },
  {
    src: "https://1drv.ms/i/c/2a8c0acff387c2aa/IQTUoKQEsZViR5bIhdbhvPI1AfvhmeOEpqFHnnv7bOvg8eg?width=1024",
    alt: "Bride and groom during a vibrant Haldi ceremony in Karnataka",
    title: "Golden Moments",
    subtitle: "Celebrating love with turmeric traditions in Karnataka",
  },  
  {
    src: "https://1drv.ms/i/c/2a8c0acff387c2aa/IQSY1gF8qLHMRq9Zs3lnfZShAY1WrRz66VpGjtRpN9bl7B4?width=1024",
    alt: "Bride showcasing intricate Mehndi designs during the ceremony",
    title: "Mehndi Magic",
    subtitle: "Celebrating love with vibrant hues and intricate designs",
  }
,  
  {
    src: "https://1drv.ms/i/c/2a8c0acff387c2aa/IQRoa30nzAVLR62hkbsdM_saAfa8GD4ZqP6ksazxgyAIl2g?width=1024",
    alt: "Traditional South Indian wedding ceremony in Bangalore",
    title: "Sacred Vows",
    subtitle: "Celebrating love in the heart of Karnataka",
  },
  {
    src: "https://1drv.ms/u/c/2a8c0acff387c2aa/IQTAu5jBTZD4Rq3fdhZkyp6rAUUxe2hOeLrcdSlNZ-6xmKE?width=1024",
    alt: "Bride and groom during a wedding photoshoot in Mysore",
    title: "Royal Union",
    subtitle: "A majestic wedding amidst Mysore's heritage",
  },
 
  {
    src: "https://1drv.ms/i/c/2a8c0acff387c2aa/IQTNBE67Si83TKBmbHkLRRvpATT8PrfIO6K4R4a4QChsMYg?width=1024",
    alt: "Fashion photoshoot in the streets of Bangalore",
    title: "Urban Chic",
    subtitle: "Modern style meets historic charm",
  },
  {
    src: "https://1drv.ms/i/c/2a8c0acff387c2aa/IQSDNpB5n9JSTbf-60lY2Ep5AWJAkNhHSeiTidnDjQlFgfE?width=1024",
    alt: "Lush green landscapes of Coorg",
    title: "Nature's Embrace",
    subtitle: "Exploring the serene beauty of Karnataka",
  },
  {
    src: "https://1drv.ms/i/c/2a8c0acff387c2aa/IQRon3ro_WHiR5x4G9bqnRiDAVchiJ7cZ1VTIBMEpUinzkk?width=1024",
    alt: "Sunset over the hills in Chikmagalur",
    title: "Golden Horizons",
    subtitle: "Capturing the magic of dusk in the Western Ghats",
  },
  {
    src: "/assets/images/waterfalls.jpeg",
    alt: "Waterfalls in the forests of Karnataka",
    title: "Mystic Falls",
    subtitle: "The enchanting waterfalls of Karnataka",
  },
];

  

  const featuredServices = [
    {
      title: "Portrait Photography",
      description: "Authentic portraits that capture your true essence and personality in stunning detail.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      pricing: "From ₹4,999",
      link: "/services",
      features: ["Indoor & Outdoor Sessions", "Professional Editing", "Digital Files Included"],
    },
    {
      title: "Wedding Photography",
      description: "Documenting your special day with creativity, emotion, and attention to every precious moment.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      pricing: "From ₹49,999",
      link: "/services",
      features: ["Full Day Coverage", "Second Photographer", "Wedding Album Design"],
    },
    {
      title: "Commercial Photography",
      description: "Elevate your brand with stunning commercial photography that tells your unique story.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      pricing: "Custom Quotes",
      link: "/services",
      features: ["Product Photography", "Brand Storytelling", "Marketing Assets"],
    },
  ];
  

  const testimonials = [
    {
      quote: "Working with this photography team was an absolute pleasure. They captured our wedding day perfectly, and the photos exceeded our expectations.",
      author: "Sarah & Michael",
      role: "Wedding Clients",
    },
    {
      quote: "The attention to detail and creativity shown in our family portraits was incredible. We'll cherish these photos forever!",
      author: "Jennifer Smith",
      role: "Family Portrait Session",
    },
    {
      quote: "The commercial photography for our brand has transformed our marketing materials. Professional, creative, and exactly what we needed.",
      author: "David Wilson",
      role: "Marketing Director",
    },
  ];

  // Get featured projects (first 3)
  const featuredProjects = projects.slice(0, 3);

   const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
      setSelectedPhoto(photo);
    };
  
    const closeModal = () => {
      setSelectedPhoto(null);
    };

  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <section className="relative">
        <ImageCarousel 
          images={heroImages}
          autoplay={true}
          showDots={true}
          showArrows={true}
          textPosition="center"
          height="h-screen"
        />
      </section>

      {/* About Preview Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">Elegance in Every Frame</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              With over a decade of experience capturing life's most beautiful moments, 
              we blend technical excellence with artistic vision to create photographs 
              that will be cherished for generations.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <AnimatedSection animation="fade-right" delay={100}>
              <img
                src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
                alt="Photographer in nature"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200} className="space-y-6">
              <h3 className="font-serif text-2xl md:text-3xl">Passionate About Creating Timeless Images</h3>
              <p className="text-gray-600">
                We believe that photography is about more than just taking pictures – it's about telling stories,
                preserving emotions, and creating art that speaks to the heart. Every shoot is approached with
                creativity, attention to detail, and a commitment to excellence.
              </p>
              <p className="text-gray-600">
                Whether it's a wedding day, family portrait, or commercial project, we invest our heart and soul
                into creating images that exceed expectations.
              </p>
              <Button 
                asChild 
                className="bg-photo-accent hover:bg-photo-accent/90 text-white mt-4"
              >
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Projects Section - NEW SECTION */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Explore some of our recent photography projects across different styles and occasions.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.id} animation="fade-up" delay={index * 100}>
                <ProjectCard 
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  description={project.description}
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={400} className="text-center mt-12">
            <Button 
              asChild 
              className="bg-photo-accent hover:bg-photo-accent/90 text-white"
            >
              <Link to="/projects">View All Projects</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Explore our range of professional photography services tailored to meet your unique needs.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <AnimatedSection key={service.title} animation="fade-up" delay={index * 100}>
                <ServiceCard {...service} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={400} className="text-center mt-12">
            <Button 
              asChild 
              className="bg-photo-accent hover:bg-photo-accent/90 text-white"
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">Our Portfolio</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Browse through a selection of our favorite photographs from recent projects.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
            "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
            "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
            "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
            "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
            "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
          ].map((src, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <img
                src={src}
                alt={`Portfolio image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <span
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-medium"
                  onClick={() =>
                    handlePhotoClick({
                      id: index + 1,
                      src,
                      alt: `Portfolio image ${index + 1}`,
                    })
                  }
                >
                  View
                </span>
              </div>
            </div>
          ))}
</div>

          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={400} className="text-center mt-12">
            <Button 
              asChild 
              className="bg-photo-accent hover:bg-photo-accent/90 text-white"
            >
              <Link to="/portfolio">View Full Portfolio</Link>
            </Button>
          </AnimatedSection>
        </div>
       
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">Client Testimonials</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Don't just take our word for it. Here's what our clients have to say.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <TestimonialCard {...testimonial} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section 
        className="py-24 bg-photo-dark bg-opacity-90 text-white bg-cover bg-center bg-blend-overlay"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1470813740244-df37b8c1edcb)" }}
      >
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">Ready to Capture Your Story?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-300">
              Let's create beautiful photographs together. Contact us today to discuss your project or book a session.
            </p>
            <Button 
              asChild 
              className="bg-photo-accent hover:bg-photo-accent/90 text-white px-8 py-6"
              size="lg"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
          {selectedPhoto && (
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.alt} 
              className="w-full h-auto object-contain max-h-[85vh]"
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Index;