import React, { useState, useEffect } from "react";
import { years, type } from "../../assets/data/fakeData";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBrevet() {

  const navigate = useNavigate();
  const {id} = useParams();

  const [values, setValues] = useState({
    annéeBrev: '',
    référanceBrev: '',
    fileBrev: '',
    dateBrev: '',
    indexationBrev: ''
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8081/new_brevets/${id}`)
      .then((res) => {
        const brevetData = res.data[0];
        setValues({
          annéeBrev: brevetData.annéeBrev,
          référanceBrev: brevetData.référanceBrev,
          fileBrev: brevetData.fileBrev,
          dateBrev: brevetData.dateBrev,
          indexationBrev: brevetData.indexationBrev,
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
            <h2>Editer le brevet</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg"></div>
          <div className="col-lg-8">
            <form className="row g-3" onSubmit={handleUpdate}>
              <div className="col-md-12">
                <label htmlFor="inputAnnée" className="form-label">
                  Année <span>*</span>
                </label>
                <select
                  id="inputAnnée"
                  className="form-select"
                  name="annéeBrev"
                  value={values.annéeBrev}
                  onChange={(e) =>
                    setValues({ ...values, annéeBrev: e.target.value })
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
              <div className="col-md-12">
                <label htmlFor="inputReference" className="form-label">
                Référence <span>*</span>
                </label>
                <textarea
                  type="text"
                  className="form-control "
                  id="inputReference"
                  name="référanceBrev"
                  value={values.référanceBrev}
                  onChange={(e) =>
                    setValues({ ...values, référanceBrev: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputPDF" className="form-label">
                Fichier (PDF, Taille maximale: 1024 ko)
                </label>
                <input
                  type="file" className="form-control" id="inputPDF" name="fileBrev" 
                  value={values.fileBrev}
                  onChange={(e) =>
                    setValues({ ...values, fileBrev: e.target.value })
                  }
                />
                
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDate" className="form-label">
                Date de Création <span>*</span>
                </label>
                <input
                  type="date" className="form-control" id="inputDate" name="dateBrev" 
                  value={values.dateBrev}
                  onChange={(e) =>
                    setValues({ ...values, dateBrev: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputIndexation" className="form-label">
                Indexation <span>*</span>
                </label>
                <select
                  id="inputIndexation" className="form-select" name="indexationBrev"
                  value={values.indexationBrev}
                  onChange={(e) =>
                    setValues({ ...values, indexationBrev: e.target.value })
                  }
                >
                  <option value="">Sélectionner une indexation</option>
                  {type.map((type, index) => (
                    <option key={index} value={type.toString()}>
                      {type}
                    </option>
                  ))}
                </select>
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

export default EditBrevet;
