
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  threshold?: number; // visibility threshold (0-1)
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom" | "none";
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  animation = "fade-up",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  const getAnimationClasses = () => {
    if (animation === "none") return "";
    
    const baseClasses = "transition-all duration-700 ease-out";
    const hiddenClasses = {
      "fade-up": "opacity-0 translate-y-10",
      "fade-down": "opacity-0 -translate-y-10",
      "fade-left": "opacity-0 translate-x-10",
      "fade-right": "opacity-0 -translate-x-10",
      "zoom": "opacity-0 scale-95",
    };
    
    return isVisible ? baseClasses : `${baseClasses} ${hiddenClasses[animation]}`;
  };

  return (
    <div
      ref={sectionRef}
      className={cn(className, getAnimationClasses())}
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
