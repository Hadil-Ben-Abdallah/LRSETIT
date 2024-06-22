import React, { useState, useEffect } from "react";
import "./Conventions.css";
import { Link } from "react-router-dom";
import { years, typeConv } from "../../assets/data/fakeData";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Conventions() {
  const location = useLocation();
  const shouldScrollToTop = location.state?.scroll; // Check for scroll prop

  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [shouldScrollToTop]);


  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    annéeConv: '',
    nationalConv: [],
    partenaireConv: '',
    typeConv: '',
    résuméConv: '',
    impactFinConv: '',
    impactNatConv: '',
    dateConv: '',
    fileConv: ''
  });
  
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (type === "checkbox") {
      setValues(prevValues => ({
        ...prevValues,
        [name]: checked 
          ? [...prevValues[name], value] 
          : prevValues[name].filter(item => item !== value)
      }));
    } else {
      setValues(prevValues => ({
        ...prevValues,
        [name]: value
      }));
    }
  
    setErrors({ ...errors, [name]: "" });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    Object.keys(values).forEach((key) => {
      if (
        !values[key] && key !== "nationalConv" &&
        !values[key] && key !== "typeConv" &&
        !values[key] && key !== "résuméConv" &&
        !values[key] && key !== "impactFinConv" &&
        !values[key] && key !== "impactNatConv"
      ) {
        newErrors[key] = "Ce champ est requis";
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const finalValues = {
        ...values,
        nationalConv: values.nationalConv.join(", ")
      };
  
      console.log(finalValues);
      axios.post('http://localhost:8081/new-convention', finalValues)
        .then(res => {
          console.log("Successfully!");
          navigate("/create-success"); 
        })
        .catch(err => console.log(err));
    }
  };

  
  return (
    <>
      {/* <Steps /> */}
      <div className="features text-center pt-5 pb-5">
        <div className="container">
          <div className="main-title mt-5 mb-5 position-relative">
            <h2>Création convention</h2>
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
                <select id="inputAnnée" className="form-select" name="annéeConv" onChange={handleChange}>
                <option value="">Sélectionner une année</option>
                  {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.annéeConv && (
                  <span className="error-message">{errors.annéeConv}</span>
                )}
              </div>
              <div>
                <div className="form-check">
  <input 
    className="form-check-input" 
    type="checkbox" 
    name="nationalConv" 
    value="National" 
    onChange={handleChange}
  />
  National
</div>
<div className="form-check">
  <input 
    className="form-check-input" 
    type="checkbox" 
    name="nationalConv" 
    value="International" 
    onChange={handleChange}
  />
  International
</div>

              </div>
              <div className="col-md-12">
                <label htmlFor="inputPartenaire" className="form-label">
                  Partenaire <span>*</span>
                </label>
                <textarea
                  type="text"
                  className="form-control "
                  id="inputPartenaire"
                  name="partenaireConv"
                  onChange={handleChange}
                />
                {errors.partenaireConv && (
                  <span className="error-message">{errors.partenaireConv}</span>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="inputType" className="form-label">
                  Type
                </label>
                <select id="inputType" className="form-select" name="typeConv" onChange={handleChange}>
                <option value="">Sélectionner un type</option>
                  {typeConv.map((typeConv, index) => (
                    <option key={index} value={typeConv.toString()}>
                      {typeConv}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12">
                <label htmlFor="inputRésumé" className="form-label">
                  Résumé
                </label>
                <textarea
                  type="text"
                  className="form-control "
                  id="inputRésumé"
                  name="résuméConv"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputImpactFin" className="form-label">
                  Impact financier
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputImpactFin"
                  name="impactFinConv"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputOImpactNat" className="form-label">
                  Impact en nature
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputOImpactNat"
                  name="impactNatConv"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputDateCreate" className="form-label">
                  Date de création <span>*</span>
                </label>
                <input
                  type="date"
                  className="form-control "
                  id="inputDateCreate"
                  name="dateConv"
                  onChange={handleChange}
                />
                {errors.dateConv && (
                  <span className="error-message">{errors.dateConv}</span>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="inputPFD" className="form-label">
                  Fichier (PDF, Taille maximale: 1024 MO) <span>*</span>
                </label>
                  <input type="file" className="form-control" id="inputPDF" name="fileConv" onChange={handleChange}/>
                  {errors.fileConv && (
                  <span className="error-message">{errors.fileConv}</span>
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

export default Conventions;
