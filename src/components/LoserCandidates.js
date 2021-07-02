import React, { Component } from "react";

class LoserCandidates extends Component {
  state = {
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
                  <div class="card h-100">
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
