import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Footer2 from './Footer2';
import Navbar2 from './Navbar2.0';

export default (props) =>{
    return (
        <div>
            <Navbar2/>
            {/* <Header /> */}
                {props.children}
            {/* <Footer /> */}
            <Footer2/>
        </div>
    )
}