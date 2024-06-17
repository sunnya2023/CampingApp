import { categories } from "../data";
import "../style/listing.scss";

const Listing = () => {
  return (
    <div className="listing-wrapper">
      {categories?.map((cate, index) => (
        <div key={index}>
          <div>{cate.icon}</div>
          <p>{cate.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Listing;
