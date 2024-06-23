import React, { useState, useEffect } from "react";
import { years, typeConv } from "../../assets/data/fakeData";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditConvention() {

  const navigate = useNavigate();
  const {id} = useParams();

  const [values, setValues] = useState({
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
  useEffect(() => {
    axios
      .get(`http://localhost:8081/new_conventions/${id}`)
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
            <h2>Editer la convention</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg"></div>
          <div className="col-lg-8">
            <form className="row g-3"onSubmit={handleUpdate}>
              <div className="col-md-12">
                <label htmlFor="inputAnnée" className="form-label">
                  Année <span>*</span>
                </label>
                <select id="inputAnnée" className="form-select" name="annéeConv" value={values.anneeProj}
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
              <div>
                <div className="form-check">
  <input 
    className="form-check-input" 
    type="checkbox" 
    name="nationalConv" 
    value="National" 

                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
  />
  National
</div>
<div className="form-check">
  <input 
    className="form-check-input" 
    type="checkbox" 
    name="nationalConv" 
    value="International" 

                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
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
                  value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
                />

              </div>
              <div className="col-md-12">
                <label htmlFor="inputType" className="form-label">
                  Type
                </label>
                <select id="inputType" className="form-select" name="typeConv" value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }>
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
                  value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
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
                  value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
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
                  value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
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
                  value={values.anneeProj}
                  onChange={(e) =>
                    setValues({ ...values, annéeProj: e.target.value })
                  }
                />

              </div>
              <div className="col-12">
                <label htmlFor="inputPFD" className="form-label">
                  Fichier (PDF, Taille maximale: 1024 MO) <span>*</span>
                </label>
                  <input type="file" className="form-control" id="inputPDF" name="fileConv" value={values.anneeProj}
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

export default EditConvention;
