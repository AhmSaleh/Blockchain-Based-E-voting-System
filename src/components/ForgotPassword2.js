import React, { Component } from "react";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";


const ForgotPassword2 = () => {

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
          <form onSubmit={submit} style = {{marginTop:"200px"}}class="form-signin">
            <img class="mb-4" src={logo} alt="" width="72" height="72" />
            <h1 class="h3 mb-3 font-weight-normal">Reset Password</h1>
            <input
              type="email"
              name="email"
              class="form-control"
              placeholder="Email"
              required
              autofocus
            />
            <input
              name="nationalID"
              type="number"
              class="form-control"
              placeholder="National ID"
              required
            />
            <input
                type="submit"
                value="Confirm"
                class="btn btn-lg btn-secondary btn-block mt-3"
            />
            <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
          </form>
        </body>
      </React.Fragment>
    );
}

export default ForgotPassword2;
