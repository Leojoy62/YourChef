import "./Salads.css";
import MenuItems from "../../../Shared/MenuItems/MenuItems";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";

const Salads = () => {
  const [menu] = useMenu();
  const salad = menu.filter((item) => item.category === "salad");
  return (
    <div>
      <div className="bg-img-desert p-20 mb-16">
        <div className="bg-black bg-opacity-40 h-60 w-9/12 mx-auto flex flex-col justify-center  items-center">
          <h3 className="text-white text-4xl font-bold">Salads</h3>
          <p className="hidden md:inline-block text-white px-5 mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non
            voluptatum placeat consectetur expedita at eligendi illo, voluptas
            totam aperiam? Perspiciatis molestiae quidem reiciendis laudantium
            dignissimos nemo optio fugit soluta doloremque. Id cumque reiciendis
          </p>
        </div>
      </div>
      <div className="grid justify-items-center md:grid-cols-2 gap-4 mb-10 mx-5">
        {salad.map((menu) => (
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

export default Salads;
