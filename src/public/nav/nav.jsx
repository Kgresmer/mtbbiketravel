import React, {useEffect, useState} from "react";
import headerImage from "../assets/mtn-travel-logo-long.png";
import './nav.css';
import {withRouter} from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigation = (props) => {
  const [route, setRoute] = useState('');

  useEffect(() => {
    setRoute(props.location.pathname);

  }, [props.location]);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="image-link" href="#">
          <img className='logo' src={headerImage} alt="Mountain Bike Travel logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <div className="justify-content-end navbar-collapse collapse show" id="basic-navbar-nav">
            <ul className="main-nav nav">
              <li className="nav-item">
                <Nav.Link href="/" className={`${route === '/' ? 'main-nav-active-link' : ''}`}>Home</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link href="/home#Overview" className={`${route === '/home#Overview' ? 'main-nav-active-link' : ''}`}>Overview</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link href="/home#Itinerary" className={`${route === '/home#Itinerary' ? 'main-nav-active-link' : ''}`}>Itinerary</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link href="/home#WhatsIncluded" className={`${route === '/home#WhatsIncluded' ? 'main-nav-active-link' : ''}`}>Whats Included</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link href="/home#DatesPricing" className={`${route === '/home#DatesPricing' ? 'main-nav-active-link' : ''}`}>Dates & Pricing</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link href="/contact" className={`${route === '/contact' ? 'main-nav-active-link' : ''}`}>Contact</Nav.Link>
              </li>
            </ul>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
};

export default withRouter(Navigation);