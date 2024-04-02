import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import ChefRecommendCard from "./ChefRecommendCard";
import useMenu from "../../../hooks/useMenu";

const ChefRecommends = () => {
  const [menu] = useMenu();
  const chefRecommands = menu.filter((item) => item.category === "salad");

  return (
    <div>
      <SectionHeader
        subheading={"Should Try"}
        heading={"Chef Recommends"}
      ></SectionHeader>
      <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {chefRecommands.map((menu) => (
          <ChefRecommendCard key={menu._id} menu={menu}></ChefRecommendCard>
        ))}
      </div>
    </div>
  );
};

export default ChefRecommends;
