import React, { Component } from "react";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";

class ConfirmNewPassword2 extends Component {
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
            <h1 class="h3 mb-3 font-weight-normal">Confirmation</h1>
            <label for="inputEmail" class="sr-only">
              Email address
            </label>
            <input
              class="form-control"
              placeholder="New Password"
              required
              autofocus
            />
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Reenter New Password"
              required
            />
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Confirmation Code"
              required
            />
            <button class="btn btn-xl btn-secondary btn-block mt-3" type="submit">
              Confirm
            </button>
            <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
          </form>
        </body>
      </React.Fragment>
    );
  }
}

export default ConfirmNewPassword2;
