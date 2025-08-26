
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  pricing?: string;
  link: string;
  features?: string[];
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  pricing,
  link,
  features = [],
  className = "",
}) => {
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg", className)}>
      <div className="relative h-60 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-serif">{title}</CardTitle>
        {pricing && <CardDescription className="font-medium text-photo-accent">{pricing}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 h-20">{description}</p>
        {features.length > 0 && (
          <ul className="space-y-2 mt-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg 
                  className="w-5 h-5 text-photo-accent mr-2 mt-0.5" 
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
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          asChild 
          className="bg-photo-accent hover:bg-photo-accent/90 text-white w-full"
        >
          <Link to={link}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
