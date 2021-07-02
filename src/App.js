import { Component } from "react";
import "./App.css";
import ballot from "./ballot";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Candidates from "./components/Candidates";
import Homepage from "./components/Homepage";
import Admin from "./components/Admin";
import TestAdmin from "./components/TestAdmin";
import NewCandidate from "./components/NewCandidate";
import RemoveCandidate from "./components/RemoveCandidate";
import AddUser from "./components/AddUser";
import ConfirmEmail from "./components/ConfirmEmail";
import ForgotPassword from "./components/ForgotPassword";
import ConfirmNewPassword from "./components/ConfirmNewPassword";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handleTokenChange.bind(this);
  }

  state = {
    admin: "",
    message: "",
    candidateIndex: 0,
    candidates: {},
    token: "",
    testProp: "",
  };

  async componentDidMount() {
    const admin = await ballot.methods.admin().call();
    this.setState({ admin });
    this.getCandidates();
  }

  // This function should handle getting all candidates from the Db
  async getCandidates() {
    axios
      .get("http://localhost:5000/api/candidates")
      .then((res) => {
        const candidates = res.data;
        this.setState({ candidates });
      })
      .catch((err) => alert(err.message));
  }

  handleTokenChange = (token) => {
    this.setState({ token });
  };

  render() {
    return (
      <Router>
        <div>
          {/* Home Route*/}
          <Route
            exact path="/"
            render={() => (
              <>
                <Redirect to="/login"/>
              </>
            )}
          />

          {/* Login Route*/}
          <Route
            path="/login"
            render={() => (
              <>
                <LoginForm
                  tokenHandler={this.handleTokenChange}
                  token={this.state.token}
                />
              </>
            )}
          />

          {/* Register Route*/}
          <Route
            path="/register"
            render={() => (
              <>
                <RegisterForm token={this.state.token} />
              </>
            )}
          />

          {/* Elections Homepage Route*/}
          <Route
            path="/elections"
            render={() => (
              <>
                <Homepage token={this.state.token} />
              </>
            )}
          />

          {/* Admin Route*/}
          <Route
            path="/admin"
            render={() => (
              <>
                <TestAdmin token={this.state.token} />
              </>
            )}
          />
          
          {/* New Candidate Route*/}
          <Route
            path="/new_candidate"
            render={() => (
              <>
                <NewCandidate token={this.state.token} />
              </>
            )}
          />

          {/* Remove Candidate Route*/}
          <Route
            path="/remove_candidate"
            render={() => (
              <>
                <RemoveCandidate
                  candidates={this.state.candidates}
                  token={this.state.token}
                />
              </>
            )}
          />

          {/* Add User Route*/}
          <Route
            path="/add_user"
            render={() => (
              <>
                <AddUser token={this.state.token} />
              </>
            )}
          />

          {/* Candidates Route*/}
          <Route
            path="/candidates"
            render={() => (
              <>
                <Candidates
                  candidates={this.state.candidates}
                  token={this.state.token}
                  admin={this.state.admin}
                />
              </>
            )}
          />

          {/* Forgot Password Route*/}
          <Route path="/forgot_password" component={ForgotPassword} />

          {/* Confirm New Password Code Route*/}
          <Route path="/confirm_new_password" component={ConfirmNewPassword} />

          {/* Confirm Email Code Route*/}
          <Route path="/confirm" component={ConfirmEmail} />
        </div>
      </Router>
    );
  }
}

export default App;
