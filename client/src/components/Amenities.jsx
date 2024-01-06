/* eslint-disable react/prop-types */


const Amenities = ({ selectedAmenities, setSelectedAmenities}) => {
    const handleCheckboxClick = (e) => {
        const { name, checked } = e.target;
        if (checked) {
          setSelectedAmenities((prevTags) => {
            return [...prevTags, name];
          });
        } else {
          setSelectedAmenities((prevTags) => {
            return prevTags.filter((tag) => tag !== name);
          });
        }
      };
      return (
        <>
          <div className=" grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2 mt-2">
            <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
              <input
                type="checkbox"
                name="breakfast"
                checked={selectedAmenities.includes("breakfast")}
                onChange={handleCheckboxClick}
              />
              <span>Breakfast</span>
            </label>
            <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
              <input
                type="checkbox"
                name="fast-food"
                checked={selectedAmenities.includes("fast-food")}
                onChange={handleCheckboxClick}
              />
              <span>Fast-food</span>
            </label>
            <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
              <input
                type="checkbox"
                name="dates"
                onChange={handleCheckboxClick}
                checked={selectedAmenities.includes("dates")}
              />
              <span>Dates</span>
            </label>
            <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
              <input
                type="checkbox"
                name="five-star"
                onChange={handleCheckboxClick}
                checked={selectedAmenities.includes("five-star")}
              />
              <span>Five-star</span>
            </label>
            <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
              <input
                type="checkbox"
                name="dinner"
                onChange={handleCheckboxClick}
                checked={selectedAmenities.includes("dinner")}
              />
              <span>Dinner</span>
            </label>
            <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
              <input
                type="checkbox"
                name="family"
                onChange={handleCheckboxClick}
                checked={selectedAmenities.includes("family")}
              />
              <span>Family</span>
            </label>
          </div>
        </>
      );
}

export default Amenities