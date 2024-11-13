import { useState } from "react";

export const Modal = ({ image, onClose }) => {
  const [description, setDescription] = useState(image.alt_description || "");

  const handleSave = () => {
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
        <button className="modal-close-button" onClick={onClose}>×</button>
        
        <img src={image.urls.raw} alt={description} className="modal-image" />
        
        <label htmlFor="description">Edit Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="modal-description-input"
        />
        
        <button className="modal-save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
