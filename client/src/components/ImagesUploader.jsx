/* eslint-disable react/prop-types */
import { CloudUploadOutlined } from "@mui/icons-material";
const ImagesUploader = ({ images, setImages, imageLink, setImageLink }) => {
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
    <>
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
            onChange={uploadImage}
          />
          <span>Upload</span>
        </label>
      </div>
    </>
  );
};

export default ImagesUploader;
