import React from 'react';
import Login from '../interactive/Login';
import Footer from '../baseComp/Footer';
import Header from '../baseComp/Header';

const Auth = (props) => {
    if (props.user) {
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <Header />
                <Login setUser={props.setUser} />
                <Footer className="footer" />
            </React.Fragment>
        )
    }
};

export default Auth;