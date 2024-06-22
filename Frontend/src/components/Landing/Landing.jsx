import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {

  const handleButtonClick = () => {
    const isSmallScreen = window.matchMedia("(max-width: 576px)").matches;
    const scrollTop = isSmallScreen ? 450 : 550;
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };
  return (
    <>
      <div className="landing d-flex justify-content-center align-items-center">
        <div className="text-center text-light">
          <h1>وزارة التعليم العالي والبحث العلمي: الإدارة العامة للبحث العلمي</h1>
          <Link
            className="btn rounded-pill main-btn"
            to="/"
            onClick={handleButtonClick}
          >
            Commencer
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
