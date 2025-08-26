
import React from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  const milestones = [
    {
      year: "2010",
      title: "Studio Founded",
      description: "Started our journey with a small studio and a big vision.",
    },
    {
      year: "2013",
      title: "National Recognition",
      description: "First national publication feature and award for portrait photography.",
    },
    {
      year: "2016",
      title: "Studio Expansion",
      description: "Expanded to our current location with state-of-the-art equipment.",
    },
    {
      year: "2019",
      title: "International Award",
      description: "Recognized internationally for our landscape photography series.",
    },
    {
      year: "2022",
      title: "Published Collection",
      description: "Released our first published collection of fine art photography.",
    },
  ];

  const photographyGear = [
    "Canon EOS R5",
    "Sony Alpha a7R IV",
    "Various Professional Lenses (24-70mm f/2.8, 70-200mm f/2.8, etc.)",
    "Profoto Lighting Equipment",
    "DJI Drone for Aerial Photography",
    "Professional Editing Workstation",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 bg-photo-dark text-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">About Us</h1>
            <div className="w-24 h-1 bg-photo-accent mb-8"></div>
            <p className="max-w-3xl text-gray-300 text-lg">
              We're a team of passionate photographers dedicated to capturing life's most beautiful moments and transforming them into lasting memories.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-right">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Professional Photographer"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </AnimatedSection>

            <AnimatedSection animation="fade-left" className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl">Our Story</h2>
              <p className="text-gray-700">
                Founded in 2010, Vrukshy film's Photography began with a simple mission: to capture 
                authentic moments with an artistic eye. What started as a solo endeavor has grown into 
                a team of talented photographers, each bringing their unique perspective and expertise.
              </p>
              <p className="text-gray-700">
                Our approach combines technical excellence with creative vision, allowing us to create 
                images that not only document moments but also tell stories. We believe that the best 
                photographs happen when clients feel comfortable and authentic, which is why we prioritize 
                building relationships and understanding the unique needs of each project.
              </p>
              <p className="text-gray-700">
                Today, we're proud to have documented thousands of special moments, from intimate 
                weddings to grand commercial projects, always maintaining our core values of 
                authenticity, creativity, and excellence.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">Our Photography Philosophy</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <AnimatedSection animation="fade-up" delay={100} className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-photo-accent text-white flex items-center justify-center text-2xl">
                1
              </div>
              <h3 className="font-serif text-xl">Authenticity</h3>
              <p className="text-gray-600">
                We believe in capturing authentic moments and genuine emotions rather than forced poses.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200} className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-photo-accent text-white flex items-center justify-center text-2xl">
                2
              </div>
              <h3 className="font-serif text-xl">Artistry</h3>
              <p className="text-gray-600">
                Every photograph is an opportunity to create art through thoughtful composition and lighting.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300} className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-photo-accent text-white flex items-center justify-center text-2xl">
                3
              </div>
              <h3 className="font-serif text-xl">Excellence</h3>
              <p className="text-gray-600">
                We're committed to technical excellence and continuous improvement in our craft.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="mb-14">
            <h2 className="font-serif text-3xl md:text-4xl text-center">Our Journey</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
          </AnimatedSection>

          <div className="space-y-6 max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="mr-6">
                        <span className="text-xl font-bold text-photo-accent">{milestone.year}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{milestone.title}</h3>
                        <p className="text-gray-600 mt-1">{milestone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Get to know the talented photographers behind our stunning images.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-1">Alex Johnson</h3>
                  <p className="text-photo-accent mb-3">Lead Photographer</p>
                  <p className="text-gray-600">
                    Alex specializes in portrait and wedding photography with 15 years of experience.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-1">Samantha Lee</h3>
                  <p className="text-photo-accent mb-3">Photography Director</p>
                  <p className="text-gray-600">
                    Samantha has a unique eye for composition and specializes in creative direction.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-1">Michael Chen</h3>
                  <p className="text-photo-accent mb-3">Landscape Specialist</p>
                  <p className="text-gray-600">
                    Michael captures breathtaking landscapes and has been published in National Geographic.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-center">Our Equipment</h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-center text-gray-600">
              We invest in professional-grade equipment to ensure the highest quality results.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {photographyGear.map((item, index) => (
                    <React.Fragment key={index}>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 text-photo-accent mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                      {index < photographyGear.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
