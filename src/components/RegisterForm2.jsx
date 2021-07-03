import React, { Component } from "react";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {};
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
          <form style = {{marginTop:"200px"}}class="form-signin">
            <img class="mb-4" src={logo} alt="" width="72" height="72" />
            <h1 class="h3 mb-3 font-weight-normal">Register</h1>
            <label for="inputEmail" class="sr-only">
              Email address
            </label>
            <input
              class="form-control"
              placeholder="National ID"
              required
              autofocus
            />
            <label for="inputPassword" class="sr-only">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              required
            />
            <div class="mb-3 mt-3">
              <Link style = {{color:"#212529", textDecoration: "none"}}to="/login2"> Already have an account?</Link>
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

export default Register;
