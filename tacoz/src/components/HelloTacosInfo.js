import React from "react";
import { MapPin, Phone, Info, Shield } from "lucide-react";
import "./HelloTacosInfo.css";

export default function HelloTacosInfo() {
  return (
    <div className="info-wrapper">
      <div className="info-left">
        {/* About */}
        <section className="info-section">
          <h2><Info size={18}/> About Hello Tacos</h2>
          <p>
            Order your favourite dish at home from <strong>Hello Tacos (WOL)</strong> thanks to
            Deliveroo's home delivery.
          </p>
        </section>

        {/* Allergens */}
        <section className="info-section">
          <h2><Info size={18}/> Allergens</h2>
          <p>
            You can call Hello Tacos - Wolverhampton City Centre to ask about their
            ingredients and allergen information, production or cooking methods.
          </p>
          <p>
            📞 Call us on{" "}
            <a href="tel:+447507002201" className="phone-link">
              +44 7507 002201
            </a>
          </p>
        </section>

        {/* Hygiene */}
        <section className="info-section">
          <h2><Shield size={18}/> Hygiene rating</h2>
          <p>
            Visit the{" "}
            <a
              href="https://ratings.food.gov.uk/"
              target="_blank"
              rel="noreferrer"
            >
              Food Standards Agency’s website
            </a>{" "}
            to find the most recent food hygiene rating for this partner.
          </p>
        </section>

        {/* Notes */}
        <section className="info-section">
          <h2><Info size={18}/> Notes</h2>
          <p>
            All dishes may contain traces of the following allergens: Gluten,
            Crustaceans, Eggs, Fish, Peanuts, Soybeans, Milk, Nuts (e.g. almonds,
            hazelnuts, walnuts, cashews, pecan nuts, Brazil nuts, pistachio nuts,
            macadamia nuts), Celery, Mustard, Sesame, Sulphur dioxide/sulphites,
            Lupin, Molluscs.  
            <br />
            For any questions regarding the allergen contents of specific dishes
            please contact the partner directly.
          </p>
        </section>
      </div>

      {/* Right Column (Map) */}
      <div className="info-right">
        <h2><MapPin size={18}/> Location</h2>
        <p>37 Mander Square, Birmingham, WV13NN</p>
        <div className="map-container">
       <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2424.1643810353235!2d-2.1282292!3d52.5847212!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48709bcc2eadf27f%3A0xb90b114486d7ae31!2sHello%20Tacos!5e0!3m2!1sen!2sin!4v1757875592751!5m2!1sen!2sin" width="600" height="450" style={{border:'10px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
}
