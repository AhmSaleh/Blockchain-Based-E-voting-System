import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import LoadingOverlay from 'react-loading-overlay';

export class ConfirmEmail extends Component {
  componentDidMount() {
    alert("Please check your email");
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
      <LoadingOverlay
        active={this.state.isLoadingOverlayActive}
        spinner
        text='Adding user...'
      >
      <div>
        <head>
          <link
            href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
            rel="stylesheet"
            id="bootstrap-css"
          />
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
          <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
            crossorigin="anonymous"
          />
          <link rel="stylesheet" type="text/css" href="../static/styles.css" />
        </head>

        <body>
          <div className="container" style={{ margin: "auto", width: "auto" }}>
            {/* Card Container */}
            <div className="d-flex justify-content-center h-100">
              <div className="card">
                {/* Card Header */}
                <div class="card-header">
                  <h3>Confirmation</h3>
                </div>

                {/* Card */}
                <div className="card-body">
                  {/* Confirmation Form */}
                  <form onSubmit={this.confirm}>
                    {/* Confirmation Code Input Group */}
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i class="fas fa-shield-alt"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="confirmationCode"
                        class="form-control"
                        placeholder="Please enter your confirmation code..."
                        required
                      ></input>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Submit"
                        class="btn float-right login_btn"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
      </LoadingOverlay>
    );
  }
}

export default ConfirmEmail;
