import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Header.css';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/5.png';
import { useNavigate } from "react-router-dom";
import delimg1 from  "../assets/del (1).png";
import delimg2 from '../assets/del (2).png';
import delimg3 from '../assets/del (3).png';
import { Button, Dropdown, Space } from 'antd';
// index.js or App.js



import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';


const MexicanFoodHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);
const [isPopupOpen, setIsPopupOpen] = useState(false);
const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];
  const carouselImages = [
    {
      url: img1,
      title: "Fresh Guacamole & Chips",
      description: "Made fresh daily with ripe avocados and secret spices"
    },
    {
      url: img2,
      title: "Sizzling Beef Fajitas",
      description: "Grilled to perfection with bell peppers and onions"
    },
    {
      url: img3,
      title: "Chicken Quesadillas",
      description: "Crispy tortillas filled with seasoned chicken and cheese"
    }
  ];

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <>
  {/* {[ 'lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="sticky-top">
          <Container fluid>
            <Navbar.Brand href="#" className='logo-text'> <span className='text-white'> Hello</span> <span className="highlight">Tacozz</span></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className='logo-text'>
                <span className='text-white'> Hello</span> <span className="highlight">Tacozz</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3 nav-item">
                  <Nav.Link href="#action1" className="nav-link active px-3 text-white text-sm-dark"> HOME</Nav.Link>
                  <Nav.Link href="#action2" className="nav-link active px-3 text-white"> MENU</Nav.Link>
                  <Nav.Link href="#action2" className="nav-link active px-3 text-white">  OFFERS</Nav.Link>
                  <Nav.Link href="#action2" className="nav-link active px-3 text-white">  TESTIMONIALS</Nav.Link>
                  <Nav.Link href="#action2" className="nav-link active px-3 text-white">  CONTACT US</Nav.Link>

              
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))} */}




    <div className="hero">
 


      <div className="hero-content">
        {/* Left text */}
        <div className="hero-text">
          <h1>
            Authentic <span className="highlight">Mexican</span> Flavours
          </h1>
          <p>🇬🇧 Serving the UK with Traditional Mexican Cuisine</p>
         <div className="hero-buttons">
  {/* Navigate to /menu */}
  <button
    className="primary-btn"
    onClick={() => navigate("/menu")}
  >
    🚀 Order Now - Free Delivery
  </button>

  {/* Open popup modal */}
  <button
    className="secondary-btn"
    onClick={() => setIsPopupOpen(true)}
  >
    📍 Order from other site
  </button>
</div>
{isPopupOpen && (
  <div className="popup-overlay">
    <div className="popup-content">
      <h3 className="text-lg font-bold mb-3">Order via:</h3>
      <div className="flex flex-col gap-2">
        <a href="https://ubereats.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-black  rounded">
         <img style={{ width: '100px', height: '50px', objectFit:"contain" }} alt="Delivery Platform"
                        src={delimg1}></img>
        </a>
        <a href="https://justeat.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-orange-500  rounded">
          <img style={{ width: '100px', height: '50px', objectFit:"contain" }} alt="Delivery Platform"
                        src={delimg2}></img>
        </a>
        <a href="https://deliveroo.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-cyan-500  rounded">
          <img style={{ width: '100px', height: '50px', objectFit:"contain" }} alt="Delivery Platform"
                        src={delimg3}></img>
        </a>
      </div>
      <button
        onClick={() => setIsPopupOpen(false)}
        className="mt-4 px-4 py-2 bg-gray-300 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}

        </div>

        {/* Carousel */}
        <div className="carousel">
          <img
            src={carouselImages[currentSlide].url}
            alt={carouselImages[currentSlide].title}
            className="carousel-image"
          />
          <div className="carousel-caption">
            <h3>{carouselImages[currentSlide].title}</h3>
            <p>{carouselImages[currentSlide].description}</p>
          </div>
          <button
            className="prev"
            onClick={() =>
              setCurrentSlide((currentSlide - 1 + carouselImages.length) % carouselImages.length)
            }
          >
            <ChevronLeft />
          </button>
          <button
            className="next"
            onClick={() =>
              setCurrentSlide((currentSlide + 1) % carouselImages.length)
            }
          >
            <ChevronRight />
          </button>
        </div>
      </div>
 <div className="floating-elements">
  <div className="floating-element" style={{ top: '20%', left: '10%' }}>🌶️</div>
  <div className="floating-element" style={{ top: '60%', right: '15%' }}>🥑</div>
  <div className="floating-element" style={{ top: '30%', right: '5%' }}>🧄</div>
  <div className="floating-element" style={{ bottom: '20%', left: '20%' }}>🌽</div>

  <div className="floating-element" style={{ top: '10%', right: '25%' }}>🍅</div>
  <div className="floating-element" style={{ bottom: '10%', right: '30%' }}>🥕</div>
  <div className="floating-element" style={{ top: '50%', left: '5%' }}>🍋</div>
  <div className="floating-element" style={{ bottom: '40%', left: '15%' }}>🍇</div>
  <div className="floating-element" style={{ top: '75%', right: '10%' }}>🥥</div>
  <div className="floating-element" style={{ bottom: '5%', left: '40%' }}>🥦</div>
</div>





      {/* Decorative SVG Floating Elements */}
      <svg className="floating-icon taco" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" fill="#ffb347" />
      </svg>
      <svg className="floating-icon chili" viewBox="0 0 64 64">
        <path d="M32 4C12 4 4 20 4 32s8 28 28 28 28-12 28-28S52 4 32 4z" fill="#e63946"/>
      </svg>
    </div>

  </>
};

export default MexicanFoodHero;
