import React from 'react';
import Icon from '../../images/icon.png';

const Footer = () => {
    return (
        <div className="footer" >
            <img
                src={Icon}
                alt="NorthCoders News Icon"
                width="34"
                height="20"
            >
            </img>
            <h1 fontSize="3pt">©2019 NC Knews</h1>
        </div>
    );
};

export default Footer;