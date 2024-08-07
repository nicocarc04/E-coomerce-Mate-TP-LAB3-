import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBarLanding from "../navs/NavBarLanding";
import { AuthenticationContext } from "../../services/auth/Auth.context";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);

  const handleUserListClick = () => {
    navigate("/listUser");
  };

  const clickHandlerShopAdmin = () => {
    navigate("/shopAdmin");
  }; 

  return (
    <>
      <NavBarLanding clickHandlerShopAdmin={clickHandlerShopAdmin} />{" "}
      <div className="admin-container">
        {user && user.userType === "sysAdmin" && (
          <>
            <h1 className="Tittle-Admin">
              USTED HA INGRESADO COMO SUPER-ADMIN
            </h1>
            <div className="button-container">
              <button onClick={handleUserListClick} className="btnAdmin">
                Lista de Usuarios
              </button>
              <button onClick={clickHandlerShopAdmin} className="btnAdmin">
                Tienda
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
