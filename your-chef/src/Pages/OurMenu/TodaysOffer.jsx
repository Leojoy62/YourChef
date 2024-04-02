import SectionHeader from "../../components/SectionHeader/SectionHeader";
import MenuItems from "../../Shared/MenuItems/MenuItems";
import useMenu from "../../hooks/useMenu";
import { Link } from "react-router-dom";

const TodaysOffer = () => {
  const [menu] = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <div className="py-4">
        <SectionHeader
          subheading={"Don't miss"}
          heading={"Today's Offer"}
        ></SectionHeader>
      </div>
      <div className="grid justify-items-center md:grid-cols-2 gap-3 mb-10 mx-5">
        {offered.map((menu) => (
          <MenuItems key={menu._id} menu={menu}></MenuItems>
        ))}
      </div>
      <div className="flex justify-center mb-5">
        <Link to="/ourshop">
          <button className="btn btn-outline border-b-4 border-black border-0 uppercase">
            Order Your Favourite Food
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TodaysOffer;
