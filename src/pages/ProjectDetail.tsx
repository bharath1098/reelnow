import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { projects } from "./Projects";
import PhotoGallery, { Photo } from "@/components/PhotoGallery";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the project by ID
    const foundProject = projects.find(p => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      // If project not found, navigate to 404
      navigate("/not-found", { replace: true });
    }
    
    setLoading(false);
  }, [id, navigate]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-24 px-6 text-center">
          <p>Loading project...</p>
        </div>
      </Layout>
    );
  }
  
  if (!project) {
    return null; // This shouldn't render as we navigate to 404 if project not found
  }
  
  // Convert project gallery to the format expected by PhotoGallery
  const galleryPhotos: Photo[] = project.gallery.map((src: string, index: number) => ({
    id: `${project.id}-photo-${index}`,
    src,
    alt: `${project.title} - Photo ${index + 1}`,
    category: project.category,
  }));

  return (
    <Layout>
      {/* Hero Section with Main Image */}
      <section 
        className="pt-24 pb-12 px-6 bg-cover bg-center bg-photo-dark text-white bg-blend-overlay"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up">
            <Button 
              asChild 
              variant="ghost" 
              className="text-white mb-6 hover:bg-white/20"
              size="sm"
            >
              <Link to="/projects">
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Projects
              </Link>
            </Button>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">{project.title}</h1>
            <div className="w-24 h-1 bg-photo-accent mb-8"></div>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-photo-accent px-3 py-1 rounded-full text-sm">
                {project.category}
              </span>
              <span className="text-gray-300">
                <strong>Date:</strong> {project.date}
              </span>
              <span className="text-gray-300">
                <strong>Location:</strong> {project.location}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="max-w-3xl">
              <h2 className="font-serif text-2xl md:text-3xl mb-6">About This Project</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {project.fullDescription}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="font-serif text-2xl md:text-3xl mb-8">Gallery</h2>
            <PhotoGallery 
              photos={galleryPhotos} 
              variant="grid"
              className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              gap={16}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="font-serif text-3xl mb-4">Interested in a similar project?</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-8">
              We'd love to discuss your vision and create beautiful photographs for your special moments.
            </p>
            <Button 
              asChild 
              className="bg-photo-accent hover:bg-photo-accent/90 text-white"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
