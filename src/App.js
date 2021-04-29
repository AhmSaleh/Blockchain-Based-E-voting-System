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
  state = {
     admin: '',
     message:'',
     candidateIndex:0,
     candidates: {},
     token: '',
  };

  async componentDidMount (){
    const admin = await ballot.methods.admin().call(); 
    this.setState({ admin });
    this.getCandidates();
  }

  // This function should handle getting all candidates from the Db
  async getCandidates(){
     const res = await axios.get('http://localhost:5000/api/candidates');
     console.log(res.data);
     const candidates = res.data;
     this.setState({ candidates });
  };

  handleTokenChange(token) {
    this.setState({ token });
    alert(token);
  }

  render() {
    return (
      <Router>
      <div>
        <Route path="/login" render={() => (<> <LoginForm onTokenChange={this.handleTokenChange}/> </>)}/>
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
