import React, { Component } from "react";
import swal from "sweetalert";
import web3 from "../web3";
import ballot from "../ballot";
import atob from "atob";
import Layout from "./Layout";
import "../static/styles.css";
import "semantic-ui-css/semantic.min.css";
import LoadingOverlay from 'react-loading-overlay';

const axios = require("axios");

class RemoveCandidate extends Component {
  checkIfAuthenticated() {
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
    if (!decoded.isAdmin) {
      swal("Error!", "Unauthorized!", "error");
      window.location.pathname = "/login";
    }
  }
  
  componentDidMount() {
    this.checkIfAuthenticated();
  }

  state = {
    isLoadingOverlayActive: false,
  };

  remove = (index, event) => {
    // event.preventDefault();

    swal({
      title: "Are you sure?",
      text: "Once the candidate is removed, your action cannot be undone!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willRemove) => {
      if (willRemove) {
        this.removeYesCallback(index, event);
      } else {
        swal("Candidate not removed.");
      }
    });
  };

  removeYesCallback = async (index, event) => {
    this.setState({isLoadingOverlayActive: true});

    var candidateID = this.props.candidates[index]._id;

    axios
      .delete(`http://localhost:5000/api/candidates/${candidateID}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then(async (res) => {
        if (res.status === 200) {
          try {
            const accounts = await web3.eth.getAccounts();

            await ballot.methods.removeCandidate(index).send({
              from: accounts[0],
              gas: 1000000,
            });
            this.setState({isLoadingOverlayActive: false});
          } catch (err) {
            console.log(err);
            this.setState({isLoadingOverlayActive: false});
          }

          swal("Success!", "Candidate removed successfully!", "success");
          this.setState({isLoadingOverlayActive: false});
          window.location.pathname = "/remove_candidate";
        } else if (res.status === 400) {
          alert(res.data);
          this.setState({isLoadingOverlayActive: false});
        };
      })
      .catch((err) => {swal("Error!", err.message, "error"); this.setState({isLoadingOverlayActive: false});});

      this.setState({isLoadingOverlayActive: false});
  };

  render() {
    return (
      <Layout>
        <LoadingOverlay
          active={this.state.isLoadingOverlayActive}
          spinner
          text='Removing candidate...'
        >
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
                  <p>Choose A Candidate To Remove:</p>
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
                        onClick={() => this.remove(index)}
                        key={index}
                        data-index={index}
                      >
                        {/* Candidate Avatar */}
                        <div className="advisor_thumb">
                          <img src={candidate.photo} alt="" />
                        </div>
                        {/* Candidate Details */}
                        <div className="single_advisor_details_info">
                          <h6>{candidate.name}</h6>
                          <p className="designation">{candidate.symbol}</p>
                        </div>
                      </div>
                    </div>
                  ))
                : 
                (<h2 style={{margin: "auto", width: "40%"}}>
                    There are currently no candidates
                  </h2>)}
            </div>
          </div>
        </body>
      </div>
      </LoadingOverlay>
      </Layout>
    );
  }
}

export default RemoveCandidate;
