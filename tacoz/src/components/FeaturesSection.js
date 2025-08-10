import React from "react";
import "./FeaturesSection.css";
import phoneImage from "../assets/phone.webp"; // Adjust the path as necessary
import Date from "../assets/date.png"; // Adjust the path as necessary
const featuresLeft = [
  { img: "🍎", label: "Healthy" },
  { img: "🥗", label: "Veg Mode" },
  { img: "🥳", label: "Plan a Party" },
  { img: "🎁", label: "Gift Cards" },
];

const featuresRight = [
  { img: "🍝", label: "Gourmet" },
  { img: "🏷️", label: "Offers" },
  { img: "🚆", label: "Food on Metro" },
  { img: "🍔", label: "Collections" },
];

// Center feature image
const centerFeature = { img: Date, label: "Schedule your order" };

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2 className="title">
        What’s waiting for you
        <br />
        on the app?
      </h2>
      <p className="subtitle">
        Our app is packed with features that enable you to experience food
        delivery like never before
      </p>
      <div className="features-wrapper">
        <div className="features-left">
          {featuresLeft.map(({ img, label }) => (
            <div key={label} className="feature-box" role="listitem" tabIndex={0}>
              <div className="feature-icon" aria-label={label}>
                {img}
              </div>
              <p><b>{label}</b></p>
            </div>
          ))}
        </div>

<div className="center-phone" aria-label="Phone mockup with central feature">
  <div className="phone-mockup">
    <img 
      src={phoneImage}
      alt="Phone mockup" 
      className="phone-image"
    />
    <div className="center-feature-box">
      <div className="feature-icon large" aria-label={centerFeature.label}>
         <img 
      src={centerFeature.img}
      alt="Phone mockup" 
     style={{ width: '100%', height: '100%' }}
    />
        
      </div>
      <p>{centerFeature.label}</p>
    </div>
  </div>
</div>


        <div className="features-right">
          {featuresRight.map(({ img, label }) => (
            <div key={label} className="feature-box" role="listitem" tabIndex={0}>
              <div className="feature-icon" aria-label={label}>
                {img}
              </div>
              <p><b>{label}</b></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

