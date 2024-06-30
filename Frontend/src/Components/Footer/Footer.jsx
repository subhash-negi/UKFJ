import React from 'react'
import "./Footer.css"
import logo from "../Header/heading.png"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={logo} halt=""/>
                <p>Savor the Flavors of India with Every Bite<br></br>
                "Authentic Indian Cuisine, Crafted with Love</p>
                <div className='footer-social-icons flex'>
                    <img src={assets.facebook_icon} alt=""/>
                    <img src={assets.twitter_icon} alt=""/>
                    <img src={assets.linkedin_icon} alt=""/>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>91 8218428832</li>
                        <li>subhaahnegi@gmail.com</li>
                    </ul>
            </div>
        </div>
        <hr></hr>
        <p className='footer-copyright'>Copyright @ 2024 UKFJ.com -All right Reserved</p>
    </div>
  )
}

export default Footer