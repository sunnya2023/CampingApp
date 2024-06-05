const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

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
//  User Register
router.post("/register", upload.single("profileImg"), async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Image upload
    const profileimg = req.file;

    if (!profileimg) {
      return res.status(404).send("No file uploaded");
    }

    const profileImgPath = profileimg.path;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    //  hash Password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // create User
    const newUser = await User({
      username,
      email,
      password: hashPassword,
      profileImgPath,
    });

    // save the new User
    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Regisger failed", error: error.message });
  }
});

module.exports = router;
