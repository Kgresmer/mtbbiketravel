
import React from "react";
import './footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {

  return (
    <div>
      <footer>
        <div className="footer-container">
          <div>
            <p><a href="#" className="plain-link"><FacebookIcon/> Mtn Bike Travel</a></p>
            <p><a href="#" className="plain-link"><InstagramIcon/> @MtnBikeTravel</a></p>
          </div>
          <div>
            Copyright 2020
          </div>
        </div>
      </footer>
    </div>
  )
};

export default Footer;