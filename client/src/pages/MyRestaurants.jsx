import { Add, Close } from "@mui/icons-material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tags from "../components/Tags";
import ImagesUploader from "../components/ImagesUploader";
import MenuItems from "../components/MenuItems";
import { useUserContext } from "../hooks/Usercontext";
import useFetch from "../hooks/useFetch";
import { Alert, CircularProgress } from "@mui/material";
import AddedRestaurants from "../components/AddedRestaurants";

const MyRestaurants = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [menu, setMenu] = useState([]);

  const [contacts, setContacts] = useState([]);
  const [contactsInput, setContactsInput] = useState("");
  const [tags, setTags] = useState([]);
  const [{ user }] = useUserContext();
  const { action } = useParams();
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
  const handleAddContacts = (e) => {
    e.preventDefault();
    setContacts((prevContacts) => {
      return [...prevContacts, contactsInput];
    });
    setContactsInput("");
  };
  const addRestaurant = (e) => {
    e.preventDefault();
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
        menu,
        contacts,
        tags,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/restaurants/owner/${user?.userId}`
  );
  return (
    <div className=" w-full grid place-items-center lg:w-1/2 font-mulish ">
      {action !== "new" && (
        <div className=" w-full">
          <div className=" flex justify-center">
            <Link
              className=" py-1 px-2 cursor-pointer flex item-center gap-x-1 bg-totem-pole-500 rounded-full text-totem-pole-50 w-fit"
              to="/account/myFavorites/new"
            >
              <Add fontSize="small" />
              <span>Add new Restaurant</span>
            </Link>
          </div>
          {isLoading && (
            <CircularProgress color="secondary" size={50} thickness={4} />
          )}
          {error && <Alert severity="error">{error}</Alert>}
          {!isLoading && data.length > 0 && (
            <div className=" mt-4">
              {data?.map((restaurant) => (
                <AddedRestaurants key={restaurant._id}  restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      )}
      {action === "new" && (
        <div className="w-full">
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
            {inputTitle("Address", "address to your restaurant")}
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
              className=" border border-totem-pole-300 w-full py-2 indent-2 outline-none rounded-md"
              name="description"
              id=""
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {inputTitle("Menu", "The menu items for your restaurant")}
            <MenuItems
              itemName={itemName}
              setItemName={setItemName}
              itemImage={itemImage}
              setItemImage={setItemImage}
              menu={menu}
              setMenu={setMenu}
            />
            {inputTitle(
              "Tags",
              "Tags, for example dates, fast-food, five-star..."
            )}
            <Tags selectedTags={tags} setSelectedTags={setTags} />
            {inputTitle("Contacts", "Contacts to your restaurant")}
            {contacts.length > 0 && (
              <div className="flex flex-wrap gap-4 my-2 ">
                {contacts?.map((contact, index) => (
                  <div
                    className=" relative py-2 text-center rounded-md px-2 border border-totem-pole-400 "
                    key={index}
                  >
                    {contact}
                    <span
                      onClick={() =>
                        setContacts((prevContacts) => {
                          return [
                            ...prevContacts.filter((con) => con !== contact),
                          ];
                        })
                      }
                      className=" absolute -top-1 -right-1 z-10 border border-totem-pole-400 bg-white flex items-center justify-center rounded-full text-slate-900 cursor-pointer"
                    >
                      <Close
                        sx={{
                          height: "1rem",
                          width: "1rem",
                        }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className=" flex justify-between gap-x-2">
              <input
                type="text"
                className=""
                placeholder="+254797.. ,email..."
                name="contactInput"
                value={contactsInput}
                onChange={(e) => setContactsInput(e.target.value)}
              />
              <button
                onClick={handleAddContacts}
                className=" bg-slate-300 rounded-md w-28 text-center "
              >
                Add Contacts
              </button>
            </div>
            <div className=" my-4">
              <button
                onClick={addRestaurant}
                className=" w-full bg-totem-pole-400 text-totem-pole-50 py-2 text-center rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyRestaurants;
