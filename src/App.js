import { Component } from 'react'
import './App.css';
import ballot from './ballot';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Candidates from './components/Candidates';
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
        {/* <h2>Ballot Contract</h2>
        <p>
          This contract is managed by {this.state.admin}.  
        </p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Please choose one candidate! </h4> 
            <div onChange={event => this.setState({index: event.target.value})}>
              <label><input type="radio" name="candidate" value="0"/>Joe</label><br/>
              <label><input type="radio" name="candidate" value="1"/>Martini</label><br/>
              <label><input type="radio" name="candidate" value="2"/>Khedr</label><br/>
              <label><input type="radio" name="candidate" value="3"/>Ebola</label><br/>
              <label><input type="radio" name="candidate" value="4"/>Saleh</label><br/>
            </div>
            <br/>
          <button>Vote</button>         
        </form>
        <h2>{this.state.message}</h2> */}
        <Route path="/login" render={() => (<> <LoginForm onTokenChange={this.handleTokenChange}/> </>)}/>
        <Route path="/register" component={RegisterForm}/>
        <Route path="/candidates" render={(props) => (
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
