const SectionHeader = ({ subheading, heading }) => {
  return (
    <div className="w-4/12 mx-auto text-center">
      <p className="text-orange-500">{subheading}</p>
      <h3 className="text-xl md:text-3xl font-bold border-y-4 py-2 mb-4 uppercase">
        {heading}
      </h3>
    </div>
  );
};

export default SectionHeader;
