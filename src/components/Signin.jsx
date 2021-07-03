import React, { Component } from "react";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const atob = require("atob");

const axios = require("axios");

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

class Signin extends Component {
  state = {};

  // Handling login
  login = (event) => {
    event.preventDefault();

    const param = {
      nationalID: event.target.nationalID.value,
      password: event.target.password.value,
    };

    axios
      .post("http://localhost:5000/api/auth", param)
      .then((res) => {
        if (res.status === 200) {
          const token = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("nationalID", param.nationalID);
          const tokenInfo = parseJwt(token);
          swal("Success!", "You've been logged in successfully!", "success");
          if (tokenInfo.isAdmin) window.location.pathname = "/admin";
          else window.location.pathname = "/elections";
        }
      })
      .catch(() => {
        swal("Error!", "Failed to log in!", "error");
      });
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
          <form style = {{marginTop:"200px"}}class="form-signin" onSubmit={this.login}>
            <img class="mb-4" src={logo} alt="" width="72" height="72" />
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
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
            <div class="mb-1 mt-3">
              <Link style = {{color:"#212529", textDecoration: "none"}}to="/register"> Don't have an account yet? </Link>
            </div>
            <div class="mb-3 mt-3">
              <Link style = {{color:"#212529", textDecoration: "none"}}to="/forgot_password"> Forgot your password? </Link>
            </div>
            <button class="btn btn-lg btn-secondary btn-block" type="submit">
              Sign in
            </button>
            <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
          </form>
        </body>
      </React.Fragment>
    );
  }
}

export default Signin;
