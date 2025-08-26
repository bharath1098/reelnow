
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  image?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  image,
  className = "",
}) => {
  return (
    <Card className={cn("bg-white border overflow-hidden h-full transition-shadow hover:shadow-md", className)}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <div className="text-3xl text-photo-accent mb-4">"</div>
          <p className="italic text-gray-700 mb-6">{quote}</p>
        </div>
        
        <div className="flex items-center mt-4">
          {image && (
            <div className="mr-4">
              <img
                src={image}
                alt={author}
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{author}</p>
            {role && <p className="text-sm text-gray-500">{role}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
