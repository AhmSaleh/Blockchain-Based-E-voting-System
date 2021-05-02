import React, { Component } from "react";
import web3 from "../web3";
import ballot from "../ballot";
import swal from "sweetalert";
import "../static/candidate_styles.css";
import axios from "axios";

class Candidates extends Component {
  state = {
    index: -1,
  };

  componentDidMount() {
    console.log(this.props.token);
    //alert(this.props.candidates);
  }

  vote = (event) => {
    swal({
      title: "Are you sure?",
      text: "Once your vote has been cast, it cannot be changed!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willVote) => {
      if (willVote) {
        this.voteYesCallback(event);
      } else {
        swal("You did not cast a vote.");
      }
    });
  };

  voteYesCallback = async (event) => {
    event.preventDefault();

    //console.log(this.state.index);
    const accounts = await web3.eth.getAccounts();

    // TODO: Replace .vote(0) with .vote(index) which gets passed from the onClick with candidate.index that is
    // initially loaded from the database at start
    await ballot.methods
      .vote(0)
      .send({
        from: accounts[0],
        gas: "100000",
      })
      .then((hasVoted) => {
        if (hasVoted) {
          swal("Your vote was successfully cast!", {
            icon: "success",
          });
        } else {
          swal("Error", "There was an error when casting your vote!", {
            icon: "error",
          });
        }
      });

    axios
      .put("http://localhost:5000/api/users/voted", "", {
        headers: {
          "x-auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDdiMDI5NjA5MDc5OTczYTA1OGNkZDAiLCJpc0FkbWluIjp0cnVlLCJoYXNWb3RlZCI6ZmFsc2UsImlhdCI6MTYxOTY5OTU1OX0.cKcjFm-rkAwpCB_eXjoM85o_yChY-Ew4fnaaM2MpsGs",
        },
      })
      .then((res) => {
        if (res.status === 200)
          swal("Success!", "Your vote has been cast successfully", "success");
        else if (res.status === 404) swal("Error!", "User not found", "error");
      })
      .catch((err) =>
        swal("Error!", "Failed to vote, please try again later", "error")
      );
  };

  render() {
    return (
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
                  <h3>Candidates</h3>
                  <p>
                    Please cast your vote for one of the available candidates.
                  </p>
                  <div className="line"></div>
                </div>
              </div>
            </div>

            <div className="row">
              {this.props.candidates.length > 0
                ? this.props.candidates.map((candidate) => (
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
                        onClick={this.vote}
                      >
                        {/* Candidate Avatar */}
                        <div className="advisor_thumb">
                          <img
                            //src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            src={candidate.photo}
                          />
                        </div>
                        {/* Candidate Details */}
                        <div className="single_advisor_details_info">
                          <h6>{candidate.name}</h6>
                          <p className="designation">{candidate.symbol}</p>
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
    );
  }
}

export default Candidates;
