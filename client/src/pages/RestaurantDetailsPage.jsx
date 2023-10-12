import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { TableRestaurant } from "@mui/icons-material";

const RestaurantDetailsPage = () => {
  const [value, setValue] = useState(0);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableError, setTableError] = useState(null);
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/restaurant/${id}`
  );
  useEffect(() => {
    const getTables = () => {
      if (data && !isLoading && !error) {
        fetch(`http://localhost:3000/api/tables/restaurant/${data._id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            } else {
              return response.json();
            }
          })
          .then((tables) => {
            setLoading(false);
            setTables(tables);
            setTableError(null);
          })
          .catch((error) => {
            setTableError(error.message);
            setLoading(false);
          });
      }
    };
    getTables();
  }, [data]);
  return (
    <section className="h-screen w-11/12 mx-auto flex flex-col justify-center">
      {error && <p>{error}</p>}
      {isLoading && <p>Loading....</p>}
      {!isLoading && (
        <div>
          <div className="">
            <h1 className=" font-bold font-Montserrat text-lg text-totem-pole-600">
              {data?.name}
            </h1>
          </div>
          <div className=" grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-items-center p-1">
            <div className=" flex flex-col items-center flex-wrap gap-3 w-full justify-center ">
              <div className=" h-64 lg:w-96 md:w-96 w-full rounded-xl overflow-hidden ">
                <img
                  src={data.images[value]}
                  className=" h-full w-full object-cover"
                  alt={data.name}
                />
              </div>
              <div className=" flex flex-row flex-wrap justify-center gap-3 w-full">
                {data.images.map((image, index) => (
                  <div
                    key={index}
                    className={` lg:h-16 lg:w-16 md:h-16 md:w-16 lg:rounded-lg md:rounded-lg overflow-hidden ${
                      value == index && " lg:border-2 md:border-2 border-totem-pole-500 "
                    }`}
                  >
                    <img
                      src={image}
                      onClick={() => setValue(index)}
                      className={` lg:flex md:flex hidden  h-full w-full hover:cursor-pointer object-cover  ${
                        value == index && " opacity-60"
                      }`}
                      alt=""
                    />
                    <div onClick={() => setValue(index)} className={` border h-4 w-4 border-totem-pole-500 rounded-full cursor-pointer ${
                        value == index && " bg-totem-pole-500"
                      }`}/>
                  </div>
                ))}
              </div>
            </div>
            <div className=" h-full w-full border border-totem-pole-400 px-2 font-poppins py-2">
              <div className=" bg-totem-pole-400 inline-block p-1 rounded-md text-totem-pole-100 my-1">
                <h1>Tables</h1>
              </div>
              {tableError && <p>{error}</p>}
              {loading && <p>Loading...</p>}
              {!loading && tables.length > 0 && (
                <div className="flex font-Montserrat items-center gap-5 overflow-x-scroll px-2 ">
                  {tables.map((table, index) => (
                    <button
                      disabled={table.occupied}
                      key={index}
                      className={` relative bg-green-800 flex-shrink-0  text-sm text-totem-pole-100 justify-center h-20 w-28 flex flex-col items-center px-1 rounded-md ${
                        table.occupied && " bg-red-700 "
                      } overflow-hidden`}
                    >
                      <span>0{table.number}</span>
                      <TableRestaurant />
                      <span>Guests: {table.capacity}</span>
                      {table.occupied && (
                        <div className=" absolute top-0 bottom-0 h-full w-full grid place-items-center bg-red-600 bg-opacity-50">
                          <span className=" border border-totem-pole-100 px-2">
                            Reserved
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RestaurantDetailsPage;
