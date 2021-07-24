import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    vw: undefined,
    vh: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        vw: Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0,
        ),
        vh: Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0,
        ),
      });
    }
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
