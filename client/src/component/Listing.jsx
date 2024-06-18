import { useEffect, useState } from "react";
import { categories } from "../data";
import "../style/listing.scss";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../Redux/state";
import Loader from "./Loader";
import ListingCard from "./ListingCard";
const Listing = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const list = useSelector((state) => state.list);

  const getFeedListings = async () => {
    try {
      const res = await fetch(
        selectedCategory !== "All"
          ? `/api/list?category=${selectedCategory}`
          : "/api/list",
        {
          method: "GET",
        }
      );

      const data = await res.json();
      dispatch(setListings({ list: data }));
      setLoading(false);
    } catch (error) {
      console.log("Fetch Listings failed", error.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  console.log(list);

  return (
    <>
      <div className="listing-wrapper">
        {categories?.map((category, index) => (
          <div key={index} onClick={() => setSelectedCategory(category.label)}>
            <div>{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="lisgings">
          {list.map((item, index) => (
            <ListingCard key={index} list={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default Listing;
