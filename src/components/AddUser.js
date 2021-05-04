import React, { Component } from 'react'
import { Link } from "react-router-dom";
import swal from "sweetalert";

const axios = require("axios");

class AddUser extends Component {
    
    addUser = (event) => {
        event.preventDefault();

        // Creating a new user
        const param = {
        nationalID: event.target.nationalID.value,
        email: event.target.email.value,
        password: event.target.password.value,
        isRegistered: true,
        isAdmin: event.target.isAdmin.value,
        };

        /* TODO: Check if request syntax is correct,
        and check how to pass token (it's stored in this.props.token) */
        // Calling our API to add the user
        axios
        .post("http://localhost:5000/api/users", param)
        .then((res) => {
            if (res.status === 200) {
            swal("Success!", "User added successfully!", "success");
            window.location.pathname = "/admin";
            }
        })
        .catch(() => swal("Error!", "Adding user failed!", "error"));
    }
    
    render() {
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
                <h3>Add User</h3>
              </div>

              {/* Card */}
              <div className="card-body">
                {/* Add User Form */}
                <form onSubmit={this.addUser}>
                  {/* National ID Input Group */}
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="nationalID"
                      class="form-control"
                      placeholder="National ID"
                      required
                    ></input>
                  </div>

                {/* Email Input Group */}
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      placeholder="Email"
                      required
                    ></input>
                  </div>

                  {/* Password Input Group */}
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      placeholder="Password"
                      required
                    ></input>
                  </div>

                  {/* isAdmin Input Group */}
                  <div>
                    <div className="input-group-prepend">
                      <span className="input-group-text" style={{width: "10%"}}>
                        <i className="fas fa-user-cog"></i>
                      </span>
                    </div>
                    <div className="row align-items-center remember">
                      <input name="isAdmin" type="checkbox" value="true"></input>
                      <label htmlFor="isAdmin">Is Admin?</label>
                    </div>
                  </div>

                  {/* Add User Button */}
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Add"
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
  );
    }
}

export default AddUser