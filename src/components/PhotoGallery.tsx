
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  width?: number;
  height?: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
  className?: string;
  variant?: "grid" | "masonry";
  gap?: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  className = "",
  variant = "grid",
  gap = 4,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  if (variant === "masonry") {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", className)} style={{ gap: `${gap}px` }}>
        {photos.map((photo) => (
          <div 
            key={photo.id}
            className="relative overflow-hidden photo-hover cursor-pointer"
            onClick={() => handlePhotoClick(photo)}
          >
            <img 
              src={photo.src} 
              alt={photo.alt} 
              className="w-full h-auto object-cover"
              loading="lazy"
            /> 
          </div>
        ))}
        
        <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
            {selectedPhoto && (
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.alt} 
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", className)} style={{ gap: `${gap}px` }}>
      {photos.map((photo) => (
        <div 
          key={photo.id}
          className="relative aspect-square overflow-hidden photo-hover cursor-pointer"
          onClick={() => handlePhotoClick(photo)}
        >
          <img 
            src={photo.src} 
            alt={photo.alt} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
      
      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
          {selectedPhoto && (
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.alt} 
              className="w-full h-auto object-contain max-h-[85vh]"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoGallery;
