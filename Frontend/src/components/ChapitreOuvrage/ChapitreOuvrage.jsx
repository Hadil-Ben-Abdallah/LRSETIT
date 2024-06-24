import React, { useState } from "react";
import "./ChapitreOuvrage.css";
import { Link } from "react-router-dom";
import { years } from "../../assets/data/fakeData";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import { CountryDropdown } from "react-country-region-selector";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ChapitreOuvrage() {
  const location = useLocation();
  const shouldScrollToTop = location.state?.scroll; // Check for scroll prop

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
    setValues((prevValues) => ({
      ...prevValues,
      paysAutChap: country,
    }));
    setErrors({ ...errors, paysAutChap: "" });
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
    annéeChap: "",
    cinAutChap: "",
    ordreAutChap: "",
    nomAutChap: "",
    prénomAutChap: "",
    identifiantAutChap: "",
    emailAutChap: "",
    paysAutChap: "",
    titreChap: "",
    éditeurChap: "",
    lienChap: "",
    éditionChap: "",
    isbnChap: "",
    dateChap: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    Object.keys(values).forEach((key) => {
      if (
        !values[key] && key !== "identifiantAutChap" &&
        !values[key] && key !== "cinAutChap" &&
        !values[key] && key !== "ordreAutChap" &&
        !values[key] && key !== "nomAutChap" &&
        !values[key] && key !== "prénomAutChap" &&
        !values[key] && key !== "paysAutChap" &&
        !values[key] && key !== "emailAutChap" &&
        !values[key] && key !== "lienChap" &&
        !values[key] && key !== "isbnChap"
      ) {
        // Exclude "budget" from required fields check
        newErrors[key] = "Ce champ est requis";
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(values);
      axios
        .post("http://localhost:8081/new-chapitre", values)
        .then((res) => {
          console.log("Successfully!");
          navigate("/create-success");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="features text-center pt-5 pb-5">
        <div className="container">
          <div className="main-title mt-5 mb-5 position-relative">
            <h2>Création chapitre ouvrage</h2>
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
                <select id="inputAnnée" className="form-select" name="annéeChap" onChange={handleChange}>
                  <option value="">Sélectionner une année</option>
                  {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.annéeChap && (
                  <span className="error-message">{errors.annéeChap}</span>
                )}
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
                          name="cinAutChap"
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
                          name="ordreAutChap"
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
                          name="nomAutChap"
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
                          name="prénomAutChap"
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
                          name="cinAutChap"
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
                          name="identifiantAutChap"
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
                          name="emailAutChap"
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
  name="paysAutChap"
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
                          name="ordreAutChap"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  <button
                    class=" btn btn-primary del"
                    type="button"
                    onClick={() => handleRemoveAuthor(author.id)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              <button
                class="btn btn-primary add"
                type="button"
                onClick={handleAddAuthor}
              >
                + Ajouter un auteur
              </button>
              <div className="col-md-12">
                <label htmlFor="inputTitle" className="form-label">
                  Titre <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputTtile"
                  name="titreChap"
                  onChange={handleChange}
                />
                {errors.titreChap && (
                  <span className="error-message">{errors.titreChap}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEditeur" className="form-label">
                  Editeur <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEditeur"
                  name="éditeurChap"
                  onChange={handleChange}
                />
                {errors.éditeurChap && (
                  <span className="error-message">{errors.éditeurChap}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLinkEdit" className="form-label">
                  Lien éditeur
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLinkEdit"
                  name="lienChap"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEdition" className="form-label">
                  Edition <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEdition"
                  name="éditionChap"
                  onChange={handleChange}
                />
                {errors.éditionChap && (
                  <span className="error-message">{errors.éditionChap}</span>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="inputISBN" className="form-label">
                  ISBN/Issan
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputISBN"
                  name="isbnChap"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputDate" className="form-label">
                  Date <span>*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputDate"
                  name="dateChap"
                  onChange={handleChange}
                />
                {errors.dateChap && (
                  <span className="error-message">{errors.dateChap}</span>
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

export default ChapitreOuvrage;
