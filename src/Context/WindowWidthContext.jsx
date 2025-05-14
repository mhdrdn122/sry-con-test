import { createContext, useState, useEffect } from "react";

export const widthWindow = createContext();

const WidthWindowProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <widthWindow.Provider value={width}>
      {children}
    </widthWindow.Provider>
  );
};

export default WidthWindowProvider;