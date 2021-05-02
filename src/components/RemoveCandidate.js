import React, { Component } from "react";
import swal from "sweetalert";

const axios = require("axios");

class RemoveCandidate extends Component {
  remove = (event) => {
    swal({
      title: "Are you sure?",
      text: "Once the candidate is removed, your action cannot be undone!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willRemove) => {
      if (willRemove) {
        this.removeYesCallback(event);
      } else {
        swal("Candidate not removed.");
      }
    });
  };

  removeYesCallback = (event) => {
    event.preventDefault();

    // TODO: check if this syntax is correct (i.e. the correct index is being accessed)
    var candidateID = this.props.candidates[this.state.index]._id;

    // TODO: check if this request syntax is correct
    axios
      .delete(`http://localhost:5000/api/candidates/${candidateID}`)
      .then((res) => {
        if (res.status === 200) {
          swal("Success!", "Candidate removed successfully!", "success");
          window.location.pathname = "/removecandidate";
        }
      })
      .catch(() => swal("Error!", "Failed to remove candidate!", "error"));
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
                  <p>Choose A Candidate To Remove:</p>
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
                        onClick={this.remove}
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
                : "There are currently no candidates"}

              {/* TODO PLACEHOLDER TO BE REMOVED */}
              <div className="col-12 col-sm-6 col-lg-3">
                <div
                  className="single_advisor_profile wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{
                    visibility: "visible",
                    animationDelay: 0.2,
                    animationName: "fadeInUp",
                  }}
                  onClick={this.remove}
                >
                  {/* Candidate Avatar */}
                  <div className="advisor_thumb">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                    />
                  </div>
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

export default RemoveCandidate;
