/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Add,
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Remove,
} from "@mui/icons-material";
import { useState } from "react";

const WhereToSleepItems = ({
  bedroom,
  setBedroom,
  sleepingPosition,
  setSleepingPosition,
  whereToSleep,
  setWhereToSleep,
}) => {
  const [showPosition, setShowPosition] = useState(false);

  const addwhereToSleep = (e) => {
    e.preventDefault();
    if (bedroom) {
      setWhereToSleep((prevValue) => {
        return [
          ...prevValue,
          {
            bedroom,
            sleepingPosition: {
              ...sleepingPosition,
            },
          },
        ];
      });
      setBedroom("");
      setSleepingPosition("");
    } else {
      alert("You need to add a bedroom and the sleeping position");
    }

    setSleepingPosition({
      kingBed: 0,
      queenBed: 0,
      sofa: 0,
      singleBed: 0,
    });
    setShowPosition(false);
  };
  return (
    <div>
      {whereToSleep.length > 0 && (
        <ul className="flex gap-2 flex-wrap py-2 px-3">
          {whereToSleep.map((whereToSleepItem, index) => (
            <li
              key={index}
              className=" relative flex items-center gap-1 border border-totem-pole-400 py-2 px-3 rounded-lg"
            >
              <p className=" text-sm tracking-wide">
                Bedroom {whereToSleepItem.bedroom}
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
      <div className=" flex flex-row justify-between lg:gap-x-3 gap-x-2 items-center">
        <input
          type="number"
          className=" text-[2rem] w-full text-center border border-black py-2 h-20  indent-2 outline-none rounded-lg "
          placeholder="bedroom"
          name="bedroom"
          value={bedroom}
          min={1}
          onChange={(e) => setBedroom(e.target.value)}
        />
        <div className=" relative grid place-items-center border border-black w-full h-20 rounded-lg">
          <div
            className=" p-2  flex items-center justify-between hover:cursor-pointer"
            onClick={() => setShowPosition(!showPosition)}
          >
            <p className=" text-lg">Sleeping position</p>
            {showPosition ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </div>
          {showPosition && (
            <div className=" absolute top-20 shadow-lg p-2 w-full bg-white flex flex-col gap-y-2 justify-between">
              <div className=" flex items-center justify-between gap-x-2 ">
                <span>king bed</span>
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault(),
                        setSleepingPosition((prevValue) => {
                          return {
                            ...prevValue,
                            kingBed: prevValue.kingBed + 1,
                          };
                        });
                    }}
                    className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75`}
                  >
                    <Add sx={{ height: "1.2rem", width: "1.2rem" }} />
                  </button>
                  <span>{sleepingPosition.kingBed}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault(),
                        setSleepingPosition((prevValue) => {
                          return {
                            ...prevValue,
                            kingBed:
                              prevValue.kingBed <= 0
                                ? 0
                                : prevValue.kingBed - 1,
                          };
                        });
                    }}
                    className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75`}
                  >
                    <Remove sx={{ height: "1.2rem", width: "1.2rem" }} />
                  </button>
                </div>
              </div>
              <div className=" flex items-center justify-between gap-x-2">
                <span>Queen bed</span>
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault(),
                        setSleepingPosition((prevValue) => {
                          return {
                            ...prevValue,
                            queenBed: prevValue.queenBed + 1,
                          };
                        });
                    }}
                    className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75`}
                  >
                    <Add sx={{ height: "1.2rem", width: "1.2rem" }} />
                  </button>
                  <span>{sleepingPosition.queenBed}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault(),
                        setSleepingPosition((prevValue) => {
                          return {
                            ...prevValue,
                            queenBed:
                              prevValue.queenBed <= 0
                                ? 0
                                : prevValue.queenBed - 1,
                          };
                        });
                    }}
                    className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75`}
                  >
                    <Remove sx={{ height: "1.2rem", width: "1.2rem" }} />
                  </button>
                </div>
              </div>
              <div className=" flex justify-between gap-x-2">
                <span>Single bed</span>
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault(),
                        setSleepingPosition((prevValue) => {
                          return {
                            ...prevValue,
                            singleBed: prevValue.singleBed + 1,
                          };
                        });
                    }}
                    className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75`}
                  >
                    <Add sx={{ height: "1.2rem", width: "1.2rem" }} />
                  </button>
                  <span>{sleepingPosition.singleBed}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault(),
                        setSleepingPosition((prevValue) => {
                          return {
                            ...prevValue,
                            singleBed:
                              prevValue.singleBed <= 0
                                ? 0
                                : prevValue.singleBed - 1,
                          };
                        });
                    }}
                    className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75`}
                  >
                    <Remove sx={{ height: "1.2rem", width: "1.2rem" }} />
                  </button>
                </div>
              </div>
              <div className="flex  items-center justify-between gap-x-2">
                <span>Sofa</span>
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault(),
                        setSleepingPosition((prevValue) => {
                          return { ...prevValue, sofa: prevValue.sofa + 1 };
                        });
                    }}
                    className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75`}
                  >
                    <Add sx={{ height: "1.2rem", width: "1.2rem" }} />
                  </button>
                  <span>{sleepingPosition.sofa}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault(),
                        setSleepingPosition((prevValue) => {
                          return {
                            ...prevValue,
                            sofa: prevValue.sofa <= 0 ? 0 : prevValue.sofa - 1,
                          };
                        });
                    }}
                    className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75`}
                  >
                    <Remove sx={{ height: "1.2rem", width: "1.2rem" }} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" my-4 flex items-center justify-center p-2 rounded w-full">
        <button
          className=" lg:w-1/2 w-full bg-totem-pole-400 text-totem-pole-50 py-2 text-center rounded-lg"
          onClick={addwhereToSleep}
        >
          Add a place to sleep
        </button>
      </div>
    </div>
  );
};

export default WhereToSleepItems;
