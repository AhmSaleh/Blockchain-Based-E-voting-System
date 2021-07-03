import React, { Component } from 'react';  

class WinnerCandidate extends Component {
    state = { 
        winner: this.props.winner,
        winnerVotes: this.props.winnerVotes,
        totalVotes: this.props.totalVotes
     }
    render() { 
        return ( 
        <React.Fragment>
            <section class="py-5">
                <div class="container px-4 px-lg-5 my-5">
                    <div class="row gx-4 gx-lg-5 align-items-center">
                        <div class="col-md-6"><img class="rounded float-left card-img-top mb-5 mb-md-0" style = {{ objectFit: "cover", width: "450px", height: "650px"}} src={this.props.winner.photo} alt="..." /></div>
                        <div class="col-md-6">
                            <h3 class="mb-1 ml-1">The Winner is </h3>
                            <h1 style = {{color: "rgb(59, 136, 59)"}} class="display-5 fw-bolder">{this.props.winner.name}</h1>
                            <div class="fs-5 mb-5">
                                {/* <!-- <span class="text-decoration-line-through">$45.00</span> --> */}
                                <span>{this.props.winnerVotes} votes of {this.props.totalVotes}</span>
                            </div>
                            <div>
                            <p className="lead">
                                {this.props.winner.description}
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