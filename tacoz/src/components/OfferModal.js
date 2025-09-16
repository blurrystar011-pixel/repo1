import React, { useState, useEffect } from "react";
import "./OfferModal.css";

export default function OfferModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Offers from platforms
  const platformOffers = [
    { title: "🌮 20% OFF on Deliveroo!", link: "https://deliveroo.co.uk/menu/birmingham/wolverhampton-city-centre/hello-tacos-56-mander-square?srsltid=AfmBOorvLsOfud3LL8ecLYDCbL4ZmiQDkhAs-cVAERemCZA8XcuTdyuf" },
    { title: "🔥 Free Delivery on UberEats!", link: "https://www.ubereats.com/gb/store/hello-tacos/P5WjPrDqWdyye8UKSxKsrQ?diningMode=DELIVERY&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMjEwMyUyMFNpbW1vbnMlMjBEcml2ZSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMjI3NWQzN2YwLWI2YWEtNDExOS0zM2Q4LTlmYTlkNzU0OTdhMyUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBNTIuNDUyOTQ4MiUyQyUyMmxvbmdpdHVkZSUyMiUzQS0xLjk5NjAwNjklN0Q%3D" },
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
