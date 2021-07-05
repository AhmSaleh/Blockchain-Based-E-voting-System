import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import atob from "atob";
import "../static/styles.css";
import "semantic-ui-css/semantic.min.css";
import Layout from "./Layout";
import LoadingOverlay from 'react-loading-overlay';
import logo from "../imgs/logo.png";

const axios = require("axios");

class AddUser2 extends Component {
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

  addUser = (event) => {
    event.preventDefault();
    this.setState({isLoadingOverlayActive: true});

    // Creating a new user
    const param = {
      nationalID: event.target.nationalID.value,
      email: event.target.email.value,
      isRegistered: false,
      isAdmin: document.getElementById("isAdmin").checked,
    };

    axios
      .post("http://localhost:5000/api/users", param, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          swal("Success!", "User added successfully!", "success");
          window.location.pathname = "/admin";
          this.setState({isLoadingOverlayActive: false});
        }
      })
      .catch(() => {swal("Error!", "Adding user failed!", "error"); this.setState({isLoadingOverlayActive: false});});

      this.setState({isLoadingOverlayActive: false});
  };

  render() {
    return (
        <Layout>
     <React.Fragment>
        <head>
        <link rel="stylesheet" href="../styles.css" />
        </head>

        <body
          style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -43%)",
            }}
          className="text-center"
        >
        <LoadingOverlay
            active={this.state.isLoadingOverlayActive}
            spinner
            text='Adding user...'
        >
          <form style = {{marginTop:"200px"}} class="form-signin" onSubmit={this.addUser}>
            <img class="mb-4" src={logo} alt="" width="72" height="72" />
            <h1 class="h3 mb-3 font-weight-normal">Add User</h1>
            <label for="nationalID" class="sr-only">
              National ID:
            </label>
            <input
              name="nationalID"
              id="nationalID"
              class="form-control"
              placeholder="National ID"
              required
              autofocus
            />
            <label for="email" class="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              placeholder="Email"
              required
            />
            <br/>
            <div className="form-group">
                <h5 style={{width: "100%"}}>Is Admin?
                <input
                    id="isAdmin"
                    name="isAdmin"
                    type="checkbox"
                    class="form-control"
                    required
                ></input>
                </h5>
            </div>
            <br/>
            <button class="btn btn-lg btn-secondary btn-block" type="submit">
              Add
            </button>
            <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
          </form>
        </LoadingOverlay>
        </body>
      </React.Fragment>
      </Layout>
    );
  }
}

export default AddUser2;
