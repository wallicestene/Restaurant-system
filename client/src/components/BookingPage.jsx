import { Close } from "@mui/icons-material";
import { useState } from "react";
// import { Zoom } from "react-awesome-reveal";

const BookingPage = ({setShowDetails}) => {
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cvv: "",
    date: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentDetails((prevDetails) => {
      return {
        ...prevDetails,
        name: "",
        email: "",
        cardNumber: "",
        cvv: "",
        date: "",
        country: "",
      };
    });
  };
  return (
    <section className=" absolute top-0 z-20 grid place-content-center bg-white/10 backdrop-blur-sm h-full w-screen bg-opacity-50 ">
      {/* <Zoom className=" w-full h-full grid place-items-center"> */}
      <form
        onSubmit={handleSubmit}
        className=" bg-white lg:w-11/12 w-full shadow-xl py-5 px-7 flex flex-col gap-5 rounded-md"
      >
        <div className=" flex items-center justify-between">
          <div>
            <h1 className=" font-bold text-lg">Payment Details</h1>
            <p className=" text-sm">
              Enter details below to purchase your products.
            </p>
          </div>
          <div onClick={() => setShowDetails(false)}>
            <Close />
          </div>
        </div>
        <div className=" flex flex-col gap-5">
          <input
            type="text"
            name="name"
            required
            value={paymentDetails.name}
            onChange={handleChange}
            className=" border outline-none indent-2 py-1 w-full rounded"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            required
            value={paymentDetails.email}
            id="email"
            onChange={handleChange}
            className=" border outline-none indent-2 py-1 w-full rounded"
            placeholder="Email address"
          />
          <div>
            <h2 className=" font-bold mb-2">Card Details</h2>
            <div className=" grid grid-cols-4 gap-5">
              <input
                type="number"
                value={paymentDetails.cardNumber}
                name="cardNumber"
                required
                onChange={handleChange}
                className=" col-span-2 border outline-none indent-2 py-1 w-full rounded"
                placeholder="Card number"
              />
              <div className=" col-span-2 flex items-center gap-5">
                <input
                  type="password"
                  name="cvv"
                  required
                  onChange={handleChange}
                  value={paymentDetails.cvv}
                  className=" border outline-none indent-2 py-1 w-full rounded"
                  placeholder="CVV"
                />
                <input
                  type="month"
                  name="date"
                  required
                  onChange={handleChange}
                  value={paymentDetails.date}
                  className=" border outline-none indent-2 py-1 w-full rounded"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <select
            name="country"
            id="country"
            onChange={handleChange}
            value={paymentDetails.country}
            className=" border outline-none indent-2 py-1 w-full rounded"
          >
            <option value="kenya">Kenya</option>
            <option value="USA">USA</option>
            <option value="Mexico">Mexico</option>
            <option value="UK">UK</option>
            <option value="Nigeria">Nigeria</option>
          </select>
          <button className=" bg-black py-1 w-full rounded text-white">
            Make Payment
          </button>
        </div>
      </form>
      {/* </Zoom> */}
    </section>
  );
};

export default BookingPage;
