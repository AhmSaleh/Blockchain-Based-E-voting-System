import { Component } from "react";
import "./App.css";
import ballot from "./ballot";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Candidates from "./components/Candidates";
import Admin from "./components/Admin";
import NewCandidate from "./components/NewCandidate";
import RemoveCandidate from "./components/RemoveCandidate";
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
    // TODO: Remove the getCandidatesTest as it was made for testing
    //this.getCandidatesTest();
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
    //console.log(res.data);
    //const candidates = res.data;
    //this.setState({ candidates });
  }

  // TODO: Remove this function
  // getCandidatesTest(){
  //   var candidates = [
  //     {name: "Bola", symbol: "Gaeming"},
  //     {name: "Saleh", symbol: "Lenox"},
  //     {name: "Martini", symbol: "EZ"},
  //     {name: "Khedr", symbol: "NoFranco"},
  //     {name: "Joe", symbol: "Clownery"}
  //   ]

  //   this.setState({ candidates }, () => {});
  // }

  handleTokenChange = (token) => {
    //alert("BEFORE SETTING STATE " + token);
    this.setState({ token }, () => {
      //alert("AFTER SETTING STATE " + token);
    });
    //alert("SETTING STATE " + this.state.token);
    //alert("SETTING STATE " + this.state.candidates);
    //console.log(this.state.candidates);
  };

  render() {
    return (
      <Router>
        <div>
          {/* TODO: Remove the second prop (testPropHanlder) from the LoginForm component. It was used to test setting state
        // between different components. */}
          <Route
            path="/login"
            render={() => (
              <>
                {" "}
                <LoginForm
                  tokenHandler={
                    this.handleTokenChange
                  } /*testPropHandler={this.handleTestPropChange}*/
                />{" "}
              </>
            )}
          />
          <Route path="/register" component={RegisterForm} />
          <Route path="/admin" component={Admin} />
          <Route path="/newcandidate" component={NewCandidate} />
          <Route
            path="/removecandidate"
            render={() => (
              <>
                <RemoveCandidate candidates={this.state.candidates} />
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
        </div>
      </Router>
    );
  }
}

export default App;
