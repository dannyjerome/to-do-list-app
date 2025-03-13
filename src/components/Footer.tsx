"use client";
import { useEffect, useState } from "react";

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
      © {year} Danny.
    </footer>
  );
}
