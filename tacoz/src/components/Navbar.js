import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button, message } from "antd"; // message for notifications
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";


import { useSelector, useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/userSlice";
import LoginModal from "./LoginModel";
import "./Header.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Navbar1 = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  // ✅ Logout handler with feedback
  const handleLogout = () => {
    dispatch(clearUser());
    // message.success("Logout successful!"); // Ant Design notification
    // swal("Good job!", "Logout successful!", "success");
    toast.success("Logout successful!")
  };

  // ✅ Profile picture upload handler
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
        // message.success("Profile picture updated successfully!"); // feedback
          toast.success("Profile picture updated!");
      } else {
        // message.error("Upload failed: " + data.message);
      
toast.error("Upload failed!");
      }
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      // message.error("Error uploading profile picture.");
      toast.error("Upload failed!");
    }
  };

  // ✅ Show success login notification
  const handleLoginSuccess = (userData) => {
    dispatch(setUser(userData));
    console.log('working success')
    // message.success("Login successful!");
     toast.success("Profile picture updated!");
  };

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="sticky-top">
          <Container fluid>
            <Navbar.Brand href="#" className="logo-text">
              <span className="text-white"> Hello</span>{" "}
              <span className="highlight">Tacoz</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
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
                  <span className="text-white"> Hello</span>{" "}
                  <span className="highlight">Tacoz</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body style={{ display: "flex", alignItems: "center" }}>
            <Nav className="justify-content-center flex-grow-1 pe-3 nav-item">
  <Nav.Link as={NavLink} to="/" className="px-3 text-white">
    HOME
  </Nav.Link>
  <Nav.Link as={NavLink} to="/menu" className="px-3 text-white">
    MENU
  </Nav.Link>
  <Nav.Link as={NavLink} to="/offers" className="px-3 text-white">
    OFFERS
  </Nav.Link>
  <Nav.Link as={NavLink} to="/cart" className="px-3 text-white">
    CART
  </Nav.Link>
  <Nav.Link as={NavLink} to="/contact" className="px-3 text-white">
    CONTACT US
  </Nav.Link>
</Nav>

                <Form className="d-flex align-items-center">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>

                {/* User section */}
                {user?.name ? (
                  <div className="d-flex align-items-center ms-3">
                    <label htmlFor="profile-upload">
                      <img
                        src={user.photo || "/default-avatar.png"}
                        alt={user.name}
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                        title="Click to change profile picture"
                      />
                    </label>
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleProfilePicChange}
                    />
                    <span className="text-white me-2">{user.name}</span>
                    <Button type="primary" danger onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="light"
                    className="ms-3"
                    onClick={() => setShowModal(true)}
                  >
                    Login
                  </Button>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      {showModal && (
        <LoginModal
          setShowModal={setShowModal}
          onLoginSuccess={handleLoginSuccess} // callback to show success message
        />
      )}
     

    </>
  );
};

export default Navbar1;
