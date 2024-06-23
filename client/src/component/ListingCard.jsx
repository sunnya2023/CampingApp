import { useState } from "react";
import "../style/listingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ list }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();
  const goToPrevSlide = () => {
    setImgIndex(
      (prev) => (prev - 1 + list.photoPath.length) % list.photoPath.length
    );
  };
  const goToNextSlide = () => {
    setImgIndex((prev) => (prev + 1) % list.photoPath.length);
  };

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/list/${list._id}`);
      }}
    >
      <div className="slider-container">
        <div className="slider">
          {list.photoPath.map((photo, index) => (
            <div
              key={index}
              className="slide"
              style={{ transform: `translateX(-${imgIndex * 100}%)` }}
            >
              <img
                src={`http://localhost:4000/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />

              <div className="prev-btn" onClick={(e) => goToPrevSlide(e)}>
                <ArrowBackIosNew className="ico" />
              </div>
              <div className="next-btn" onClick={(e) => goToNextSlide(e)}>
                <ArrowForwardIos className="ico" />
              </div>
            </div>
          ))}
        </div>
        <div className="slider-info">
          <h3>
            {list.province},{list.city},{list.country}
          </h3>
          <p>{list.category}</p>
          <p>{list.type}</p>
          <p>
            <span>${list.price} per night</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
