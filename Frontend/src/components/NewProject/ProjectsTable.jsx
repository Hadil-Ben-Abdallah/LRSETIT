import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProjectsTable.css";
import { Link, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function ProjectsTable() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [deleted, setDeleted] = useState(false);

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
    axios.get("http://localhost:8081/new_projects")
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
      axios.get("http://localhost:8081/new_projects")
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
    axios.delete(`http://localhost:8081/delete/${id}`)
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
              <th className="text-center" onClick={() => handleSort("annéeProj")}>
                <div>Année</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("codeProj")}>
                <div>Code</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("catégorieProj")}>
                <div>Catégorie</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("typeProj")}>
                <div>Type</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("intituléProj")}>
                <div>Intitulé</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("coordinateurProj")}>
                <div>Coordinateur du projet</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center" onClick={() => handleSort("budgetProj")}>
                <div>Part du budget</div>
                <div><i className="fas fa-sort"></i></div>
              </th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((project) => (
              <tr key={project.id}>
                <td>{project.annéeProj}</td>
                <td>{project.codeProj}</td>
                <td>{project.catégorieProj}</td>
                <td>{project.typeProj}</td>
                <td>{project.intituléProj}</td>
                <td>{project.coordinateurProj}</td>
                <td>{project.budgetProj}</td>
                <td>
                  <Link className="btn mx-2 btn-success dash" to={`/edit-project/${project.id}`}>Editer</Link>
                  <button onClick={() => handleDelete(project.id)} className="btn mx-2 btn-danger delete">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsTable;