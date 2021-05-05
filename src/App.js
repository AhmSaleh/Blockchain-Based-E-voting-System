import { Component } from "react";
import "./App.css";
import ballot from "./ballot";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Candidates from "./components/Candidates";
import Admin from "./components/Admin";
import NewCandidate from "./components/NewCandidate";
import RemoveCandidate from "./components/RemoveCandidate";
import AddUser from "./components/AddUser";
import ConfirmEmail from "./components/ConfirmEmail";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
          <Route
            path="/register"
            render={() => (
              <>
                <RegisterForm token={this.state.token} />
              </>
            )}
          />
          <Route
            path="/admin"
            render={() => (
              <>
                <Admin token={this.state.token} />
              </>
            )}
          />
          <Route
            path="/new_candidate"
            render={() => (
              <>
                <NewCandidate token={this.state.token} />
              </>
            )}
          />
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
          <Route
            path="/add_user"
            render={() => (
              <>
                <AddUser token={this.state.token} />
              </>
            )}
          />
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
          <Route path="/confirm" component={ConfirmEmail} />
        </div>
      </Router>
    );
  }
}

export default App;
