import React, {useState} from "react";
import "./Inscription.css";
import { Link } from "react-router-dom";
import InscriptionHeader from "../InscriptionHeader/InscriptionHeader";
import Footer from "../HeaderAndFooter/Footer";
import axios from "axios";
import {
  establishmentOptions,
  gradeOptions,
  ministries,
  universities,
} from "../../assets/data/fakeData";
import { useNavigate } from 'react-router-dom';


/* eslint-disable no-undef */

function Inscription() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = React.useState({
    ministereInsc: '',
    universiteInsc: '',
    etablissementInsc: '',
    cinInsc: '',
    numPassInsc: '',
    cnrpsInsc: '',
    nomInsc: '',
    prenomInsc: '',
    emailInsc: '',
    dateNaissanceInsc: '',
    genreInsc: '',
    photoInsc: '',
    fonctionInsc: '',
    gradeInsc: '',
    specialiteInsc: '',
    diplomeInsc: '',
    dateDiplomeInsc: '',
    indexInsc: '',
    identificationInsc: '',
    telFixeInsc: '',
    telMobileInsc: '',
    faxInsc: '',
  });
  

const handleChange = (event) => {
  const { name, value } = event.target;
  setValues(prevValues => ({
    ...prevValues,
    [name]: value
  }));
  setErrors({ ...errors, [name]: "" });
}

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const newErrors = {};
//   Object.keys(values).forEach((key) => {
//     if (
//       !values[key] && key !== "photoInsc" && 
//       !values[key] && key !== "numPassInsc" &&
//       !values[key] && key !== "cnrpsInsc" &&
//       !values[key] && key !== "fonctionInsc" &&
//       !values[key] && key !== "identificationInsc" &&
//       !values[key] && key !== "indexInsc" &&
//       !values[key] && key !== "specialiteInsc" &&
//       !values[key] && key !== "diplomeInsc" &&
//       !values[key] && key !== "telFixeInsc" &&
//       !values[key] && key !== "telMobileInsc" &&
//       !values[key] && key !== "faxInsc"
//     ) { // Exclude "budget" from required fields check
//       newErrors[key] = "Ce champ est requis";
//     }
//   });
//   setErrors(newErrors);
//   if (Object.keys(newErrors).length === 0) {
//     console.log(values)
//   axios.post('http://localhost:8081/inscription', values)
//   .then(res => {
//     console.log("Successfully!");
//     navigate("/create-success"); 
//   })
// .catch(err => console.log(err));
// }
//   }

