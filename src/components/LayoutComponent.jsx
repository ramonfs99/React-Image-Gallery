import { NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export const LayoutComponent = () => {
  const { pageTitle } = useAppContext();
  return (
    <>
      <header className="header">
        <nav className="header__navbar">
          <p className="header__navbar__logo">Gallery</p>
          <ul className="header__navbar__list">
            <li className="header__navbar__list__item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="header__navbar__list__item">
              <NavLink to="myphotos">My Photos</NavLink>
            </li>
          </ul>
        </nav>
        <div className="header__jumbotron">
          <div className="header__jumbotron__background-image-container">
            <img
              className="header__jumbotron__background-image-container__background-image"
              src="src\assets\jumbotron-background.jpg"
              alt=""
            />
          </div>
          <h1 className="header__jumbotron__welcome">{pageTitle}</h1>
          <input type="text" className="header__jumbotron__searchbar" />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
