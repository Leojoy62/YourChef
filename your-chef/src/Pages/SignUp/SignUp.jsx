import { useForm } from "react-hook-form";
import signupimg from "../../assets/others/authentication2.png";
import "./SignUp.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogIn from "../../components/SocialLogIn/SocialLogIn";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirmpassword) {
      setError(<span className="text-red-600">Password did not match</span>);
      return;
    }
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name)
          .then(() => {
            const newUser = { name: data.name, email: data.email };

            fetch("https://your-chef-server.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then(() => {});
          })
          .catch((error) => setError(error.message));

        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });

    setError("");
    reset();
  };
  return (
    <>
      <Helmet>
        <title>Your Chef | Signup</title>
      </Helmet>
      <div className="hero min-h-screen signup-bg">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img className="w-1/2" src={signupimg} alt="" />
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body">
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600">This field is required</span>
                  )}
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
                  />
                  {errors.password && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    {...register("confirmpassword", { required: true })}
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password && (
                    <span className="text-red-600">This field is required</span>
                  )}
                  <p className="text-red-600">{error}</p>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary bg-yellow-600 text-white">
                    Signup
                  </button>
                  <div className="mt-2">
                    <p>
                      Already have an account?{" "}
                      <Link to="/login" className="text-orange-600">
                        Login
                      </Link>
                    </p>
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

export default SignUp;
