import React, { useState } from 'react';
import './Footer.css';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';
const Footer = () => {
  const [lgShow, setLgShow] = useState(false);
  const [lgShow1, setLgShow1] = useState(false);
  const [lgShow2, setLgShow2] = useState(false);
  const [lgShow3, setLgShow3] = useState(false);
  const [lgShow4, setLgShow4] = useState(false);
const navigate=useNavigate();
  return (
    <>
      <div className="container-fluid text-white footer" id="contactus">
        <div className="container-fluid footer-container">
          <div className="row py-5 text-center text-md-start justify-content-around">

            {/* Contact Us */}
            <div className="col-md-5 col-lg-3 col-sm-5 footer-sm-border">
              <h3>Contact Us</h3>
              <a
                href="https://maps.app.goo.gl/"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
                className="text-white"
              >
                <p className="d-flex align-items-center gap-2 contact-item text-white">
                  <i className="bi bi-geo-alt-fill fs-3"></i> United Kingdom
                </p>
              </a>
              <a
                href="tel:+91-9041951402"
                style={{ textDecoration: 'none' }}
                className="text-white"
              >
                <p className="d-flex align-items-center gap-2 contact-item text-white">
                  <i className="bi bi-telephone-inbound-fill fs-3"></i>
                 +44 7507 002201
                </p>
              </a>
              <a
                href="mailto:info@hellotacos.com?subject=Inquiry&body=Hello, I have a question about Hello Tacos..."
                style={{ textDecoration: 'none' }}
                className="text-white"
              >
                <p className="d-flex align-items-center gap-2 contact-item text-white">
                  <i className="bi bi-envelope-at-fill fs-3"></i>
                  hello4tacos@gmail.com
                </p>
              </a>
            </div>

            {/* Our Features */}
            <div className="col-md-5 col-lg-3 col-sm-5 footer-border">
              <h3>Our Features</h3>
              <p className='text-white'>
                🌮 Authentic Mexican taste <br />
                🚀 Delivery across Wolverhampton <br />
                📱 Easy ordering via mobile & web <br />
                🥑 Fresh, healthy, & delicious!
              </p>
            </div>

            {/* What We Offer */}
            <div className="col-md-5 col-lg-3 col-sm-5 footer-border">
              <h3>What We Offer</h3>
              <div className="offer-list text-white">
                <p className='text-white' onClick={() => setLgShow(true)}>
                  <i className="bi bi-chevron-right"></i> About Us
                </p>
                <p className='text-white' onClick={() => setLgShow1(true)}>
                  <i className="bi bi-chevron-right"></i> Privacy Policy
                </p>
                <p className='text-white' onClick={() => setLgShow2(true)}>
                  <i className="bi bi-chevron-right"></i> Terms and Conditions
                </p>
                <p className='text-white' onClick={() => setLgShow3(true)}>
                  <i className="bi bi-chevron-right"></i> Security
                </p>
                <p className='text-white' onClick={() => setLgShow4(true)}>
                  <i className="bi bi-chevron-right"></i> Contact Us
                </p>
              </div>
            </div>

            {/* Logo */}
            <div className="col-md-5 col-lg-3 col-sm-5 footer-border">
              <h3>Logo</h3>
              <div
                className="d-flex justify-content-center justify-content-lg-start"
                style={{ fontWeight: 'bold', fontSize: '32px' }}
              >
                <div style={{ color: '#f8cb46' }}>Hello</div>{' '}
                <div style={{ color: '#54b226' }}>Tacos</div>
              </div>
            </div>

            {/* Copyright */}
            <div className="col-12 footer-copyright">
              <div className="text-center mt-2 fw-bold">
                Copyright © {new Date().getFullYear()} Hello Tacos
              </div>
              <div className="text-center mt-2 fw-bold">
                Created with 🌮 by Hello Tacos Team
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === MODALS (unchanged structure, just rebranded) === */}

      {/* About Us */}
      <Modal size="lg" centered   show={lgShow} onHide={() => setLgShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex" style={{ fontWeight: 'bold', fontSize: '32px' }}>
              <div style={{ color: '#f8cb46' }}>About</div>{' '}
              <div style={{ color: '#54b226' }}>Us</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalbody">
          Welcome to <b>Hello Tacos</b>! We deliver authentic Mexican flavors —
          tacos, burritos, nachos, and more — fresh and fast to your doorstep.
        </Modal.Body>
      </Modal>

      {/* Privacy Policy */}
      <Modal centered size="lg" show={lgShow1} onHide={() => setLgShow1(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex" style={{ fontWeight: 'bold', fontSize: '32px' }}>
              <div style={{ color: '#f8cb46' }}>Privacy</div>{' '}
              <div style={{ color: '#54b226' }}>Policy</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalbody">
          At Hello Tacos, we respect your privacy. Your data will only be used
          to improve your food ordering experience.For more info vist<span onClick={()=>{navigate('/privacy-policy'); console.log('ieeee')}}> privacy-policy</span>
        </Modal.Body>
      </Modal>

      {/* Terms */}
      <Modal centered size="lg" show={lgShow2} onHide={() => setLgShow2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex" style={{ fontWeight: 'bold', fontSize: '32px' }}>
              <div style={{ color: '#f8cb46' }}>Terms</div>{' '}
              <div style={{ color: '#54b226' }}>Conditions</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalbody">
          By using Hello Tacos services, you agree to follow our delivery,
          payment, and support terms.
        </Modal.Body>
      </Modal>

      {/* Security */}
      <Modal centered size="lg" show={lgShow3} onHide={() => setLgShow3(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex" style={{ fontWeight: 'bold', fontSize: '32px' }}>
              <div style={{ color: '#f8cb46' }}>Secu</div>{' '}
              <div style={{ color: '#54b226' }}>rity</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalbody">
          We keep your transactions secure. Never share sensitive details like
          OTPs, UPI PINs, or card info with anyone claiming to be Hello Tacos.
        </Modal.Body>
      </Modal>

      {/* Contact */}
      <Modal centered size="lg" show={lgShow4} onHide={() => setLgShow4(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex" style={{ fontWeight: 'bold', fontSize: '32px' }}>
              <div style={{ color: '#f8cb46' }}>Contact</div>{' '}
              <div style={{ color: '#54b226' }}>Us</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalbody">
          Need help? Email us at <b>support@hellotacos.com</b> and we’ll be glad
          to assist you.
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Footer;
