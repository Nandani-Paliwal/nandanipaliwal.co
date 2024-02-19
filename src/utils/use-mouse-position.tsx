import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY + window.scrollY });
    };
    const handleScroll = () => {
      setMousePosition((prevPos) => ({
        x: prevPos.x,
        y: prevPos.y + window.scrollY,
      }));
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 
  return (
    <motion.div
      animate={{ x: mousePosition.x, y: mousePosition.y}}
      transition={{ type: "spring", stiffness: 350, damping: 5, mass: 0.5 }}
      className="mask"
    ></motion.div>
  );
}

pn