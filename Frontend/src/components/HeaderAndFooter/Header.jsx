import React, { useState, useEffect} from "react";
import "./main.css";
import { Link , useLocation} from "react-router-dom";
import logo from '../../assets/logo.png';

function Header() {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleButtonClick = () => {
    // const isSmallScreen = window.matchMedia("(max-width: 576px)").matches;
    const landingSectionHeight = document.querySelector(".landing").offsetHeight;
  const scrollTop = landingSectionHeight ;
  window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`navbar navbar-expand-lg ${isSticky ? "sticky-top" : ""}`}
      >
        <div className="container">
          <Link className="navbar-brand" to="/home" onClick={handleScrollToTop}>
          <img src={logo} alt="No-img" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main"
            aria-controls="main"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="main">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link p-2 p-lg-3 active"
                  aria-current="page"
                  to="/home"
                >
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-2 p-lg-3" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-2 p-lg-3" to="/">
                  Déconnexion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {location.pathname === "/home" && (
        <div className="landing d-flex justify-content-center align-items-center">
          <div className="text-center text-light">
            <h1>Research Laboratory of Intelligent Systems for Engineering and E-health based on Image and Telecommunication Technologies
</h1>
            <Link
              className="btn rounded-pill main-btn commencer"
              to="/home"
              onClick={handleButtonClick}
            >
              Commencer
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
