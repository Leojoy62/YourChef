import axios from "axios";

import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://your-chef-server.vercel.app/",
});

const useAxiosSecure = () => {
  const { Logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");

      if (token) {
        config.headers.authorization = `bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await Logout();
        }
        return Promise.reject(error);
      }
    );
  }, [Logout, navigate]);
  return [axiosSecure];
};

export default useAxiosSecure;
