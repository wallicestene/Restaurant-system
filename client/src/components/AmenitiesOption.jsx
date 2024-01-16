/* eslint-disable react/prop-types */

const AmenitiesOption = ({ Icon, title, handleAmenities,selectedAmenities }) => {
  return (
    <>
      <div
        onClick={() => handleAmenities(title)}
        className={`flex flex-col py-3 px-4 border-[1.5px] rounded-md hover:cursor-pointer ${selectedAmenities.includes(title) ? " border-black" :""}`}
      >
        <div>{Icon}</div>
        <p>{title}</p>
      </div>
    </>
  );
};

export default AmenitiesOption;
