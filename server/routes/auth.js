const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/user");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); //파일 저장 경로
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
      return res.status(404).send("Please upload Profileimage");
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

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "등록되지 않은 이메일입니다." });
    }

    // 비밀번오 일치 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
    }
    // 토큰 생성
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});
module.exports = router;
