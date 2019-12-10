import {Link} from "react-router-dom";
import React from "react";
import headerImage from "../assets/mtnbiketravel-logo.png";
import './nav.css';

const Nav = () => {

  return (
    <header>
      <div className="left-nav col">
        <figure >
          <img className='logo' src={headerImage} alt="Mountain Bike Travel logo"/>
        </figure>
      </div>

      <nav className="right-nav col">
        <ul className="main-nav">
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
      </nav>
    </header>
  )
};

export default Nav;