import React from 'react';
import axios from "axios";
import swal from "sweetalert";

const ForgotPassword = () => {
    
    // When the user enters their email then clicks submits
    const submit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        localStorage.setItem("nationalID", event.target.nationalID.value);

        sendMail(email);
    };
    

    const sendMail = (email) => {
        localStorage.setItem("code", Math.floor(Math.random() * 10000000000 + 1));
        const param = {
        email: email,
        subject: "E-Voting System Password Recovery",
        text: "This is your code",
        html: `<p>Your password recovery code is <strong>${localStorage.getItem(
            "code"
        )}</strong></p>`,
        };

        //Send an Email to the user with the password recovery code
        axios
        .post("http://localhost:5000/api/users/email", param)
        .then((res) => {
            if (res.status === 200) {
            window.location.pathname = "/confirm_new_password";
            }
        })
        .catch(() => {
            swal("Error!", "The email you entered might not be registered!", "error");
            localStorage.removeItem("nationalID");
        });
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
                  <h3>Forgot Password</h3>
                </div>

                {/* Card */}
                <div className="card-body">
                  {/* Email Form */}
                  <form onSubmit={submit}>
                    {/* Email Input Group */}
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i class="fas fa-shield-alt"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="email"
                        class="form-control"
                        placeholder="Please enter your email..."
                        required
                      ></input>
                    </div>

                    {/* National ID Input Group */}
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i class="fas fa-shield-alt"></i>
                        </span>
                      </div>
                      <input
                        type="number"
                        name="nationalID"
                        class="form-control"
                        placeholder="Please enter your national ID..."
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

export default ForgotPassword
