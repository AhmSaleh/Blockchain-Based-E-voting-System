import { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import swal from "sweetalert";
import "../static/styles.css";
const atob = require("atob");

const axios = require("axios");

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

class LoginForm extends Component {
  
  login = (event) => {
    event.preventDefault();

    const param = {
      nationalID: event.target.nationalID.value,
      password: event.target.password.value,
    };

    axios
      .post("http://localhost:5000/api/auth", param)
      .then((res) => {
        if (res.status === 200) {
          const token = res.data;
          this.props.tokenHandler(token);
          const tokenInfo = parseJwt(token);
          swal("Success!", "You've been logged in successfully!", "success");
          if (tokenInfo.isAdmin) window.location.pathname = "/newcandidate";
          else window.location.pathname = "/candidates";
        }
      })
      .catch(() => {
        swal("Error!", "Failed to log in!", "error");
      });
  };

  // TODO: Remove this fucntion. It was used to test setting state
  // between different components.
  // ============================================
  // testBtnFunc = () => {
  //   this.props.testPropHandler("TEST LMFAOOOO");
  // }

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

          {/* TODO: Remove this button, It was used to test setting state
          // between different components. */}
          {/* <Button onClick={this.testBtnFunc}>YOOOO</Button> */}

          <div className="container" style={{ margin: "auto", width: "auto" }}>
            <div className="d-flex justify-content-center h-100">
              <div className="card">
                <div class="card-header">
                  <h3>Sign In</h3>
                </div>

                <div className="card-body">
                  {/* Login Form */}
                  <form onSubmit={this.login}>
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

                    {/* Remember Me Box */}
                    <div className="row align-items-center remember">
                      <input name="rememberMe" type="checkbox"></input>
                      <label htmlFor="rememberMe">Remember Me?</label>
                    </div>

                    {/* Login Button */}
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Login"
                        class="btn float-right login_btn"
                      />
                    </div>
                  </form>
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <div className="d-flex justify-content-center links">
                    Don't have an account?
                    <Link to="/register"> Register now!</Link>
                  </div>
                  <div class="d-flex justify-content-center">
                    <a href="#">Forgot your password?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default LoginForm;
