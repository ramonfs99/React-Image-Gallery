import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

export const ImageContext = createContext()

export const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('https://api.unsplash.com/photos/?client_id=Gi9Lr6UN_06J2rHzAIa8UfTD3i8feudPlUEPZHXWbWs')
          .then((response) => response.json())
          .then((data) => setImages(data))
          .catch((error) => console.error('Error fetching images:', error));
      }, []);

      return (
        <ImageContext.Provider value={{ images }}>
          { children }
        </ImageContext.Provider>
      );
}