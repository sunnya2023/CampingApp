import { useEffect, useState } from "react";
import "../style/listingDetails.scss";
import { useParams } from "react-router-dom";
import { facilities } from "../data";
import { DateRange } from "react-date-range";
import Loader from "../component/Loader";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [list, setList] = useState(null);

  const getListingDetails = async () => {
    try {
      const res = await fetch(`/api/list/${listingId}`, {
        method: "GET",
      });
      const data = await res.json();
      setList(data);
      setLoading(false);
    } catch (error) {
      console.log("리스트를 가져오는데 실패했습니다.", error.message);
    }
  };
  console.log(list);
  useEffect(() => {
    getListingDetails();
  }, []);

  // Booking Calendar
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="list-details">
      <div className="title">
        <h1>{list.title}</h1>
        <div></div>
      </div>

      <div className="photos">
        {list.photoPath?.map((item, index) => (
          <img
            key={index}
            src={`http://localhost:4000/${item.replace("public", "")}`}
            alt="listing photo"
          />
        ))}
      </div>
      <h2>
        {list.type} in {list.city}, {list.province}, {list.country}
      </h2>
      <p>
        {list.guestCount} guests - {list.bedroomCount} bedroom(s) -{" "}
        {list.bedCount} - bed(s) - {list.bathroomCount} -bath
      </p>

      <div>
        <img
          src={`http://localhost:4000/${list.creator.profileImgPath?.replace(
            "public",
            ""
          )}`}
          alt={list.creator.username}
        />
        <h3>Hosted by {list.creator.username}</h3>
        <hr />

        <h3>Description</h3>
        <p>{list.description}</p>
        <hr />

        <h3>{list.highlight}</h3>
        <p>{list.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="facility">
              {list.facility[0].split(",").map((item, index) => (
                <div className="facility-list" key={index}>
                  <div className="facility-ico">
                    {facilities.find((facility) => facility.name === item).icon}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="calendr">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ${list.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ${list.price} x {dayCount} night
                </h2>
              )}
              <h2>Total price: ${list.price * dayCount}</h2>
              <p>Start Date : {dateRange[0].startDate.toDateString()}</p>
              <p>End Date : {dateRange[0].endDate.toDateString()}</p>

              <button className="btn">예약하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
