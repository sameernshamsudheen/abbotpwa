import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_info"));
    console.log(user);
    if (user) {
      setUserInfo(user?.name);
    }
  }, []);

  const handleLogout = () => {
    googleLogout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">
          <img
            src={icon}
            alt=""
            width={"40px"}
            height={"40px"}
            className="me-2"
          />
          Spare Part Manager
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to={"/home"}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page">
                {userInfo}
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
