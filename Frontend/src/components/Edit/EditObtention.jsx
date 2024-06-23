import React, { useState, useEffect } from "react";
import { years, category, typeProj } from "../../assets/data/fakeData";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditObtention() {

  const navigate = useNavigate();
  const {id} = useParams();

  const [values, setValues] = useState({
    annéeObt: '',
    titreObt: '',
    référanceObt: '',
    fileObt: '',
    dateObt: ''
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8081/new_obtentions/${id}`)
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
            <h2>Editer l'obtention végétale</h2>
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
                <select id="inputAnnée" className="form-select" name="annéeObt" value={values.anneeProj}
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
                <input type="text" className="form-control " id="inputTtile" name="titreObt" value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }/>

              </div>
              <div className="col-md-12">
                <label htmlFor="inputReference" className="form-label">
                  Référence <span>*</span>
                </label>
                <textarea
                  type="text"
                  className="form-control "
                  id="inputReference"
                  name="référanceObt"
                  value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
                />

              </div>
              <div className="col-md-12">
                <label htmlFor="inputPFD" className="form-label">
                  Fichier (PDF, Taille maximale: 1024 ko) <span>*</span>
                </label>
                  <input type="file" className="form-control" id="inputPDF" name="fileObt" value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }/>


              </div>
              <div className="col-md-12">
                <label htmlFor="inputDate" className="form-label">
                  Date de Création <span>*</span>
                </label>
                <input type="date" className="form-control" id="inputDate" name="dateObt" value={values.anneeProj}
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

export default EditObtention;
