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

export default Candidates;
