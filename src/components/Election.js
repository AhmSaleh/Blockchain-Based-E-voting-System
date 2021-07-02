import React, { Component } from 'react';
import Navbar from './Navbar2.0';
import Footer from './Footer2';
import WinnerCandidate from './WinnerCandidate';
import LoserCandidates from './LoserCandidates';

class Election extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <WinnerCandidate/>
                <LoserCandidates/>
                <Footer/>
            </React.Fragment>
          );
    }
}
 
export default Election;