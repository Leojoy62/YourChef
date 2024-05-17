import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const {
    refetch,
    data: cart = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !loading && !!user?.email, // Ensure the query runs only when not loading and user email is available
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      return res.data;
    },
    onError: (error) => {
      console.error("Error fetching cart data:", error);
    },
  });

  return [refetch, cart, error, isLoading];
};

export default useCart;
