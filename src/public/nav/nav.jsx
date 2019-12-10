import {Link} from "react-router-dom";
import React from "react";
import headerImage from "../assets/mtnbiketravel-logo.png";
import './nav.css';

const Nav = () => {

  return (
    <header>
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className='image-link'>
              <Link to="/" >
                <img className='logo' src={headerImage} alt="Mountain Bike Travel logo"/>
              </Link>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="main-nav nav">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/destinations">Destinations</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
};

export default Nav;