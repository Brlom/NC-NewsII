import React from 'react';
import Login from '../Interactive/Login';
import Footer from '../Base-comp/Footer';

const Auth = (props) => {
    if (props.user) {
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        );
    } else {
        return (
            <div className="main">
                <Login setUser={props.setUser} />
                <Footer className="footer" />
            </div>
        )
    }
};

export default Auth;