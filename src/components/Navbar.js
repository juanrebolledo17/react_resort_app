import React, { useState } from 'react';
import logo from '../images/logo.svg';
import { FaAlignRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
           <div className="nav-center">
                <div className="nav-header">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                    <button type="button" className="nav-btn">
                        <FaAlignRight className="nav-icon" onClick={ () => setIsOpen(!isOpen) } />
                    </button>
                </div>
                <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
                    <li>
                        <Link to="/" >Home</Link>
                    </li>
                    <li>
                        <Link to="/rooms" >Rooms</Link>
                    </li>
                </ul>
           </div> 
        </nav>
    );
} 