"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ButtonToTop = ({
  className,
  forceHide = false
}: {
  className?: string;
  forceHide?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[9999] rounded-full shadow-lg transition-all duration-300 ${
        forceHide || !isVisible 
          ? "opacity-0 translate-y-10 pointer-events-none" 
          : "opacity-100 translate-y-0"
      } ${className}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
};