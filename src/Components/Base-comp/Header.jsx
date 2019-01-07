import React from 'react';
import Logo from '../../Images/logo.png';

const Header = () => {
    return (
        <div>
            <img
                className="logoStyle"
                src={Logo}
                alt="NorthCoders News Logo"
            ></img>
        </div>
    );
};

export default Header;
