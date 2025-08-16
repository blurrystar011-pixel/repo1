import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, Dropdown, Space } from 'antd';
import './Header.css';
 const Navbar1 = () => {
  return <>
  {[ 'lg'].map((expand) => (
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
      ))}
  
  </>
}
export default Navbar1;