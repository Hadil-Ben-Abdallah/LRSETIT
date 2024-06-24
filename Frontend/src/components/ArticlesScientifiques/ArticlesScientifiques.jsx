import React, { useState } from "react";
import "./ArticlesScientifiques.css";
import { Link } from "react-router-dom";
import { FaFileLines, FaBook, FaUser } from "react-icons/fa6";
import { years, quartile, indexation } from "../../assets/data/fakeData";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CountryDropdown } from "react-country-region-selector";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ArticlesScientifiques() {
  const location = useLocation();
  const shouldScrollToTop = location.state?.scroll;

  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [shouldScrollToTop]);

  const [authors, setAuthors] = useState([
    { id: 1, authorType: "", country: "" },
  ]);
  const [nextId, setNextId] = useState(2);

  const handleChangeAuthorType = (id, authorType) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author) =>
        author.id === id ? { ...author, authorType } : author
      )
    );
  };

  const handleChangeCountry = (id, country) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author) =>
        author.id === id ? { ...author, country } : author
      )
    );
    setValues(prevValues => ({
      ...prevValues,
      paysAutArt: country
    }));
    setErrors({ ...errors, paysAutArt: "" });
  };
  

  const handleAddAuthor = () => {
    setAuthors((prevAuthors) => [
      ...prevAuthors,
      { id: nextId, authorType: "", country: "" },
    ]);
    setNextId(nextId + 1);
  };

  const handleRemoveAuthor = (id) => {
    if (authors.length > 1) {
      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.id !== id)
      );
    }
  };

  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    annéeArt: "",
    titreArt: "",
    lienArt: "",
    datePubArt: "",
    fileArt: "",
    cinAutArt: "",
    ordreAutArt: "",
    nomAutArt: "",
    prénomAutArt: "",
    identifiantAutArt: "",
    emailAutArt: "",
    paysAutArt: "",
    titreJourArt: "",
    listesJourArt: "",
    quartileArt: "",
    volumeArt: "",
    facteurArt: "",
    indexationArt: "",
    siteArt: "",
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
      !values[key] && key !== "lienArt" && 
      !values[key] && key !== "cinAutArt" && 
      !values[key] && key !== "ordreAutArt" && 
      !values[key] && key !== "nomAutArt" && 
      !values[key] && key !== "prénomAutArt" && 
      !values[key] && key !== "fileArt" &&
      !values[key] && key !== "paysAutArt" &&
      !values[key] && key !== "identifiantAutArt" &&
      !values[key] && key !== "emailAutArt" &&
      !values[key] && key !== "listesJourArt" &&
      !values[key] && key !== "quartileArt" &&
      !values[key] && key !== "volumeArt" &&
      !values[key] && key !== "facteurArt" &&
      !values[key] && key !== "siteArt"
    ) { // Exclude "budget" from required fields check
      newErrors[key] = "Ce champ est requis";
    }
  });
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    console.log(values)
  axios.post('http://localhost:8081/new-article', values)
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
            <h2>Création article scientifique</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg"></div>
          <div className="col-lg-8">
            <form className="row g-3" onSubmit={handleSubmit}>
              <legend>
                <span>
                  <FaFileLines className="icon" /> Informations Article
                </span>
                <hr></hr>
              </legend>

              <div className="col-md-6">
                <label htmlFor="inputAnnée" className="form-label">
                  Année <span>*</span>
                </label>
                <select id="inputAnnée" className="form-select" name="annéeArt" onChange={handleChange}>
                <option value="">Sélectionner une année</option>
                {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.annéeArt && (
                  <span className="error-message">{errors.annéeArt}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputTitle" className="form-label">
                  Titre <span>*</span>
                </label>
                <input type="text" className="form-control " name="titreArt" id="inputTtile"  onChange={handleChange}/>
                {errors.titreArt && (
                  <span className="error-message">{errors.titreArt}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLien" className="form-label">
                  Lien DOI de l'article scientifique
                </label>
                <input type="text" className="form-control" name="lienArt" id="inputLien"  onChange={handleChange}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDate" className="form-label">
                  Date publication <span>*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputDate"
                  name="datePubArt"
                  onChange={handleChange}
                />
                {errors.datePubArt && (
                  <span className="error-message">{errors.datePubArt}</span>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="inputFichier" className="form-label">
                  Fichier (PDF, Taille maximale: 1024 ko)
                </label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="inputFichier"
                    name="fileArt"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <legend>
                <span>
                  <FaUser className="icon" /> Auteur (s)
                </span>
                <hr></hr>
              </legend>
              <div className="detail">
                Sélectionnez le CIN à partir de la liste déroulantes pour auteur
                interne. <br /> Saisissez les autres champs s'il s'agit d'un
                auteur externe
              </div>
              {authors.map((author, index) => (
                <div key={author.id}>
                  <div>Auteur N° {index + 1}</div>
                  <div>
                    <label
                      htmlFor={`inputGender${author.id}`}
                      className="form-label"
                    >
                      Type auteur <span>*</span>
                      <br />
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`authorType${author.id}`}
                        id={`internal${author.id}`}
                        value="internal"
                        checked={author.authorType === "internal"}
                        onChange={() =>
                          handleChangeAuthorType(author.id, "internal")
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`internal${author.id}`}
                      >
                        Interne
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`authorType${author.id}`}
                        id={`external${author.id}`}
                        value="external"
                        checked={author.authorType === "external"}
                        onChange={() =>
                          handleChangeAuthorType(author.id, "external")
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`external${author.id}`}
                      >
                        Externe
                      </label>
                    </div>
                  </div>
                  {author.authorType === "internal" && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label
                          htmlFor={`inputCin${author.id}`}
                          className="form-label"
                        >
                          Cin <span>*</span>
                        </label>
                        <input
                          type="text"
                          id={`inputCin${author.id}`}
                          className="form-control"
                          name="cinAutArt"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`inputOrdre${author.id}`}
                          className="form-label"
                        >
                          Ordre <span>*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id={`inputOrdre${author.id}`}
                          name="ordreAutArt"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  {author.authorType === "external" && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label
                          htmlFor={`inputName${author.id}`}
                          className="form-label"
                        >
                          Nom <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`inputName${author.id}`}
                          name="nomAutArt"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`inputPre${author.id}`}
                          className="form-label"
                        >
                          Prénom <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`inputPre${author.id}`}
                          name="prénomAutArt"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`inputCinExt${author.id}`}
                          className="form-label"
                        >
                          Cin <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`inputCinExt${author.id}`}
                          name="cinAutArt"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`inputId${author.id}`}
                          className="form-label"
                        >
                          Identifiant
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`inputId${author.id}`}
                          name="identifiantAutArt"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`inputMail${author.id}`}
                          className="form-label"
                        >
                          E-mail
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id={`inputMail${author.id}`}
                          name="emailAutArt"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`inputPays${author.id}`}
                          className="form-label"
                        >
                          Pays <span>*</span>
                        </label>
                        <CountryDropdown
  id={`inputPays${author.id}`}
  className="form-select"
  value={author.country}
  name="paysAutArt"
  onChange={(val) => handleChangeCountry(author.id, val)}
