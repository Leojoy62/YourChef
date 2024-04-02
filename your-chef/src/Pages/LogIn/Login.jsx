import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import loginimg from "../../assets/others/authentication2.png";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogIn from "../../components/SocialLogIn/SocialLogIn";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setEmail(event.target.checked ? "admintest@gmail.com" : "test@gmail.com");
  };

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Login(data.email, data.password)
      .then(() => {
        setError("");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
    reset();
  };
  return (
    <>
      <Helmet>
        <title>Your Chef | Login</title>
      </Helmet>
      <div className="hero min-h-screen signup-bg">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img className="w-1/2" src={loginimg} alt="" />
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body">
                <h1 className="text-3xl font-bold text-center">Login</h1>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>

                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    defaultValue={email}
                  />

                  {/* {errors.email && (
                    <span className="text-red-600">This field is required</span>
                  )} */}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>

                  <input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    defaultValue="01982650"
                  />
                  {errors.password && (
                    <span className="text-red-600">This field is required</span>
                  )}
                  <p>{error}</p>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary bg-yellow-600 text-white">
                    Login
                  </button>
                  <div className="mt-2">
                    <p>
                      Do not have an account?{" "}
                      <Link to="/signup" className="text-orange-600">
                        Signup
                      </Link>
                    </p>
                  </div>
                  <div className=" mt-5">
                    <label>
                      <span className="mr-2 ">
                        Want to log in as an admin to observe?
                      </span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </form>
            <SocialLogIn></SocialLogIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
