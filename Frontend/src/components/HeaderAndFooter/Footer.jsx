import React from "react";
import "./main.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer pt-5 pb-5 text-white-50 text-center text-md-start">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4"></div>
            <div className="col-md-12 col-lg-4">
              <div className="contact">
                <ul className="d-flex  justify-content-center list-unstyled gap-3">
                  <li>
                    <Link
                      className="d-block text-light"
                      to="https://www.facebook.com/profile.php?id=100064651552198"
                      target="_blank"
                    >
                      <i className="fa-brands fa-facebook fa-lg facebook rounded-circle p-2" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="d-block text-light"
                      to="https://www.linkedin.com/company/mesrst/"
                      target="_blank"
                    >
                      <i className="fa-brands fa-linkedin fa-lg linkedin rounded-circle p-2" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center copyright">
              <div>
                Copyright © Ministère de l'Enseignement Supérieur et de la
                Recherche Scientifique - <span>Tunisie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
