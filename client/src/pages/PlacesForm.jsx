import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/Usercontext";
import ImagesUploader from "../components/ImagesUploader";
import MenuItems from "../components/MenuItems";
import Tags from "../components/Tags";
import { KeyboardBackspace } from "@mui/icons-material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import TablesForm from "./TablesForm";
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
  const [price, setPrice] = useState("");

  const [amenities, setAmenities] = useState([]);
  const [tags, setTags] = useState([]);
  const [redirect, setRedirect] = useState(null);

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
  // console.log({
  //   name,
  //   address,
  //   description,
  //   images,
  //   whereToSleep,
  //   price,
  //   amenities,
  //   tags,
  // });
  return (
    <div className="w-full lg:w-11/12 mx-auto font-mulish py-20 px-2 text-">
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
      <div className="w-full px-2">
        <form>
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
          {inputTitle("Address", "Address to your restaurant")}
          <input
            type="text"
            className=""
            placeholder="Address e.g Nairobi,Kenya"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {inputTitle("Images", "The more the images the better")}
          <ImagesUploader
            images={images}
            setImages={setImages}
            imageLink={imageLink}
            setImageLink={setImageLink}
          />
          {inputTitle("Description", "The description of your place")}
          <textarea
            className=" border border-totem-pole-300 w-full py-2 indent-2 outline-none rounded-md h-36"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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
          {inputTitle("Price", "The price of your place i.e $ 54")}
          <input
            type="number"
            className=""
            placeholder="Price eg $ 54"
            name="price"
            value={price}
            min={1}
            onChange={(e) => setPrice(e.target.value)}
          />
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
          <div className=" my-4 flex items-center justify-center border p-2 rounded">
            <button
              onClick={saveRestaurant}
              className=" lg:w-1/2 w-full bg-green-700 text-totem-pole-50 py-2 text-center rounded-md"
            >
              Save
            </button>
          </div>
        </form>
        {id && <TablesForm restaurantId={id} />}
      </div>
    </div>
  );
};

export default PlacesForm;
