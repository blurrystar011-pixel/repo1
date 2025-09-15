import React, { useState, useEffect } from "react";
import "./CookieConsent.css";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => setVisible(true), 1000); // show after 1s
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-text">
        🍪 We use cookies to improve your experience. By continuing, you agree to our{" "}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">
          Cookie Policy
        </a>.
      </div>
      <div className="cookie-actions">
        <button className="btn accept" onClick={acceptCookies}>
          Accept
        </button>
        <button className="btn decline" onClick={declineCookies}>
          Decline
        </button>
      </div>
    </div>
  );
}
