const MenuItems = ({ menu }) => {
  const { image, name, recipe, price } = menu;
  return (
    <div>
      <div className="flex">
        <img className="w-[120px] " src={image} alt="" />
        <div className="ml-2">
          <h4 className="text-xl">{name}</h4>
          <p className="text-sm">{recipe}</p>
        </div>
        <p className="text-yellow-600 ml-2">${price}</p>
      </div>
    </div>
  );
};

export default MenuItems;
