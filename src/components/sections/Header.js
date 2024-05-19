import React from 'react';
import logo from '../../assets/images/logo.svg';
// import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <header>
                <div className="backg-color">
                    <img className="content-logo" src={logo} alt="Logo Pokemon" />
                    {/* <Link to="/home" className="content-logo">
                        <img src={logo} alt="Logo Pokemon" />
                    </Link> */}
                </div>
            </header>
        </>
    );
}
