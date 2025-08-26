import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const ProjectCard = ({ id, title, category, image, description }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-photo-accent text-white px-3 py-1 text-xs rounded-full">
          {category}
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-serif text-xl mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <Button 
          asChild
          className="bg-photo-accent hover:bg-photo-accent/90 text-white"
        >
          <Link to={`/projects/${id}`}>View Project</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
