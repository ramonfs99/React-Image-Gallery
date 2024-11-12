import { createContext, useState, useEffect, useContext } from "react";

export const AppContext = createContext()
export const useAppContext = () => useContext(AppContext);

export const ContextProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [pageTitle, setPageTitle] = useState("Welcome")
    useEffect(() => {
        fetch('https://api.unsplash.com/photos/?client_id=Gi9Lr6UN_06J2rHzAIa8UfTD3i8feudPlUEPZHXWbWs')
          .then((response) => response.json())
          .then((data) => setImages(data))
          .catch((error) => console.error('Error fetching images:', error));
      }, []);

      return (
        <AppContext.Provider value={{
          images,
          setImages,
          pageTitle,
          setPageTitle
          }}>
          { children }
        </AppContext.Provider>
      );
}