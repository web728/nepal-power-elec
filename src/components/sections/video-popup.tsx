"use client";

import { useState, useEffect } from "react";

export function VideoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    const timer = setTimeout(() => setIsAnimating(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm transition-opacity duration-300 p-4 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-w-2xl lg:max-w-3xl max-h-[90vh] transition-all duration-300 transform ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#14212b] hover:bg-[#ebbc17] text-white hover:text-[#14212b] font-bold flex items-center justify-center text-sm sm:text-base transition-all duration-200 border border-white/20 shadow-lg"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* Pure Image */}
        <img
          src="/downloads/popup.jpeg"
          alt="Event Popup Banner"
          className="w-full h-auto max-h-[85vh] rounded-xl sm:rounded-2xl object-contain shadow-2xl"
          loading="eager"
        />
      </div>
    </div>
  );
}