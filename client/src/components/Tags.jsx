/* eslint-disable react/prop-types */
const Tags = ({ selectedTags, setSelectedTags }) => {
  const handleCheckboxClick = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedTags((prevTags) => {
        return [...prevTags, name];
      });
    } else {
      setSelectedTags((prevTags) => {
        return prevTags.filter((tag) => tag !== name);
      });
    }
  };
  return (
    <>
      <div className=" grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2 mt-2 w-full">
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input
            type="checkbox"
            name="breakfast"
            checked={selectedTags.includes("breakfast")}
            onChange={handleCheckboxClick}
          />
          <span>Breakfast</span>
        </label>
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input
            type="checkbox"
            name="fast-food"
            checked={selectedTags.includes("fast-food")}
            onChange={handleCheckboxClick}
          />
          <span>Fast-food</span>
        </label>
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input
            type="checkbox"
            name="dates"
            onChange={handleCheckboxClick}
            checked={selectedTags.includes("dates")}
          />
          <span>Dates</span>
        </label>
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input
            type="checkbox"
            name="five-star"
            onChange={handleCheckboxClick}
            checked={selectedTags.includes("five-star")}
          />
          <span>Five-star</span>
        </label>
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input
            type="checkbox"
            name="dinner"
            onChange={handleCheckboxClick}
            checked={selectedTags.includes("dinner")}
          />
          <span>Dinner</span>
        </label>
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input
            type="checkbox"
            name="family"
            onChange={handleCheckboxClick}
            checked={selectedTags.includes("family")}
          />
          <span>Family</span>
        </label>
      </div>
    </>
  );
};

export default Tags;
