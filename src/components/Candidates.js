<<<<<<< HEAD
import React, { Component } from 'react';
import web3 from '../web3';
import ballot from '../ballot';
import swal from 'sweetalert';
import '../static/candidate_styles.css';

class Candidates extends Component {
    
    vote = (event) => {
        swal({
            title: "Are you sure?",
            text: "Once your vote has been cast, it cannot be changed!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willVote) => {
            if (willVote) {
                this.voteYesCallback(event);
            } else {
              swal("You did not cast a vote.");
            }
          });
    }
    
    voteYesCallback = async (event) => {
        event.preventDefault();

        console.log(this.state.index);
        const accounts = await web3.eth.getAccounts();

        await ballot.methods.vote(this.state.index).send({
        from: accounts[0],
        gas:'100000'
        })
        .then((hasVoted) => {
            if(hasVoted){
                swal("Your vote was successfully cast!", {
                    icon: "success",
                  });
            }
            else{
                swal("Error", "There was an error when casting your vote!", {
                    icon: "error",
                  });
            }
        });
    };

    render(){
        return (
            <div>
                <head>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
                    <link rel="stylesheet" type="text/css" href="../static/candidate_styles.css"/>
                </head>
    
                <body>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-sm-8 col-lg-6">
                                {/* Section Heading */}
                                <div className="section_heading text-center wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: 0.2, animationName: "fadeInUp"}}>
                                    <h3>Candidates</h3>
                                    <p>Please cast your vote for one of the available candidates.</p>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>
    
                        <div className="row">
                         {this.props.candidates.length > 0 ? (
                                 this.props.candidates.map((candidate) => (
                                     // Candidate
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: 0.2, animationName: "fadeInUp"}} onClick={this.vote}>
                                            {/* Candidate Avatar */}
                                            <div className="advisor_thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/></div>
                                            {/* Candidate Details */}
                                            <div className="single_advisor_details_info">
                                                <h6>{candidate.name}</h6>
                                                <p className="designation">Candidate symbol</p>
                                            </div>
                                        </div>
                                    </div>))
                            ) : ("There are currently no candidates")}
    
                            {/* Candidate */}
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: 0.2, animationName: "fadeInUp"}} onClick={this.vote}>
                                    {/* Candidate Avatar */}
                                    <div className="advisor_thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/></div>
                                    {/* Candidate Details */}
                                    <div className="single_advisor_details_info">
                                        <h6>Simon Jackson</h6>
                                        <p className="designation">Candidate symbol</p>
                                    </div>
                                </div>
                            </div>
    
                            {/* Candidate */}
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: 0.2, animationName: "fadeInUp"}} onClick={this.vote}>
                                    {/* Candidate Avatar */}
                                    <div className="advisor_thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/></div>
                                    {/* Candidate Details */}
                                    <div className="single_advisor_details_info">
                                        <h6>Simon Jackson</h6>
                                        <p className="designation">Candidate symbol</p>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </body>
          </div>
        );
    }
}
=======
import React from "react";
import "../static/candidate_styles.css";

const Candidates = ({ candidates, token }) => {
  console.log(token);
  return (
    // <div>
    //     {candidates.length > 0 ? (
    //         candidates.map((candidate) => (<h1>{candidate.name}</h1>))
    //     ) : ("There are currently no candidates")}
    // </div>
    <div>
      <head>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" type="text/css" href="../" />
      </head>

      <body>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-sm-8 col-lg-6">
              {/* Section Heading */}
              <div
                class="section_heading text-center wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: 0.2,
                  animationName: "fadeInUp",
                }}
              >
                <h3>Candidates</h3>
                <p>
                  Please cast your vote for one of the available candidates.
                </p>
                <div class="line"></div>
              </div>
            </div>
          </div>

          <div class="row">
            {candidates.length > 0
              ? candidates.map((candidate) => (
                  // Candidate
                  <div class="col-12 col-sm-6 col-lg-3">
                    <div
                      class="single_advisor_profile wow fadeInUp"
                      data-wow-delay="0.2s"
                      style={{
                        visibility: "visible",
                        animationDelay: 0.2,
                        animationName: "fadeInUp",
                      }}
                    >
                      {/* Candidate Avatar */}
                      <div class="advisor_thumb">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt=""
                        />
                      </div>
                      {/* Candidate Details */}
                      <div class="single_advisor_details_info">
                        <h6>{candidate.name}</h6>
                        <p class="designation">Candidate symbol</p>
                      </div>
                    </div>
                  </div>
                ))
              : "There are currently no candidates"}

            {/* Candidate */}
            <div class="col-12 col-sm-6 col-lg-3">
              <div
                class="single_advisor_profile wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: 0.2,
                  animationName: "fadeInUp",
                }}
              >
                {/* Candidate Avatar */}
                <div class="advisor_thumb">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt=""
                  />
                </div>
                {/* Candidate Details */}
                <div class="single_advisor_details_info">
                  <h6>Simon Jackson</h6>
                  <p class="designation">Candidate symbol</p>
                </div>
              </div>
            </div>

            {/* Candidate */}
            <div class="col-12 col-sm-6 col-lg-3">
              <div
                class="single_advisor_profile wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: 0.2,
                  animationName: "fadeInUp",
                }}
              >
                {/* Candidate Avatar */}
                <div class="advisor_thumb">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt=""
                  />
                </div>
                {/* Candidate Details */}
                <div class="single_advisor_details_info">
                  <h6>Simon Jackson</h6>
                  <p class="designation">Candidate symbol</p>
                </div>
              </div>
            </div>

            {/* Candidate */}
            <div class="col-12 col-sm-6 col-lg-3">
              <div
                class="single_advisor_profile wow fadeInUp"
                data-wow-delay="0.3s"
                style={{
                  visibility: "visible",
                  animationDelay: 0.3,
                  animationName: "fadeInUp",
                }}
              >
                {/* Candidate Avatar */}
                <div class="advisor_thumb">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt=""
                  />
                </div>
                {/* Candidate Details */}
                <div class="single_advisor_details_info">
                  <h6>Eslam Hossam</h6>
                  <p class="designation">Candidate symbol</p>
                </div>
              </div>
            </div>

            {/* Candidate */}
            <div class="col-12 col-sm-6 col-lg-3">
              <div
                class="single_advisor_profile wow fadeInUp"
                data-wow-delay="0.4s"
                style={{
                  visibility: "visible",
                  animationDelay: 0.3,
                  animationName: "fadeInUp",
                }}
              >
                {/* Candidate Avatar */}
                <div class="advisor_thumb">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    alt=""
                  />
                </div>
                {/* Candidate Details */}
                <div class="single_advisor_details_info">
                  <h6>Riyad Mohamed</h6>
                  <p class="designation">Candidate symbol</p>
                </div>
              </div>
            </div>

            {/* Candidate */}
            <div class="col-12 col-sm-6 col-lg-3">
              <div
                class="single_advisor_profile wow fadeInUp"
                data-wow-delay="0.5s"
                style={{
                  visibility: "visible",
                  animationDelay: 0.3,
                  animationName: "fadeInUp",
                }}
              >
                {/* Candidate Avatar */}
                <div class="advisor_thumb">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                    alt=""
                  />
                </div>
                {/* Candidate Details */}
                <div class="single_advisor_details_info">
                  <h6>Mohamed Esmat</h6>
                  <p class="designation">Candidate symbol</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};
>>>>>>> bd48a622813e62d380feb1964a02d9587a181f70

export default Candidates;
