import React, { useState, useEffect } from "react";
import "./ThesesDoctorat.css";
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
    annéeThes: '',
    titreThes: '',
    sujetThes: '',
    annéeInscThes: '',
    mémoireThes: '',
    encadrantThes: '',
    cotutelleThes: ''
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
      !values[key] && key !== "annéeInscThes"
    ) { // Exclude "budget" from required fields check
      newErrors[key] = "Ce champ est requis";
    }
  });
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    console.log(values)
  axios.post('http://localhost:8081/new-these', values)
  .then(res => {
    console.log("Successfully!");
    navigate("/create-success"); 
  })
.catch(err => console.log(err));
}
  }



  return (
    <>
      <div className="features text-center pt-5 pb-5">
        <div className="container">
          <div className="main-title mt-5 mb-5 position-relative">
            <h2>Création thèse</h2>
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
                <select id="inputAnnée" className="form-select" name="annéeThes" onChange={handleChange}>
                <option value="">Sélectionner une année</option>
                  {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.annéeThes && (
                  <span className="error-message">{errors.annéeThes}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputTitle" className="form-label">
                  Titre <span>*</span>
                </label>
                <input type="text" className="form-control " id="inputTtile" name="titreThes" onChange={handleChange}/>
                {errors.titreThes && (
                  <span className="error-message">{errors.titreThes}</span>
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
                  name="sujetThes"
                  onChange={handleChange}
                />
                {errors.sujetThes && (
                  <span className="error-message">{errors.sujetThes}</span>
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
                  name="annéeInscThes"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputPFD" className="form-label">
                  Mémoire de thèse soutenu (PDF contient la page de garde,
                  Taille maximale: 1 MO) <span>*</span>
                </label>
                  <input type="file" className="form-control" id="inputPDF" name="mémoireThes" onChange={handleChange}/>
                  {errors.mémoireThes && (
                  <span className="error-message">{errors.mémoireThes}</span>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="inputEncadrant" className="form-label">
                  Encadrant <span>*</span>
                </label>
                <input id="inputEncadrant" className="form-control" name="encadrantThes" onChange={handleChange}/>
                {errors.encadrantThes && (
                  <span className="error-message">{errors.encadrantThes}</span>
                )}
              </div>
              <div>
                <label htmlFor="inputCtutelle" className="form-label">
                  Cotutelle <span>*</span>
                  <br/>
                  {errors.cotutelleThes && (
                  <span className="error-message">{errors.cotutelleThes}</span>
                )}
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cotutelleThes"
                    id="flexRadioDefault1"
                    value="Non cotutelle"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Non cotutelle
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cotutelleThes"
                    id="flexRadioDefault2"
                    value="Cotutelle"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Cotutelle
                  </label>
                </div>
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
