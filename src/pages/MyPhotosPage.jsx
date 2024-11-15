import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleImage } from "../slices/ImageSlice";
import { saveAs } from "file-saver";
import { Modal } from "../components/ImageDetailModalComponent";
import editIcon from "../assets/icons/icons8-edit-96.png";
import downloadIcon from "../assets/icons/icons8-download-100.png";
import heartIcon from "../assets/icons/icons8-heart-64.png";
import dislikeIcon from "../assets/icons/icons8-dislike-96.png";


export const MyPhotosPage = () => {
  const storedImages = useSelector((state) => state.images.storedImages);
  const { setPageTitle } = useAppContext();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [sortCriteria, setSortCriteria] = useState("");

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

  const handleEditClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

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

  const sortedImages = [...filteredStoredImages].sort((a, b) => {
    if (sortCriteria === "height") return b.height - a.height;
    if (sortCriteria === "width") return b.width - a.width;
    if (sortCriteria === "likes") return b.likes - a.likes;
    if (sortCriteria === "created_at")
      return new Date(b.created_at) - new Date(a.created_at);
    return 0;
  });

  return (
    <>
      <div className="sort-container">
        <select
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="" disabled>Order by:</option>
          <option value="height">Height</option>
          <option value="width">Width</option>
          <option value="likes">Likes</option>
          <option value="created_at">Date Added</option>
        </select>
      </div>

      <section className="images">
        {sortedImages.map((image, index) => (
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
            <button
              className="images__image-container__button"
              onClick={() => handleEditClick(image)}
            >
              <img src={editIcon} alt="edit" />
            </button>
            <button className="images__image-container__button">
              <img
                src={downloadIcon}
                alt="download"
                onClick={() =>
                  downloadImageHandler(image.urls.full, image.alt_description)
                }
              />
            </button>
            <button
              className="images__image-container__button"
              onClick={() => dispatch(toggleImage(image))}
            >
              {isImageStored(image.id) ? (
                <img
                  src={dislikeIcon}
                  alt="dislike"
                />
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
