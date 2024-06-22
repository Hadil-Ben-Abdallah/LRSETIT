// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./Steps.css";


// const Stepper = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   // const [activeStep, setActiveStep] = useState(0);
//   const [steps] = useState([
//     { step: 1, name: "Inscription", path: "/inscription", expanded: true },
//     { step: 2, name: "Articles Scientifiques", path: "/articles-scientifiques", expanded: false },
//     { step: 3, name: "Ouvrages Scientifiques", path:"/ouvrages-scientifiques", expanded: false },
//     { step: 4, name: "Chapites d'ouvrages", path:"/chapitre-ouvrage", expanded: false },
//     { step: 5, name: "Brevets", path:"/brevets", expanded: false },
//     { step: 6, name: "Obtentions Végétales", path:"/obtentions-vegetales", expanded: false },
//     { step: 7, name: "Habitations", path:"/habitations", expanded: false },
//     { step: 8, name: "Thèses de doctorat", path:"/these-doctorat", expanded: false },
//     { step: 9, name: "Mastères recherche", path:"/masteres-recherche", expanded: false },
//     { step: 10, name: "Manifestations scientifiques", path:"/manifestations-scientifiques", expanded: false },
//     { step: 11, name: "Conventions", path:"/conventions", expanded: false },
//     { step: 12, name: "Projets", path:"/new-project", expanded: false },
//   ]);

//   const activeStep = steps.findIndex((step) => location.pathname.includes(step.path));

//   const handleStepClick = (index, path) => {
//     // setActiveStep(index);
//     navigate(path);
//   };

//   return (
//     <div className="stepper-horizontal">
//       {steps.map((step, index) => (
//         <div className="step-horizontal" key={index}>
//           <div
//               className={`step-heading-horizontal ${
//                 index === activeStep ? "active" : ""
//             }`}
//             onClick={() => handleStepClick(index, step.path)}
//           >
//             <div className="circle">{step.step}</div>
//           </div>
//           <div className="title">{step.name}</div>
//           <div
//             className="line-horizontal"
//             style={{ display: step.step >= steps.length ? "none" : "block" }}
//           >
//             <div>{step.template}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stepper;

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Steps.css";



const Stepper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [steps] = useState([
    // { step: 1, name: "Inscription", path: "/inscription", expanded: true },
    { step: 1, name: "Articles Scientifiques", path: "/articles-scientifiques", expanded: false },
    { step: 2, name: "Ouvrages Scientifiques", path:"/ouvrages-scientifiques", expanded: false },
    { step: 3, name: "Chapitres d'ouvrages", path:"/chapitre-ouvrage", expanded: false },
    { step: 4, name: "Brevets", path:"/brevets", expanded: false },
    { step: 5, name: "Obtentions Végétales", path:"/obtentions-vegetales", expanded: false },
    { step: 6, name: "Habilitations", path:"/habilitations", expanded: false },
    { step: 7, name: "Thèses de doctorat", path:"/these-doctorat", expanded: false },
    { step: 8, name: "Mastères recherche", path:"/masteres-recherche", expanded: false },
    { step: 9, name: "Manifestations scientifiques", path:"/manifestations-scientifiques", expanded: false },
    { step: 10, name: "Conventions", path:"/conventions", expanded: false },
    { step: 11, name: "Projets", path:"/new-project", expanded: false },
  ]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const activeStep = steps.findIndex((step) => location.pathname.includes(step.path));

  const handleStepClick = (index, path) => {
    navigate(path);
  };

  return (
    <div className="stepper-horizontal">
      {steps.map((step, index) => (
        <div className="step-horizontal" key={index}>
          <div
            className={`step-heading-horizontal ${
              index === activeStep ? "active" : ""
            }`}
            onClick={() => handleStepClick(index, step.path)}
          >
            <div className="circle">{step.step}</div>
          </div>
          <div className="title">{step.name}</div>
          <div
            className="line-horizontal"
            style={{ display: step.step >= steps.length || isSmallScreen ? "none" : "block" }}
          >
            <div>{step.template}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
