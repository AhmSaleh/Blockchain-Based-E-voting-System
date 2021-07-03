import React, { Component } from "react";
import logo from "../imgs/logo.png"
import logoutIcon from '../imgs/logout.png'

class Navbar extends Component {
  state = {};
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
                  <a class="nav-link active ml-5" aria-current="page" href="#!">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active ml-2" aria-current="page" href="#!">
                    Elections
                  </a>
                </li>
              </ul>
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a href="#" class="nav-link ">
                  <img src={logoutIcon} height="25px" width="25px"/>                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#!">
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
