import { Component } from 'react'
import './App.css';
import ballot from './ballot';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Candidates from './components/Candidates';
import Admin from './components/Admin';
import NewCandidate from './components/NewCandidate';
import RemoveCandidate from './components/RemoveCandidate';
import {BrowserRouter as Router, Route} from 'react-router-dom';
const axios = require('axios');

class App extends Component {
  
  constructor(props) {
    super(props);
    this.handler = this.handleTokenChange.bind(this);
  }

  state = {
     admin: '',
     message:'',
     candidateIndex:0,
     candidates: {},
     token: '',
     testProp: ''
  };

  async componentDidMount (){
    const admin = await ballot.methods.admin().call(); 
    this.setState({ admin });
    this.getCandidates();

    alert(this.state.testProp);
  }

  // This function should handle getting all candidates from the Db
  async getCandidates(){
     const res = await axios.get('http://localhost:5000/api/candidates');
     console.log(res.data);
     const candidates = res.data;
     this.setState({ candidates });
  }

  handleTokenChange = (token) => {
    alert("BEFORE SETTING STATE " + token);
    this.setState({ token }, () => {
      alert("AFTER SETTING STATE " + token);
    });
  }

  // TODO: Remove this function. It was used to test setting state
  // between different components.
  //=======================================
  // handleTestPropChange = (testProp) => {
  //   alert("FIRST " + testProp);
  //   this.setState({ testProp }, () => {
  //     alert("AFTER STATE CHANGE " + this.state.testProp);
  //   });
  // }

  render() {
    return (
      <Router>
      <div>
        {/* TODO: Remove the second prop (testPropHanlder) from the LoginForm component. It was used to test setting state
        // between different components. */}
        <Route path="/login" render={() => (<> <LoginForm tokenHandler={this.handleTokenChange} /*testPropHandler={this.handleTestPropChange}*//> </>)}/>
        <Route path="/register" component={RegisterForm}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/newcandidate" component={NewCandidate}/>
        <Route path="/removecandidate" render={() => (<><RemoveCandidate candidates={this.state.candidates}/></>)}/>
        <Route path="/candidates" render={() => (
          <>
            <Candidates candidates={this.state.candidates}
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
