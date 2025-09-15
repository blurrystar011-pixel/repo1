import React from "react";
import "./CookiePolicy.css";

export default function CookiePolicy() {
  return (
    <div className="policy-page">
      <h1>Cookie Policy for Hello Tacos</h1>
      <p>Last updated: September 2025</p>

      <section>
        <h2>1. What are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit our
          website. They help us improve your browsing experience, remember your
          preferences, and understand how our website is being used.
        </p>
      </section>

      <section>
        <h2>2. How We Use Cookies</h2>
        <ul>
          <li>
            <strong>Essential cookies:</strong> Required for the website to
            function properly (e.g., remembering your cart).
          </li>
          <li>
            <strong>Analytics cookies:</strong> Help us understand how visitors
            use our website so we can improve it (e.g., Google Analytics).
          </li>
          <li>
            <strong>Marketing cookies:</strong> Used by advertising platforms to
            deliver more relevant ads (e.g., Deliveroo, JustEat, UberEats
            integrations).
          </li>
          <li>
            <strong>Preference cookies:</strong> Remember your choices, such as
            language, location, or login details.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Third-Party Cookies</h2>
        <p>
          Some cookies may be placed by third parties such as Deliveroo, UberEats,
          JustEat, or Google Maps integrations when you view our menu or location.
          These third-party cookies are governed by their own privacy policies.
        </p>
      </section>

      <section>
        <h2>4. Managing Cookies</h2>
        <p>
          You can manage or delete cookies at any time through your browser
          settings. If you decline cookies, some parts of our website may not
          work as intended.
        </p>
      </section>

      <section>
        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about this Cookie Policy, please contact us at:  
          <br />
          📧 <a href="mailto:info@hellotacos.co.uk">info@hellotacos.co.uk</a>  
          <br />
          📞 +44 7507 002201
        </p>
      </section>
    </div>
  );
}
