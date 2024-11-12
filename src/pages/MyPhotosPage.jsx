import { useContext, useState, useEffect } from "react";
import { AppContext, useAppContext } from "../contexts/AppContext";


export const MyPhotosPage = () => {
  const { images } = useContext(AppContext);
  const { setPageTitle } = useAppContext();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    setPageTitle("My Photos")
  }, [setPageTitle])

  return (
      <section className="images">
        {images.map((image, index) => (
          <article className={`images__image-container ${activeIndex === index ? 'active' : ''}`} onClick={() => handleClick(index)} key={image.id}>
            <img className="images__image-container__image" src={image.urls.raw} alt={image.alt_description} />
            <button className="images__image-container__button"><img src=".\src\assets\icons\icons8-edit-96.png" alt="" /></button>
            <button className="images__image-container__button"><img src=".\src\assets\icons\icons8-download-100.png" alt="" /></button>
            <button className="images__image-container__button"><img src=".\src\assets\icons\icons8-heart-64.png" alt="" /></button>
          </article>
        ))}
      </section>
  );
}