import "./App.css";
import { useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MyPhotosPage } from "./pages/MyPhotosPage";
import { Provider } from "react-redux";
import { ContextProvider } from "./contexts/AppContext";
import { LayoutComponent } from "./components/LayoutComponent";
import { store } from "./store";

export const  App = () => {
  /*const reducerHandler = (state, action) => {
    console.log(state)
    console.log(action)
    if(action.type == "setImages"){
      return action.payload
    }
  }

  const [state, dispatch] = useReducer(reducerHandler, "");*/

  return (
    <Provider store={store}>
      <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutComponent/>}>
            <Route index element={<HomePage />} path=""></Route>
            <Route element={<MyPhotosPage />} path="/myphotos"></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </ContextProvider>
    </Provider>
  );
}

export default App;
