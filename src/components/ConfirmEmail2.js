import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import LoadingOverlay from 'react-loading-overlay';
import logo from "../imgs/logo.png";

export class ConfirmEmail extends Component {
  componentDidMount() {
    swal("Please check your email");
  }

  state = {
    isLoadingOverlayActive: false,
  };

  // When the user enters the confirmation code then clicks confirm
  confirm = (event) => {
    event.preventDefault();
    this.setState({isLoadingOverlayActive: true});

    //Retrieve the National ID and Password from the Registeration component
    const param = {
      nationalID: localStorage.getItem("nationalID"),
      password: localStorage.getItem("password"),
    };

    // Check the confirmation code then register the user if it's the correct code
    if (event.target.confirmationCode.value === localStorage.getItem("code")) {
      axios
        .put("http://localhost:5000/api/users", param)
        .then((res) => {
          if (res.status === 200) {
            swal("Success!", "User Registered Successfully", "success");
            window.location.pathname = "/login";
            this.setState({isLoadingOverlayActive: false});
          }
        })
        .catch(() => {swal("Error!", "Registration failed!", "error"); this.setState({isLoadingOverlayActive: false});});
    } else {
      swal("Error!", "Invalid Code", "error");
      this.setState({isLoadingOverlayActive: false});
    }

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
                text='Confirming...'
            >
          <form style = {{marginTop:"200px"}}class="form-signin" onSubmit={this.confirm}>
            <img class="mb-4" src={logo} alt="" width="72" height="72" />
            <h1 class="h3 mb-3 font-weight-normal">Confirmation</h1>
            <label for="confirmationCode" class="sr-only">
              Confirmation Code:
            </label>
            <input
              name="confirmationCode"
              id="confirmationCode"
              class="form-control"
              placeholder="Please enter your confirmation code"
              required
              autofocus
            />
            <h6 style={{fontSize: "12px"}}>
                *A confirmation code should have been sent to your email address.*</h6>
            <br/>
            <button class="btn btn-lg btn-secondary btn-block" type="submit">
              Submit
            </button>
            <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
          </form>
        </LoadingOverlay>
        </body>
      </React.Fragment>
    );
  }
}

export default ConfirmEmail;
