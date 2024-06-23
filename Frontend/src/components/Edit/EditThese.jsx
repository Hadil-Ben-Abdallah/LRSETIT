import React, { useState, useEffect } from "react";
import { years, category, typeProj } from "../../assets/data/fakeData";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditThese() {

  const navigate = useNavigate();
  const {id} = useParams();

  const [values, setValues] = useState({
    annéeThes: '',
    titreThes: '',
    sujetThes: '',
    annéeInscThes: '',
    mémoireThes: '',
    encadrantThes: '',
    cotutelleThes: ''
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8081/new_theses/${id}`)
      .then((res) => {
        const projectData = res.data[0];
        setValues({
          annéeProj: projectData.annéeProj,
          codeProj: projectData.codeProj,
          catégorieProj: projectData.catégorieProj,
          typeProj: projectData.typeProj,
          intituléProj: projectData.intituléProj,
          coordinateurProj: projectData.coordinateurProj,
          budgetProj: projectData.budgetProj,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);
  

  const handleUpdate = (event) => {
    event.preventDefault();
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
            <h2>Editer la these</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg"></div>
          <div className="col-lg-8">
            <form className="row g-3" onSubmit={handleUpdate}>
              <div className="col-md-6">
                <label htmlFor="inputAnnée" className="form-label">
                  Année <span>*</span>
                </label>
                <select id="inputAnnée" className="form-select" name="annéeThes" value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
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
                <input type="text" className="form-control " id="inputTtile" name="titreThes" value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }/>

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
                  value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
                />

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
                  value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputPFD" className="form-label">
                  Mémoire de thèse soutenu (PDF contient la page de garde,
                  Taille maximale: 1 MO) <span>*</span>
                </label>
                  <input type="file" className="form-control" id="inputPDF" name="mémoireThes" value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }/>

              </div>
              <div className="col-md-12">
                <label htmlFor="inputEncadrant" className="form-label">
                  Encadrant <span>*</span>
                </label>
                <input id="inputEncadrant" className="form-control" name="encadrantThes" value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }/>

              </div>
              <div>
                <label htmlFor="inputCtutelle" className="form-label">
                  Cotutelle <span>*</span>
                  <br/>

                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cotutelleThes"
                    id="flexRadioDefault1"
                    value="Non cotutelle"
                    onChange={(e) =>
                      setValues({ ...values, annéeProj: e.target.value })
                    }
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
                    onChange={(e) =>
                      setValues({ ...values, annéeProj: e.target.value })
                    }
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

export default EditThese;
