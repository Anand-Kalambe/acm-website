import React, { useRef, useEffect, useState } from "react";

export const ScrollStackItem = ({ children }) => (
  <div className="relative w-full h-full flex items-center justify-center snap-start">
    {children}
  </div>
);

const ScrollStack = ({ children }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const screenHeight = containerRef.current.clientHeight;
        const index = Math.round(scrollTop / screenHeight);
        setActiveIndex(index);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-scroll scroll-smooth snap-y snap-mandatory no-scrollbar"
    >
      {React.Children.map(children, (child, i) => (
        <div
          className={`h-full transition-opacity duration-500 ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;
