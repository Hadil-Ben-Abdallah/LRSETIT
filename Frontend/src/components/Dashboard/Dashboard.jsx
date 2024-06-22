import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import ProfileForm from "../ProfileForm/ProfileForm";
import ProjectsTable from "../NewProject/ProjectsTable";
import ArticlesTable from "../ArticlesScientifiques/ArticlesTable";
import OuvragesTable from "../OuvragesScientifiques/OuvragesTable";
import ChapitresTable from "../ChapitreOuvrage/ChapitresTable";
import BrevetsTable from "../Brevets/BrevetsTable";
import ObtentionsTable from "../ObtentionsVegetales/ObtentionsTable";
import HabilitationsTable from "../Habilitations/HabilitationsTable";
import ThesesTable from "../ThesesDoctorat/ThesesTable";
import MasteresTable from "../MasteresRecherche/MasteresTable";
import ManifestationsTable from "../ManifestationsScientifiques/ManifestationsTable";
import ConventionsTable from "../Conventions/ConventionsTable";
import profile from "../../assets/profile.jpg";
import Message from "../Message/Message";
import logo from "../../assets/logo.png";
import ViewMessage from "../ViewMessage/ViewMessage";
import axios from "axios";

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState("ArticlesTable");
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );
  const changeStyle1 = () => {
    if (
      style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  const [isToggled, setIsToggled] = useState(false);

  const toggleStyle = () => {
    setIsToggled(!isToggled);
  };

  const [selectedItem, setSelectedItem] = useState("Articles scientifiques");
  // const [selectedComponent, setSelectedComponent] = useState("ArticlesTable");

  // Function to handle item selection


  const [profileFormVisible, setProfileFormVisible] = useState(false);
  const handleItemClick1 = (itemName) => {
    if (itemName === "Profile") {
      setProfileFormVisible(true);
      setSelectedComponent(null); // Set ProjectsTable to null
    } else {
      setProfileFormVisible(false);
    }
    setSelectedItem(itemName);
  };
  // const [selectedComponent, setSelectedComponent] = useState(null);
  const handleItemClick3 = (itemName) => {
    setSelectedComponent(itemName === "Projets" ? "ProjectsTable" : null);
    setSelectedItem(itemName);
  };
  const handleItemClick4 = (itemName) => {
    setSelectedComponent(itemName === "Envoyer un nouveau message" ? "Message" : null);
    setSelectedItem(itemName);
    setShowMessageForm(itemName !== "Envoyer un nouveau message");
  };
  const handleItemClick5 = (itemName) => {
    setSelectedComponent(itemName === "Articles scientifiques" ? "ArticlesTable" : null);
    setSelectedItem(itemName);
  };
  const handleItemClick6 = (itemName) => {
    setSelectedComponent(itemName === "Ouvrages scientifiques" ? "OuvragesTable" : null);
    setSelectedItem(itemName);
  };
  const handleItemClick7 = (itemName) => {
    setSelectedComponent(itemName === "Chapitres d'ouvrages" ? "ChapitresTable" : null);
    setSelectedItem(itemName);
  };
  const handleItemClick8 = (itemName) => {
    setSelectedComponent(itemName === "Brevets" ? "BrevetsTable" : null);
    setSelectedItem(itemName);
  };
  const handleItemClick9 = (itemName) => {
    setSelectedComponent(itemName === "Obtentions végétales" ? "ObtentionsTable" : null);
    setSelectedItem(itemName);
  };
  const handleItemClick10 = (itemName) => {
    setSelectedComponent(itemName === "Habilitations" ? "HabilitationsTable" : null);
    setSelectedItem(itemName);
  };
  const handleItemClick11 = (itemName) => {
    setSelectedComponent(itemName === "Thèses de doctorat" ? "ThesesTable" : null);
    setSelectedItem(itemName);
  };
  const handleItemClick12 = (itemName) => {
    setSelectedComponent(itemName === "Mastères recherche" ? "MasteresTable" : null);
    setSelectedItem(itemName);
  };
  const handleItemClick13 = (itemName) => {
    setSelectedComponent(itemName === "Manifestations scientifiques" ? "ManifestationsTable" : null);
    setSelectedItem(itemName);
  };
  const handleItemClick14 = (itemName) => {
    setSelectedComponent(itemName === "Conventions" ? "ConventionsTable" : null);
    setSelectedItem(itemName);
  };

  const [messageContent, setMessageContent] = useState("");

  const handleMessageClick = (message) => {
    setMessageContent(message);
    setSelectedItem("ViewMessage");
    setSelectedComponent("ViewMessage");
  };

  const [showMessageForm, setShowMessageForm] = useState(false);

  const routeMappings = {
    "Articles scientifiques": "articles-scientifiques",
    "Ouvrages scientifiques": "ouvrages-scientifiques",
    "Chapitres d'ouvrages": "chapitre-ouvrage",
    "Brevets": "brevets",
    "Obtentions végétales": "obtentions-vegetales",
    "Habilitations": "habilitations",
    "Thèses de doctorat": "these-doctorat",
    "Mastères recherche": "masteres-recherche",
    "Manifestations scientifiques": "manifestations-scientifiques",
    "Conventions": "conventions",
    "Projets": "new-project",
  };
  

  const getRouteForItem = (item) => {
    return routeMappings[item];
  };

  // Usage
  const route = getRouteForItem(selectedItem);

  const [userName, setUserName] = useState('');
  useEffect(() => {
    const cinInsc = localStorage.getItem('cinInsc'); // Get cinInsc from local storage

    if (cinInsc) {
      axios.get(`http://localhost:8081/inscriptions/${cinInsc}`)
        .then((res) => {
          if (Array.isArray(res.data.Data) && res.data.Data.length > 0) {
            const userData = res.data.Data[0];
            setUserName(`${userData.prenomInsc} ${userData.nomInsc}`);
          } else {
            console.log('Response data is not an array or is empty:', res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  






  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   handleItemClick3(searchTerm);
  // };
  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   const availableItems = Object.keys(routeMappings).filter(
  //     (itemName) => itemName.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   if (availableItems.length > 0) {
  //     const firstAvailableItem = availableItems[0];
  //     handleItemClick3(firstAvailableItem);
  //   }
  // };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const availableItems = Object.keys(routeMappings).filter(
      (itemName) => itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (availableItems.length > 0) {
      const firstAvailableItem = availableItems[0];
      handleItemClick(firstAvailableItem);
    }
  };

  // const handleItemClick = (itemName) => {
  //   if (itemName === "Projets") {
  //     handleItemClick3(itemName);
  //   } else if (itemName === "Articles scientifiques") {
  //     handleItemClick5(itemName);
  //   } else if (itemName === "Ouvrages scientifiques") {
  //     handleItemClick6(itemName);
  //   } else if (itemName === "Chapitres d'ouvrages") {
  //     handleItemClick7(itemName);
  //   } else if (itemName === "Brevets") {
  //     handleItemClick8(itemName);
  //   } else if (itemName === "Obtentions végétales") {
  //     handleItemClick9(itemName);
  //   } else if (itemName === "Habilitations") {
  //     handleItemClick10(itemName);
  //   } else if (itemName === "Thèses de doctorat") {
  //     handleItemClick11(itemName);
  //   } else if (itemName === "Mastères recherche") {
  //     handleItemClick12(itemName);
  //   } else if (itemName === "Manifestations scientifiques") {
  //     handleItemClick13(itemName);
  //   } else if (itemName === "Conventions") {
  //     handleItemClick14(itemName);
  //   } else {
  //     // Handle other items if necessary
  //     setSelectedComponent(itemName);
  //   }
  // };
  const handleItemClick = (itemName) => {
    setShowMessageForm(false);
    setSelectedItem(itemName);
  
    switch (itemName) {
      case "Projets":
        setSelectedComponent("ProjectsTable");
        break;
      case "Articles scientifiques":
        setSelectedComponent("ArticlesTable");
        break;
      case "Ouvrages scientifiques":
        setSelectedComponent("OuvragesTable");
        break;
      case "Chapitres d'ouvrages":
        setSelectedComponent("ChapitresTable");
        break;
      case "Brevets":
        setSelectedComponent("BrevetsTable");
        break;
      case "Obtentions végétales":
        setSelectedComponent("ObtentionsTable");
        break;
      case "Habilitations":
        setSelectedComponent("HabilitationsTable");
        break;
      case "Thèses de doctorat":
        setSelectedComponent("ThesesTable");
        break;
      case "Mastères recherche":
        setSelectedComponent("MasteresTable");
        break;
      case "Manifestations scientifiques":
        setSelectedComponent("ManifestationsTable");
        break;
      case "Conventions":
        setSelectedComponent("ConventionsTable");
        break;
      default:
        setSelectedComponent(itemName);
        break;
    }
  };
  const handleViewMessage = (message) => {
    setShowMessageForm(true);
    setSelectedItem("Voir le message");
    setMessageContent(message);
  };
  
  

  return (
    <div>
      <body id="page-top">
        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper">
          {/*  <!-- Sidebar --> */}

          <ul
            className={`navbar-nav main-color sidebar sidebar-dark accordion ${
              isToggled ? "toggled" : ""
            }`}
            id="accordionSidebar"
          >
            {/*  <!-- Sidebar - Brand --> */}

            <Link
              className="sidebar-brand d-flex align-items-center justify-content-center"
              to="/home"
            >
              <div className="sidebar-brand-icon">
                <img src={logo} alt="No-img" />
              </div>
              <div className="text-center d-none d-md-inline"></div>
            </Link>

            {/*   <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/*  <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
              <a className="nav-link" href="">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>

            {/*  <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/*   <!-- Heading --> */}
            <div className="sidebar-heading">Interface</div>

            {/*  <!-- Nav Item - Pages Collapse Menu --> */}
            <li className="nav-item">
              <Link
                className="nav-link collapsed"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-fw fa-cog"></i>
                <span>composantes</span>
              </Link>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-3 collapse-inner rounded">
                  <h6 className="collapse-header">
                    Composantes d'utilisateur:
                  </h6>
                  {Object.keys(routeMappings).map((itemName) => (
  // <button
  //   key={itemName}
  //   className="dropdown-item"
  //   onClick={() => handleItemClick3(itemName)}
  //   type="button"
  // >
  //   {itemName}
  // </button>
  <button
  key={itemName}
  className="dropdown-item"
  onClick={() => handleItemClick(itemName)}
  type="button"
>
  {itemName}
</button>
))}

                </div>
              </div>
            </li>

            {/* <!-- Nav Item - Utilities Collapse Menu --> */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseUtilities"
                aria-expanded="true"
                aria-controls="collapseUtilities"
              >
                <i className="fas fa-fw fa-wrench"></i>
                <span>utilitaires</span>
              </a>
              <div
                id="collapseUtilities"
                className="collapse"
                aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">utilitaires:</h6>
                  <a className="collapse-item" href="utilities-color.html">
                    Coleurs
                  </a>
                  <a className="collapse-item" href="utilities-border.html">
                    Frontières
                  </a>
                  <a className="collapse-item" href="utilities-animation.html">
                    Animations
                  </a>
                  <a className="collapse-item" href="utilities-other.html">
                    Autres
                  </a>
                </div>
              </div>
            </li>

            {/*  <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/*   <!-- Sidebar Toggler (Sidebar) --> */}
            {/*   <div className="text-center d-none d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                        </div> */}

            {/*  <!-- Sidebar Message --> */}
          </ul>
          {/*  <!-- End of Sidebar --> */}

          {/*  <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/*  <!-- Main Content --> */}
            <div id="content">
              {/*  <!-- Topbar --> */}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/*  <!-- Sidebar Toggle (Topbar) --> */}
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3 "
                  onClick={changeStyle1}
                >
                  {/* <i className="fa fa-bars"></i> */}
                </button>

                {/*  <!-- Topbar Search --> */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" onSubmit={handleSearchSubmit}>
                  <div className="input-group">
                  <input
  type="text"
  className="form-control bg-light border-0 small"
  placeholder="Rechercher..."
  aria-label="Search"
  aria-describedby="basic-addon2"
  value={searchTerm}
  onChange={handleSearchChange}
/>

                    <div className="input-group-append">
                      <button
                        className="btn btn-primary main-color"
                        type="button"
                      >
                        <i className="fas fa-search fa-sm "></i>
                      </button>
                    </div>
                  </div>
                </form>

                {/*  <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">
                  {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="searchDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-search fa-fw"></i>
                    </a>
                    {/*   <!-- Dropdown - Messages --> */}
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Rechercher..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary main-color"
                              type="button"
                            >
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>

                  {/*  <!-- Nav Item - Alerts --> */}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="alertsDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-bell fa-fw"></i>
                      {/*  <!-- Counter - Alerts --> */}
                      <span className="badge badge-danger badge-counter">
                        3+
                      </span>
                    </a>
                    {/*   <!-- Dropdown - Alerts --> */}
                    <div
                      className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="alertsDropdown"
                    >
                      <h6
                        className="dropdown-header"
                        style={{ backgroundColor: "#19283f" }}
                      >
                        Notifications
                      </h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="mr-3">
                          <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">9 Mai 2024</div>
                          <span className="font-weight-bold">
                            Vous avez un nouveau rapport à télécharger!
                          </span>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="mr-3">
                          <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">9 Mai 2024</div>
                          1700DT ont été déposés sur votre compte !
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="mr-3">
                          <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            30 Juin 2024
                          </div>
                          Vous devez mettre à jour le budget du dernier projet
                          ajouté
                        </div>
                      </a>
                      <a
                        className="dropdown-item text-center small text-gray-500"
                        href="#"
                      >
                        afficher tous les notifications
                      </a>
                    </div>
                  </li>

                  {/*  <!-- Nav Item - Messages --> */}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="messagesDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-envelope fa-fw"></i>
                      {/*  <!-- Counter - Messages --> */}
                      <span className="badge badge-danger badge-counter">
                        1
                      </span>
                    </a>
                    {/*   <!-- Dropdown - Messages --> */}
                    <div
                      className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="messagesDropdown"
                    >
                      <h6
                        className="dropdown-header"
                        style={{ backgroundColor: "#19283f" }}
                      >
                        Messages
                      </h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src={logo}
                            alt="..."
                          />
                          <div className="status-indicator bg-success"></div>
                        </div>
                        <div onClick={() => setShowMessageForm(true)}>
                        <div
                          className="font-weight-bold"
                          onClick={() => handleMessageClick("Bonjour!")}
                        >
                          
                            <div className="small text-gray-500">
                              Admin · 58m
                            </div>
                            <div className="text-truncate">Bonjour!</div>
                          </div>
                        </div>
                      </a>

                      <Link
                        className="dropdown-item text-center small text-gray-500"
                        onClick={() =>
                          handleItemClick4("Envoyer un nouveau message")
                        }
                      >
                        Envoyer un nouveau message
                      </Link>
                    </div>
                  </li>

                  <div className="topbar-divider d-none d-sm-block"></div>

                  {/* <!-- Nav Item - User Information --> */}
                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        Hadil Ben Abdallah
                      </span> */}
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {userName}
            </span>
                      <img
                        className="img-profile rounded-circle"
                        src={profile}
                      />
                    </a>
                    {/*  <!-- Dropdown - User Information --> */}
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <Link
                        className="dropdown-item"
                        onClick={() => handleItemClick1("Profile")}
                      >
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                      </Link>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Paramètres
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        Journal d'activité
                      </a>
                      <div className="dropdown-divider"></div>
                      <Link
                        className="dropdown-item"
                        to="/"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Se déconnecter
                      </Link>
                    </div>
                  </li>
                </ul>
              </nav>
              {/*  <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">
                {/*  <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4 report">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                  <a
                    href="#"
                    className="d-none d-sm-inline-block btn btn-sm shadow-sm"
                  >
                    <i className="fas fa-download fa-sm text-white-50"></i>{" "}
                    Télécharger un Report
                  </a>
                </div>

                {/*  <!-- Content Row --> */}
                <div className="row"></div>

                {/*  <!-- Content Row --> */}

                <div className="row">
                  {/*  <!-- Pie Chart --> */}
                  <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold ">
                          {showMessageForm ? "Voir le message" : selectedItem}
                        </h6>
                        {selectedItem !== "Profile" &&
                          selectedItem !== "Envoyer un nouveau message" &&
                          selectedItem !== "ViewMessage" && (
                            <Link
                              to={`/${route}`}
                              className="btn mx-2 btn-success"
                            >
                              + Nouveaux {selectedItem}
                            </Link>
                          )}
                      </div>
                      
                      {selectedItem === "Profile" && (
                        <div className="center-profile-form">
                          <ProfileForm />
                        </div>
                      )}
                      {selectedComponent === "ProjectsTable" && (
                        <div className="center-profile-form">
                          <ProjectsTable />
                        </div>
                      )}
                      {selectedComponent === "ArticlesTable" && (
                        <div className="center-profile-form">
                          <ArticlesTable />
                        </div>
                      )}
                      {selectedComponent === "OuvragesTable" && (
                        <div className="center-profile-form">
                          <OuvragesTable />
                        </div>
                      )}
                      {selectedComponent === "ChapitresTable" && (
                        <div className="center-profile-form">
                          <ChapitresTable />
                        </div>
                      )}
                      {selectedComponent === "BrevetsTable" && (
                        <div className="center-profile-form">
                          <BrevetsTable />
                        </div>
                      )}
                      {selectedComponent === "ObtentionsTable" && (
                        <div className="center-profile-form">
                          <ObtentionsTable />
                        </div>
                      )}
                      {selectedComponent === "HabilitationsTable" && (
                        <div className="center-profile-form">
                          <HabilitationsTable />
                        </div>
                      )}
                      {selectedComponent === "ThesesTable" && (
                        <div className="center-profile-form">
                          <ThesesTable />
                        </div>
                      )}
                      {selectedComponent === "MasteresTable" && (
                        <div className="center-profile-form">
                          <MasteresTable />
                        </div>
                      )}
                      {selectedComponent === "ManifestationsTable" && (
                        <div className="center-profile-form">
                          <ManifestationsTable />
                        </div>
                      )}
                      {selectedComponent === "ConventionsTable" && (
                        <div className="center-profile-form">
                          <ConventionsTable />
                        </div>
                      )}
                      {selectedComponent === "Message" && (
                        <div className="center-profile-form">
                          <Message />
                        </div>
                      )}
                      {showMessageForm && (
                        <div className="center-profile-form">
                          <ViewMessage message={messageContent} />
                        </div>
                      )}

                    </div>
                  </div>
                  {/* <div className="col-xl-12 col-lg-12">
  <div className="card shadow mb-4">
    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
      <h6 className="m-0 font-weight-bold ">
        {showMessageForm ? "Voir le message" : selectedItem}
      </h6>
      {selectedItem !== "Profile" &&
        selectedItem !== "Envoyer un nouveau message" &&
        selectedItem !== "ViewMessage" && (
          <Link to={`/${route}`} className="btn mx-2 btn-success">
            + Nouveaux {selectedItem}
          </Link>
        )}
    </div>
    {selectedItem === "Profile" && (
      <div className="center-profile-form">
        <ProfileForm />
      </div>
    )}
    {selectedComponent === "ProjectsTable" && (
      <div className="center-profile-form">
        <ProjectsTable />
      </div>
    )}
    {selectedComponent === "ArticlesTable" && (
      <div className="center-profile-form">
        <ArticlesTable />
      </div>
    )}
    {selectedComponent === "OuvragesTable" && (
      <div className="center-profile-form">
        <OuvragesTable />
      </div>
    )}
    {selectedComponent === "ChapitresTable" && (
      <div className="center-profile-form">
        <ChapitresTable />
      </div>
    )}
    {selectedComponent === "BrevetsTable" && (
      <div className="center-profile-form">
        <BrevetsTable />
      </div>
    )}
    {selectedComponent === "ObtentionsTable" && (
      <div className="center-profile-form">
        <ObtentionsTable />
      </div>
    )}
    {selectedComponent === "HabilitationsTable" && (
      <div className="center-profile-form">
        <HabilitationsTable />
      </div>
    )}
    {selectedComponent === "ThesesTable" && (
      <div className="center-profile-form">
        <ThesesTable />
      </div>
    )}
    {selectedComponent === "MasteresTable" && (
      <div className="center-profile-form">
        <MasteresTable />
      </div>
    )}
    {selectedComponent === "ManifestationsTable" && (
      <div className="center-profile-form">
        <ManifestationsTable />
      </div>
    )}
    {selectedComponent === "ConventionsTable" && (
      <div className="center-profile-form">
        <ConventionsTable />
      </div>
    )}
    {selectedComponent === "Message" && (
      <div className="center-profile-form">
        <Message />
      </div>
    )}
    {showMessageForm && (
      <div className="center-profile-form">
        <ViewMessage message={messageContent} />
      </div>
    )}
  </div>
</div> */}

                </div>

                {/*   <!-- Content Row --> */}
                <div className="row">
                  {/*   <!-- Content Column --> */}
                  <div className="col-lg-6 mb-4">
                    {/* <!-- Project Card Example --> */}
                    {/* <!-- Color System --> */}
                  </div>
                  <div className="col-lg-6 mb-4"></div>
                </div>
              </div>
              {/*   <!-- /.container-fluid --> */}
            </div>
            {/*   <!-- End of Main Content -->
            <!-- Footer --> */}

            <div className="footer-dashboard pt-3 pb-3 text-white-50 text-center text-md-start">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-lg-4"></div>
                  <div className="col-md-12 col-lg-4">
                    <div className="contact">
                      <ul className="d-flex  justify-content-center list-unstyled gap-3"></ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-center copyright dashboard">
                    <div>
                      Copyright © Ministère de l'Enseignement Supérieur et de la
                      Recherche Scientifique - <span>Tunisie</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- End of Footer --> */}
          </div>
          {/*  <!-- End of Content Wrapper --> */}
        </div>
        {/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        {/*  <!-- Logout Modal--> */}
        <div
          className="modal fade"
          id="logoutModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="login.html">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Dashboard;
