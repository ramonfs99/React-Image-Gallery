import { NavLink, Outlet } from "react-router-dom";

export const LayoutComponent = () => {
  return (
    <>
      <header className="header">
        <nav className="header__navbar">
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
            <img src="" alt="" />
            <input type="text" className="header__jumbotron__searchbar"/>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
