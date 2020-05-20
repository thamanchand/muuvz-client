import React from 'react';
import MapMarkerIcon from 'mdi-react/MapMarkerIcon';
import PhoneForwardIcon from 'mdi-react/PhoneForwardIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import FacebookIcon from 'mdi-react/FacebookIcon';
import InstagramIcon from 'mdi-react/InstagramIcon';
import TwitterIcon from 'mdi-react/TwitterIcon';


import logoMini from '../../assets/images/logo-mini.svg';
import { useMedia } from '../../containers/utils';

const currentDate = new Date();

const Footer = () => {
  const isSmallDevices = useMedia("(max-width: 768px)");

  return (
    <footer className="site-footer section block bg-contrast">
      <div className="container py-4">
        <div className="row gap-y">
          <div className="col-md-4">
            <img src={logoMini} alt="muuvz" className="mini-logo" />
            <ul className="footer-link">
              <li className="footer-item">
                <a className="nav-link primary" href="/auth/login">About us</a>
              </li>
              <li className="footer-item">
                <a className="nav-link primary" href="/auth/register">Contact us</a>
              </li>
              <li className="footer-item">
                <a className="nav-link primary" href="/auth/register">Blog</a>
              </li>
            </ul>
            <p className="header_item">{currentDate.getFullYear()} MUUVZ</p>
          </div>
          <div className="col-md-4">
            <h6 className="footer__link_header mt-5">Company</h6>
            <p className="header_item">Lorem ipsum dolor sit amet, consectetur elit. Blanditiis commodi expedita, odit officiis?</p>
            <nav className="nav flex-column small">
              <div className="d-flex align-items-center header_item__label ">
                <MapMarkerIcon size="20" color="#ff4861" />  <span className="contact_info">Kuusitie 5, Helsinki, Finland</span>
              </div>
              <div className="mt-2 d-flex align-items-center header_item__label ">
                <PhoneForwardIcon size="20" color="#ff4861" /> <span className="contact_info">(358) 442105570</span></div>
              <div className="mt-2 d-flex align-items-center header_item__label ">
                <EmailIcon size="20" color="#ff4861" />  <span className="contact_info">support@muuvz.in</span>
              </div>
            </nav>
          </div>
          <div className="col-md-4">
            <h6 className="footer__link_header mt-5">Subscribe to our newsletter</h6>
            <p className="header_item">By registering with us, you will receive right in your inbox all new features and updates. <span className="bold">Subscribe now!</span></p>
            <form className="form">
              <div className="form__form-group">
                <div className="form__form-group-field">
                  <input name="subscribename" type="text" placeholder="hello@gmail.com" className="input_subscribe" />
                  <button type="button" className="square btn btn-success subscribe">Subscribe</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr />

        <div className="row small align-items-center">
          <div className="col-md-4">
            <ul className="footer-link-small">
              <li className="footer-item">
                <a className="nav-link primary" href="/auth/login">Privacy policy</a>
              </li>
              <li className="footer-item">
                <a className="nav-link primary" href="/auth/register">Terms</a>
              </li>
            </ul>
          </div>
          <div className="col-md-8">
            <nav
              className={isSmallDevices
                ? "nav justify-content-md-end"
                : "nav justify-content-center justify-content-md-end"
              }>
              <a href="www.facebook.com" className="btn-circle btn-icon btn-secondary mr-3 op-4">
                <FacebookIcon size="20" color="#ff4861" className="social_media_icon"/>
              </a>
              <a href="www.twitter.com"className="btn-circle btn-icon btn-secondary mr-3 op-4">
                <TwitterIcon size="20" color="#ff4861" className="social_media_icon"/>
              </a>
              <a href="www.instagram.com" className="btn-circle btn-icon btn-secondary op-4">
                <InstagramIcon size="20" color="#ff4861" className="social_media_icon"/>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
