import "../style/register.scss";
import { Link } from "react-router-dom";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImg: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImg") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  console.log(formData);

  const [passwordMath, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData();

      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }

      const res = await fetch("api/auth/register", {
        method: "POST",
        body: registerForm,
      });

      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Register failed", error.message);
    }
  };

  return (
    <div className="register">
      <div className="content">
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            value={formData.username}
            placeholder="이름"
            required
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="이메일"
            required
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            placeholder="비밀번호"
            required
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            placeholder="비밀번호 확인"
            required
            onChange={handleChange}
          />

          {!passwordMath && <p>비밀번호가 일치하지 않습니다.</p>}

          <input
            id="profileImg"
            type="file"
            accept="image/*"
            name="profileImg"
            onChange={handleChange}
          />
          <label htmlFor="profileImg">
            <FileUploadOutlinedIcon />
            프로필 사진 업로드
          </label>

          {formData.profileImg && (
            <img
              src={URL.createObjectURL(formData.profileImg)}
              alt="프로필 사진"
            />
          )}

          <button>회원가입</button>
        </form>

        <Link to="/login">
          회원이세요? <span>로그인</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
