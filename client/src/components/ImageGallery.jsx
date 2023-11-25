import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Close } from "@mui/icons-material";

const ImageGallery = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/restaurant/${id}`
  );
  const navigate = useNavigate()
  return (
    <div className="py-20  w-11/12 mx-auto">
      {isLoading && <h1>loading...</h1>}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <>
          <div className=" flex justify-between">
            <h1>{data?.name}</h1>
            <Close onClick={() => navigate(-1)} className=" hover:cursor-pointer"/>
          </div>
          <div className=" my-4 px-4 flex flex-col gap-y-3 items-center">
            {data?.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:3000/uploads/${image}`}
                alt={`image ${index + 1}`}
                className=" w-5/6 "
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
