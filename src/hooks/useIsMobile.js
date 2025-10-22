import { useState, useEffect } from 'react';

/**
 * A hook to check if the screen width is below a mobile breakpoint.
 * @param {number} breakpoint - The max width (in px) to be considered mobile.
 * @returns {boolean} - True if the screen width is less than the breakpoint.
 */
const useIsMobile = (breakpoint = 768) => {
  // Check window availability for server-side rendering
  const isClient = typeof window === 'object';
  
  const [isMobile, setIsMobile] = useState(
    isClient ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    if (!isClient) {
      return; // Don't run on server
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint, isClient]);

  return isMobile;
};

export default useIsMobile;