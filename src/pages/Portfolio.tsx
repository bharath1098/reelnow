import React, { useMemo, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PhotoGallery, { Photo } from "@/components/PhotoGallery";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
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

  const allPhotos: Photo[] = [
    {
      id: "c1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography1.JPG?alt=media&token=88528b76-0d08-4237-8147-5e7bccb44eea",
      alt: "Cultural Photography",
      category: "cultural",
    },
    {
      id: "c2",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography10.jpg?alt=media&token=b6253bda-1bc2-416c-87be-464efb15831f",
      alt: "Cultural Photography",
      category: "cultural",
    },
    {
      id: "c3",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography2.JPG?alt=media&token=c51ea5d3-bb44-4bee-8086-295822645d39",
      alt: "Cultural Photography",
      category: "cultural",
    },
    {
      id: "p1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography1.JPG?alt=media&token=8f71e554-5e6b-4451-b7d5-2e711e08d0f4",
      alt: "Product Photography",
      category: "product",
    },
    {
      id: "p2",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography10.jpeg?alt=media&token=f5d9895d-47e3-457d-84a7-31af27c3706f",
      alt: "Product Photography",
      category: "product",
    },
    {
      id: "pt1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fpets%20Photography%2FpetPhotography1.JPG?alt=media&token=fc5a725c-96f1-44cc-9a77-a6932d38f75b",
      alt: "Pet Photography",
      category: "pets",
    },
    {
      id: "f1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Ffood%20Photography%2FIMG_1874.JPG?alt=media&token=4dfa9937-f2dd-4cf5-9fb3-a15ffa5df5e7",
      alt: "Food Photography",
      category: "food",
    },
    {
      id: "m1",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fevents%20photography%2FeventPhotography1.JPG?alt=media&token=40e38241-8b06-4359-b266-92ad3e947972",
      alt: "Event Photography",
      category: "events",
    },
    {
      id: "m2",
      src: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fevents%20photography%2FeventPhotography2.jpeg?alt=media&token=c9b26b19-9b90-4cb5-8a7d-96b29e4ba9ed",
      alt: "Event Photography",
      category: "events",
    },
  ];

  const categories = [
    { id: "all", name: "All Work" },
    { id: "events", name: "Events" },
    { id: "product", name: "Product" },
    { id: "cultural", name: "Cultural" },
    { id: "pets", name: "Pets" },
    { id: "food", name: "Food" },
  ];

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return allPhotos;
    return allPhotos.filter((p) => p.category === activeCategory);
  }, [activeCategory, allPhotos]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Our Work</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6 gradient-text-white">
            Portfolio
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            Explore our diverse collection of reels and photographs across various styles.
          </p>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Category Tabs */}
          <div 
            id="tabs"
            data-reveal
            className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 ${isVisible["tabs"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black"
                    : "glass text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery */}
          <div
            id="gallery"
            data-reveal
            className={`transition-all duration-700 ${isVisible["gallery"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <PhotoGallery
              photos={filteredPhotos}
              variant="grid"
              gap={16}
              className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10" />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white">
              Want to See More?
            </h2>
            <p className="text-white/60 mb-8">
              Let's create something amazing together. Book your reel session today.
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

export default Portfolio;
