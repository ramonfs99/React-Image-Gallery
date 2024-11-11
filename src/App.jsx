import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { LayoutComponent } from "./components/LayoutComponent";
import { HomePage } from "./pages/HomePage";
import { MyPhotosPage } from "./pages/MyPhotosPage";

function App() {
  const [images, setImages] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutComponent />}>
            <Route element={<HomePage />}></Route>
            <Route element={<MyPhotosPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <div>
        <h1>Hello World</h1>
        {images.map((image) => (
          <img src={image.url} alt="" />
        ))}
      </div>
    </>
  );
}

export default App;
