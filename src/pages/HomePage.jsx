import { useContext, useEffect, useState } from "react";
import { AppContext, useAppContext } from "../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleImage } from "../slices/ImageSlice";
import { saveAs } from "file-saver";
import { Modal } from "../components/ImageDetailModalComponent";
import editIcon from "../assets/icons/icons8-edit-96.png";
import downloadIcon from "../assets/icons/icons8-download-100.png";
import heartIcon from "../assets/icons/icons8-heart-64.png";
import dislikeIcon from "../assets/icons/icons8-dislike-96.png";

export const HomePage = () => {
  const { images } = useContext(AppContext);
  const { setPageTitle } = useAppContext();
  const dispatch = useDispatch();
  const storedImages = useSelector((state) => state.images.storedImages);
  const [activeIndex, setActiveIndex] = useState(null);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    setPageTitle("Welcome");
  }, [setPageTitle]);

  const isImageStored = (imageId) =>
    storedImages.some((image) => image.id === imageId);

  const filteredImages = images.filter((image) =>
    image.alt_description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadImageHandler = (imageUrl, imageDescription) => {
    const imageDescriptionFormatted =
      imageDescription
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "") + ".jpg";
    const fileName = imageDescription
      ? `${imageDescriptionFormatted}`
      : "downloaded-image.jpg";
    saveAs(imageUrl, fileName);
  };

  const handleEditClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
    <section className="images">
      {filteredImages.map((image, index) => (
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
          <button className="images__image-container__button" onClick={() => handleEditClick(image)}>
            <img src={editIcon} alt="edit" />
          </button>
          <button
            className="images__image-container__button"
            onClick={() =>
              downloadImageHandler(image.urls.full, image.alt_description)
            }
          >
            <img src={downloadIcon} alt="download" />
          </button>
          <button
            className="images__image-container__button"
            onClick={() => dispatch(toggleImage(image))}
          >
            {isImageStored(image.id) ? (
              <img src={dislikeIcon} alt="dislike" />
            ) : (
              <img src={heartIcon} alt="heart" />
            )}
          </button>
        </article>
      ))}
    </section>
      {isModalOpen && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </>
    
  );
};
