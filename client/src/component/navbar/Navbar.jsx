import React, { useState } from "react";
import "../../style/navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../Redux/state";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(true);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const dispatch = useDispatch();
  return (
    <nav>
      Navbar
      <div>
        <input type="text" placeholder="Search..." />
        <button>search</button>
      </div>
      <div>
        {user ? <a>Become a host</a> : <a>Become a host</a>}

        <button>
          <span onClick={() => setDropdownMenu(!dropdownMenu)}>메뉴</span>
        </button>

        {dropdownMenu && !user && (
          <div>
            <Link to="/login"> 로그인</Link>
            <Link to="/register"> 회원가입</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div>
            <Link to="/">리스트</Link>
            <Link to="/">찜 목록 </Link>
            <Link to="/">예약 목록</Link>
            <Link to="/">관리자 모드</Link>
            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              로그아웃
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
