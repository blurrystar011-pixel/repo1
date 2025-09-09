import React, { useState } from "react";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../pages/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";


const LoginModal = ({ setShowModal }) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        isVerified: true,
      };

      // Save to backend
      await fetch(`${BASE_URL}/api/social-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      // Save to Redux
      dispatch(
        setUser({
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
        })
      );

      setShowModal(false); // Close modal
    } catch (err) {
      console.error("Google Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const facebookProvider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      dispatch(
        setUser({
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
        })
      );

      setShowModal(false);
    } catch (err) {
      console.error("Facebook Login Error:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>🌮 Welcome to Taco Fiesta!</h2>
        <p>Login to enjoy our delicious offers</p>

        <button className="btn google-btn" onClick={handleGoogleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login with Google"}
        </button>

        <button className="btn facebook-btn" onClick={handleFacebookLogin}>
          Login with Facebook
        </button>

        <button className="close-btn" onClick={() => setShowModal(false)}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
