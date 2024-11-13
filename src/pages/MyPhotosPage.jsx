import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleImage } from "../slices/ImageSlice";

export const MyPhotosPage = () => {
  const storedImages = useSelector((state) => state.images.storedImages);
  const { setPageTitle } = useAppContext();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    setPageTitle("My Photos");
  }, [setPageTitle]);

  const isImageStored = (imageId) =>
    storedImages.some((image) => image.id === imageId);

  const filteredStoredImages = storedImages.filter((image) =>
    image.alt_description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="images">
      {filteredStoredImages.map((image, index) => (
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
            <img src=".\src\assets\icons\icons8-edit-96.png" alt="" />
          </button>
          <button className="images__image-container__button">
            <img src=".\src\assets\icons\icons8-download-100.png" alt="" />
          </button>
          <button
            className="images__image-container__button"
            onClick={() => dispatch(toggleImage(image))}
          >
            {isImageStored(image.id) ? (
              <img
                src=".\src\assets\icons\icons8-dislike-96.png"
                alt="dislike"
              />
            ) : (
              <img src=".\src\assets\icons\icons8-heart-64.png" alt="heart" />
            )}
          </button>
        </article>
      ))}
    </section>
  );
};
