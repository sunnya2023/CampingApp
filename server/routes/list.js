const router = require("express").Router();
const multer = require("multer");
const List = require("../models/list");
const User = require("../models/user");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Create List

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      apt,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      facility,

      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send("파일이 없습니다.");
    }
    const photoPath = listingPhotos.map((file) => file.path);

    const newList = new List({
      creator,
      category,
      type,
      streetAddress,
      apt,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      facility,
      photoPath,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newList.save();
    res.status(200).json(newList);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Fail to create List" });
  }
});

// Get List

router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let list;
    if (qCategory) {
      list = await List.find({ category: qCategory }).populate("creator");
    } else {
      list = await List.find().populate("creator");
    }
    res.status(200).json(list);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
