import React, { useEffect, useState } from "react";
import "./Login.css";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginModal = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Form | 2: OTP | 3: Success
  const [message, setMessage] = useState("");

  const facebookProvider = new FacebookAuthProvider();

  // ✅ Check localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
      setShowModal(false); // user already logged in
    } else {
      setShowModal(true); // ask for login if no user found
    }
  }, [dispatch]);

  const handleClose = () => setShowModal(false);

  // ✅ Save user in Redux + localStorage
  const loginSuccess = (user) => {
    const userData = {
      name: user.displayName || user.name,
      email: user.email,
      photo: user.photoURL || null,
    };

    dispatch(setUser(userData));
    localStorage.setItem("user", JSON.stringify(userData)); // persist user
    setShowModal(false);
  };

  // 🔹 Google login handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      toast.success("Login Successfull!")
      console.log("workinfg success")
  console.log(user)
      // Save to backend
      await fetch(`${BASE_URL}/api/social-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          isVerified: true,
        }),
      });
  console.log(user)
      loginSuccess(user);
       
    } catch (err) {
      console.error("Google Login Error:", err);
    }
  };

  // 🔹 Facebook login handler
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      // Save to backend
      await fetch(`${BASE_URL}/api/social-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          isVerified: true,
        }),
      });

      loginSuccess(user);
      toast.success("Login Successfull!")
    } catch (err) {
      console.error("Facebook Login Error:", err);
    }
  };

  // 🔹 Manual email form handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP sent to your email! Please check your inbox.");
        setStep(2);
      } else {
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
        const userData = {
          name: formData.name,
          email: formData.email,
          photo: null, // manual users don’t have photo
        };
        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData)); // persist user
        setStep(3);
        setTimeout(() => setShowModal(false), 1500);
        toast.success("Login Successfull!")
      } else {
        setMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch {
      setMessage("An error occurred during OTP verification.");
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>🌮 Welcome to Taco Fiesta!</h2>
        <p>Login to enjoy our delicious offers</p>

        {/* Google Login */}
        <button className="btn google-btn" onClick={handleGoogleLogin}>
          Login with Google
        </button>

        {/* Facebook Login */}
        <button className="btn facebook-btn" onClick={handleFacebookLogin}>
          Login with Facebook
        </button>

        <div className="divider">OR</div>

        {/* Manual Form */}
        <div className="form-container">
          {step === 1 && (
            <form onSubmit={handleManualSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="btn manual-btn">
                Continue
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <p>{message}</p>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" className="btn manual-btn">
                Verify OTP
              </button>
            </form>
          )}

          {step === 3 && <p className="success-message">{message}</p>}

          {message && step !== 2 && step !== 3 && (
            <p className="error-message">{message}</p>
          )}
        </div>

        {/* Close Option */}
        <button className="close-btn" onClick={handleClose}>
          ✖
        </button>
      </div>
       
    </div>
    
  );
};

export default LoginModal;
