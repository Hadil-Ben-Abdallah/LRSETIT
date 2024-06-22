import React from "react";
import { Route, Routes } from "react-router-dom";
import Inscription from "../components/Inscription/Inscription";
import ArticlesScientifiques from "../components/ArticlesScientifiques/ArticlesScientifiques";
import OuvragesScientifiques from "../components/OuvragesScientifiques/OuvragesScitifiques";
import ChapitreOuvrage from "../components/ChapitreOuvrage/ChapitreOuvrage";
import Brevets from "../components/Brevets/Brevets";
import Obtentionsvegetales from "../components/ObtentionsVegetales/ObtentionsVegetales";
import Habilitations from "../components/Habilitations/Habilitations";
import ThesesDoctorat from "../components/ThesesDoctorat/ThesesDoctorat";
import MasteresRecherche from "../components/MasteresRecherche/MasteresRecherche";
import ManifestationsScientifiques from "../components/ManifestationsScientifiques/ManifestationsScientifiques";
import Conventions from "../components/Conventions/Conventions";
import NewProject from "../components/NewProject/NewProject";
import Home from "../Pages/Home";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateSuccess from "../components/CreateSuccess/CreateSuccess"
import EditSuccess from "../components/CreateSuccess/EditSuccess"
import EditProject from "../components/Edit/EditProject"
import EditArticle from "../components/Edit/EditArticle";
import EditBrevet from "../components/Edit/EditBrevet";
import Contact from "../components/Contact/Contact";
import SentSuccess from "../components/CreateSuccess/SentSuccess";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/inscription" element={<Inscription/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route
        path="/articles-scientifiques"
        element={<ArticlesScientifiques />}
      />
      <Route
        path="/ouvrages-scientifiques"
        element={<OuvragesScientifiques />}
      />
      <Route path="/chapitre-ouvrage" element={<ChapitreOuvrage />} />
      <Route path="/brevets" element={<Brevets />} />
      <Route path="/obtentions-vegetales" element={<Obtentionsvegetales />} />
      <Route path="/habilitations" element={<Habilitations />} />
      <Route path="/these-doctorat" element={<ThesesDoctorat />} />
      <Route path="/masteres-recherche" element={<MasteresRecherche />} />
      <Route
        path="/manifestations-scientifiques"
        element={<ManifestationsScientifiques />}
      />
      <Route path="/conventions" element={<Conventions />} />
      <Route path="/new-project" element={<NewProject />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-success" element={<CreateSuccess />} />
      <Route path="/edit-success" element={<EditSuccess />} />
      <Route path="/send-success" element={<SentSuccess />} />
      <Route path="/edit-project/:id" element={<EditProject />} />
      <Route path="/edit-article/:id" element={<EditArticle />} />
      <Route path="/edit-brevet/:id" element={<EditBrevet />} />
      {/* <Route path="/" element={<Home />}/> */}
      <Route path="/home" element={<ArticlesScientifiques />}/>
    </Routes>
  );
};

export default Routers;