import React, { Component } from "react";
import swal from "sweetalert";
import atob from "atob";
import Layout from "./Layout";
import web3 from "../web3";
import ballot from "../ballot";
import axios from "axios";


class Admin extends Component {
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
    if (!decoded.isAdmin) {
      swal("Error!", "Unauthorized!", "error");
      window.location.pathname = "/login";
    }
  };
  componentDidMount = () => {
    // this.checkIfAuthenticated();
  };

  // Navigating to the NewCandidate.js component
  addCandidate = () => {
    window.location.pathname = "/new_candidate";
  };

  // Navigating to the RemoveCandidate.js component
  removeCandidate = () => {
    window.location.pathname = "/remove_candidate";
  };

  addUser = () => {
    window.location.pathname = "/add_user";
  };

  /* TODO: This function should start a new election 
    by accessing the Blockchain and adding a new election to it*/
  startElection = () => {
    swal("Not implemented yet!!! xD", {
      icon: "error",
    });
  };

  /* TODO: This function should end an on-going election 
    by accessing the Blockchain and removing the running election*/

  endElection = () => {
    swal({
      title: "Are you sure?",
      text: "Once you end the election, your action cannot undone!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willEnd) => {
      if (willEnd) {
        this.endElectionYesCallback();
      } else {
        swal("You did not end the election.");
      }
    });
  }

  endElectionYesCallback = async () => {
    
    const candidates = [];

    const accounts = await web3.eth.getAccounts();

    // End Election in Blockchain
    await ballot.methods.endElection().send({
      from: accounts[0],
      gas: 1000000,
    });

    // Retrive Winner, total votes, and winner votes from Blockchain
    const winnerIndex = await ballot.methods.winnerIndex().call();
    const totalVotes = await ballot.methods.totalVotes().call();
    const winnerVotes = await ballot.methods.winnerVotes().call();

    // Retrieve all other candidates from Database where ID/Index != ID/Index of Winner, then add their votes
    axios
      .get("http://localhost:5000/api/candidates")
      .then((res) => {
          candidates = res.data;
      })
      .catch((err) => alert(err.message));

    const candidateWinner = candidates.find(c => c.index === winnerIndex);
    candidates = candidates.filter(c => c.index !== winnerIndex);

    // Save election
    const param = {
      candidateWinner: candidateWinner,
      candidateWinnerVotes: winnerVotes,
      totalVotes: totalVotes,
      candidates: candidates,
    };

    axios.post("http://localhost:5000/api/elections", param, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
            if(res.status === 200){
              swal("Success!", "Election ended successfully!", "success");
            }
        })
        .catch((err) => swal("Error!", err.message, "error"));

    // Delete all candidates
    axios.delete("http://localhost:5000/api/candidates", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
            if(res.status === 200){
              console.log("Candidates deleted successfully");
            }
        })
        .catch((err) => swal("Error!", err.message, "error"));

  };

  // Logout functionality
  logout = () => {
    swal({
      title: "Logging Out",
      text: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        // Removing all cached login values
        localStorage.removeItem("nationalID");
        localStorage.removeItem("password");
        localStorage.removeItem("token");

        // Redirecting to login page
        window.location.pathname = "/login";
      } else {
        swal("You did not logout.");
      }
    });
  }

  render() {
    return (
      <Layout>
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
              href="../static/button_styles.css"
              rel="stylesheet"
            />
          </head>

          <body>
            <div className="container" style={{width: "20%", margin: "auto", padding: "50px"}} >
              <div className="col justify-content-center">
              {/* Adding Candidate Button */}
              <div className="col-12 col-sm-6 col-lg-1">
                <button
                  className="btn btn-primary btn-lg btn3d"
                  onClick={this.addCandidate}
                >
                  Add Candidate
                </button>
              </div>

              <br/>

              {/* Removing Candidate Button */}
              <div className="col-12 col-sm-6 col-lg-1">
                <button
                  className="btn btn-danger btn-lg btn3d"
                  onClick={this.removeCandidate}
                >
                  Remove Candidate
                </button>
              </div>
            </div>

            <br />

            <div className="col justify-content-center">
              {/* Adding User Button */}
              <div className="col-12 col-sm-6 col-lg-1">
                <button
                  className="btn btn-primary btn-lg btn3d"
                  onClick={this.addUser}
                >
                  Add User
                </button>
              </div>

              <br/>
              
              {/* Ending Election Button */}
              <div className="col-12 col-sm-6 col-lg-1">
                <button
                  className="btn btn-danger btn-lg btn3d"
                  onClick={this.endElection}
                >
                  End Election
                </button>
              </div>

              {/* Logout Button */}
              <div className="col-12 col-sm-6 col-lg-1">
                <button
                  className="btn btn-danger btn-lg btn3d"
                  onClick={this.logout}
                >
                  Logout
                </button>
              </div>
            </div>
            </div>
          </body>
        </div>
      </Layout>
    );
  }
}

export default Admin;
