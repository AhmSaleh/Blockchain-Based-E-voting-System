import { Link } from "react-router-dom";
import "../static/styles.css";
const axios = require("axios");

const LoginForm = (onTokenChange) => {
  //onTokenChange.bind(this);
  const Login = (event) => {
    event.preventDefault();

    // Placeholder code to be removed

    // TODO add Login logic by checking against Database
    const param = {
      nationalID: event.target.nationalID.value,
      password: event.target.password.value,
    };
    var token;
    axios
      .post("http://localhost:5000/api/auth", param)
      .then((res) => {
        if (res.status === 200) {
          //onTokenChange(res.data);
          token = res.data;
          alert(token);
          window.location.pathname = "/candidates";
        }
      })
      .catch((e) => alert(e.message));
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
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div class="card-header">
                <h3>Sign In</h3>
                {/* <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square"></i></span>
                                    <span><i className="fab fa-google-plus-square"></i></span>
                                    <span><i className="fab fa-twitter-square"></i></span>
                                </div> */}
              </div>

              <div className="card-body">
                <form onSubmit={Login}>
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

                  <div className="row align-items-center remember">
                    <input name="rememberMe" type="checkbox"></input>
                    <label htmlFor="rememberMe">Remember Me?</label>
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Login"
                      class="btn float-right login_btn"
                    />
                  </div>
                </form>
              </div>

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

        {/* <form onSubmit={Login}>
                    <label for="nationalID">National ID:</label>
                    <input name="nationalID" type="number" required></input><br/>

                    <label for="password">Password:</label>
                    <input name="password" type="password" required></input><br/>

                    <input type="submit"></input>
                </form>

                <p>New here? <Link to="/register">Register now!</Link></p> */}
      </body>
    </div>
  );
};

export default LoginForm;
