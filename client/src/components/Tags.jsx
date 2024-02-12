import {
  BeachAccessOutlined,
  BedOutlined,
  CabinOutlined,
  CastleOutlined,
  DownhillSkiingOutlined,
  FreeBreakfastOutlined,
  HouseboatOutlined,
  Pool,
} from "@mui/icons-material";
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
          <TagsOption
            title="Rooms"
            Icon={<BedOutlined />}
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Beach"
            Icon={<BeachAccessOutlined />}
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Bed and breakfast"
            Icon={<FreeBreakfastOutlined />}
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Cabins"
            Icon={<CabinOutlined />}
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Camping"
            Icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-tent"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M11 14l4 6h6l-9 -16l-9 16h6l4 -6" />
              </svg>
            }
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Pools"
            Icon={<Pool />}
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Countryside"
            Icon={
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-outlined/24/field.png"
                alt="field"
              />
            }
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Skiing"
            Icon={<DownhillSkiingOutlined />}
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Boats"
            Icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sailboat" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1" /><path d="M4 18l-1 -3h18l-1 3" /><path d="M11 12h7l-7 -9v9" /><path d="M8 7l-2 5" /></svg>}
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Castle"
            Icon={<CastleOutlined/>}
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Cities"
            Icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building-skyscraper" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M5 21v-14l8 -4v18" /><path d="M19 21v-10l-6 -4" /><path d="M9 9l0 .01" /><path d="M9 12l0 .01" /><path d="M9 15l0 .01" /><path d="M9 18l0 .01" /></svg>}
            selectedTags={selectedTags}
            handleTags={handleTags}
          />
          <TagsOption
            title="Houseboats"
            Icon={<HouseboatOutlined />}
            selectedTags={selectedTags}
            handleTags={handleTags}
            />
            <TagsOption
            title="Lake"
            Icon={<img width="24" height="24" src="https://img.icons8.com/material-outlined/24/lake.png" alt="lake"/>}
            selectedTags={selectedTags}
            handleTags={handleTags}
            />
        </div>
      </div>
    </>
  );
};

export default Tags;
