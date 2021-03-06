import React, { Component } from "react";
import web3 from "../web3";
import ballot from "../ballot";
import swal from "sweetalert";
import "../static/candidate_styles.css";
import axios from "axios";
import atob from "atob";
import jwt from "jsonwebtoken";
import "../static/styles.css";
import "semantic-ui-css/semantic.min.css";
import Layout from "./Layout";
import Navbar from "./Navbar2.0";
import LoadingOverlay from 'react-loading-overlay';

class Candidates extends Component {

  checkIfAuthenticated = () => {
        const token = localStorage.getItem("token");
        let decoded;
        if (!token) {
            swal("Error!", "Unauthenticated!", "error");
            window.location.pathname = "/login";
        }
        try {
            decoded = JSON.parse(atob(token.split(".")[1]));
        } catch (err) {
            console.log(err.message);
            swal("Error!", "An error has occured!", "error");
            window.location.pathname = "/login";
        }
        if (decoded.isAdmin) {
            swal("Error!", "Unauthorized!", "error");
            window.location.pathname = "/admin";
        }
  };
  
  componentDidMount() {
    this.checkIfAuthenticated();
  }

  state = {
    index: -1,
    isLoadingOverlayActive: false,
  };

  vote = (index, event) => {
    swal({
      title: "Are you sure?",
      text: "Once your vote has been cast, it cannot be changed!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willVote) => {
      if (willVote) {
        this.voteYesCallback(index, event);
        //swal("Candidate Index: " + index);
      } else {
        swal("You did not cast a vote.");
      }
    });
  };

  voteYesCallback = async (index, event) => {
    //event.preventDefault();
    this.setState({isLoadingOverlayActive: true});

    const accounts = await web3.eth.getAccounts();

    try{
      await ballot.methods.vote(index).send({
        from: accounts[0],
        gas: 1000000,
      });
    }catch{
      swal("Error", "There was an error when casting your vote! Make sure you haven't already cast your vote.", {
          icon: "error",
        });
      this.setState({isLoadingOverlayActive: false});
      return;
    }

    // .then((hasVoted) => {
    //   if (hasVoted) {
    //     swal("Your vote was successfully cast!", {
    //       icon: "success",
    //     });
    //   } else {
    //     swal("Error", "There was an error when casting your vote!", {
    //       icon: "error",
    //     });
    //     this.setState({isLoadingOverlayActive: false});
    //     return;
    //   }
    // });

    await axios
      .put("http://localhost:5000/api/users/voted", "", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200)
          swal("Success!", "Your vote has been cast successfully", "success");
        else if (res.status === 404) swal("Error!", "User not found", "error");
      })
      .catch(() =>
        swal("Error!", "Failed to vote, please try again later", "error")
      );

      this.setState({isLoadingOverlayActive: false});
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.isLoadingOverlayActive}
        spinner
        text='Casting your vote...'
      >
        <Navbar />
        <div>
          <head>
            <link
              href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
              rel="stylesheet"
              id="bootstrap-css"
            />
            <link
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="../static/candidate_styles.css"
            />
          </head>

          <body>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-lg-6">
                  {/* Section Heading */}
                  <div
                    className="section_heading text-center wow fadeInUp"
                    data-wow-delay="0.2s"
                    style={{
                      visibility: "visible",
                      animationDelay: 0.2,
                      animationName: "fadeInUp",
                    }}
                  >
                    <h3 style={{fontSize: "40px", fontWeight:420, marginTop: "20px"}}>Candidates</h3>
                    <p style={{fontSize: "25px"}} >
                      Please cast your vote for one of the available candidates.
                    </p>
                    <div className="line"></div>
                  </div>
                </div>
              </div>

              <div className="row">
                {this.props.candidates.length > 0
                  ? this.props.candidates.map((candidate, index) => (
                      // Candidate
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div
                          className="single_advisor_profile wow fadeInUp"
                          data-wow-delay="0.2s"
                          style={{
                            visibility: "visible",
                            animationDelay: 0.2,
                            animationName: "fadeInUp",
                          }}
                          onClick={() => this.vote(index)}
                          key={index}
                          data-index={index}
                        >
                          {/* Candidate Avatar */}
                          <div className="advisor_thumb">
                            <img
                                style={{width:"200px", height:"400px", objectFit:"cover"}}
                                // src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jo_Jorgensen_portrait_3.jpg/220px-Jo_Jorgensen_portrait_3.jpg"
                              src={candidate.photo}
                            />
                          </div>
                          {/* Candidate Details */}
                          <div className="single_advisor_details_info">
                            <h6 style={{color:"white"}}>{candidate.name}</h6>
                            <p style={{color:"white"}} className="designation">{candidate.symbol}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  : "There are currently no candidates"}

                {/* Candidate */}
                {/* <div className="col-12 col-sm-6 col-lg-3">
                                  <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: 0.2, animationName: "fadeInUp"}} onClick={this.vote}> */}
                {/* Candidate Avatar */}
                {/* <div className="advisor_thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/></div> */}
                {/* Candidate Details */}
                {/* <div className="single_advisor_details_info">
                                          <h6>Simon Jackson</h6>
                                          <p className="designation">Candidate symbol</p>
                                      </div>
                                  </div>
                              </div> */}

                {/* Candidate */}
                {/* <div className="col-12 col-sm-6 col-lg-3">
                                  <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: 0.2, animationName: "fadeInUp"}} onClick={this.vote}> */}
                {/* Candidate Avatar */}
                {/* <div className="advisor_thumb"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/></div> */}
                {/* Candidate Details */}
                {/* <div className="single_advisor_details_info">
                                          <h6>Simon Jackson</h6>
                                          <p className="designation">Candidate symbol</p>
                                      </div>
                                  </div>
                              </div> */}
              </div>
            </div>
          </body>
        </div>
    </LoadingOverlay>
    );
  }
}

export default Candidates;
