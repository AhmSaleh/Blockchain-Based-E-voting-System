import React, { Component } from 'react';  

class WinnerCandidate extends Component {
    state = { 
        winner: {
            winnerName: "Joe Biden",
            votesCount: 150000,
            totalVotes: 350000,
            winnerDescition: "Joe Biden, byname of Joseph Robinette Biden, Jr., (born November 20, 1942, Scranton, Pennsylvania, U.S.), 46th president of the United States (2021– ) and 47th vice president of the United States (2009–17) in the Democratic administration of Pres. Barack Obama. He previously represented Delaware in the U.S. Senate (1973–2009)."
        }
     }
    render() { 
        return ( 
        <React.Fragment>
            <section class="py-5">
                <div class="container px-4 px-lg-5 my-5">
                    <div class="row gx-4 gx-lg-5 align-items-center">
                        <div class="col-md-6"><img class="rounded float-left card-img-top mb-5 mb-md-0" style = {{ objectFit: "cover", width: "450px", height: "650px"}} src="https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg" alt="..." /></div>
                        <div class="col-md-6">
                            <h3 class="mb-1 ml-1">The Winner is </h3>
                            <h1 style = {{color: "rgb(59, 136, 59)"}} class="display-5 fw-bolder">Joe Biden</h1>
                            <div class="fs-5 mb-5">
                                {/* <!-- <span class="text-decoration-line-through">$45.00</span> --> */}
                                <span>{this.state.winner.votesCount} votes of {this.state.winner.totalVotes}</span>
                            </div>
                            <div>
                            <p className="lead">
                                {this.state.winner.winnerDescition}
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
         );
    }
}
 
export default WinnerCandidate;