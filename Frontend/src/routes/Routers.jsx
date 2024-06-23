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
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateSuccess from "../components/CreateSuccess/CreateSuccess"
import EditSuccess from "../components/CreateSuccess/EditSuccess"
import EditProject from "../components/Edit/EditProject"
import EditArticle from "../components/Edit/EditArticle";
import EditBrevet from "../components/Edit/EditBrevet";
import EditChapitre from "../components/Edit/EditChapitre";
import EditConvention from "../components/Edit/EditConvention";
import EditHabilitation from "../components/Edit/EditHabilitation";
import EditManifestation from "../components/Edit/EditManifestation";
import EditMastere from "../components/Edit/EditMastere";
import EditObtention from "../components/Edit/EditObtention";
import EditOuvrage from "../components/Edit/EditOuvrage";
import EditThese from "../components/Edit/EditThese";
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
      <Route path="/edit-chapitre/:id" element={<EditChapitre />} />
      <Route path="/edit-convention/:id" element={<EditConvention />} />
      <Route path="/edit-habilitation/:id" element={<EditHabilitation />} />
      <Route path="/edit-manifestation/:id" element={<EditManifestation />} />
      <Route path="/edit-mastere/:id" element={<EditMastere />} />
      <Route path="/edit-obtention/:id" element={<EditObtention />} />
      <Route path="/edit-ouvrage/:id" element={<EditOuvrage />} />
      <Route path="/edit-these/:id" element={<EditThese />} />
      {/* <Route path="/" element={<Home />}/> */}
      <Route path="/home" element={<ArticlesScientifiques />}/>
    </Routes>
  );
};

export default Routers;