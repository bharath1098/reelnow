import React, { useState } from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";

// Sample projects data - in a real app, this would come from a database
export const projects = [
  {
    id: "wedding-john-sarah",
    title: "John & Sarah's Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    description: "An elegant summer wedding at Rosewood Manor featuring timeless moments and candid emotions.",
    date: "June 15, 2023",
    location: "Rosewood Manor",
    fullDescription: "John and Sarah celebrated their special day surrounded by family and friends at the beautiful Rosewood Manor. The day was filled with laughter, tears of joy, and unforgettable moments. From the emotional first look to the sparkler exit, every moment was captured with care and attention to detail.",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6",
      "https://images.unsplash.com/photo-1470043201067-764120126eb4",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611"
    ]
  },
  {
    id: "portrait-priya",
    title: "Priya - Fashion Portraits",
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "A modern fashion shoot showcasing Priya's portfolio with urban backdrops and natural lighting.",
    date: "March 3, 2023",
    location: "Downtown Arts District",
    fullDescription: "This fashion portrait session with Priya explored urban environments and natural lighting to create a diverse portfolio of contemporary looks. The downtown arts district provided the perfect backdrop for these stunning fashion portraits.",
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2",
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56"
    ]
  },
  {
    id: "event-tech-conference",
    title: "TechCon 2023",
    category: "Event",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    description: "Documentation of the annual tech conference featuring keynote speakers, workshops, and networking events.",
    date: "September 21, 2023",
    location: "Convention Center",
    fullDescription: "TechCon 2023 brought together industry leaders, innovators, and tech enthusiasts for three days of inspiring talks, hands-on workshops, and valuable networking. The photography coverage captured the energy and excitement of this premiere tech event.",
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
      "https://images.unsplash.com/photo-1560523159-4a9692d222f9",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7"
    ]
  },
  {
    id: "landscape-mountain-escape",
    title: "Mountain Escape Collection",
    category: "Landscape",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    description: "A collection of breathtaking mountain landscapes from the Himalayan range captured during different seasons.",
    date: "Various Dates, 2023",
    location: "Himalayan Range",
    fullDescription: "This collection represents a year-long project to capture the majesty and changing faces of the Himalayan mountain range through different seasons. From snow-capped peaks to lush summer valleys, these photographs showcase nature's grandeur in one of the world's most impressive mountain ranges.",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99",
      "https://images.unsplash.com/photo-1443632864897-14973fa006cf",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99"
    ]
  },
  {
    id: "product-luxury-watches",
    title: "Luxury Watch Collection",
    category: "Product",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
    description: "Studio photography for a premium watch brand featuring detailed macro shots and lifestyle context.",
    date: "April 10, 2023",
    location: "Studio",
    fullDescription: "This commercial product photography session focused on capturing the craftsmanship, details, and elegance of a luxury watch collection. The shoot included macro detail shots as well as lifestyle contexts to showcase these premium timepieces.",
    gallery: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e"
    ]
  },
  {
    id: "wedding-david-emma",
    title: "David & Emma's Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    description: "A beautiful winter wedding at the Grand Hotel, featuring emotional moments and elegant decor.",
    date: "December 12, 2023",
    location: "The Grand Hotel",
    fullDescription: "David and Emma's winter wedding was a magical celebration at the prestigious Grand Hotel. The snow-covered venue created a perfect backdrop for this elegant event. From the heartfelt ceremony to the lively reception, every moment was filled with love and joy.",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
      "https://images.unsplash.com/photo-1509927083803-4bd519298ac4",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a"
    ]
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "Wedding", name: "Wedding" },
    { id: "Portrait", name: "Portrait" },
    { id: "Event", name: "Event" },
    { id: "Landscape", name: "Landscape" },
    { id: "Product", name: "Product" }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 bg-photo-dark text-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Our Projects</h1>
            <div className="w-24 h-1 bg-photo-accent mb-8"></div>
            <p className="max-w-3xl text-gray-300 text-lg">
              Explore our diverse collection of photography projects across various styles and subjects.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section className="py-16 px:1 lg:px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="mb-10">
            <Tabs 
              defaultValue="all" 
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full relative "
            >
              <div className="flex justify-center mb-8 max-w-[100%] mx-auto ">
                <TabsList className="p-1 flex flex-wrap gap-3 mb-9 lg:mb-0">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category.id}
                      value={category.id}
                      className="px-6 py-2 data-[state=active]:bg-photo-accent data-[state=active]:text-white"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <AnimatedSection animation="fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.map(project => (
                        <ProjectCard 
                          key={project.id} 
                          id={project.id} 
                          title={project.title} 
                          category={project.category} 
                          image={project.image} 
                          description={project.description} 
                        />
                      ))}
                    </div>
                  </AnimatedSection>
                </TabsContent>
              ))}
            </Tabs>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Interested in Working Together?</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-8">
              Whether you need photography for your wedding, family portrait, or business, 
              we'd love to discuss how we can help capture your vision.
            </p>
            <Button 
              asChild 
              className="bg-photo-accent hover:bg-photo-accent/90 text-white"
              size="lg"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
