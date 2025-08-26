
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    title?: string;
    subtitle?: string;
  }[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  loop?: boolean;
  imageClassName?: string;
  height?: string;
  overlayColor?: string;
  textPosition?: "center" | "left" | "right" | "bottom";
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplay = false,
  autoplaySpeed = 5000,
  showDots = true,
  showArrows = true,
  className = "",
  loop = true,
  imageClassName = "",
  height = "h-screen",
  overlayColor = "rgba(0, 0, 0, 0.3)",
  textPosition = "center",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    dragFree: false,
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (autoplay && emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, autoplaySpeed);
      
      return () => clearInterval(intervalId);
    }
  }, [autoplay, autoplaySpeed, emblaApi]);

  const textPositionClasses = {
    center: "items-center justify-center text-center",
    left: "items-center justify-start text-left pl-12 md:pl-24",
    right: "items-center justify-end text-right pr-12 md:pr-24",
    bottom: "items-end justify-center text-center pb-16 md:pb-24",
  };

  return (
    <div className={cn("overflow-hidden relative", className, height)}>
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image, index) => (
            <div
              className="relative flex-[0_0_100%] min-w-0 h-full"
              key={index}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${image.src})`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: overlayColor }}
              />
              <div
                className={cn(
                  "absolute inset-0 flex px-4 md:px-12",
                  textPositionClasses[textPosition]
                )}
              >
                <div className="animate-fade-in">
                  {image.title && (
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-white text-shadow-lg mb-4 max-w-3xl">
                      {image.title}
                    </h2>
                  )}
                  {image.subtitle && (
                    <p className="text-lg md:text-xl text-white text-shadow max-w-2xl opacity-90">
                      {image.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <img
                src={image.src}
                alt={image.alt}
                className={cn("w-full h-full object-cover invisible", imageClassName)}
              />
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {showDots && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/70"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 flex-col items-center animate-bounce-slow">
        <span className="text-white text-sm mb-2">Scroll Down</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white animate-bounce-slow"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
};

export default ImageCarousel;
