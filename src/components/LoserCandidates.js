import React, { Component } from "react";

class LoserCandidates extends Component {
  state = {
    candidates: this.props.candidates
  };
  render() {
    return (
      <React.Fragment>
        <section class="py-5 bg-light">
          <div class="container px-4 px-lg-5 mt-5">
            <h2 class="fw-bolder mb-4 mb-4">Other candidates</h2>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center mt-3">
              {this.state.candidates.map((candidate) => (
                <div class="col mb-5">
                  <div class="card1 h-100">
                    {/* <!-- Candidate image--> */}
                    <img
                      style={{
                        objectFit: "cover",
                        width: "275px",
                        height: "369px",
                      }}
                      class="card-img-top"
                      src={candidate.img}
                      alt="..."
                    />
                    <div class="card-body p-4">
                      <div class="text-center">
                        {/* <!-- Candidate name--> */}
                        <h5 class="fw-bolder">{candidate.candidateName}</h5>
                        {/* <!-- Votes count--> */}
                        <span  class="text-muted">{candidate.votesCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default LoserCandidates;
