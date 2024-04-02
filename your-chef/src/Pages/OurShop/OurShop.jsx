import { useState } from "react";
import "./OurShop.css";
import { useEffect } from "react";
import OurShopCards from "./OurShopCards";
import { Helmet } from "react-helmet-async";

const OurShop = () => {
  const [salads, setSalad] = useState([]);
  const [pizzas, setPizza] = useState([]);
  const [soups, setSoup] = useState([]);
  const [desserts, setDessert] = useState([]);
  const [drinks, setDrink] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetch("https://your-chef-server.vercel.app/menu")
      .then((res) => res.json())
      .then((data) => {
        const saladsmenu = data.filter((item) => item.category === "salad");
        const pizzasmenu = data.filter((item) => item.category === "pizza");
        const soupsmenu = data.filter((item) => item.category === "soup");
        const dessertssmenu = data.filter(
          (item) => item.category === "dessert"
        );
        const drinksmenu = data.filter((item) => item.category === "drinks");
        setSalad(saladsmenu);
        setPizza(pizzasmenu);
        setSoup(soupsmenu);
        setDessert(dessertssmenu);
        setDrink(drinksmenu);
      });
  }, []);

  const tabs = [
    {
      title: "Salads",
      content: (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {salads.map((salad) => (
            <OurShopCards key={salad._id} menu={salad}></OurShopCards>
          ))}
        </div>
      ),
    },
    {
      title: "Pizzas",
      content: (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pizzas.map((pizza) => (
            <OurShopCards key={pizza._id} menu={pizza}></OurShopCards>
          ))}
        </div>
      ),
    },
    {
      title: "Desserts",
      content: (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {desserts.map((dessert) => (
            <OurShopCards key={dessert._id} menu={dessert}></OurShopCards>
          ))}
        </div>
      ),
    },
    {
      title: "Soups",
      content: (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {soups.map((soup) => (
            <OurShopCards key={soup._id} menu={soup}></OurShopCards>
          ))}
        </div>
      ),
    },
    {
      title: "Drinks",
      content: (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drinks.map((drink) => (
            <OurShopCards key={drink._id} menu={drink}></OurShopCards>
          ))}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>Your Chef | Shop</title>
      </Helmet>
      <div className="bg-img-shop p-20 mb-16">
        <div className="bg-black bg-opacity-40 h-60 w-9/12 mx-auto flex flex-col justify-center  items-center">
          <h3 className="text-white text-4xl font-bold">Our Shop</h3>
          <p className="text-white px-5 mt-2">Would You Like to Try A Dish?</p>
        </div>
      </div>
      <div>
        {/* Tab buttons */}
        <div className="flex justify-center">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 font-bold btn-outline py-2 ${
                activeTab === index
                  ? "border-0 border-b-4 text-orange-600"
                  : "text-black"
              } `}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="my-5">{tabs[activeTab].content}</div>
      </div>
    </div>
  );
};

export default OurShop;
