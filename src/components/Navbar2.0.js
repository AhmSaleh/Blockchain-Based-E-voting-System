import React, { Component } from "react";
import logo from "../imgs/logo.png"
import logoutIcon from '../imgs/logout.png'
import swal from "sweetalert";

class Navbar extends Component {
  state = {};
    // Logout functionality
    logout = async () => {
      swal({
      title: "Logging Out",
      text: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      }).then((willLogout) => {
      if (willLogout) {
          // Removing all cached login values
          localStorage.removeItem("nationalID");
          localStorage.removeItem("password");
          localStorage.removeItem("token");

          // Redirecting to login page
          window.location.pathname = "/login";
      } else {
          swal("You did not logout.");
      }
      });
  }

  goToElections = () => {
    window.location.pathname = "/elections";
  }

  render() {
    return (
      <React.Fragment>
        <nav
          style={{ backgroundColor: "#f7f7f7" }}
          className="navbar navbar-expand-lg navbar-light"
        >
          <div class="container px-4 px-lg-5">
            <a class="navbar-brand" href="#!">
              DEVS
            </a>
            <img src={logo} height="35px" width="35px" />
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li class="nav-item">
                  <a class="nav-link active ml-5" aria-current="page" style={{cursor: "pointer"}} onClick={this.goToElections}>
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active ml-2" aria-current="page" style={{cursor: "pointer"}} onClick={this.goToElections}>
                    Elections
                  </a>
                </li>
              </ul>
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <label href="#" class="nav-link ">
                  <img src={logoutIcon} height="25px" width="25px" onClick={this.logout}/></label>
                </li>
                <li class="nav-item">
                  <a class="nav-link active mt-1" aria-current="page" style={{cursor: "pointer"}} onClick={this.logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;

// /home/saleh/Desktop/Demo_ch1/my-first-app/src/components/Navbar.jsx
