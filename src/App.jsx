import "./App.css";
import { useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MyPhotosPage } from "./pages/MyPhotosPage";
import { ImageProvider } from "./contexts/AppContext";
import { LayoutComponent } from "./components/LayoutComponent";

export const  App = () => {
  const reducerHandler = (state, action) => {
    console.log(state)
    console.log(action)
    if(action.type == "setImages"){
      return action.payload
    }
  }

  const [state, dispatch] = useReducer(reducerHandler, "");

  return (
    <ImageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutComponent/>}>
            <Route index element={<HomePage />} path=""></Route>
            <Route element={<MyPhotosPage />} path="/myphotos"></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ImageProvider>
  );
}

export default App;
