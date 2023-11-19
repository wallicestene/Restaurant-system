/* eslint-disable no-unused-vars */
import {
  Add,
  CheckBoxOutlineBlank,
  CloudUploadOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tags from "../components/Tags";

const MyRestaurants = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [menu, setMenu] = useState([
    {
      itemName: "",
      itemImage: "",
    },
  ]);
  const [contacts, setContacts] = useState([]);
  const [tags, setTags] = useState([]);

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
  const uploadByLink = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/upload-by-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: imageLink }),
    })
      .then((res) => res.json())
      .then((image) => {
        setImages((prevImages) => {
          return [...prevImages, image];
        });
      })
      .catch((err) => console.log(err));
    setImageLink("");
  };
  const uploadImage = (e) => {
    const { files } = e.target;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    fetch("http://localhost:3000/api/upload-images", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((images) => {
        setImages((prevImages) => {
          return [...prevImages, ...images];
        });
      });
  };
  return (
    <div className=" w-full grid place-items-center lg:w-1/2 ">
      {action !== "new" && (
        <div className=" text-center">
          <Link
            className=" py-1 px-2 cursor-pointer flex item-center gap-x-1 bg-totem-pole-500 rounded-full text-totem-pole-50"
            to="/account/myFavorites/new"
          >
            <Add fontSize="small" />
            <span>Add new Restaurant</span>
          </Link>
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
              placeholder="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {inputTitle("Images", "The more the images the better")}
            <div className=" flex flex-row gap-2">
              <input
                type="text"
                placeholder="Add image using a link"
                name="imageLink"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
              <button
                className=" bg-slate-300 rounded-md w-28 text-center"
                onClick={uploadByLink}
              >
                Add Image
              </button>
            </div>
            <div className=" grid grid-cols-3 gap-3 mt-2">
              {images.length > 0 &&
                images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={`http://localhost:3000/uploads/${image}`}
                      alt=""
                      className=" h-24 w-full rounded-md object-cover"
                    />
                  </div>
                ))}
              <label
                htmlFor="images"
                className=" flex items-center justify-center gap-x-2 p-5 rounded-md bg-slate-300 cursor-pointer h-24"
              >
                <CloudUploadOutlined />
                <input
                  type="file"
                  name="images"
                  id="images"
                  className=" hidden"
                  multiple
                  accept=".jpg,.png,.jpeg"
                  onChange={uploadImage}
                />
                <span>Upload</span>
              </label>
            </div>
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
            <input
              type="text"
              className=""
              placeholder="menu"
              name="menu"
              onChange={(e) =>
                setMenu((prevValue) => {
                  return [
                    {
                      ...prevValue,
                      itemName: e.target.value,
                    },
                  ];
                })
              }
            />
            <label className="flex items-center gap-x-1 p-5 rounded-md bg-slate-300 w-fit cursor-pointer mt-4">
              <CloudUploadOutlined />
              <input
                type="file"
                name="menuItemImage"
                placeholder="menu item image"
                className=" hidden"
                onChange={(e) =>
                  setMenu((prevValue) => {
                    return [
                      {
                        ...prevValue,
                        itemImage: e.target.files[0],
                      },
                    ];
                  })
                }
              />
              <span>Upload Item image</span>
            </label>
            {inputTitle(
              "Tags",
              "Tags, for example dates, fast-food, five-star..."
            )}
            <Tags selectedTags={tags} setSelectedTags={setTags} />
            {inputTitle("Contacts", "Contacts to your restaurant")}
            <input
              type="text"
              className=""
              placeholder="+254797...."
              name="contacts"
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
            />
            <div className=" my-4">
              <button className=" w-full bg-totem-pole-400 text-totem-pole-50 py-2 text-center rounded-md">
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
