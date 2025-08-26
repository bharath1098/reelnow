
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-white px-6">
        <AnimatedSection animation="fade-up" className="text-center max-w-lg">
          <div className="mb-8 animate-bounce-slow">
            <h1 className="text-9xl font-bold text-photo-accent">404</h1>
          </div>
          <h2 className="font-serif text-3xl mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="space-x-4">
            <Button asChild className="bg-photo-dark hover:bg-photo-dark/90">
              <Link to="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default NotFound;
