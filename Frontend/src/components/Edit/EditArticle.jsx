import React, { useState, useEffect } from "react";
import { years, quartile, indexation } from "../../assets/data/fakeData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CountryDropdown } from "react-country-region-selector";
import axios from "axios";
import { FaFileLines, FaBook, FaUser } from "react-icons/fa6";

function EditArticle() {

  const navigate = useNavigate();
  const {id} = useParams();

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
  const [errors, setErrors] = useState({});

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

  const [values, setValues] = useState({
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
  useEffect(() => {
    axios
      .get(`http://localhost:8081/new_articles/${id}`)
      .then((res) => {
        const articleData = res.data[0];
        setValues({
          annéeArt: articleData.annéeArt,
          titreArt: articleData.titreArt,
          lienArt: articleData.lienArt,
          datePubArt: articleData.datePubArt,
          fileArt: articleData.fileArt,
          cinAutArt: articleData.cinAutArt,
          ordreAutArt: articleData.ordreAutArt,
          nomAutArt: articleData.nomAutArt,
          prénomAutArt: articleData.prénomAutArt,
          identifiantAutArt: articleData.identifiantAutArt,
          emailAutArt: articleData.emailAutArt,
          paysAutArt: articleData.paysAutArt,
          titreJourArt: articleData.titreJourArt,
          listesJourArt: articleData.listesJourArt,
          quartileArt: articleData.quartileArt,
          volumeArt: articleData.volumeArt,
          facteurArt: articleData.facteurArt,
          indexationArt: articleData.indexationArt,
          siteArt: articleData.siteArt,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);
  

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(values); // Log the values to check if they are correct
    axios
      .put(`http://localhost:8081/update/${id}`, values)
      .then(() => {
        console.log("Successfully updated!");
        navigate('/edit-success');
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <>
      <div className="features text-center pt-5 pb-5">
        <div className="container">
          <div className="main-title mt-5 mb-5 position-relative">
            <h2>Editer l'article scientifique</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg"></div>
          <div className="col-lg-8">
            <form className="row g-3" onSubmit={handleUpdate}>
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
                <select id="inputAnnée" className="form-select" name="annéeArt" value={values.annéeArt}
                  onChange={(e) =>
                    setValues({ ...values, annéeArt: e.target.value })
                  }>
                <option value="">Sélectionner une année</option>
                {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputTitle" className="form-label">
                  Titre <span>*</span>
                </label>
                <input type="text" className="form-control " name="titreArt" id="inputTtile"  value={values.titreArt}
                  onChange={(e) =>
                    setValues({ ...values, titreArt: e.target.value })
                  }/>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLien" className="form-label">
                  Lien DOI de l'article scientifique
                </label>
                <input type="text" className="form-control" name="lienArt" id="inputLien"  value={values.lienArt}
                  onChange={(e) =>
                    setValues({ ...values, lienArt: e.target.value })
                  }/>
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
                  value={values.datePubArt}
                  onChange={(e) =>
                    setValues({ ...values, datePubArt: e.target.value })
                  }
                />
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
                    value={values.fileArt}
                  onChange={(e) =>
                    setValues({ ...values, fileArt: e.target.value })
                  }
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
                          value={values.cinAutArt}
                  onChange={(e) =>
                    setValues({ ...values, cinAutArt: e.target.value })
                  }
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
                          value={values.ordreAutArt}
                  onChange={(e) =>
                    setValues({ ...values, ordreAutArt: e.target.value })
                  }
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
                          value={values.nomAutArt}
                  onChange={(e) =>
                    setValues({ ...values, nomAutArt: e.target.value })
                  }
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
                          value={values.prénomAutArt}
                  onChange={(e) =>
                    setValues({ ...values, prénomAutArt: e.target.value })
                  }
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
                          value={values.cinAutArt}
                  onChange={(e) =>
                    setValues({ ...values, cinAutArt: e.target.value })
                  }
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
                          value={values.identifiantAutArt}
                  onChange={(e) =>
                    setValues({ ...values, identifiantAutArt: e.target.value })
                  }
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
                          value={values.emailAutArt}
                  onChange={(e) =>
                    setValues({ ...values, emailAutArt: e.target.value })
                  }
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
                          value={values.ordreAutArt}
                  onChange={(e) =>
                    setValues({ ...values, ordreAutArt: e.target.value })
                  }
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
                <input type="text" className="form-control" name="titreJourArt" id="inputJournal" 
                value={values.titreJourArt}
                onChange={(e) =>
                  setValues({ ...values, titreJourArt: e.target.value })
                }/>
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
                  value={values.listesJourArt}
                  onChange={(e) =>
                    setValues({ ...values, listesJourArt: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputQuartile" className="form-label quartile">
                  Quartile du journal{" "}
                </label>
                <div className="detail">
                  0%----Q1----25----Q2----50----Q3----75----Q4----100%
                </div>
                <select id="inputQuartile" className="form-select" name="quartileArt" 
                value={values.quartileArt}
                onChange={(e) =>
                  setValues({ ...values, quartileArt: e.target.value })
                }>
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
                  value={values.volumeArt}
                  onChange={(e) =>
                    setValues({ ...values, volumeArt: e.target.value })
                  }
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
                  value={values.facteurArt}
                  onChange={(e) =>
                    setValues({ ...values, facteurArt: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputIndexation" className="form-label">
                  Indexation <span>*</span>
                </label>
                <select id="inputIndexation" className="form-select" name="indexationArt" 
                value={values.indexationArt}
                onChange={(e) =>
                  setValues({ ...values, indexationArt: e.target.value })
                }>
                <option value="">Sélectionner une indexation</option>
                  {indexation.map((indexation, index) => (
                    <option key={index} value={indexation.toString()}>
                      {indexation}
                    </option>
                  ))}
                </select>
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
                  value={values.siteArt}
                  onChange={(e) =>
                    setValues({ ...values, siteArt: e.target.value })
                  }
                />
              </div>

              <div className="col-12">
              <Link
                className="btn mx-2 btn-success dash"
                to="/dashboard"
                >
                  Retour
                </Link>
                <button
                  type="submit"
                  className="btn mx-2 btn-success dash"
                  state={{ scroll: true }}
                >
                  Editer
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

export default EditArticle;
