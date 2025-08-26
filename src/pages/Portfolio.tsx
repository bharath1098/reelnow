
import React, { useState } from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import PhotoGallery, { Photo } from "@/components/PhotoGallery";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const allPhotos: Photo[] = [
    {
      id: "p1",
      src: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
      alt: "Landscape photo of mountain alps",
      category: "landscape",
    },
    {
      id: "p2",
      src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
      alt: "River surrounded by rock formation",
      category: "landscape",
    },
    {
      id: "p3",
      src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      alt: "Trees near rocky mountain under blue skies",
      category: "landscape",
    },
    {
      id: "p4",
      src: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
      alt: "Green grass and gray rocky mountain",
      category: "landscape",
    },
    {
      id: "p5",
      src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      alt: "River between mountains under white clouds",
      category: "landscape",
    },
    {
      id: "p6",
      src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      alt: "Low angle photography of trees at daytime",
      category: "landscape",
    },
    {
      id: "p7",
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      alt: "Landscape photography of mountain hit by sun rays",
      category: "landscape",
    },
    {
      id: "p8",
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      alt: "Woman in white long sleeve shirt",
      category: "portrait",
    },
    {
      id: "p9",
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      alt: "Person using MacBook Pro",
      category: "portrait",
    },
    {
      id: "p10",
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      alt: "A woman sitting on a bed using a laptop",
      category: "portrait",
    },
    {
      id: "p11",
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      alt: "Turned on gray laptop computer",
      category: "commercial",
    },
    {
      id: "p12",
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      alt: "Macro photography of black circuit board",
      category: "commercial",
    }
  ];

  const categories = [
    { id: "all", name: "All Work" },
    { id: "landscape", name: "Landscapes" },
    { id: "portrait", name: "Portraits" },
    { id: "commercial", name: "Commercial" },
  ];

  const filteredPhotos = activeCategory === "all" 
    ? allPhotos 
    : allPhotos.filter(photo => photo.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 bg-photo-dark text-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Our Portfolio</h1>
            <div className="w-24 h-1 bg-photo-accent mb-8"></div>
            <p className="max-w-3xl text-gray-300 text-lg">
              Explore our diverse collection of photographs across various styles and subjects.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="mb-10">
            <Tabs 
              defaultValue="all" 
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-[90%]  lg:w-full relative mx-auto"
            >
              <div className="flex justify-center mb-8 max-w-[100%] ">
                <TabsList className="bg-gray-100 p-1 ">
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
                    <PhotoGallery 
                      photos={filteredPhotos}
                      variant="grid"
                      gap={16}
                      className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    />
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
              <a href="/contact">Get in Touch</a>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
