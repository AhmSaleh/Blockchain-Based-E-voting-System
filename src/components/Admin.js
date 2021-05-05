import React, { Component } from "react";
import swal from "sweetalert";
import atob from "atob";

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
    this.checkIfAuthenticated();
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
    swal("Not implemented yet!!! xD", {
      icon: "error",
    });
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
          </div>
          </div>
        </body>
      </div>
    );
  }
}

export default Admin;
