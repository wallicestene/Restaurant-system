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
    <div className=" flex flex-col  justify-center pt-20 pb-10">
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
      <div className=" relative w-full lg:w-3/5 mx-auto  h-[480px] font-mulish border overflow-scroll border-black grid place-items-center p-4">
        <div className="w-full h-full">
          <form>
            {currentPage === 0 && (
              <>
                {inputTitle(
                  "Title",
                  "Title for your restaurant. Should be short and precise"
                )}
                <input
                  type="text"
                  className=""
                  placeholder="title, for example: My Restaurant "
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}
            {currentPage === 1 && (
              <>
                {inputTitle("Address", "Address to your restaurant")}
                <input
                  type="text"
                  className=""
                  placeholder="Address e.g Nairobi,Kenya"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </>
            )}
            {currentPage === 2 && (
              <>
                {inputTitle("Images", "The more the images the better")}
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
                  className=" border border-totem-pole-300 w-full py-2 indent-2 outline-none rounded-md h-36"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </>
            )}
            {currentPage === 4 && (
              <>
                {inputTitle(
                  "Place to sleep",
                  "The place to sleep i.e - bedrooms and the sleeping position"
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
                  "The number of guests this place needs e.g 2 adults, 1 child, 1 infant..."
                )}
                <input
                  type="number"
                  className=""
                  placeholder="Nymber of Guests"
                  name="guests"
                  value={guests}
                  min={1}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </>
            )}
            {currentPage === 6 && (
              <>
                {inputTitle("Price", "The price of your place i.e $ 54")}
                <input
                  type="number"
                  className=""
                  placeholder="Price eg $ 54"
                  name="price"
                  value={price}
                  min={10}
                  onChange={(e) => setPrice(e.target.value)}
                />
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
        <div className=" absolute bottom-4  flex justify-between w-11/12 mx-auto">
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