/>

                      </div>
                      <div className="col-md-12">
                        <label
                          htmlFor={`inputOrdreExt${author.id}`}
                          className="form-label"
                        >
                          Ordre <span>*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id={`inputOrdreExt${author.id}`}
                          name="ordreAutArt"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  <button
                    className=" btn btn-primary del"
                    type="button"
                    onClick={() => handleRemoveAuthor(author.id)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              <button
                className="btn btn-primary add"
                type="button"
                onClick={handleAddAuthor}
              >
                + Ajouter un auteur
              </button>
              <legend>
                <span>
                  <FaBook className="icon" /> Informations journal
                </span>
                <hr></hr>
              </legend>
              <div className="col-12">
                <label htmlFor="inputJournal" className="form-label">
                  Titre du journal <span>*</span>
                </label>
                <input type="text" className="form-control" name="titreJourArt" id="inputJournal" onChange={handleChange}/>
                {errors.titreJourArt && (
                  <span className="error-message">{errors.titreJourArt}</span>
                )}
              </div>

              <div className="col-md-12">
                <label htmlFor="inputList" className="form-label">
                  Liste des journaux (Chercher et séléctionner un titre
                  existant)
                </label>
                <input
                  id="inputList"
                  className="form-control"
                  name="listesJourArt"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputQuartile" className="form-label quartile">
                  Quartile du journal{" "}
                </label>
                <div className="detail">
                  0%----Q1----25----Q2----50----Q3----75----Q4----100%
                </div>
                <select id="inputQuartile" className="form-select" name="quartileArt" onChange={handleChange}>
                <option value="">Sélectionner le quartile</option>
                  {quartile.map((quartile, index) => (
                    <option key={index} value={quartile.toString()}>
                      {quartile}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="inputVolume" className="form-label">
                  Volume
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputVolume"
                  name="volumeArt"
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputEmail" className="form-label">
                  Facteur d'impact
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  name="facteurArt"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputIndexation" className="form-label">
                  Indexation <span>*</span>
                </label>
                <select id="inputIndexation" className="form-select" name="indexationArt" onChange={handleChange}>
                <option value="">Sélectionner une indexation</option>
                  {indexation.map((indexation, index) => (
                    <option key={index} value={indexation.toString()}>
                      {indexation}
                    </option>
                  ))}
                </select>
                {errors.indexationArt && (
                  <span className="error-message">{errors.indexationArt}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputRevue" className="form-label">
                  Site de la revue
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputRevue"
                  name="siteArt"
                  onChange={handleChange}
                />
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

export default ArticlesScientifiques;
