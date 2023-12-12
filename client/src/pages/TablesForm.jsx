import { useState } from "react";

// eslint-disable-next-line react/prop-types
const TablesForm = ({ restaurantId }) => {
  // const [restaurantId, setRestaurantId] = useState("")
  const [tableData, setTableData] = useState({
    number: "",
    capacity: "",
    occupied: false,
  });

  const inputHeader = (header) => {
    return <h2 className=" text-xl mt-4">{header}</h2>;
  };
  const inputDescription = (description) => {
    return <p className=" text-sm text-gray-500">{description}</p>;
  };
  const inputTitle = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setTableData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
  const addTable = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/tables/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurantId,
        ...tableData,
      }),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err.message))
  };
  return (
    <div>
      <form className=" " >
        {inputTitle("Table Number", "Here is the table number")}
        <input
          type="number"
          placeholder="Table number"
          min={1}
          max={200}
          value={tableData.number}
          onChange={handleChange}
          name="number"
        />
        {inputTitle("Table Capacity", "Here is the table capacity")}
        <input
          type="number"
          placeholder="Table Capacity"
          min={1}
          max={15}
          value={tableData.capacity}
          onChange={handleChange}
          name="capacity"
        />
        {inputTitle("Table Occupancy", "Is the table occupied?")}
        <input
          type="checkbox"
          checked={tableData.occupied}
          onChange={handleChange}
          name="occupied"
        />
        <div className=" my-4 flex items-center justify-center border p-2 rounded">
        <button onClick={addTable} className=" lg:w-1/2 w-full bg-totem-pole-400 text-totem-pole-50 py-2 text-center rounded-md">
          Add Table
        </button>
        </div>
      </form>
    </div>
  );
};

export default TablesForm;
