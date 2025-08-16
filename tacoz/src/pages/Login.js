import React, { useEffect, useState } from "react";
import "./Login.css";
import { signInWithPopup, getAuth, FacebookAuthProvider } from "firebase/auth"; // 👈 Import FacebookAuthProvider
import { auth, googleProvider } from "./firebase";
const LoginModal = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  console.log(process.env.REACT_APP_BACKEND_URL)

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
     const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Initial form, 2: OTP verification
  const [message, setMessage] = useState('');
  
  const facebookProvider = new FacebookAuthProvider();

  // Show popup after page load
  useEffect(() => {
    setShowModal(true); // directly show when user visits
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };
  // Google login handler
const handleGoogleLogin = async () => {
  try {
    // 1. Authenticate with Google and get user data from Firebase
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Google Login Success:", user);

    // 2. Prepare the data to be sent to your backend
    const allData={
      user:user
    }
    const userData = {
      name: user.displayName,
      email: user.email,
      isVerified: true, // Social logins are considered verified
    };

    // 3. Send the user data to your backend API
    const response = await fetch(`${BASE_URL}/api/social-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    /////////////////////////
        const resp = await fetch(`${BASE_URL}/api/AllUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allData),
    });
    ////////////////

    // 4. Handle the backend's response
    const data = await response.json();
    if (response.ok) {
      console.log("User data saved to DB:", data);
      setShow(false); // Update UI state
      // You may want to close the modal here
    } else {
      console.error("Failed to save user data:", data);
      // Handle login failure on the frontend
    }
  } catch (err) {
    console.error("Google Login Error:", err);
  }
};

  //  Facebook login handler
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook Login Success:", result.user);
      setShowModal(false); // Close modal on success
    } catch (err) {
      console.error("Facebook Login Error:", err);
    }
  };



  if (!showModal) return null;

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${BASE_URL}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('OTP sent to your email! Please check your inbox.');
        setStep(2);
      } else {
        setMessage(data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${BASE_URL}/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! You can now log in.');
        setStep(3); // A final success state
      } else {
        setMessage(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred during OTP verification.');
    }
  };

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
            onChange={handleOtpChange}
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