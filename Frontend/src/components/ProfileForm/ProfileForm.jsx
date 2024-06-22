import React, {useEffect, useState} from "react";
import "./ProfileForm.css";
import axios from "axios";



import {
  establishmentOptions,
  gradeOptions,
  ministries,
  universities,
} from "../../assets/data/fakeData";


function ProfileForm() {
  const [data, setData] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [editingData, setEditingData] = useState({});
  const [editedData, setEditedData] = useState({});

  // useEffect(() => {
  //   axios.get('http://localhost:8081/inscriptions')
  //     .then((res) => {
  //       if (Array.isArray(res.data.Data)) {
  //         setData(res.data.Data);
  //         setLocalData(res.data.Data); // Initialize localData with fetched data
  //       } else {
  //         console.log('Response data is not an array:', res.data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const cinInsc = localStorage.getItem('cinInsc'); // Get cinInsc from local storage
  
    if (cinInsc) {
      axios.get(`http://localhost:8081/inscriptions/${cinInsc}`)
        .then((res) => {
          if (Array.isArray(res.data.Data)) {
            setData(res.data.Data);
            setLocalData(res.data.Data); // Initialize localData with fetched data
          } else {
            console.log('Response data is not an array:', res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  

  const columnMapping = {
    'ministereInsc': 'Ministère / Organisme',
    'universiteInsc': 'Université / Centre de recherche / EPS',
    'etablissementInsc': 'Etablissement',
    'numPassInsc': 'Num Passport (étrangé)',
    'cnrpsInsc': 'CNRPS',
    'nomInsc': 'Nom',
    'prenomInsc': 'Prénom',
    'emailInsc': 'Email',
    'dateNaissanceInsc': 'Date de naissance',
    'genreInsc': 'Genre',
    'fonctionInsc': 'Fonction administrative',
    'gradeInsc': 'Grade',
    'specialiteInsc': 'Spécialité',
    'diplomeInsc': 'Diplome',
    'dateDiplomeInsc': 'Date Du dernier diplome',
    'indexInsc': 'H-index',
    'identificationInsc': 'Identification ORCID',
    'telFixeInsc': 'Tél Fixe',
    'telMobileInsc': 'Tél Mobile',
    'faxInsc': 'Fax',
  };

  const handleEdit = (user) => {
    console.log("Editing user with CIN:", user.cinInsc);
    setEditingData(user);
    setEditedData(user); // Initialize edited data with current user data
  };

  const handleChange = (e, key) => {
    setEditedData({
      ...editedData,
      [key]: e.target.value,
    });
  };

  const handleSend = () => {
    // Update the local data state
    const updatedData = localData.map((item) => {
      if (item.cinInsc === editingData.cinInsc) {
        return { ...item, ...editedData };
      }
      return item;
    });
    setLocalData(updatedData);
    setEditingData({}); // Clear editing data after update
  };

  return (
    <>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-borderless">
            <tbody>
              {localData && localData.map((user, index) => (
                <React.Fragment key={index}>
                  {Object.keys(user).map((key) => (
                    key !== 'photoInsc' && key !== 'created_at' && key !== 'updated_at' && (
                      <tr key={key}>
                        <td className="text-name-color">{columnMapping[key] || key}</td>
                        <td className="text-value-color">{user[key]}</td>
                      </tr>
                    )
                  ))}
                  <button
                    className='btn mx-2 btn-success dash'
                    onClick={() => handleEdit(user)}
                  >
                    Editer
                  </button>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {Object.keys(editingData).length > 0 && (
        <div className="card-body">
          <form className="row g-3">
            <div className="col-md-12">
              <label htmlFor="input-ministereInsc" className="form-label">
                {columnMapping['ministereInsc']}
              </label>
              <select
                className="form-control"
                id="input-ministereInsc"
                value={editedData['ministereInsc'] || ''}
                onChange={(e) => handleChange(e, 'ministereInsc')}
              >
                <option value="">Sélectionner une ministère / organisme</option>
                  {ministries.map((ministry, index) => (
                    <option key={index} value={ministry.toString()}>
                      {ministry}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="input-universiteInsc" className="form-label">
                {columnMapping['universiteInsc']}
              </label>
              <select
                className="form-control"
                id="input-universiteInsc"
                value={editedData['universiteInsc'] || ''}
                onChange={(e) => handleChange(e, 'universiteInsc')}
              >
                <option value="">Sélectionner une université</option>
                  {universities.map((university, index) => (
                    <option key={index} value={university.toString()}>
                      {university}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="input-etablissementInsc" className="form-label">
                {columnMapping['etablissementInsc']}
              </label>
              <select
                className="form-control"
                id="input-etablissementInsc"
                value={editedData['etablissementInsc'] || ''}
                onChange={(e) => handleChange(e, 'etablissementInsc')}
              >
                <option value="">Sélectionner un établissement</option>
                  {establishmentOptions.map((establishmentOptions, index) => (
                    <option key={index} value={establishmentOptions.toString()}>
                      {establishmentOptions}
                    </option>
                  ))}
              </select>
            </div>
            {Object.keys(editingData).map((key) => (
              key !== 'ministereInsc' &&
              key !== 'universiteInsc' &&
              key !== 'etablissementInsc' &&
              key !== 'cinInsc' &&
              key !== 'photoInsc' &&
              key !== 'created_at' &&
              key !== 'updated_at' && (
                <React.Fragment key={key}>
                  {key === 'gradeInsc' ? (
                    <div className="col-md-6" key={key}>
                      <label htmlFor={`input-${key}`} className="form-label">
                        {columnMapping[key] || key}
                      </label>
                      <select
                        className="form-control"
                        id={`input-${key}`}
                        value={editedData[key] || ''}
                        onChange={(e) => handleChange(e, key)}
                      >
                        <option value="">Sélectionner un grade</option>
                  {gradeOptions.map((gradeOptions, index) => (
                    <option key={index} value={gradeOptions.toString()}>
                      {gradeOptions}
                    </option>
                  ))}
                      </select>
                    </div>
                  ) : (
                    <div className="col-md-6" key={key}>
                      <label htmlFor={`input-${key}`} className="form-label">
                        {columnMapping[key] || key}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`input-${key}`}
                        value={editedData[key] || ''}
                        onChange={(e) => handleChange(e, key)}
                      />
                    </div>
                  )}
                </React.Fragment>
              )
            ))}
            <div className="col-12">
              <button
                type="button"
                className="btn mx-2 btn-success dash"
                onClick={handleSend}
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ProfileForm;