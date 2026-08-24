"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function StickyMobileBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server Side Render / Hydration complete hone se pehle render nahi karega
  if (!mounted) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-white p-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] xl:hidden">
      <Button 
        href={siteConfig.registration.exhibitor} 
        target="_blank" 
        rel="noopener noreferrer" 
        size="sm" 
        variant="cta-exhibitor" 
        className="flex-1"
      >
        Book a Stand
      </Button>
      <Button 
        href={siteConfig.registration.visitor} 
        target="_blank" 
        rel="noopener noreferrer" 
        size="sm" 
        variant="cta-visitor" 
        className="flex-1"
      >
        Register to Visit
      </Button>
    </div>
  );
}