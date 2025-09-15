import React, { useState, useEffect } from "react";
import "./OfferModal.css";

export default function OfferModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Offers from platforms
  const platformOffers = [
    { title: "🌮 20% OFF on Deliveroo!", link: "https://deliveroo.co.uk" },
    { title: "🔥 Free Delivery on UberEats!", link: "https://ubereats.com" },
    { title: "🎉 Special Deals on JustEat!", link: "https://just-eat.co.uk" },
    { title: "💻 Order Direct & Save!", link: "/order" },
  ];

  // Product-specific offers
  const productOffers = [
    { title: "🌯 Buy 1 Burrito, Get 1 Half Price!", link: "/menu#burritos" },
    { title: "🥤 Free Drink with Any Taco Combo!", link: "/menu#tacos" },
    { title: "🔥 2x Quesadillas for £8.99!", link: "/menu#quesadillas" },
    { title: "🌮 Taco Tuesday: 3 for £10!", link: "/menu#tacos" },
  ];

  // Merge both
  const allOffers = [...platformOffers, ...productOffers];

  // Pick random offer
  const getRandomOffer = () => {
    return allOffers[Math.floor(Math.random() * allOffers.length)];
  };

  const [offer, setOffer] = useState(getRandomOffer());

  useEffect(() => {
    // Show modal at random delay (2–7 seconds after load)
  const delay = Math.floor(Math.random() * (120000 - 60000) + 60000);
// random between 1 min (60000ms) and 2 min (120000ms)


    const timer = setTimeout(() => {
      setOffer(getRandomOffer());
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          ✖
        </button>
        <h2>Latest Offer</h2>
        <p>{offer.title}</p>
        <a href={offer.link} target="_blank" rel="noopener noreferrer" className="offer-btn">
          Order Now
        </a>
      </div>
    </div>
  );
}
