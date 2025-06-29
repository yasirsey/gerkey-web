"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LoadingSpinner } from "./ui/loading-spinner";

export function NavigationLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    // Path değiştiğinde loading'i başlat
    if (previousPath && previousPath !== pathname) {
      setIsLoading(true);
      
      // Biraz daha uzun tutalım ki kullanıcı görebilsin
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }
    
    setPreviousPath(pathname);
  }, [pathname, previousPath]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in-0 duration-200">
      <div className="flex flex-col items-center space-y-4 animate-in slide-in-from-bottom-4 duration-300">
        <div className="relative">
          <LoadingSpinner size="lg" />
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
        </div>
        <p className="text-sm font-medium text-foreground animate-pulse">
          Sayfa yükleniyor...
        </p>
      </div>
    </div>
  );
} 