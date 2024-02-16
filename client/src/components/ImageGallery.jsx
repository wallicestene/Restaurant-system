import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Close, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import useServer from "../hooks/ServerUrl";

const ImageGallery = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(
    `${useServer()}api/restaurant/${id}`
  );
  const navigate = useNavigate();
  return (
    <div className="py-14 h-screen bg-black">
      {isLoading && <h1>loading...</h1>}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <div className=" w-11/12 mx-auto text-totem-pole-100">
          <div className=" flex justify-between my-5">
            <h1>{data?.name}</h1>
            <Close
              onClick={() => navigate(-1)}
              className=" hover:cursor-pointer"
            />
          </div>
          <Carousel
            showThumbs={false}
            showStatus={false}
            dynamicHeight={true}
            autoPlay
            emulateTouch
            stopOnHover
            interval={5000}
            useKeyboardArrows={true}
            className=" relative rounded-xl overflow-hidden"
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev && (
                <span
                  onClick={onClickHandler}
                  className=" h-10 w-10 flex items-center justify-center bg-totem-pole-500 text-totem-pole-100 rounded-full cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 z-10"
                >
                  <KeyboardArrowLeft />
                </span>
              )
            }
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext && (
                <span
                  onClick={onClickHandler}
                  className=" h-10 w-10 flex items-center justify-center bg-totem-pole-500 text-totem-pole-100 rounded-full cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 z-10 "
                >
                  <KeyboardArrowRight />
                </span>
              )
            }
          >
            {data?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`image ${index + 1}`}
                className="w-full lg:h-1/2 object-contain"
              />
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
