import React from 'react'
import "./Navbar.css"
import {assets} from '../../assets/assets'
import heading from "./heading.png"
const Navbar = () => {
  return (
    <div className='navbar'>
        <img className="logo" src={heading} alt="" />
        <p>Admin Panel</p>
        <img className="profile" src={assets.profile_image} alt="" />

    </div>
  )
}

export default Navbar