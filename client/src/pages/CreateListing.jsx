import React, { useState } from "react";
import "../style/createList.scss";
import { categories, facilities, types } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  // Location
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    apt: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({ ...formLocation, [name]: value });
  };

  //   console.log(formLocation);

  // Count
  const [guestCount, setGuestCount] = useState(0);
  const [bedroomCount, setBedroomCount] = useState(0);
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);

  //facility
  const [facility, setFacility] = useState([]);

  const handleSeletFacility = (item) => {
    if (facility.includes(item)) {
      setFacility((prev) => prev.filter((option) => option !== item));
    } else {
      setFacility((prev) => [...prev, item]);
    }
  };

  console.log(facility);

  // Upload ,Drag & Drop, Remove
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div>
      <h1>Publish Ypur Place</h1>
      <form>
        <div className="step">
          <h2>Step1:Tell us about your place</h2>
          <hr />
          <h3>Which of these categories best describe your place?</h3>
          <div className="category-list">
            {categories?.map((item, index) => (
              <div
                className={`category ${
                  category === item.label ? "selected" : ""
                }`}
                key={index}
                onClick={() => setCategory(item.label)}
              >
                <div>{item.icon}</div>
                <p>{item.label}</p>
              </div>
            ))}

            <h3>What type of place will guest have?</h3>
            <div className="type-list">
              {types?.map((type, index) => (
                <div
                  className={`type ${type === type.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(type.name)}
                >
                  <div className="text">
                    <h4>{type.name}</h4>
                    <p>{type.description}</p>
                  </div>
                  <div>{type.icon}</div>
                </div>
              ))}
            </div>
          </div>

          <h3>Where's your place located?</h3>
          <div className="location">
            <div className="full">
              <p>Street Address</p>
              <input
                type="text"
                placeholder="Street Address"
                name="streetAddress"
                value={formLocation.streetAddress}
                required
                onChange={handleChangeLocation}
              />
            </div>
            <div className="half">
              <p>Apartment, Suite, etc</p>
              <input
                type="text"
                placeholder="Apartment , Suite, etc"
                name="apt"
                value={formLocation.apt}
                required
                onChange={handleChangeLocation}
              />
            </div>
            <div className="half">
              <p>City</p>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formLocation.city}
                required
                onChange={handleChangeLocation}
              />
            </div>
            <div className="half">
              <p>Province</p>
              <input
                type="text"
                placeholder="Province"
                name="province"
                value={formLocation.province}
                required
                onChange={handleChangeLocation}
              />
            </div>
            <div className="half">
              <p>Country</p>
              <input
                type="text"
                placeholder="Province"
                name="country"
                value={formLocation.country}
                required
                onChange={handleChangeLocation}
              />
            </div>
          </div>

          <h3>Share some basics about your place</h3>
          <div className="house-info">
            <div className="info">
              <p>Guests</p>
              <RemoveCircleOutline
                onClick={() => {
                  guestCount > 1 && setGuestCount(guestCount - 1);
                }}
              />
              <p>{guestCount}</p>
              <AddCircleOutline
                onClick={() => {
                  setGuestCount(guestCount + 1);
                }}
              />
            </div>
            <div className="info">
              <p>Bedrooms</p>
              <RemoveCircleOutline
                onClick={() => {
                  bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                }}
              />
              <p>{bedroomCount}</p>
              <AddCircleOutline
                onClick={() => {
                  setBedroomCount(bedroomCount + 1);
                }}
              />
            </div>
            <div className="info">
              <p>Beds</p>
              <RemoveCircleOutline
                onClick={() => {
                  bedCount > 1 && setBedCount(bedCount - 1);
                }}
              />
              <p>{bedCount}</p>
              <AddCircleOutline
                onClick={() => {
                  setBedCount(bedCount + 1);
                }}
              />
            </div>
            <div className="info">
              <p>Bathrooms</p>
              <RemoveCircleOutline
                onClick={() => {
                  bathCount > 1 && setBathCount(bathCount - 1);
                }}
              />
              <p>{bathCount}</p>
              <AddCircleOutline
                onClick={() => {
                  setBathCount(bathCount + 1);
                }}
              />
            </div>
          </div>
        </div>

        <div className="step">
          <h2>Step 2: Make your place send out</h2>
          <hr />
          <h3>Tell guests what your place has to offer</h3>
          <div className="facility">
            {facilities?.map((item, index) => (
              <div
                className="facility-item"
                key={index}
                onClick={() => handleSeletFacility(item.name)}
              >
                <div>{item.icon}</div>
                <p>{item.name}</p>
              </div>
            ))}
          </div>

          <h3>Add some photos of your place</h3>
          <div>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="img"
                          type="file"
                          accept="images/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="img">
                          <div className="icon">
                            <IoIosImages />
                            <p>Upload from your device</p>
                          </div>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="img"
                          type="file"
                          accept="images/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="img">
                          <div className="icon">
                            <IoIosImages />
                            <p>Upload from your device</p>
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <h3>What make your place attractive and exciting?</h3>
          <div className="description">
            <div className="desc">
              <p>Title</p>
              <input type="text" placeholder="Title" name="title" required />
            </div>
            <div className="desc">
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                required
              />
            </div>
            <div className="desc">
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                required
              />
            </div>
            <div className="desc">
              <p>Highlight details</p>
              <textarea
                type="text"
                placeholder="Highlight details"
                name="highlightDesc"
                required
              />
            </div>
            <div className="desc">
              <p>Now, set your PRICE</p>
              <span>$</span>
              <input type="number" placeholder="100" name="price" required />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
