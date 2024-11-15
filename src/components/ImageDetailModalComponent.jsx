import { useState } from "react";

export const Modal = ({ image, onClose }) => {
  const [description, setDescription] = useState(image.alt_description || "");

  const handleSave = () => {
    const storedImages = JSON.parse(localStorage.getItem("storedImages")) || [];

    const updatedImages = storedImages.map((storedImage) => {
        if (storedImage.id === image.id) {
          return { ...storedImage, alt_description: description };
        }
        return storedImage;
      });
      localStorage.setItem("storedImages", JSON.stringify(updatedImages));
    onClose()
};

const handleOverlayClick = event => {
    if(event.target.classList.contains('modal-overlay')){
        onClose();
    }
}
return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-content__close-button" onClick={onClose}>×</button>
        <img src={image.urls.raw} alt={description} className="modal-content__image" />
        <p><strong>Date added: </strong>{image.created_at}</p>
        <p><strong>Width: </strong>{image.width}px</p>
        <p><strong>Height: </strong>{image.height}px</p>
        <p><strong>Likes: </strong>{image.likes}</p>
        <p htmlFor="description"><strong>Description:</strong></p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="modal-content__description-input"
        />
        
        <button className="modal-content__save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
