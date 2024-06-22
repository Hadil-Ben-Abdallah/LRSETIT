import React, { useState, useEffect } from "react";
import "./Habilitations.css";
import { Link } from "react-router-dom";
import { years } from "../../assets/data/fakeData";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Habilitations() {
  const location = useLocation();
  const shouldScrollToTop = location.state?.scroll; // Check for scroll prop

  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [shouldScrollToTop]);

  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    annéeHabi: '',
    titreHabi: '',
    nomHabi: '',
    fileHabi: '',
    encadrantHabi: '',
    dateHabi: ''
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
    if (!values[key]) {
      newErrors[key] = "Ce champ est requis";
    }
  });
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    console.log(values)
  axios.post('http://localhost:8081/new-habilitation', values)
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
            <h2>Création habilitation</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg"></div>
          <div className="col-lg-8">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label htmlFor="inputAnnée" className="form-label">
                  Année <span>*</span>
                </label>
                <select id="inputAnnée" className="form-select" name="annéeHabi" onChange={handleChange}>
                <option value="">Sélectionner une année</option>
                  {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.annéeHabi && (
                  <span className="error-message">{errors.annéeHabi}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputTitle" className="form-label">
                  Titre <span>*</span>
                </label>
                <input type="text" className="form-control " id="inputTtile" name="titreHabi" onChange={handleChange}/>
                {errors.titreHabi && (
                  <span className="error-message">{errors.titreHabi}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputNHahitation" className="form-label">
                  Nom et prénom titulaire habilitation <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputNHahitation"
                  name="nomHabi"
                  onChange={handleChange}
                />
                {errors.nomHabi && (
                  <span className="error-message">{errors.nomHabi}</span>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="inputPFD" className="form-label">
                  Fichier (PDF, Taille maximale: 20 MO) <span>*</span>
                </label>
                <div className="detail">
                  Version réduite: page de garde plus introduction plus table
                  des matières plus conclusion générale
                </div>
                  <input type="file" className="form-control" id="inputPDF" name="fileHabi" onChange={handleChange}/>
                  {errors.fileHabi && (
                  <span className="error-message">{errors.fileHabi}</span>
                )}
                </div>
              <div className="col-md-6">
                <label htmlFor="inputEncadrant" className="form-label">
                  Encadrant <span>*</span>
                </label>
                <input id="inputEncadrant" className="form-control" name="encadrantHabi" onChange={handleChange}/>
                {errors.encadrantHabi && (
                  <span className="error-message">{errors.encadrantHabi}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDate" className="form-label">
                  Date de Création <span>*</span>
                </label>
                <input type="date" className="form-control" id="inputDate" name="dateHabi" onChange={handleChange}/>
                {errors.dateHabi && (
                  <span className="error-message">{errors.dateHabi}</span>
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

export default Habilitations;
