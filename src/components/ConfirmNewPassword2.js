import React, { Component } from "react";
import logo from "../imgs/logo.png";
import swal from "sweetalert";
import axios from "axios";

class ConfirmNewPassword2 extends Component {
  
  componentDidMount = () => {
    alert("Please check your email for a confirmation code.");
  }

  confirm = (event) => {
    event.preventDefault();

    // Getting the new user password
    const newPassword = event.target.newPassword.value;
    const newPasswordConfirmation = event.target.newPasswordConfirmation.value;

    // Checking if the password and its confirmation match
    if(newPassword !== newPasswordConfirmation){
        swal("Error!", "Please make sure you re-enter your password correctly!", "error");
        return;
    }

    //Retrieve the National ID from the ForgotPassword component, and add the password
    const param = {
      nationalID: localStorage.getItem("nationalID"),
      password: newPassword,
    };

    // Check the confirmation code then change the user's password if the code is correct
    if (event.target.confirmationCode.value === localStorage.getItem("code")) {
      axios
        .put("http://localhost:5000/api/users/forgotpassword", param)
        .then((res) => {
          if (res.status === 200) {
            swal("Success!", "Password Changed Successfully", "success");
            localStorage.removeItem("code");
            window.location.pathname = "/login";
          }
        })
        .catch((error) => swal("Error!", error.message, "error"));
    } else {
      swal("Error!", "Invalid Code", "error");
    }
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
          <form style = {{marginTop:"200px"}}class="form-signin">
            <img class="mb-4" src={logo} alt="" width="72" height="72" />
            <h1 class="h3 mb-3 font-weight-normal">Confirmation</h1>
            <label for="inputEmail" class="sr-only">
              Email address
            </label>
            <input
              name="newPassword"
              id="newPassword"
              class="form-control"
              placeholder="New Password"
              required
              autofocus
            />
            <input
              type="password"
              name="newPasswordConfirmation"
              id="newPasswordConfirmation"
              class="form-control"
              placeholder="Reenter New Password"
              required
            />
            <input
              type="password"
              name="confirmationCode"
              id="confirmationCode"
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
