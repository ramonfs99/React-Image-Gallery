import { useContext } from "react";
import { ImageContext } from "../contexts/AppContext";
import { LayoutComponent } from "../components/LayoutComponent";

export const HomePage = () => {
  const { images } = useContext(ImageContext);
  console.log(images)
  return (
    <>
      <h2>Images Page</h2>
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.urls.raw} alt={image.alt_description} />
            <p>{image.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};
