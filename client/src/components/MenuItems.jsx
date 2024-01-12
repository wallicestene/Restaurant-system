/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Close, UploadRounded } from "@mui/icons-material";

const whereToSleepItems = ({
  bedroom,
  setBedroom,
  sleepingPosition,
  setSleepingPosition,
  whereToSleep,
  setWhereToSleep,
}) => {
  const addwhereToSleep = (e) => {
    e.preventDefault();
    if (bedroom && sleepingPosition) {
      setWhereToSleep((prevValue) => {
        return [...prevValue, { bedroom, sleepingPosition }];
      });
      setBedroom("");
      setSleepingPosition("");
    } else {
      alert("You need to add a bedroom and the sleeping position");
    }
  };
  // const uploadwhereToSleepImage = (e) => {
  //   const { files } = e.target;
  //   let formData = new FormData();
  //   formData.append("sleepingPosition", files[0]);
  //   fetch("http://localhost:3000/api/upload-whereToSleep-image", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((image) => {
  //       setSleepingPosition(image);
  //     });
  // };
  return (
    <>
      {whereToSleep.length > 0 && (
        <ul className="flex gap-2 flex-wrap py-2 px-3">
          {whereToSleep.map((whereToSleepItem, index) => (
            <li
              key={index}
              className=" relative flex items-center gap-1 border border-totem-pole-400 py-1 px-2 rounded-md"
            >
              <p className=" text-sm tracking-wide">
                Bedroom {whereToSleepItem.bedroom}
              </p>
              <p className=" text-sm tracking-wide">
                {" "}
                {whereToSleepItem.sleepingPosition}
              </p>

              <span
                onClick={() => {
                  setWhereToSleep((prevItems) => {
                    return [
                      ...prevItems.filter(
                        (item) => item.bedroom !== whereToSleepItem.bedroom
                      ),
                    ];
                  });
                }}
                className=" absolute -top-1 -right-1 z-10 border border-totem-pole-400 bg-white flex items-center justify-center rounded-full text-slate-900 cursor-pointer"
              >
                <Close
                  sx={{
                    height: "1rem",
                    width: "1rem",
                  }}
                />
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className=" flex flex-row gap-x-2">
        <input
          type="number"
          className=" h-20 text-center text-[2rem]  "
          placeholder="bedroom"
          name="bedroom"
          value={bedroom}
          min={1}
          onChange={(e) => setBedroom(e.target.value)}
        />
        <input
          type="text"
          className=" h-20 text-center text-[2rem]  "
          placeholder="Sleeping position"
          required
          name="sleepingPosition"
          value={sleepingPosition}
          onChange={(e) => setSleepingPosition(e.target.value)}
        />
        {/* <label className="flex items-center gap-x-1 rounded-md  bg-slate-300 w-40 cursor-pointer">
          <UploadRounded fontSize="small" />
          <input
            type="file"
            name="whereToSleepItemImage"
            placeholder="whereToSleep item image"
            className=" hidden"
            onChange={uploadwhereToSleepImage}
          />
          <span>Upload image</span>
        </label> */}
      </div>
      <div className=" my-4 flex items-center justify-center p-2 rounded">
        <button
          className=" lg:w-1/2 w-full bg-totem-pole-400 text-totem-pole-50 py-2 text-center rounded-md"
          onClick={addwhereToSleep}
        >
          Add a place to sleep
        </button>
      </div>
    </>
  );
};

export default whereToSleepItems;
