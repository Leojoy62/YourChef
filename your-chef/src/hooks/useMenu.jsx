import { useQuery } from "react-query";

const useMenu = () => {
  // useEffect(() => {
  //   fetch("https://your-chef-server.vercel.app/menu")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMenu(data);
  //       setLoading(false);
  //     });
  // }, []);
  const {
    data: menu = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await fetch("https://your-chef-server.vercel.app/menu");
      return res.json();
    },
  });

  return [menu, loading, refetch];
};

export default useMenu;
