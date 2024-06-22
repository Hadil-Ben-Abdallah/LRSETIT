import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ArticlesTable.css";
import { Link, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function ArticlesTable() {
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
    axios.get("http://localhost:8081/new_articles")
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
      axios.get("http://localhost:8081/new_articles")
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
    axios.delete(`http://localhost:8081/delete_article/${id}`)
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
              <th className="text-center" onClick={() => handleSort("annéeArt")}>
                <div>Année</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("titreArt")}>
                <div>Titre</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("lienArt")}>
                <div>Lien DOI de l'article scientifique</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("datePubArt")}>
                <div>Date publication</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("fileArt")}>
                <div>Fichier </div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("cinAutArt")}>
                <div>Cin auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("ordreAutArt")}>
                <div>Ordre auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("nomAutArt")}>
                <div>Nom auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("prénomAutArt")}>
                <div>Prénom auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("identifiantAutArt")}>
                <div>Identifiant auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("emailAutArt")}>
                <div>E-mail auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("paysAutArt")}>
                <div>Pays auteur</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("titreJourArt")}>
                <div>Titre du journal</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("listesJourArt")}>
                <div>Liste des journaux</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("quartileArt")}>
                <div>Quartile du journal</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("volumeArt")}>
                <div>Volume</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("facteurArt")}>
                <div>Facteur d'impact</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("indexationArt")}>
                <div>Indexation</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("siteArt")}>
                <div>Site de la revue</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((article) => (
              <tr key={article.id}>
                <td>{article.annéeArt}</td>
                <td>{article.titreArt}</td>
                <td>{article.lienArt}</td>
                <td>{formatDate(article.datePubArt)}</td>
                <td>{article.fileArt}</td>
                <td>{article.cinAutArt}</td>
                <td>{article.ordreAutArt}</td>
                <td>{article.nomAutArt}</td>
                <td>{article.prénomAutArt}</td>
                <td>{article.identifiantAutArt}</td>
                <td>{article.emailAutArt}</td>
                <td>{article.paysAutArt}</td>
                <td>{article.titreJourArt}</td>
                <td>{article.listesJourArt}</td>
                <td>{article.quartileArt}</td>
                <td>{article.volumeArt}</td>
                <td>{article.facteurArt}</td>
                <td>{article.indexationArt}</td>
                <td>{article.siteArt}</td>
                <td>
                  <Link className="btn mx-2 btn-success dash" to={`/edit-article/${article.id}`}>Editer</Link>
                  <button onClick={() => handleDelete(article.id)} className="btn mx-2 btn-danger delete">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ArticlesTable;