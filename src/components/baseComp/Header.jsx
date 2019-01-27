import React from 'react';
import Logo from '../../images/logo.png';

const Header = () => {
    return (
        <div className="topNav">
            <img
                className="logoStyle"
                src={Logo}
                alt="NorthCoders News Logo"
            ></img>
        </div>
    );
};

export default Header;
