/* eslint-disable react/prop-types */

import {
  AcUnitRounded,
  Deck,
  FireExtinguisherOutlined,
  Fireplace,
  HotTub,
  Kitchen,
  LocalLaundryServiceOutlined,
  MedicalServicesOutlined,
  OutdoorGrill,
  PaidOutlined,
  Pool,
  TimeToLeave,
  Tv,
  Wifi,
  Work,
} from "@mui/icons-material";
import AmenitiesOption from "./AmenitiesOption";

const Amenities = ({ selectedAmenities, setSelectedAmenities }) => {
  const handleAmenities = (amenity) => {
    if (!selectedAmenities.includes(amenity)) {
      setSelectedAmenities((prevAmenities) => {
        return [...prevAmenities, amenity];
      });
    } else {
      setSelectedAmenities((prevAmenities) =>
        prevAmenities.filter((item) => item != amenity)
      );
    }
  };
  return (
    <>
      <div className=" w-full mb-10">
        <div className=" grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 mt-2 w-full">
          <AmenitiesOption
            Icon={<Wifi />}
            title={"Wifi"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<Tv />}
            title={"TV"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<Kitchen />}
            title={"Kitchen"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<LocalLaundryServiceOutlined />}
            title={"Washer"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<TimeToLeave />}
            title={"Free parking"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<PaidOutlined />}
            title={"Paid parking"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<AcUnitRounded />}
            title={"Air conditioning"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<Work />}
            title={"Workspace"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
        </div>
        <h2 className=" mt-10 text-[1.5rem] text-gray-500 font-poppins">Other Amenities</h2>
        <div className=" grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 mt-2 w-full">
          <AmenitiesOption
            Icon={<HotTub />}
            title={"Hot tub"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<Pool />}
            title={"Pool"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<Deck />}
            title={"Outdoor dining"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<OutdoorGrill />}
            title={"Outdoor grill"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
          <AmenitiesOption
            Icon={<Fireplace />}
            title={"Fire place"}
            handleAmenities={handleAmenities}
            selectedAmenities={selectedAmenities}
          />
        </div>
        <h2 className=" mt-10 text-[1.5rem] text-gray-500 font-poppins">Safety Amenities</h2>
        <div className=" grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 mt-2 w-full">
        <AmenitiesOption
          Icon={<FireExtinguisherOutlined />}
          title={"Fire extinguisher"}
          handleAmenities={handleAmenities}
          selectedAmenities={selectedAmenities}
        />
        <AmenitiesOption
          Icon={<MedicalServicesOutlined />}
          title={"First aid kit"}
          handleAmenities={handleAmenities}
          selectedAmenities={selectedAmenities}
        />
        <AmenitiesOption
          Icon={<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgElEQVR4nGNgGAUkgP9UxgNnAT6x/wT4uMTwS5AIcJrzFCphxUA+sIaa8QSbZDsVw78VmwVsUEtgPiEHP4EaDjILL1gO1ZBBRLBkQNWC9BANSNG0nATHwIEGGcGjwUAiICUunjMwMDAyjEjwn4yiYtQCBqoGETqguoEM9LZg8AEAeEuZ96V4tvUAAAAASUVORK5CYII="></img>}
          title={"Smoke detector"}
          handleAmenities={handleAmenities}
          selectedAmenities={selectedAmenities}
        />
        </div>
      </div>
    </>
  );
};

export default Amenities;
