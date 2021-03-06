import React, { Component } from "react";
import logo from "../imgs/logo.png"
import logoutIcon from '../imgs/logout.png'
import swal from "sweetalert";

class Navbar extends Component {
    state = {
      isAdmin: false
    };

    componentDidMount = () => {
      this.checkIfAdmin();
    }

    checkIfAdmin = () => {
        const token = localStorage.getItem("token");
        let decoded;
        if (!token)
          return;
        try {
            decoded = JSON.parse(atob(token.split(".")[1]));
        } catch (err) {
            console.log(err.message);
        }
        if (decoded.isAdmin) {
            this.setState({isAdmin: true});
        }
    };

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

  goToAdminPanel = () => {
    window.location.pathname = "/admin";
  }

  render() {
    return (
      <React.Fragment>
        <nav
          style={{ backgroundColor: "#ececec"}}
          className="navbar navbar-expand-lg navbar-light"
        >
          <div class="container px-4 px-lg-5">
            <a class="navbar-brand" href="#!">
              DEVS
            </a>
            <img src={logo} height="35px" width="35px" style={{fontWeight: "420"}}/>
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
                  <a class="nav-link active ml-5" aria-current="page" style={{cursor: "pointer", fontWeight: "420"}} onClick={this.goToElections}>
                    Home
                  </a>
                </li>

                {this.state.isAdmin ? (
                  <li class="nav-item">
                    <a class="nav-link active ml-2" aria-current="page" style={{cursor: "pointer"}} onClick={this.goToAdminPanel}>
                      Control Panel
                    </a>
                  </li>
                ) : ""}
                

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
