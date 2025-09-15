import React from "react";
import { ShoppingCart, Menu, Phone } from "lucide-react"; // icons
import { FaWhatsapp } from "react-icons/fa"; // WhatsApp icon
import { useNavigate } from "react-router-dom";
import "./FloatingActionButtons.css";

const FloatingActionButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="fab-container">
      {/* WhatsApp */}
      <a
        href="https://wa.me/1234567890" // replace with your number
        target="_blank"
        rel="noopener noreferrer"
        className="fab-btn whatsapp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={22} />
      </a>

      {/* Call */}
      <a
        href="tel:+1234567890" // replace with your number
        className="fab-btn call"
        title="Call Us"
      >
        <Phone size={22} />
      </a>

      {/* Cart */}
      {/* <button
        className="fab-btn cart"
        onClick={() => navigate("/cart")}
        title="Cart"
      >
        <ShoppingCart size={22} />
      </button> */}

      {/* Menu */}
      <button
        className="fab-btn menu"
        onClick={() => navigate("/menu")}
        title="Menu"
      >
        <Menu size={22} />
      </button>
    </div>
  );
};

export default FloatingActionButtons;
