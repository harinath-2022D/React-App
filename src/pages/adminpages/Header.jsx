import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <nav>
        <NavLink to="/admin/service">Services</NavLink>
        <NavLink to="/admin/contact">Contact Us</NavLink>
      </nav>
    </div>
  )
}

export default Header
