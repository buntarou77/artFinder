import {useState, useEffect} from 'react';
import { Link } from 'react-router';
import './header.scss'
const Header = ()=>{
    return (
        <header>
            <div className="container">
            <div className='firs_path'>
                <div className="header_logo">
                    <h1><span>Art</span> Finder</h1>
                </div>
                <nav>
                    <ul className="nav_list">
                       <Link to={`/`}><li><a href="#home">Home</a></li></Link>
                        <Link to={'/serch'}><li><a href="#search">Search</a></li></Link>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                </div>
               
                </div>

        </header>
    );
}

export default Header;