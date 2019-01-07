import React from 'react';
import Icon from '../../Images/icon.png';

const footerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    position: "absolute",
    bottom: "0",
    width: "100%",
}

const Footer = () => {
    return (
        <div className="footer" style={footerStyle}>
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