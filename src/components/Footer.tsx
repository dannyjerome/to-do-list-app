"use client";
import { useEffect, useState } from "react";
import { version } from "../../package.json";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      const isAtBottom =
        window.innerHeight + currentScrollY >= document.body.offsetHeight;

      setIsVisible(isScrollingUp || isAtBottom);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const year = new Date().getFullYear();
  return (
    <footer
      className={`fixed bottom-0 left-0 w-full   text-center p-4 transition-transform ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="w-1/3"></div> {/* Empty div to create spacing */}
        <div className="w-1/3 text-center">© {year} Danny.</div> {/* Centered */}
        <div className="w-1/3 text-right">{version}</div> {/* Right-aligned */}
      </div>
    </footer>
  );
}
