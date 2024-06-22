import React, { useState } from "react";
import "./OuvragesScientifiques.css";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { years } from "../../assets/data/fakeData";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OuvrageScientifiques() {
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
    setValues(prevValues => ({
      ...prevValues,
      paysAutOuv: country
    }));
    setErrors({ ...errors, paysAutOuv: "" });
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
    annéeOuv: "",
    cinAutOuv: "",
    ordreAutOuv: "",
    nomAutOuv: "",
    prénomAutOuv: "",
    identifiantAutOuv: "",
    emailAutOuv: "",
    paysAutOuv: "",
    titreOuv: "",
    éditeurOuv: "",
    lienOuv: "",
    éditionOuv: "",
    isbnOuv: "",
    dateOuv: "",
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
        !values[key] &&
        key !== "identifiantAutOuv" &&
        !values[key] &&
        key !== "emailAutOuv" &&
        !values[key] &&
        key !== "lienOuv" &&
        !values[key] &&
        key !== "isbnOuv"
      ) {
        // Exclude "budget" from required fields check
        newErrors[key] = "Ce champ est requis";
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(values);
      axios
        .post("http://localhost:8081/new-ouvrage", values)
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
            <h2>Création Ouvrage</h2>
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
                <select id="inputAnnée" className="form-select" name="annéeOuv" onChange={handleChange}>
                  <option value="">Sélectionner une année</option>
                  {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.annéeOuv && (
                  <span className="error-message">{errors.annéeOuv}</span>
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
                          name="cinAutOuv"
                          onChange={handleChange}
                        />
                        {errors.cinAutOuv && (
                          <span className="error-message">
                            {errors.cinAutOuv}
                          </span>
                        )}
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
                          name="ordreAutOuv"
                          onChange={handleChange}
                        />
                        {errors.ordreAutOuv && (
                          <span className="error-message">
                            {errors.ordreAutOuv}
                          </span>
                        )}
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
                          name="nomAutOuv"
                          onChange={handleChange}
                        />
                        {errors.nomAutOuv && (
                          <span className="error-message">
                            {errors.nomAutOuv}
                          </span>
                        )}
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
                          name="prénomAutOuv"
                          onChange={handleChange}
                        />
                        {errors.prénomAutOuv && (
                          <span className="error-message">
                            {errors.prénomAutOuv}
                          </span>
                        )}
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
                          name="cinAutOuv"
                          onChange={handleChange}
                        />
                        {errors.cinAutOuv && (
                          <span className="error-message">
                            {errors.cinAutOuv}
                          </span>
                        )}
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
                          name="identifiantAutOuv"
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
                          name="emailAutOuv"
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
  name="paysAutOuv"
  onChange={(val) => handleChangeCountry(author.id, val)}
/>
                        {errors.paysAutOuv && (
                          <span className="error-message">
                            {errors.paysAutOuv}
                          </span>
                        )}
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
                          name="ordreAutOuv"
                          onChange={handleChange}
                        />
                        {errors.ordreAutOuv && (
                          <span className="error-message">
                            {errors.ordreAutOuv}
                          </span>
                        )}
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
                  name="titreOuv"
                  onChange={handleChange}
                />
                {errors.titreOuv && (
                  <span className="error-message">{errors.titreOuv}</span>
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
                  name="éditeurOuv"
                  onChange={handleChange}
                />
                {errors.éditeurOuv && (
                  <span className="error-message">{errors.éditeurOuv}</span>
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
                  name="lienOuv"
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
                  name="éditionOuv"
                  onChange={handleChange}
                />
                {errors.éditionOuv && (
                  <span className="error-message">{errors.éditionOuv}</span>
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
                  name="isbnOuv"
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
                  name="dateOuv"
                  onChange={handleChange}
                />
                {errors.dateOuv && (
                  <span className="error-message">{errors.dateOuv}</span>
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

export default OuvrageScientifiques;
