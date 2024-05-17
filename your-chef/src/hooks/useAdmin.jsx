import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {
    data: isAdmin,
    isLoading: isAdminLoading,
    error,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading && !!user?.email, // Ensures the query runs only when not loading and user email is available
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data.admin;
    },
    onError: (error) => {
      console.error("Error fetching admin status:", error);
    },
  });

  return [isAdmin, isAdminLoading, error];
};

export default useAdmin;
