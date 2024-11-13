import { useContext, useEffect, useState } from "react";
import { AppContext, useAppContext } from "../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleImage } from "../slices/ImageSlice";

export const HomePage = () => {
  const { images } = useContext(AppContext);
  const { setPageTitle } = useAppContext();
  const dispatch = useDispatch();
  const storedImages = useSelector((state) => state.images.storedImages);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    setPageTitle("Welcome");
  }, [setPageTitle]);

  const isImageStored = (imageId) =>
    storedImages.some((image) => image.id === imageId);

  return (
    <section className="images">
      {images.map((image, index) => (
        <article
          className={`images__image-container ${
            activeIndex === index ? "active" : ""
          }`}
          onClick={() => handleClick(index)}
          key={image.id}
        >
          <img
            className="images__image-container__image"
            src={image.urls.raw}
            alt={image.alt_description}
          />
          <button className="images__image-container__button">
            <img src=".\src\assets\icons\icons8-edit-96.png" alt="edit" />
          </button>
          <button className="images__image-container__button">
            <img
              src=".\src\assets\icons\icons8-download-100.png"
              alt="download"
            />
          </button>
          <button
            className="images__image-container__button"
            onClick={() => dispatch(toggleImage(image))}
          >
            {isImageStored(image.id) ? <img src=".\src\assets\icons\icons8-dislike-96.png" alt="dislike" /> :  <img src=".\src\assets\icons\icons8-heart-64.png" alt="heart" />}
          </button>
        </article>
      ))}
    </section>
  );
};
