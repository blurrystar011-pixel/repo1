import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/userSlice";
import LoginModal from "./LoginModel";
import "./Header.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avtar from "../assets/default-avatar.png";
import { useNavigate } from "react-router-dom";
import SearchOverlay from "./SearchOverlay";
import { IoMdSearch } from "react-icons/io";
const Navbar1 = () => {
    const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const handleLogout = () => {
    dispatch(clearUser());
    toast.success("Logout successful!");
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?.email) return;

    const formData = new FormData();
    formData.append("profilePic", file);
    formData.append("email", user.email);

    try {
      const response = await fetch(`${BASE_URL}/api/upload-profile-pic`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.photoUrl) {
        const updatedUser = { ...user, photo: `${BASE_URL}${data.photoUrl}` };
        dispatch(setUser(updatedUser));
        toast.success("Profile picture updated!");
      } else {
        toast.error("Upload failed!");
      }
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      toast.error("Upload failed!");
    }
  };

  const handleLoginSuccess = (userData) => {
    dispatch(setUser(userData));
    toast.success("Login successful!");
  };

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="sticky-top mobile-navbar px-2 py-2"
        >
          <Container fluid className="d-flex align-items-center justify-content-between">
            {/* Left: Brand */}
            <Navbar.Brand as={NavLink} to="/" className="logo-text text-white">
             Hello Tacos
            </Navbar.Brand>

           

            {/* Right: Cart + Hamburger */}
            <div className="d-flex align-items-center gap-3">
               {/* Center: Always show Profile Image (default if logged out) */}
            <div className="d-lg-none">
              <label htmlFor="profile-upload-mobile" className="mb-0">
                <img
                  src={
                    user?.photo
                      ? user.photo
                      : avtar // default empty avatar
                  }
                  alt="Profile"
                  style={{
                    width: "32px",
                    height: "32px",
                    
                    cursor: user?.name ? "pointer" : "default",
                    
                  }}
                  title={user?.name ? "Change profile picture" : "Guest"}
                />
              </label>
              {user?.name && (
                <input
                  type="file"
                  id="profile-upload-mobile"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfilePicChange}
                />
              )}
            </div>
              <NavLink to="/cart" className="cart-icon">
                <Badge count={cart?.items?.length || 0} offset={[0, 6]} size="large">
                  <ShoppingCartOutlined style={{ fontSize: "32px", color: "#000" }} />
                </Badge>
              </NavLink>
                   <div className="nav-icons d-flex">
<div>        <button onClick={() => navigate("/menu")} className="nav-btn floating-menu-btn"  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><MdRestaurantMenu /></button></div>
     <div>   <button onClick={() => setSearchOpen(true)} className="nav-btn floating-menu-btn"  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><IoMdSearch /></button></div>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
                className="border-0"
              />
            </div>

            {/* Offcanvas */}
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className="logo-text"
                >
                  <span className="text-dark">Hello</span>{" "}
                  <span className="highlight">Tacos</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3 nav-item">
                  <Nav.Link as={NavLink} to="/" className="px-3">
                    HOME
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/menu" className="px-3">
                    MENU
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/offers" className="px-3">
                    OFFERS
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/cart" className="px-3">
                    CART
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/contact" className="px-3">
                    CONTACT US
                  </Nav.Link>
                </Nav>

                {/* Desktop user section */}
                <div className="d-none d-lg-flex align-items-center ms-3">
                  {user?.name ? (
                    <>
                      <label htmlFor="profile-upload-desktop">
                        <img
                          src={user.photo || avtar}
                          alt={user.name}
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            marginRight: "10px",
                            cursor: "pointer",
                          }}
                        />
                      </label>
                      <input
                        type="file"
                        id="profile-upload-desktop"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleProfilePicChange}
                      />
                      <span className="me-2">{user.name}</span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-light ms-3"
                      onClick={() => setShowModal(true)}
                    >
                      Login
                    </button>
                  )}
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      {showModal && (
        <LoginModal
          setShowModal={setShowModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Navbar1;
