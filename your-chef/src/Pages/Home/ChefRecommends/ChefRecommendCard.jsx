import { useContext } from "react";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChefRecommendCard = ({ menu }) => {
  const [refetch] = useCart();
  const { image, name, recipe, price, _id } = menu;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const order = { menuItemId: _id, email: user?.email, name, image, price };

  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    } else {
      fetch("https://your-chef-server.vercel.app/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then(() => {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="p-5">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={() => handleAddToCart(menu)}
            className="btn btn-outline border-b-4 border-black border-0 uppercase"
          >
            Add to cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChefRecommendCard;