const handleSubmit = (event) => {
  event.preventDefault();
  const newErrors = {};

  Object.keys(values).forEach((key) => {
    if (
      !values[key] && key !== "photoInsc" && 
      !values[key] && key !== "numPassInsc" &&
      !values[key] && key !== "cnrpsInsc" &&
      !values[key] && key !== "fonctionInsc" &&
      !values[key] && key !== "identificationInsc" &&
      !values[key] && key !== "indexInsc" &&
      !values[key] && key !== "specialiteInsc" &&
      !values[key] && key !== "diplomeInsc" &&
      !values[key] && key !== "telFixeInsc" &&
      !values[key] && key !== "telMobileInsc" &&
      !values[key] && key !== "faxInsc"
    ) {
      newErrors[key] = "Ce champ est requis";
    }
  });

  setErrors(newErrors);
  
  if (Object.keys(newErrors).length === 0) {
    axios.post('http://localhost:8081/inscription', values)
      .then(res => {
        console.log("Successfully!");
        navigate("/create-success"); 
      })
      .catch(err => {
        if (err.response && err.response.status === 409) {
          setErrors(err.response.data.errors);
        } else {
          console.log(err);
        }
      });
  }
};







  return (
    <>
    <InscriptionHeader/>
      <div className="features text-center pt-5 pb-5">
        <div className="container">
          <div className="main-title mt-5 mb-5 position-relative">
            <h2>Inscription</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg"></div>
          <div className="col-lg-8">
            <form className="row g-3" onSubmit={handleSubmit}> 
              <div className="col-12">
                <label htmlFor="inputOrganism" className="form-label">
                  Ministère / Organisme <span>*</span>
                </label>
                <select id="inputOrganism" className="form-select"
                name="ministereInsc"
                // value={formData.ministereInsc}
                onChange={handleChange}
                // required=""
                >
                  <option value="">Sélectionner une ministère / organisme</option>
                  {ministries.map((ministry, index) => (
                    <option key={index} value={ministry.toString()}>
                      {ministry}
                    </option>
                  ))}
                </select>
                {errors.ministereInsc && (
                  <span className="error-message">{errors.ministereInsc}</span>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="inputUniversity" className="form-label">
                  Université / Centre de recherche / EPS <span>*</span>
                </label>
                <select id="inputUniversity" className="form-select"
                name="universiteInsc"
                // value={formData.universiteInsc}
                onChange={handleChange}
                // required=""
                >
                  <option value="">Sélectionner une université</option>
                  {universities.map((university, index) => (
                    <option key={index} value={university.toString()}>
                      {university}
                    </option>
                  ))}
                </select>
                {errors.universiteInsc && (
                  <span className="error-message">{errors.universiteInsc}</span>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="inputEstablishment" className="form-label">
                  Etablissement <span>*</span>
                </label>
                <select id="inputEstablishment" className="form-select"
                name="etablissementInsc"
                // value={formData.etablissementInsc}
                onChange={handleChange}
                // required=""
                >
                  <option value="">Sélectionner un établissement</option>
                  {establishmentOptions.map((establishmentOptions, index) => (
                    <option key={index} value={establishmentOptions.toString()}>
                      {establishmentOptions}
                    </option>
                  ))}
                </select>
                {errors.etablissementInsc && (
                  <span className="error-message">{errors.etablissementInsc}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Nom <span>*</span>
                </label>
                <input type="text" className="form-control " id="inputName" 
                name="nomInsc"
                // value={formData.nomInsc}
                onChange={handleChange}
                // required=""
                />
                {errors.nomInsc && (
                  <span className="error-message">{errors.nomInsc}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPre" className="form-label">
                  Prénom <span>*</span>
                </label>
                <input type="text" className="form-control " id="inputPre"
                name="prenomInsc"
                // value={formData.prenomInsc}
                onChange={handleChange}
                // required=""
                />
                {errors.prenomInsc && (
                  <span className="error-message">{errors.prenomInsc}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCin" className="form-label">
                  Cin <span>*</span>
                </label>
                <input type="text" className="form-control" id="inputCin" 
                name="cinInsc"
                // value={formData.cinInsc}
                onChange={handleChange}
                // required=""
                />
                {errors.cinInsc && (
                  <span className="error-message">{errors.cinInsc}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputNum" className="form-label">
                  Num Passport (étrangé)
                </label>
                <input type="text" className="form-control" id="inputNum" 
                name="numPassInsc"
                // value={formData.numPassInsc}
                onChange={handleChange}
                />
                {/* {errors.numPassInsc && (
                  <span className="error-message">{errors.numPassInsc}</span>
                )} */}
              </div>
              <div className="col-12">
                <label htmlFor="inputCNRPS" className="form-label">
                  CNRPS
                </label>
                <input type="text" className="form-control" id="inputCNRPS"
                name="cnrpsInsc" 
                // value={formData.cnrpsInsc}
                onChange={handleChange}
                />
                {/* {errors.cnrpsInsc && (
                  <span className="error-message">{errors.cnrpsInsc}</span>
                )} */}
              </div>
              <div className="col-12">
                <label htmlFor="inputEmail" className="form-label">
                  Email <span>*</span>
                </label>
                <input type="email" className="form-control" id="inputEmail"
                name="emailInsc" 
                // value={formData.emailInsc}
                onChange={handleChange}
                // required=""
                />
                {errors.emailInsc && (
                  <span className="error-message">{errors.emailInsc}</span>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="inputDate1" className="form-label">
                  Date de naissance <span>*</span>
                </label>
                <input type="date" className="form-control" id="inputDate1" 
                name="dateNaissanceInsc"
                // value={formData.dateNaissanceInsc}
                onChange={handleChange}
                // required=""
                />
                {errors.dateNaissanceInsc && (
                  <span className="error-message">{errors.dateNaissanceInsc}</span>
                )}
              </div>
              <div>
                <label htmlFor="inputGender" className="form-label">
                  Genre <span>*</span>
                  <br/>
                  {errors.genreInsc && (
                  <span className="error-message">{errors.genreInsc}</span>
                )}
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genreInsc"
                    id="flexRadioDefault1"
                    value="Féminin"
                    // value={formData.genreInsc}
                    onChange={handleChange}
                    // required=""
                  />
                  
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Féminin
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genreInsc"
                    id="flexRadioDefault2"
                    value="Masculin"
                    // value={formData.genreInsc}
                    onChange={handleChange}
                    // required=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Masculin
                  </label>
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="inputPhoto" className="form-label">
                  Photo (Image JPG/PNG, Taille maximale: 1024 ko)
                </label>
                <div className="input-group mb-3">
                  <input type="file" className="form-control" id="inputPhoto" 
                  name="photoInsc"
                  // value={formData.photoInsc}
                  onChange={handleChange}
                  />
                  {/* {errors.photoInsc && (
                  <span className="error-message">{errors.photoInsc}</span>
                )} */}
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="inputFunction" className="form-label">
                  Fonction administrative
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFunction"
                  name="fonctionInsc"
                  // value={formData.fonctionInsc}
                  onChange={handleChange}
                />
                {/* {errors.fonctionInsc && (
                  <span className="error-message">{errors.fonctionInsc}</span>
                )} */}
              </div>
              <div className="col-12">
                <label htmlFor="inputGrade" className="form-label">
                  Grade <span>*</span>
                </label>
                <select id="inputGrade" className="form-select"
                name="gradeInsc"
                // value={formData.gradeInsc}
                onChange={handleChange}
                // required=""
                >
                  <option value="">Sélectionner un grade</option>
                  {gradeOptions.map((gradeOptions, index) => (
                    <option key={index} value={gradeOptions.toString()}>
                      {gradeOptions}
                    </option>
                  ))}
                </select>
                {errors.gradeInsc && (
                  <span className="error-message">{errors.gradeInsc}</span>
                )}
              </div>
              <div className="col-8">
                <label htmlFor="inputORCID" className="form-label">
                  Identification ORCID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputORCID"
                  placeholder="Format: xxxx-xxxx-xxxx-xxxx"
                  name="identificationInsc"
                  // value={formData.identificationInsc}
                onChange={handleChange}
                />
                {/* {errors.identificationInsc && (
                  <span className="error-message">{errors.identificationInsc}</span>
                )} */}
              </div>
              <div className="col-4">
                <label htmlFor="inputIndex" className="form-label">
                  H-index
                </label>
                <input type="number" className="form-control" id="inputIndex" 
                name="indexInsc"
                // value={formData.indexInsc}
                onChange={handleChange}
                />
                {/* {errors.indexInsc && (
                  <span className="error-message">{errors.indexInsc}</span>
                )} */}
              </div>
              <div className="col-6">
                <label htmlFor="inputSpeciality" className="form-label">
                  Spécialité
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputSpeciality"
                  name="specialiteInsc"
                  // value={formData.specialiteInsc}
                onChange={handleChange}
                />
                {/* {errors.specialiteInsc && (
                  <span className="error-message">{errors.specialiteInsc}</span>
                )} */}
              </div>
              <div className="col-6">
                <label htmlFor="inputDiploma" className="form-label">
                  Diplome
                </label>
                <input type="text" className="form-control" id="inputDiploma" 
                name="diplomeInsc"
                // value={formData.diplomeInsc}
                onChange={handleChange}
                />
                {/* {errors.diplomeInsc && (
                  <span className="error-message">{errors.diplomeInsc}</span>
                )} */}
              </div>
              <div className="col-12">
                <label htmlFor="inputDate2" className="form-label">
                  Date Du dernier diplome <span>*</span>
                </label>
                <input type="date" className="form-control" id="inputDate2" 
                name="dateDiplomeInsc"
                // value={formData.dateDiplomeInsc}
                onChange={handleChange}
                // required=""
                />
                {errors.dateDiplomeInsc && (
                  <span className="error-message">{errors.dateDiplomeInsc}</span>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="inputTel" className="form-label">
                  Tél Fixe
                </label>
                <input type="text" className="form-control" id="inputTel" 
                name="telFixeInsc"
                // value={formData.telFixeInsc}
                onChange={handleChange}
                />
                {/* {errors.telFixeInsc && (
                  <span className="error-message">{errors.telFixeInsc}</span>
                )} */}
              </div>
              <div className="col-12">
                <label htmlFor="inputMobile" className="form-label">
                  Tél Mobile
                </label>
                <input type="text" className="form-control" id="inputMobile"
                name="telMobileInsc" 
                // value={formData.telMobileInsc}
                onChange={handleChange}
                />
                {/* {errors.telMobileInsc && (
                  <span className="error-message">{errors.telMobileInsc}</span>
                )} */}
              </div>
              <div className="col-12">
                <label htmlFor="inputFax" className="form-label">
                  Fax
                </label>
                <input type="text" className="form-control" id="inputFax" 
                name="faxInsc"
                // value={formData.faxInsc}
                onChange={handleChange}
                />
                {/* {errors.faxInsc && (
                  <span className="error-message">{errors.faxInsc}</span>
                )} */}
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn rounded-pill submit"
                  // onClick={handleUpload}
                  state={{ scroll: true }}
                >
                  <Link
                  to="/create-success"
                  >
                  </Link>
                  Valider
                </button>
                {/* <Link
                  type="submit"
                  className="btn rounded-pill submit"
                  to=""
                  state={{ scroll: true }}
                >
                  Valider
                </Link> */}
              </div>
            </form>
          </div>
          <div className="col-lg"></div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Inscription;





 // const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   ministereInsc: "",
  //   universiteInsc: "",
  //   etablissementInsc: "",
  //   cinInsc: "",
  //   numPassInsc: "",
  //   cnrpsInsc: "",
  //   nomInsc: "",
  //   prenomInsc: "",
  //   emailInsc: "",
  //   dateNaissanceInsc: "",
  //   genreInsc: "",
  //   photoInsc: "",
  //   fonctionInsc: "",
  //   gradeInsc: "",
  //   specialiteInsc: "",
  //   diplomeInsc: "",
  //   dateDiplomeInsc: "",
  //   indexInsc: "",
  //   identificationInsc: "",
  //   telFixeInsc: "",
  //   telMobileInsc: "",
  //   faxInsc: "",
  // });

  // const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setFormData({ ...formData, [id]: value });
  //   setErrors({ ...errors, [id]: "" }); 
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newErrors = {};
  //   Object.keys(formData).forEach((key) => {
  //     if (!formData[key] && key !== "cinInsc" 
  //                         && key !== "numPassInsc" 
  //                         && key !== "cnrpsInsc" 
  //                         && key !== "photoInsc" 
  //                         && key !== "fonctionInsc" 
  //                         && key !== "specialiteInsc"
  //                         && key !== "diplomeInsc"
  //                         && key !== "indexInsc"
  //                         && key !== "identificationInsc"
  //                         && key !== "telFixeInsc"
  //                         && key !== "telMobileInsc"
  //                         && key !== "faxInsc") { 
  //       newErrors[key] = "Ce champ est requis";
  //     }
  //   });
  //   setErrors(newErrors);

  //       // If there are no errors, you can proceed with form submission
  //   if (Object.keys(newErrors).length === 0) {
  //     // Your form submission logic goes here



  //     navigate("/articles-scientifiques", { state: { scroll: true } });


      
  //   }
  // };