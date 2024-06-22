import React, { useState, useEffect } from "react";
import "./MasteresRecherche.css";
import { Link } from "react-router-dom";
import { years } from "../../assets/data/fakeData";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ThesesDoctorat() {
  const location = useLocation();
  const shouldScrollToTop = location.state?.scroll; // Check for scroll prop

  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [shouldScrollToTop]);



  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    annéeMast: '',
    nomMast: '',
    annéeInscMast: '',
    mémoireMast: '',
    sujetMast: '',
    encadrantMast: ''
  });
  
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    setErrors({ ...errors, [name]: "" });
}
const handleSubmit = (event) => {
  event.preventDefault();
  const newErrors = {};
  Object.keys(values).forEach((key) => {
    if (
      !values[key] && key !== "annéeInscMast"
    ) { // Exclude "budget" from required fields check
      newErrors[key] = "Ce champ est requis";
    }
  });
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    console.log(values)
  axios.post('http://localhost:8081/new-mastere', values)
  .then(res => {
    console.log("Successfully!");
    navigate("/create-success"); 
  })
.catch(err => console.log(err));
}
  }

  return (
    <>
      {/* <Steps /> */}
      <div className="features text-center pt-5 pb-5">
        <div className="container">
          <div className="main-title mt-5 mb-5 position-relative">
            <h2>Création mastère de rechreche</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg"></div>
          <div className="col-lg-8">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="inputAnnée" className="form-label">
                  Année <span>*</span>
                </label>
                <select id="inputAnnée" className="form-select" name="annéeMast" onChange={handleChange}>
                <option value="">Sélectionner une année</option>
                  {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.annéeMast && (
                  <span className="error-message">{errors.annéeMast}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEtudiant" className="form-label">
                  Nom et prénom étudiant <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputEtudiant"
                  name="nomMast"
                  onChange={handleChange}
                />
                {errors.nomMast && (
                  <span className="error-message">{errors.nomMast}</span>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="inputFirstInsc" className="form-label">
                  Année de la première inscription
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputFirstInsc"
                  name="annéeInscMast"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputPFD" className="form-label">
                  Mémoire de thèse soutenu (PDF contient la page de garde,
                  Taille maximale: 1 MO) <span>*</span>
                </label>
                  <input type="file" className="form-control" id="inputPDF" name="mémoireMast" onChange={handleChange}/>
                  {errors.mémoireMast && (
                  <span className="error-message">{errors.mémoireMast}</span>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="inputSujet" className="form-label">
                  Sujet <span>*</span>
                </label>
                <textarea
                  type="text"
                  className="form-control "
                  id="inputSujet"
                  name="sujetMast"
                  onChange={handleChange}
                />
                {errors.sujetMast && (
                  <span className="error-message">{errors.sujetMast}</span>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="inputEncadrant" className="form-label">
                  Encadrant <span>*</span>
                </label>
                <input id="inputEncadrant" className="form-control" name="encadrantMast" onChange={handleChange}/>
                {errors.encadrantMast && (
                  <span className="error-message">{errors.encadrantMast}</span>
                )}
              </div>
              <div className="col-12">
              <button
                  type="submit"
                  className="btn rounded-pill submit"
                  state={{ scroll: true }}
                >
                  <Link
                  to="/create-success"
                  >
                  </Link>
                  Valider
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg"></div>
        </div>
      </div>
    </>
  );
}

export default ThesesDoctorat;
