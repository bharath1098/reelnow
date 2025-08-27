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
      id: "c1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography1.JPG?alt=media&token=88528b76-0d08-4237-8147-5e7bccb44eea",
      alt: "culturalPhotography",
      category: "culturalPhotography",
    },
    {
      id: "c2",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography10.jpg?alt=media&token=b6253bda-1bc2-416c-87be-464efb15831f",
      alt: "culturalPhotography",
      category: "culturalPhotography",
    },
    {
      id: "c3",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography2.JPG?alt=media&token=c51ea5d3-bb44-4bee-8086-295822645d39",
      alt: "culturalPhotography",
      category: "culturalPhotography",
    },
    {
      id: "c4",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography3.jpeg?alt=media&token=3f2ea068-779a-48f3-b7b4-4621b934b2ae",
      alt: "culturalPhotography",
      category: "culturalPhotography",
    },
    {
      id: "c5",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography4.jpeg?alt=media&token=deb57f97-718e-47e2-bb8d-46a4b313a0c6",
      alt: "culturalPhotography",
      category: "culturalPhotography",
    },
    {
      id: "c6",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography5.jpeg?alt=media&token=0f2773e6-1765-4356-a1d1-d4f6f6c42845",
      alt: "culturalPhotography",
      category: "culturalPhotography",
    },
    {
      id: "c7",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography6.jpeg?alt=media&token=e082f751-c645-405e-a5fc-0b88cea94b2b",
      alt: "culturalPhotography",
      category: "culturalPhotography",
    },
    {
      id: "c8",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography7.jpg?alt=media&token=3f187565-2f22-4479-9d6f-40780af7063c",
      alt: "culturalPhotography",
      category: "culturalPhotography",
    },
    {
      id: "c9",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography8.jpg?alt=media&token=665137bc-745e-4580-a721-63c15f2e5f75",
      alt: "culturalPhotography",
      category: "culturalPhotography",
    },
    {
      id: "c10",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography9.jpg?alt=media&token=c41d91b2-c46c-4bb3-80ed-9b2e4db9b007",
      alt: "culturalPhotography",
      category: "culturalPhotography",
    },
    {
      id: "p1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography1.JPG?alt=media&token=8f71e554-5e6b-4451-b7d5-2e711e08d0f4",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p2",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography10.jpeg?alt=media&token=f5d9895d-47e3-457d-84a7-31af27c3706f",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p3",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography11.jpeg?alt=media&token=3daf6581-3dae-4062-8f29-96c6fbc2fe43",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p4",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography12.jpeg?alt=media&token=f0bb7a50-9cbe-4b9f-b211-766ed2cb23e0",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p5",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography2.JPG?alt=media&token=e5a902f5-e8c0-4bde-a862-596ef003f25c",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p6",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography3.JPG?alt=media&token=856debe0-5eb7-4c03-8f96-fa4fff996819",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p7",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography4.JPG?alt=media&token=5e913c36-3dee-461d-93f2-e44842740579",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p8",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography5.JPG?alt=media&token=352217ae-58c8-4ea8-ad3a-20900cee0bde",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p9",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography6.JPG?alt=media&token=17747c19-3045-4410-9582-fdb27c412554",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p10",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography7.JPG?alt=media&token=38730045-a649-4bac-8bb4-04974624b2cc",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p11",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography8.jpeg?alt=media&token=a0a0580f-9ec4-4db8-a64a-519049c30eea",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "p12",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography9.jpeg?alt=media&token=3797f408-3aac-4786-a284-c05d2022a821",
      alt: "productPhotography",
      category: "productPhotography",
    },
    {
      id: "k1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fkids%20Photography%2FkidsPhotography1.jpeg?alt=media&token=2f8561a5-de4f-4a9c-9fb3-764faab475f4",
      alt: "kidsPhotography",
      category: "kidsPhotography",
    },
    {
      id: "k2",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fkids%20Photography%2FkidsPhotography2.jpeg?alt=media&token=393230bf-5387-4776-83f9-172b6cf45f00",
      alt: "kidsPhotography",
      category: "kidsPhotography",
    },
    {
      id: "k3",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fkids%20Photography%2FkidsPhotography3.jpeg?alt=media&token=ec2ba534-22e8-4d87-899c-595629db6861",
      alt: "kidsPhotography",
      category: "kidsPhotography",
    },
    {
      id: "k4",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fkids%20Photography%2FkidsPhotography4.jpeg?alt=media&token=035711a6-aa3e-41f4-b647-851bc310d9ab",
      alt: "kidsPhotography",
      category: "kidsPhotography",
    },
    {
      id: "pt1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fpets%20Photography%2FpetPhotography1.JPG?alt=media&token=fc5a725c-96f1-44cc-9a77-a6932d38f75b",
      alt: "petPhotography",
      category: "petPhotography",
    },
    {
      id: "pt2",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fpets%20Photography%2FpetsPhotography2.JPG?alt=media&token=946d4dfd-c49a-4f8f-890a-7514f15e1c17",
      alt: "petPhotography",
      category: "petPhotography",
    },
    {
      id: "f1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Ffood%20Photography%2FIMG_1874.JPG?alt=media&token=4dfa9937-f2dd-4cf5-9fb3-a15ffa5df5e7",
      alt: "foodPhotography",
      category: "foodPhotography",
    },
    {
      id: "f2",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Ffood%20Photography%2FfoodPhotography1.JPG?alt=media&token=f85af961-51d2-470d-a183-a5427413bb06",
      alt: "foodPhotography",
      category: "foodPhotography",
    },
    {
      id: "w1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fwedding%20photography%2FweddingPhotography.JPG?alt=media&token=8adcbeee-446f-4300-affd-c4a20ac67e19",
      alt: "weddingsAndBirthdays",
      category: "weddingsAndBirthdays",
    },
    {
      id: "m1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fevents%20photography%2FeventPhotography1.JPG?alt=media&token=40e38241-8b06-4359-b266-92ad3e947972",
      alt: "movieEventsAndPromotions",
      category: "movieEventsAndPromotions",
    },
    {
      id: "m2",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fevents%20photography%2FeventPhotography2.jpeg?alt=media&token=c9b26b19-9b90-4cb5-8a7d-96b29e4ba9ed",
      alt: "movieEventsAndPromotions",
      category: "movieEventsAndPromotions",
    },
  ];

  const categories = [
    { id: "all", name: "All Work" },
    { id: "movieEventsAndPromotions", name: "Movie Events And Promotions" },
    {
      id: "corporateEventsAndIndustrialCoverage",
      name: "Corporate Events And Industrial Coverage",
    },
    { id: "weddingsAndBirthdays", name: "Weddings And Birthdays" },
    { id: "productPhotography", name: "Product Photography" },
    { id: "petPhotography", name: "Pet Photography" },
    { id: "culturalPhotography", name: "Cultural Photography" },
    { id: "kidsPhotography", name: "Kids Photography" },
    { id: "foodPhotography", name: "Food Photography" },
  ];

  const filteredPhotos =
    activeCategory === "all"
      ? allPhotos
      : allPhotos.filter((photo) => photo.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-5 bg-photo-dark text-white">
        <div className="container mx-auto !max-w-full">
          <AnimatedSection animation="fade-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-5xl mb-6">
              Our Portfolio
            </h1>
            <div className="w-24 h-1 bg-photo-accent mb-8"></div>
            <p className="max-w-3xl text-gray-300 text-lg">
              Explore our diverse collection of photographs across various
              styles and subjects.
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
              className="w-[95%]  lg:w-full relative mx-auto"
            >
              <div className="flex justify-center mb-8 max-w-[100%] ">
                <TabsList
                  className="bg-gray-100 p-1 overflow-x-auto overflow-y-hidden justify-start
    [&::-webkit-scrollbar]:h-[3px]
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-gray-400 hover:[&::-webkit-scrollbar-thumb]:bg-gray-500
    [&::-webkit-scrollbar-thumb]:rounded-full "
                >
                  {categories.map((category) => (
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

              {categories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="mt-0"
                >
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
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Interested in Working Together?
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-8">
              Whether you need photography for your wedding, family portrait, or
              business, we'd love to discuss how we can help capture your
              vision.
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
