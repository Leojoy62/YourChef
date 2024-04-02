import { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogIn = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedInUser = result.user;

        const newUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
        };
        fetch("https://your-chef-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="my-4">
      <div className="divider"></div>
      <div className="text-center">
        <button
          onClick={handleGoogleLogIn}
          className="btn btn-circle btn-outline"
        >
          <FaGoogle></FaGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogIn;
