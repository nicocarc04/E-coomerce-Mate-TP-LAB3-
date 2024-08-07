import { useState, useContext, useEffect } from "react";
import AddUserModal from "../Modals/AddUserModal";
import EditUserModal from "../Modals/EditUserModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import NotificationModal from "../Modals/NotificationModal"; 
import NavBarLanding from "../../navs/NavBarLanding";
import { ApiContext } from "../../../services/apiContext/Api.context";
import { AuthenticationContext } from "../../../services/auth/Auth.context";

const ListUser = () => {
  const { users, addUser, updateUser, deleteUser } = useContext(ApiContext);
  const { user: currentUser } = useContext(AuthenticationContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false); 
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [newUser, setNewUser] = useState({
    username: "",
    userType: "",
    email: "",
    password: "",
  });

  const [editUser, setEditUser] = useState({
    id: null,
    username: "",
    userType: "",
    email: "",
    password: "",
  });

  const [originalUser, setOriginalUser] = useState(null); 

  const [formErrors, setFormErrors] = useState({
    username: false,
    userType: false,
    email: false,
    password: false,
    passwordLengthAndWordUppercase: false,
  });

  const [formError, setFormError] = useState("");

  const hideModalHandler = () => {
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const showModalHandler = (id) => {
    setShowDeleteModal(true);
    setUserIdToDelete(id);
  };

  const removeUser = async () => {
    await deleteUser(userIdToDelete);
    hideModalHandler();
  };

  const hideAddUserModalHandler = () => {
    const isFormChanged =
      newUser.username !== "" ||
      newUser.userType !== "" ||
      newUser.email !== "" ||
      newUser.password !== "";
  
    setShowAddUserModal(false);
    setNewUser({
      username: "",
      userType: "",
      email: "",
      password: "",
    });
    setFormErrors({
      username: false,
      userType: false,
      email: false,
      password: false,
      passwordLengthAndWordUppercase: false,
    });
    setFormError("");
  
    if (isFormChanged) {
      setShowNotificationModal(true);
    }
  };
  

  const showAddUserModalHandler = () => setShowAddUserModal(true);

  const hideEditUserModalHandler = () => {
    setShowEditUserModal(false);
    setEditUser({
      id: null,
      username: "",
      userType: "",
      email: "",
      password: "",
    });
    setFormErrors({
      username: false,
      userType: false,
      email: false,
      password: false,
      passwordLengthAndWordUppercase: false,
    });
    setFormError("");
  };

  const hideNotificationModalHandler = () => {
    setShowNotificationModal(false);
  };

  const showEditUserModalHandler = (user) => {
    setEditUser({
      id: user.id,
      username: user.username,
      userType: user.userType,
      email: user.email,
      password: user.password,
    });
    setOriginalUser(user);
    setShowEditUserModal(true);
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const validateForm = (user) => {
    const { username, userType, email, password } = user;
    const errors = {
      username: username.trim() === "",
      userType: userType.trim() === "",
      email: email.trim() === "" || !email.includes("@"),
      password: password.trim() === "",
      passwordLengthAndWordUppercase:
        password.length <= 6 || !/[A-Z]/.test(password),
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      setFormError("Todos los campos son obligatorios.");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleAddUser = async () => {
    if (validateForm(newUser)) {
      await addUser(newUser);
      hideAddUserModalHandler();
    }
  };

  const handleEditUser = async () => {
    if (validateForm(editUser)) {
      await updateUser(editUser);
      hideEditUserModalHandler();
      setShowNotificationModal(true);
    }
  };

  useEffect(() => {
    if (!showEditUserModal) {
      setOriginalUser(null);
    }
  }, [showEditUserModal]);

  const filteredUsers = users.filter((user) => user.id !== currentUser.id);

  return (
    <>
      <NavBarLanding />
      <div className="list-user-container">
        <h1>Lista de usuarios</h1>
        <button
          className="btn btn-success mb-3"
          onClick={showAddUserModalHandler}
        >
          Dar de alta usuario
        </button>
        <div className="list-user-table-container">
          <table className="list-user-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Email</th>
                <th className="actions-column">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.userType}</td>
                  <td>{user.email}</td>
                  <td className="actions-column">
                    <button
                      className="btn btn-primary"
                      onClick={() => showEditUserModalHandler(user)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => showModalHandler(user.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUserModal
        showAddUserModal={showAddUserModal}
        hideAddUserModalHandler={hideAddUserModalHandler}
        handleAddUser={handleAddUser}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        formError={formError}
        newUser={newUser}
      />

      <EditUserModal
        showEditUserModal={showEditUserModal}
        hideEditUserModalHandler={hideEditUserModalHandler}
        handleEditUser={handleEditUser}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        formError={formError}
        editUser={editUser}
      />

      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        hideModalHandler={hideModalHandler}
        removeUser={removeUser}
      />

      <NotificationModal
        showNotificationModal={showNotificationModal}
        hideNotificationModalHandler={hideNotificationModalHandler}
        message={"Se guardo el usuario correctamente."}
      />
    </>
  );
};

export default ListUser;
