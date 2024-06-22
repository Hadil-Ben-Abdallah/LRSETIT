import React, { useState, useEffect } from "react";
import "./ObtentionsVegetales.css";
import { Link } from "react-router-dom";
import { years } from "../../assets/data/fakeData";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Obtentionsvegetales() {
  const location = useLocation();
  const shouldScrollToTop = location.state?.scroll; // Check for scroll prop

  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [shouldScrollToTop]);


  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    annéeObt: '',
    titreObt: '',
    référanceObt: '',
    fileObt: '',
    dateObt: ''
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
  axios.post('http://localhost:8081/new-obtention', values)
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
            <h2>Création obtention</h2>
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
                <select id="inputAnnée" className="form-select" name="annéeObt" onChange={handleChange}>
                <option value="">Sélectionner une année</option>
                  {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.annéeObt && (
                  <span className="error-message">{errors.annéeObt}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputTitle" className="form-label">
                  Titre <span>*</span>
                </label>
                <input type="text" className="form-control " id="inputTtile" name="titreObt" onChange={handleChange}/>
                {errors.titreObt && (
                  <span className="error-message">{errors.titreObt}</span>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="inputReference" className="form-label">
                  Référence <span>*</span>
                </label>
                <textarea
                  type="text"
                  className="form-control "
                  id="inputReference"
                  name="référanceObt"
                  onChange={handleChange}
                />
                {errors.référanceObt && (
                  <span className="error-message">{errors.référanceObt}</span>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="inputPFD" className="form-label">
                  Fichier (PDF, Taille maximale: 1024 ko) <span>*</span>
                </label>
                  <input type="file" className="form-control" id="inputPDF" name="fileObt" onChange={handleChange}/>
                  {errors.fileObt && (
                  <span className="error-message">{errors.fileObt}</span>
                )}

              </div>
              <div className="col-md-12">
                <label htmlFor="inputDate" className="form-label">
                  Date de Création <span>*</span>
                </label>
                <input type="date" className="form-control" id="inputDate" name="dateObt" onChange={handleChange}/>
                {errors.dateObt && (
                  <span className="error-message">{errors.dateObt}</span>
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

export default Obtentionsvegetales;
