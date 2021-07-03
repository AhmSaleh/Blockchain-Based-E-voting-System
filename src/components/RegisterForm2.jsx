import React, { Component } from "react";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import LoadingOverlay from 'react-loading-overlay';
const axios = require("axios");

class Register extends Component {
  
  state = {
    isLoadingOverlayActive: false,
  };

  register = (event) => {
    event.preventDefault();
    this.setState({isLoadingOverlayActive: true});

    // Creating a new user
    localStorage.setItem("nationalID", event.target.nationalID.value);
    localStorage.setItem("password", event.target.password.value);

    // Calling our API to get the user
    axios
      .get(
        `http://localhost:5000/api/users/${event.target.nationalID.value}`,
        ""
      )
      .then((res) => {
        if (res.status === 200) {
          this.sendMail(res.data);
        }
      })
      .catch((err) => {swal("Error!", err.message, "error"); this.setState({isLoadingOverlayActive: false});});
  };

  sendMail = (email) => {
    localStorage.setItem("code", Math.floor(Math.random() * 10000000000 + 1));
    const param = {
      email: email,
      subject: "E-Voting System Confirmation",
      text: "This is your code",
      html: `<p>Your confirmation code is <strong>${localStorage.getItem(
        "code"
      )}</strong></p>`,
    };

    //Send an Email to the user with the confirmation code
    axios
      .post("http://localhost:5000/api/users/email", param)
      .then((res) => {
        if (res.status === 200) {
          window.location.pathname = "/confirm";
          this.setState({isLoadingOverlayActive: false});
        }
      })
      .catch(() => {swal("Error!", "An error has occured", "error"); this.setState({isLoadingOverlayActive: false});});

    this.setState({isLoadingOverlayActive: false});
  };
  
  render() {
    return (
      
      <React.Fragment>
        <head>
        <link rel="stylesheet" href="../styles.css" />
        </head>
        
        <body
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="text-center"
        >
          <LoadingOverlay
        active={this.state.isLoadingOverlayActive}
        spinner
        text='Adding user...'
          >
          <form style = {{marginTop:"200px"}}class="form-signin" onSubmit={this.register}>
            <img class="mb-4" src={logo} alt="" width="72" height="72" />
            <h1 class="h3 mb-3 font-weight-normal">Register</h1>
            <label for="nationalID" class="sr-only">
              National ID
            </label>
            <input
              name="nationalID"
              id="nationalID"
              class="form-control"
              placeholder="National ID"
              required
              autofocus
            />
            <label for="password" class="sr-only">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              placeholder="Password"
              required
            />
            <div class="mb-3 mt-3">
              <Link style = {{color:"#212529", textDecoration: "none"}}to="/login"> Already have an account?</Link>
            </div>
            <button class="btn btn-lg btn-secondary btn-block" type="submit">
              Sign Up
            </button>
            <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
          </form>
        </LoadingOverlay>
        </body>
      </React.Fragment>
    );
  }
}

export default Register;
