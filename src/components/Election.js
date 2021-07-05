import React, { Component } from 'react';
import Navbar from './Navbar2.0';
import Footer from './Footer2';
import WinnerCandidate from './WinnerCandidate';
import LoserCandidates from './LoserCandidates';
import axios from "axios";
import Layout from './Layout'
class Election extends Component {
    constructor(props) {
    super(props);
    }
    
    state = {
        id: this.props.id,
        election: {
            candidateWinner: {
            name: "Joe Biden",
            votesCount: 150000,
            totalVotes: 350000,
            winnerDescition: "Joe Biden, byname of Joseph Robinette Biden, Jr., (born November 20, 1942, Scranton, Pennsylvania, U.S.), 46th president of the United States (2021– ) and 47th vice president of the United States (2009–17) in the Democratic administration of Pres. Barack Obama. He previously represented Delaware in the U.S. Senate (1973–2009)."
            },
            candidates: [
            {
                candidateName: "Trump",
                votesCount: 35000,
                img: "https://upload.wikimedia.org/wikipedia/commons/5/53/Donald_Trump_official_portrait_%28cropped%29.jpg",
            },
            {
                candidateName: "Hillary Clinton",
                votesCount: 13000,
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Hillary_Clinton_by_Gage_Skidmore_4_%28cropped%29.jpg/449px-Hillary_Clinton_by_Gage_Skidmore_4_%28cropped%29.jpg",
            },
            {
                candidateName: "Jorgensen Portrait",
                votesCount: 5800,
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jo_Jorgensen_portrait_3.jpg/220px-Jo_Jorgensen_portrait_3.jpg",
            },
            {
                candidateName: "Trump",
                votesCount: 35000,
                img: "https://upload.wikimedia.org/wikipedia/commons/5/53/Donald_Trump_official_portrait_%28cropped%29.jpg",
            },
            {
                candidateName: "Hillary Clinton",
                votesCount: 13000,
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Hillary_Clinton_by_Gage_Skidmore_4_%28cropped%29.jpg/449px-Hillary_Clinton_by_Gage_Skidmore_4_%28cropped%29.jpg",
            },
            {
                candidateName: "Jorgensen Portrait",
                votesCount: 5800,
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jo_Jorgensen_portrait_3.jpg/220px-Jo_Jorgensen_portrait_3.jpg",
            },
    ],
        }
    }

    componentDidMount = () => {
        // this.getElectionDetails();
    }

    getElectionDetails = () => {
        console.log(this.state.id);
        axios
        .get(`http://localhost:5000/api/elections/${this.state.id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => {
            const election = res.data;
            this.setState({ election });
        })
        .catch((err) => alert(err.message));
    }

    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <WinnerCandidate winner={this.state.election.candidateWinner}
                                totalVotes={this.state.election.totalVotes}
                                winnerVotes={this.state.election.candidateWinnerVotes}/>
                                
                <LoserCandidates candidates={this.state.election.candidates} />
                <Footer/>
            </React.Fragment>
          );
    }
}
 
export default Election;