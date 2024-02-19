/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/Usercontext";
import ImagesUploader from "../components/ImagesUploader";
import WhereToSleep from "../components/MenuItems";
import Tags from "../components/Tags";
import {
  ArrowBack,
  ArrowForward,
  KeyboardBackspace,
} from "@mui/icons-material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Amenities from "../components/Amenities";
import useServer from "../hooks/ServerUrl";

const PlacesForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [sleepingPosition, setSleepingPosition] = useState({
    kingBed: 0,
    queenBed: 0,
    sofa: 0,
    singleBed: 1,
  });
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
      <h2 className=" text-[2.3rem] font-semibold font-Mulish">{header}</h2>
    );
  };
  const inputDescription = (description) => {
    return (
      <p className=" text-[1.5rem] text-gray-500 font-Mulish">{description}</p>
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fetch(`${useServer()}api/restaurant/${id}`, {
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fetch(`${useServer()}api/restaurant`, {
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
        .then((data) => {
         if(data){
          setRedirect("/account/myListings");
         }
        });
    }
  };
  useEffect(() => {
    const getRestaurant = () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fetch(`${useServer()}api/restaurant/${id}`)
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
    <div className=" flex flex-col h-full  justify-center pt-20 pb-10 font-Mulish">
      {" "}
      <button
        className=" flex items-center text-base lg:text-base hover:bg-gray-200 w-fit mx-4 lg:mx-10 md:mx-5 py-1 px-2 rounded-md transition-colors delay-150 duration-300"
        onClick={() => navigate(-1)}
      >
        <span>
          <KeyboardBackspace
            sx={{
              fontSize: "1.5rem",
            }}
          />
        </span>
        <span>Back</span>
      </button>
      <div className=" relative w-full lg:w-3/5 mx-auto font-Mulish h-screen  grid place-items-center p-4">
        <div className="w-full h-full">
          <form className=" h-full">
            {currentPage === 0 && (
              <div className=" h-full flex flex-col items-start gap-y-10">
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
              </div>
            )}
            {currentPage === 1 && (
              <div className=" h-full flex flex-col items-start gap-y-10">
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
              </div>
            )}
            {currentPage === 2 && (
              <div className=" h-full flex flex-col items-start gap-y-10">
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
              </div>
            )}
            {currentPage === 3 && (
              <div className=" h-full flex flex-col items-start gap-y-10">
                {inputTitle(
                  "Add a Description for your place",
                  "Use a description that suits your place best"
                )}
                <textarea
                  className=" border border-black w-full p-2 outline-none rounded-md h-40 text-[1.15rem]  "
                  name="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            )}
            {currentPage === 4 && (
              <div className=" h-full flex flex-col items-start gap-y-10">
                {inputTitle(
                  "Add a place to sleep",
                  "The place to sleep i.e bedrooms and the sleeping position"
                )}
                <WhereToSleep
                  bedroom={bedroom}
                  setBedroom={setBedroom}
                  sleepingPosition={sleepingPosition}
                  setSleepingPosition={setSleepingPosition}
                  whereToSleep={whereToSleep}
                  setWhereToSleep={setWhereToSleep}
                />
              </div>
            )}
            {currentPage === 5 && (
              <div className=" h-full flex flex-col items-start gap-y-10">
                {inputTitle(
                  "Guests",
                  "The number of guests for this  place e.g 2 adults, 1 child, 1 infant..."
                )}
                <div className=" p-2 grid place-items-center w-full">
                  <input
                    type="number"
                    className=" text-[2.9rem] w-full border text-center border-black py-2 h-40  indent-2 outline-none rounded-md "
                    placeholder="Number of Guests"
                    name="guests"
                    value={guests}
                    min={1}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </div>
            )}
            {currentPage === 6 && (
              <div className=" h-full flex flex-col items-start gap-y-10">
                {inputTitle(
                  "Add a Price for your place",
                  "How much do you charge for this place in $?"
                )}

                <div className=" p-2 grid place-items-center w-full ">
                  <input
                    type="number"
                    className=" text-[2.9rem] w-full text-center border border-black py-2 h-40  indent-2 outline-none rounded-md "
                    placeholder="Price eg $ 54"
                    name="price"
                    value={price}
                    min={10}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            )}
            {currentPage === 8 && (
              <div>
                <div className=" h-full  flex flex-col items-start gap-y-10">
                  {inputTitle("Tags", "What is you restaurant best known for?")}
                  <Tags selectedTags={tags} setSelectedTags={setTags} />
                </div>

                <div className="mb-[45px] w-full flex items-center justify-center p-2 rounded">
                  <button
                    onClick={saveRestaurant}
                    className="inline-flex w-full items-center justify-center h-12 px-6 font-medium  text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            {currentPage === 7 && (
              <div className=" h-full flex flex-col items-start gap-y-10">
                {inputTitle(
                  "Amenities",
                  "What amenities does your place offer?"
                )}
                <Amenities
                  selectedAmenities={amenities}
                  setSelectedAmenities={setAmenities}
                />
              </div>
            )}
            {/* {currentPage === 8 && (
              <div className="mb-[50px] flex items-center justify-center p-2 rounded">
                <button
                  onClick={saveRestaurant}
                  className=" w-full py-2 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
                >
                  Save
                </button>
              </div>
            )} */}
          </form>
        </div>
        {/* <div className=" fixed bottom-5 flex  justify-between w-11/12 lg:w-1/2 mx-auto"> */}

        <button
          disabled={currentPage === 0}
          onClick={() => {
            setcurrentPage((prevValue) => (prevValue <= 0 ? 0 : prevValue - 1)),
              window.scrollTo({
                top: 0,
              });
          }}
          className={`fixed bg-white bottom-10 lg:left-52 md:left-10 left-2   inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-red-500 rounded-full shadow-md group ${
            currentPage === 0 ? "  cursor-not-allowed" : ""
          }`}
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
            <ArrowBack />
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-red-500 transition-all duration-300 transform group-hover:translate-x-full ease">
            Back
          </span>
          <span className="relative invisible">Back</span>
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            setcurrentPage((prevValue) => prevValue + 1),
              window.scrollTo({
                top: 0,
              });
          }}
          className={`fixed bg-white bottom-10 lg:right-52 md:right-10 right-2 inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-green-600 rounded-full shadow-md group ${
            currentPage === totalPages ? " cursor-not-allowed" : ""
          }`}
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-600 group-hover:translate-x-0 ease">
            <ArrowForward />
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-green-600 transition-all duration-300 transform group-hover:translate-x-full ease">
            Next
          </span>
          <span className="relative invisible">Next</span>
        </button>
      </div>
    </div>
    // </div>
  );
};

export default PlacesForm;
