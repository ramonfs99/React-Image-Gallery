import { NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import jumbotronBackground from "../assets/jumbotron-background.jpg";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../slices/SearchSlice";
import { useState, useRef, useEffect } from "react";

export const LayoutComponent = () => {
  const { pageTitle } = useAppContext();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const sideMenuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleClickOutside = (e) => {
    if (sideMenuRef.current && !sideMenuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const searchChangeHandler = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

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
          <button className="header__navbar__hamburger" onClick={toggleMenu}>
            <img src=".\src\assets\icons\icons8-menu-100.png" alt="menu" />
          </button>
        </nav>
        <div className="header__jumbotron">
          <div className="header__jumbotron__background-image-container">
            <img
              className="header__jumbotron__background-image-container__background-image"
              src={jumbotronBackground}
              alt=""
            />
          </div>
          <h1 className="header__jumbotron__welcome">{pageTitle}</h1>
          <input
            type="text"
            className="header__jumbotron__searchbar"
            placeholder="Search"
            onChange={searchChangeHandler}
          />
          <img className="header__jumbotron__searchbar-icon" src=".\src\assets\icons\icons8-search-100.png" alt="" />
        </div>
      </header>

      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      <div
        className={`side-menu ${menuOpen ? 'open' : ''}`}
        ref={sideMenuRef}
      >
        <ul className="side-menu__list">
          <li className="side-menu__list__item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="side-menu__list__item">
            <NavLink to="myphotos">My Photos</NavLink>
          </li>
        </ul>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
};
