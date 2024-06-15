import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBarLanding from "../navs/NavBarLanding";
import { AuthenticationContext } from "../../services/auth/Auth.context";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);

  const handleUserListClick = () => {
    navigate("/listUser");
  };

  const handleShopClick = () => {
    navigate("/shop");
  };

  return (
    <>
      <NavBarLanding />
      <div className="admin-container">
        {user && user.userType === "sysAdmin" && (
          <>
            <h1 className="Tittle-Admin">USTED HA INGRESADO COMO ADMIN</h1>
            <div className="button-container">
              <button onClick={handleUserListClick} className="btn btn-primary">
                Lista de Usuarios
              </button>
              <button onClick={handleShopClick} className="btn btn-secondary">
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
