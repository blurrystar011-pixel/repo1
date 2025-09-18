import React from "react";
import "./NoDeliveryPage.css";
import delimg1 from  "../assets/del (1).png";
import delimg2 from '../assets/del (2).png';
import delimg3 from '../assets/del (3).png';
const NoDeliveryPage = () => {
  return (
    <div className="no-delivery-container">
      <div className="del-card">
        <h1>🚫 Delivery Not Available</h1>
        <p>
          We currently don’t provide delivery directly. <br />
          You can still enjoy our food through our trusted partners:
        </p>

        <div className="options">
          <a
            href="https://deliveroo.co.uk/menu/birmingham/wolverhampton-city-centre/hello-tacos-56-mander-square?srsltid=AfmBOorvLsOfud3LL8ecLYDCbL4ZmiQDkhAs-cVAERemCZA8XcuTdyuf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn delivo"
          >
             <img style={{ width: '100px', height: '50px', objectFit:"contain" }} alt="Delivery Platform"
                                   src={delimg1}></img>
          </a>
          <a
            href="https://www.ubereats.com/gb/store/hello-tacos/P5WjPrDqWdyye8UKSxKsrQ?diningMode=DELIVERY&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMjEwMyUyMFNpbW1vbnMlMjBEcml2ZSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMjI3NWQzN2YwLWI2YWEtNDExOS0zM2Q4LTlmYTlkNzU0OTdhMyUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBNTIuNDUyOTQ4MiUyQyUyMmxvbmdpdHVkZSUyMiUzQS0xLjk5NjAwNjklN0Q%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="btn ubereats"
          >
          <img style={{ width: '100px', height: '50px', objectFit:"contain" }} alt="Delivery Platform"
                                 src={delimg3}></img>
          </a>
          <a
            href="https://www.just-eat.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn justeats"
          >
           <img style={{ width: '100px', height: '50px', objectFit:"contain" }} alt="Delivery Platform"
                                  src={delimg2}></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoDeliveryPage;
