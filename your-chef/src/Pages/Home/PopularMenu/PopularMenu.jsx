import { Link } from "react-router-dom";
import MenuItems from "../../../Shared/MenuItems/MenuItems";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const chefRecommands = menu.filter((item) => item.category === "popular");
  return (
    <div className="mb-10">
      <SectionHeader
        subheading={"Check It Out"}
        heading={"From our menu"}
      ></SectionHeader>
      <div className="grid md:grid-cols-2 gap-4 my-5 mx-5">
        {chefRecommands.map((menu) => (
          <MenuItems key={menu._id} menu={menu}></MenuItems>
        ))}
      </div>
      <div className="flex flex-col justify-center">
        <button className="btn btn-outline border-b-4 border-black border-0  btn-xs self-center sm:btn-sm md:btn-md lg:btn-lg">
          <Link to="/ourmenu">View All Menu</Link>
        </button>
      </div>
      <div className="bg-black my-10 py-20">
        <h3 className="text-white text-5xl text-center font-semibold">
          Call Us: +880123456789
        </h3>
      </div>
    </div>
  );
};

export default PopularMenu;
