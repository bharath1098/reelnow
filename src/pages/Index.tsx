import React, { useState } from "react";
import Layout from "@/components/Layout";
import ImageCarousel from "@/components/ImageCarousel";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// import { projects } from "./Projects";
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
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fhome_slide.jpg?alt=media&token=9e527343-5d02-4285-baf0-ef502090b886",
      alt: "a man standing",
      title: "Your story told instantly",
      subtitle: "We shoot edit deliver instantly",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FMOVIE_PHOTOSHOOT.jpg?alt=media&token=2fe43a60-4a17-4b30-bef4-3ab1ec22da3b",
      alt: "Two celebrity singers performing on stage",
      title: "Movie Events & Promotions",
      subtitle: "",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fcorporate.jpeg?alt=media&token=84a37736-e961-402d-9c0b-54ef9f6dc424",
      alt: "Corporate outing",
      title: "Corporate Events & Industrial Coverage",
      subtitle: "",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fwedding_photoshoot.jpg?alt=media&token=1cea03ba-2d47-4d34-abd3-c93a7e6552a4",
      alt: "Traditional South Indian bride",
      title: "Weddings",
      subtitle: "",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fbirthday_photoshoot.jpg?alt=media&token=1289bbe6-aa38-453d-bcdd-b11eba059b65",
      alt: "a cup cake with candle",
      title: "Birthdays",
      subtitle: "",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct_photoshoot.jpg?alt=media&token=39693a3b-5688-4f1d-b87c-ef56954bee9a",
      alt: "a bottle of gucci perfume",
      title: "Product Photography",
      subtitle: "",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fpet_photoshoot.jpg?alt=media&token=947ce628-2177-40fa-829a-55ffca2e1d50",
      alt: "A puppy",
      title: "Pet Photography",
      subtitle: "",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fcultural_photoshoot.jpg?alt=media&token=2e80c046-6762-4cee-94e2-10ce9f614642",
      alt: "A cultural photoshoot",
      title: "Cultural Photography",
      subtitle: "",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fpersonalized_photoshoot.jpeg?alt=media&token=f9810ea6-3d37-485c-b0de-737f53c7ad9d",
      alt: "A man holding a camera",
      title: "Personalized Fashion Shoots",
      subtitle: "",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Ffood_photoshoot.jpg?alt=media&token=c7cbf89a-98a8-429e-8fda-c5b85b152b7b",
      alt: "A tea cup",
      title: "Food Photography",
      subtitle: "",
    },
  ];

  const featuredServices = [
    {
      title: "Portrait Photography",
      description:
        "Authentic portraits that capture your true essence and personality in stunning detail.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      pricing: "From ₹4,999",
      link: "/services",
      features: [
        "Indoor & Outdoor Sessions",
        "Professional Editing",
        "Digital Files Included",
      ],
    },
    {
      title: "Wedding Photography",
      description:
        "Documenting your special day with creativity, emotion, and attention to every precious moment.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      pricing: "From ₹49,999",
      link: "/services",
      features: [
        "Full Day Coverage",
        "Second Photographer",
        "Wedding Album Design",
      ],
    },
    {
      title: "Commercial Photography",
      description:
        "Elevate your brand with stunning commercial photography that tells your unique story.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      pricing: "Custom Quotes",
      link: "/services",
      features: [
        "Product Photography",
        "Brand Storytelling",
        "Marketing Assets",
      ],
    },
  ];

  const testimonials = [
    {
      quote:
        "Working with this photography team was an absolute pleasure. They captured our wedding day perfectly, and the photos exceeded our expectations.",
      author: "Sarah & Michael",
      role: "Wedding Clients",
    },
    {
      quote:
        "The attention to detail and creativity shown in our family portraits was incredible. We'll cherish these photos forever!",
      author: "Jennifer Smith",
      role: "Family Portrait Session",
    },
    {
      quote:
        "The commercial photography for our brand has transformed our marketing materials. Professional, creative, and exactly what we needed.",
      author: "David Wilson",
      role: "Marketing Director",
    },
  ];

  // Get featured projects (first 3)
  // const featuredProjects = projects.slice(0, 3);

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
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
              Elegance in Every Shot
            </h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              With experience capturing life's most beautiful moments, we blend
              technical excellence with artistic vision to create photographs
              that will be cherished for generations.
            </p>
          </AnimatedSection>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <AnimatedSection animation="fade-right" delay={100}>
              <img
                src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
                alt="Photographer in nature"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </AnimatedSection>

            <AnimatedSection
              animation="fade-left"
              delay={200}
              className="space-y-6"
            >
              <h3 className="font-serif text-2xl md:text-3xl">
                Passionate About Creating Timeless Images
              </h3>
              <p className="text-gray-600">
                We believe that photography is about more than just taking
                pictures – it's about telling stories, preserving emotions, and
                creating art that speaks to the heart. Every shoot is approached
                with creativity, attention to detail, and a commitment to
                excellence.
              </p>
              <p className="text-gray-600">
                Whether it's a wedding day, family portrait, or commercial
                project, we invest our heart and soul into creating images that
                exceed expectations.
              </p>
              <Button
                asChild
                className="bg-photo-accent hover:bg-photo-accent/90 text-white mt-4"
              >
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </AnimatedSection>
          </div> */}
        </div>
      </section>

      {/* Featured Projects Section - NEW SECTION */}
      {/* <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Explore some of our recent photography projects across different
              styles and occasions.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                animation="fade-up"
                delay={index * 100}
              >
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

          <AnimatedSection
            animation="fade-up"
            delay={400}
            className="text-center mt-12"
          >
            <Button
              asChild
              className="bg-photo-accent hover:bg-photo-accent/90 text-white"
            >
              <Link to="/projects">View All Projects</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section> */}

      {/* Services Preview */}
      {/* <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Explore our range of professional photography services tailored to
              meet your unique needs.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <AnimatedSection
                key={service.title}
                animation="fade-up"
                delay={index * 100}
              >
                <ServiceCard {...service} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection
            animation="fade-up"
            delay={400}
            className="text-center mt-12"
          >
            <Button
              asChild
              className="bg-photo-accent hover:bg-photo-accent/90 text-white"
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section> */}

      {/* Portfolio Preview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
              Our Portfolio
            </h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Browse through a selection of our favorite photographs from recent
              projects.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography10.jpg?alt=media&token=b6253bda-1bc2-416c-87be-464efb15831f",
                "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography10.jpeg?alt=media&token=f5d9895d-47e3-457d-84a7-31af27c3706f",
                "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography2.JPG?alt=media&token=c51ea5d3-bb44-4bee-8086-295822645d39",
                "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography2.JPG?alt=media&token=e5a902f5-e8c0-4bde-a862-596ef003f25c",
                "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fpets%20Photography%2FpetPhotography1.JPG?alt=media&token=fc5a725c-96f1-44cc-9a77-a6932d38f75b",
                "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography5.jpeg?alt=media&token=0f2773e6-1765-4356-a1d1-d4f6f6c42845",
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
                          id: (index + 1).toString(),
                          src,
                          alt: `Portfolio image ${index + 1}`,
                          category: "Portfolio",
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

          <AnimatedSection
            animation="fade-up"
            delay={400}
            className="text-center mt-12"
          >
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
      {/* <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
              Client Testimonials
            </h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Don't just take our word for it. Here's what our clients have to
              say.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <TestimonialCard {...testimonial} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact CTA */}
      <section
        className="py-24 bg-photo-dark bg-opacity-90 text-white bg-cover bg-center bg-blend-overlay"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1470813740244-df37b8c1edcb)",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
              Ready to Capture Your Story?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-300">
              Let's create beautiful photographs together. Contact us today to
              discuss your project or book a session.
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

      <Dialog
        open={!!selectedPhoto}
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
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
