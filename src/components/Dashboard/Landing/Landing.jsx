import React from "react";
import NavBarLanding from "../../navs/NavBarLanding";
import Footer from "../../footer/Footer";
import AboutWe from "../aboutWe/AboutWe";
import HandsL from "../hands/HandsL";
import HandsR from "../hands/HandsR";
import Carrousel from "./Carrousel";
import useTraduction from "../../../custom/UseTraduction";
import LanguageSelector from "../../../custom/LanguageSelector";
const Landing = () => {
  const { t } = useTraduction();

  return (
    <>
      <NavBarLanding />
      <div className="language-selector-container">
        <LanguageSelector />
      </div>
      <div className="d-flex justify-content-between">
        <HandsL />
        <div className="principal">
          <button
            className="buttons-about"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasBottom"
            aria-controls="offcanvasBottom"
          >
            <h1 className="Tittle-Landing">
              {t("title")
                .split(" ")
                .map((word, index) => (
                  <React.Fragment key={index}>
                    {word}
                    <br />
                  </React.Fragment>
                ))}
            </h1>
          </button>
          <div className="p-landing">
            <p>{t("description")}</p>
          </div>
        </div>
        <HandsR />
      </div>
      <br />
      <br />
      <Carrousel />
      <Footer />
      <AboutWe />
    </>
  );
};

export default Landing;
