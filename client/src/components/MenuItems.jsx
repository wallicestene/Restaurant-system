/* eslint-disable react/prop-types */
import { Close, CloudUploadOutlined } from "@mui/icons-material";

const MenuItems = ({
  itemName,
  setItemName,
  itemImage,
  setItemImage,
  menu,
  setMenu,
}) => {
  const addMenuItem = (e) => {
    e.preventDefault();
    if (itemName && itemImage) {
      setMenu((prevValue) => {
        return [...prevValue, { itemName, itemImage }];
      });
      setItemName("");
      setItemImage("");
    } else {
      alert("You need to add the item name & image");
    }
  };
  const uploadMenuImage = (e) => {
    const { files } = e.target;
    let formData = new FormData();
    formData.append("itemImage", files[0]);
    fetch("http://localhost:3000/api/upload-menu-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((image) => {
        setItemImage(image);
      });
  };
  return (
    <>
      {menu.length > 0 && (
        <ul className="flex gap-2 flex-wrap py-2 px-3">
          {menu.map((menuItem, index) => (
            <li
              key={index}
              className=" relative flex items-center gap-1 border border-totem-pole-400 py-1 px-2 rounded-md"
            >
              <img
                src={`http://localhost:3000/uploads/${menuItem.itemImage}`}
                alt={menuItem.itemName}
                className=" lg:h-16 lg:w-16 md:h-14 md:w-14 h-10 w-10 rounded-full object-cover"
              />
              <p className=" text-sm tracking-wide">{menuItem.itemName}</p>
              <span
                onClick={() => {
                  setMenu((prevItems) => {
                    return [
                      ...prevItems.filter(
                        (item) => item.itemName !== menuItem.itemName
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
      <div className=" flex flex-row gap-x-2">
        <input
          type="text"
          className=""
          placeholder="menu"
          name="menu"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <label className="flex items-center gap-x-2 rounded-md px-1 bg-slate-300 w-fit cursor-pointer">
          <CloudUploadOutlined />
          <input
            type="file"
            name="menuItemImage"
            placeholder="menu item image"
            className=" hidden"
            onChange={uploadMenuImage}
          />
          <span>Upload Item image</span>
        </label>
      </div>
      <button
        className="  bg-slate-300 rounded-md text-center w-full mt-2 py-2"
        onClick={addMenuItem}
      >
        Add Menu Item
      </button>
    </>
  );
};

export default MenuItems;
