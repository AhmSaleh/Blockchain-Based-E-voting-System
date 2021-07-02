import React from 'react';
import swal from "sweetalert";
import axios from "axios";

const ConfirmNewPassword = () => {
    const componentDidMount = () => {
    alert("Please check your email for a confirmation code.");
  }

  // When the user enters the confirmation code then clicks confirm
  const confirm = (event) => {
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

    return (
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
                    <h3>New Password Confirmation</h3>
                    </div>

                    {/* Card */}
                    <div className="card-body">
                    {/* Confirmation Form */}
                    <form onSubmit={confirm}>
                        {/* New Password Input Group */}
                        <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i class="fas fa-shield-alt"></i>
                            </span>
                        </div>
                        <input
                            type="password"
                            name="newPassword"
                            class="form-control"
                            placeholder="Please enter your new password..."
                            required
                        ></input>
                        </div>


                        {/* New Password Confirmation Input Group */}
                        <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i class="fas fa-shield-alt"></i>
                            </span>
                        </div>
                        <input
                            type="password"
                            name="newPasswordConfirmation"
                            class="form-control"
                            placeholder="Please re-enter your new password..."
                            required
                        ></input>
                        </div>
                        
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
    )
}

export default ConfirmNewPassword
