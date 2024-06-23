import React, { useState, useEffect } from "react";
import { years, category, typeProj } from "../../assets/data/fakeData";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditManifestation() {

  const navigate = useNavigate();
  const {id} = useParams();

  const [values, setValues] = useState({
    annéeMan: '',
    titreMan: '',
    organisateursMan: '',
    dateMan: '',
    lieuMan: '',
    typeMan: '',
    siteMan: ''
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8081/new_manifestations/${id}`)
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
            <h2>Editer la manifestation scientifique</h2>
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
                <select id="inputAnnée" className="form-select" name="annéeMan" value={values.anneeProj}
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
                <input type="text" className="form-control " id="inputTitle" name="titreMan" value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }/>

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
                  value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
                />

              </div>
              <div className="col-md-6">
                <label htmlFor="inputDate" className="form-label">
                  Date d'organisation <span>*</span>
                </label>
                <input type="date" className="form-control " id="inputDate" name="dateMan" value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }/>

              </div>
              <div className="col-md-6">
                <label htmlFor="inputLieu" className="form-label">
                  Lieu <span>*</span>
                </label>
                <input type="text" className="form-control " id="inputLieu" name="lieuMan" value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }/>

              </div>
              <div>
                <label htmlFor="inputCtutelle" className="form-label">
                  Type <span>*</span>
                  <br/>
                 
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="typeMan"
                    id="flexRadioDefault1"
                    value="National"
                    
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
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
                    
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
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
                value={values.anneeProj}
                onChange={(e) =>
                  setValues({ ...values, annéeProj: e.target.value })
                }/>
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

export default EditManifestation;
