import React, { useState, useEffect } from "react";
import { years, category, typeProj } from "../../assets/data/fakeData";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProject() {

  const navigate = useNavigate();
  const {id} = useParams();

  const [values, setValues] = useState({
    annéeProj: '',
    codeProj: '',
    catégorieProj: '',
    typeProj: '',
    intituléProj: '',
    coordinateurProj: '',
    budgetProj: '',
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8081/new_projects/${id}`)
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
            <h2>Editer le projet</h2>
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
                <select
                  id="inputAnnée"
                  className="form-select"
                  name="annéeProj"
                  value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
                >
                  <option value="">Sélectionner une année</option>
                  {years.map((year, index) => (
                    <option key={index} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCode" className="form-label">
                  Code <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputCode"
                  name="codeProj"
                  value={values.codeProj}
                  onChange={(e) =>
                    setValues({ ...values, codeProj: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputType" className="form-label">
                  Catégorie <span>*</span>
                </label>
                <select
                  id="inputType"
                  className="form-select"
                  name="catégorieProj"
                  value={values.categorieProj}
                  onChange={(e) =>
                    setValues({ ...values, catégorieProj: e.target.value })
                  }
                >
                  <option value="">Sélectionner une catégorie</option>
                  {category.map((category, index) => (
                    <option key={index} value={category.toString()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputType" className="form-label">
                  Type
                </label>
                <select
                  id="inputType"
                  className="form-select"
                  name="typeProj"
                  value={values.typeProj}
                  onChange={(e) =>
                    setValues({ ...values, typeProj: e.target.value })
                  }
                >
                  <option value="">Sélectionner un type</option>
                  {typeProj.map((typeProj, index) => (
                    <option key={index} value={typeProj.toString()}>
                      {typeProj}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputIntitulé" className="form-label">
                  Intitulé <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputIntitulé"
                  name="intituléProj"
                  value={values.intituleProj}
                  onChange={(e) =>
                    setValues({ ...values, intituléProj: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCoordinateur" className="form-label">
                  Coordinateur du projet <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputCoordinateur"
                  name="coordinateurProj"
                  value={values.coordinateurProj}
                  onChange={(e) =>
                    setValues({ ...values, coordinateurProj: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputBudget" className="form-label">
                  Part du budget <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputBudget"
                  name="budgetProj"
                  value={values.budgetProj}
                  onChange={(e) =>
                    setValues({ ...values, budgetProj: e.target.value })
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

export default EditProject;
