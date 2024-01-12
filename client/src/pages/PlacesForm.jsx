/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/Usercontext";
import ImagesUploader from "../components/ImagesUploader";
import MenuItems from "../components/MenuItems";
import Tags from "../components/Tags";
import { KeyboardBackspace } from "@mui/icons-material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Amenities from "../components/Amenities";

const PlacesForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [sleepingPosition, setSleepingPosition] = useState("");
  const [whereToSleep, setWhereToSleep] = useState([]);
  const [price, setPrice] = useState(10);
  const [guests, setGuests] = useState(10);

  const [amenities, setAmenities] = useState([]);
  const [tags, setTags] = useState([]);
  const [redirect, setRedirect] = useState(null);

  const [currentPage, setcurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(8);

  const { id } = useParams();
  const [{ user }] = useUserContext();
  const navigate = useNavigate();

  const inputHeader = (header) => {
    return (
      <h2 className=" text-[2.3rem] font-semibold font-poppins">{header}</h2>
    );
  };
  const inputDescription = (description) => {
    return (
      <p className=" text-[1.5rem] text-gray-500 font-poppins">{description}</p>
    );
  };
  const inputTitle = (header, description) => {
    return (
      <div className=" my-4">
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  };
  const saveRestaurant = (e) => {
    e.preventDefault();
    if (id) {
      fetch(`http://localhost:3000/api/restaurant/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          description,
          images,
          whereToSleep,
          guests,
          price,
          amenities,
          tags,
        }),
      });
    } else {
      fetch("http://localhost:3000/api/restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: user?.userId,
          name,
          address,
          description,
          images,
          whereToSleep,
          guests,
          price,
          amenities,
          tags,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    setRedirect("/account/myRestaurants");
  };
  useEffect(() => {
    const getRestaurant = () => {
      fetch(`http://localhost:3000/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setAddress(data.address);
          setDescription(data.description);
          setImages(data.images);
          setWhereToSleep(data.whereToSleep);
          setAmenities(data.amenities);
          setTags(data.tags);
          setPrice(data.price);
          setGuests(data.guests);
        });
    };
    if (!id) {
      return;
    }
    getRestaurant();
  }, [id]);
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className=" flex flex-col h-full  justify-center pt-20 pb-10 font-poppins">
      {" "}
      <button
        className=" flex items-center text-sm hover:bg-totem-pole-100 w-fit py-1 px-2 rounded-md transition-colors delay-150 duration-300"
        onClick={() => navigate(-1)}
      >
        <span>
          <KeyboardBackspace
            sx={{
              fontSize: "1.3rem",
            }}
          />
        </span>
        <span>Back</span>
      </button>
      <div className=" relative w-full lg:w-3/5 mx-auto border font-mulish h-full  grid place-items-center p-4">
        <div className="w-full">
          <form>
            {currentPage === 0 && (
              <>
                {inputTitle(
                  "Let's start by adding a Title or Name to your place",
                  "Title for your place. Should be short and precise"
                )}
                <input
                  type="text"
                  className=" h-40 text-[2.9rem] text-center  "
                  placeholder="title, for example: My Restaurant"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}
            {currentPage === 1 && (
              <>
                {inputTitle(
                  "Add the Address to your place",
                  "Address to your restaurant"
                )}
                <input
                  type="text"
                  className=" h-40 text-center text-[2.9rem]  "
                  placeholder="Address e.g Nairobi,Kenya"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </>
            )}
            {currentPage === 2 && (
              <>
                {inputTitle(
                  "Now! Lets add the Images of your place",
                  "The more the images the better"
                )}
                <ImagesUploader
                  images={images}
                  setImages={setImages}
                  imageLink={imageLink}
                  setImageLink={setImageLink}
                />
              </>
            )}
            {currentPage === 3 && (
              <>
                {inputTitle("Description", "The description of your place")}
                <textarea
                  className=" border border-black w-full p-2 outline-none rounded-md h-40 text-[1.15rem]  "
                  name="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </>
            )}
            {currentPage === 4 && (
              <>
                {inputTitle(
                  "Add a place to sleep/relax",
                  "The place to sleep i.e bedrooms and the sleeping position"
                )}
                <MenuItems
                  bedroom={bedroom}
                  setBedroom={setBedroom}
                  sleepingPosition={sleepingPosition}
                  setSleepingPosition={setSleepingPosition}
                  whereToSleep={whereToSleep}
                  setWhereToSleep={setWhereToSleep}
                />
              </>
            )}
            {currentPage === 5 && (
              <>
                {inputTitle(
                  "Guests",
                  "The number of guests for this  place e.g 2 adults, 1 child, 1 infant..."
                )}
                <div className=" p-2 grid place-items-center">
                  <input
                    type="number"
                    className=" text-[2.9rem] border text-center border-black py-2 h-40  indent-2 outline-none rounded-md "
                    placeholder="Number of Guests"
                    name="guests"
                    value={guests}
                    min={1}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </>
            )}
            {currentPage === 6 && (
              <>
                {inputTitle("Price", "The price of your place i.e $ 54")}

                <div className=" p-2 grid place-items-center  ">
                <input
                  type="number"
                  className=" text-[2.9rem] text-center border border-black py-2 h-40  indent-2 outline-none rounded-md "
                  placeholder="Price eg $ 54"
                  name="price"
                  value={price}
                  min={10}
                  onChange={(e) => setPrice(e.target.value)}
                />
                </div>
              </>
            )}
            {currentPage === 7 && (
              <>
                {inputTitle(
                  "Tags",
                  "Tags, for example dates, fast-food, five-star..."
                )}
                <Tags selectedTags={tags} setSelectedTags={setTags} />
                {inputTitle("Amenities", "Amenities in your place")}
                <Amenities
                  selectedAmenities={amenities}
                  setSelectedAmenities={setAmenities}
                />
              </>
            )}
            {currentPage === 8 && (
              <div className=" my-4 flex items-center justify-center border p-2 rounded">
                <button
                  onClick={saveRestaurant}
                  className=" lg:w-1/2 w-full bg-green-700 text-totem-pole-50 py-2 text-center rounded-md"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
        <div className=" fixed bottom-4 flex justify-between w-11/12 mx-auto">
          <button
            disabled={currentPage === 0}
            onClick={() =>
              setcurrentPage((prevValue) =>
                prevValue <= 0 ? 0 : prevValue - 1
              )
            }
            className={` bg-red-600 py-2 px-5 rounded-lg text-white`}
          >
            Back
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setcurrentPage((prevValue) => prevValue + 1)}
            className={` bg-green-600 py-2 px-5 rounded-lg text-white`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacesForm;
