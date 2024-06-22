import React, { useState, useEffect } from "react";
import "./ManifestationsScientifiques.css";
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
    annéeMan: '',
    titreMan: '',
    organisateursMan: '',
    dateMan: '',
    lieuMan: '',
    typeMan: '',
    siteMan: ''
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
      !values[key] && key !== "siteMan"
    ) { // Exclude "budget" from required fields check
      newErrors[key] = "Ce champ est requis";
    }
  });
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    console.log(values)
  axios.post('http://localhost:8081/new-manifestation', values)
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
            <h2>Création manifestation scientifique</h2>
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
                <select id="inputAnnée" className="form-select" name="annéeMan" onChange={handleChange}>
                <option value="">Sélectionner une année</option>
                  {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.annéeMan && (
                  <span className="error-message">{errors.annéeMan}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputTitle" className="form-label">
                  Titre <span>*</span>
                </label>
                <input type="text" className="form-control " id="inputTitle" name="titreMan" onChange={handleChange}/>
                {errors.titreMan && (
                  <span className="error-message">{errors.titreMan}</span>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="inputOrganisateurs" className="form-label">
                  Organisateurs <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputOrganisateurs"
                  name="organisateursMan"
                  onChange={handleChange}
                />
                {errors.organisateursMan && (
                  <span className="error-message">{errors.organisateursMan}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDate" className="form-label">
                  Date d'organisation <span>*</span>
                </label>
                <input type="date" className="form-control " id="inputDate" name="dateMan" onChange={handleChange}/>
                {errors.dateMan && (
                  <span className="error-message">{errors.dateMan}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLieu" className="form-label">
                  Lieu <span>*</span>
                </label>
                <input type="text" className="form-control " id="inputLieu" name="lieuMan" onChange={handleChange}/>
                {errors.lieuMan && (
                  <span className="error-message">{errors.lieuMan}</span>
                )}
              </div>
              <div>
                <label htmlFor="inputCtutelle" className="form-label">
                  Type <span>*</span>
                  <br/>
                  {errors.typeMan && (
                  <span className="error-message">{errors.typeMan}</span>
                )}
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="typeMan"
                    id="flexRadioDefault1"
                    value="National"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    National
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="typeMan"
                    id="flexRadioDefault2"
                    value="International"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    International
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <label htmlFor="inputWeb" className="form-label">
                  Site web
                </label>
                <input type="text" className="form-control " id="inputWeb" name="siteMan" 
                onChange={handleChange}/>
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
