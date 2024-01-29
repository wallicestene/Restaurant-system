import AmenitiesOption from "./AmenitiesOption";
import TagsOption from "./TagsOption";

/* eslint-disable react/prop-types */
const Tags = ({ selectedTags, setSelectedTags }) => {
  const handleTags = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prevAmenities) => {
        return [...prevAmenities, tag];
      });
    } else {
      setSelectedTags((prevAmenities) =>
        prevAmenities.filter((item) => item != tag)
      );
    }
  };
  return (
    <>
      <div className=" w-full mb-10">
        <div className=" grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 mt-2 w-full">
          <TagsOption title = "Wifi" selectedTags={selectedTags} handleTags={handleTags}/>
        </div>
      </div>
    </>
  );
};

export default Tags;
