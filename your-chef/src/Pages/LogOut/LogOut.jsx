import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const { Logout } = useContext(AuthContext);
  const navigate = useNavigate();

  Logout()
    .then(() => {
      navigate("/login");
    })
    .catch(() => {});

  return <div></div>;
};

export default LogOut;
