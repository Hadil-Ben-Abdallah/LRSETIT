import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ChapitresTable.css";
import { Link, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function ChapitresTable() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [deleted, setDeleted] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };
  
  

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === null) return 0;
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  useEffect(() => {
    axios.get("http://localhost:8081/new_chapitres")
      .then((res) => {
        console.log("Response:", res.data); // Log the response to check its structure
        if (Array.isArray(res.data.Data)) {
          setData(res.data.Data);
        } else {
          console.log("Response data is not an array:", res.data);
        }
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios.get("http://localhost:8081/new_chapitres")
        .then((res) => {
          console.log("Response after delete:", res.data); // Log the response to check its structure
          if (Array.isArray(res.data.Data)) {
            setData(res.data.Data);
          } else {
            console.log("Response data is not an array:", res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(id) {
    axios.delete(`http://localhost:8081/delete_chapitre/${id}`)
      .then((res) => {
        console.log("Delete response:", res.data);
        // Remove the deleted row from the UI
        setData((prevData) => prevData.filter((row) => row.id !== id));
        console.log("Successfully deleted!");

        // Optionally, you can also update the state to trigger a re-fetch of the data
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="card-body d-flex justify-content-center align-items-center">
      <div className="table-responsive">
        <table className="table proj">
          <thead>
            <tr>
              <th className="text-center" onClick={() => handleSort("annéeChap")}>
                <div>Année</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("cinAutChap")}>
                <div>Cin auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("ordreAutChap")}>
                <div>Ordre auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("nomAutChap")}>
                <div>Nom auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("prénomAutChap")}>
                <div>Prénom auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("identifiantAutChap")}>
                <div>Identifiant auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("emailAutChap")}>
                <div>E-mail auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("paysAutChap")}>
                <div>Pays auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("titreChap")}>
                <div>Titre</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("éditeurChap")}>
                <div>Editeur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("lienChap")}>
                <div>Lien éditeur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("éditionChap")}>
                <div>Edition</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("isbnChap")}>
                <div>ISBN/Issan</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("dateChap")}>
                <div>Date</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((Chapitre) => (
              <tr key={Chapitre.id}>
                <td>{Chapitre.annéeChap}</td>
                <td>{Chapitre.cinAutChap}</td>
                <td>{Chapitre.ordreAutChap}</td>
                <td>{Chapitre.nomAutChap}</td>
                <td>{Chapitre.prénomAutChap}</td>
                <td>{Chapitre.identifiantAutChap}</td>
                <td>{Chapitre.emailAutChap}</td>
                <td>{Chapitre.paysAutChap}</td>
                <td>{Chapitre.titreChap}</td>
                <td>{Chapitre.éditeurChap}</td>
                <td>{Chapitre.lienChap}</td>
                <td>{Chapitre.éditionChap}</td>
                <td>{Chapitre.isbnChap}</td>
                <td>{formatDate(Chapitre.dateChap)}</td>
                <td>
                  <Link className="btn mx-2 btn-success dash" to={`/edit-project/${Chapitre.id}`}>Editer</Link>
                  <button onClick={() => handleDelete(Chapitre.id)} className="btn mx-2 btn-danger delete">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChapitresTable;