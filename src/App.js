import { Component } from 'react'
import './App.css';
import web3 from './web3'
import ballot from './ballot'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Candidates from './components/Candidates'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {

  candidates = this.getCandidates();

  state = {
     admin: '',
     message:'',
     candidateIndex:0,
  };

  async componentDidMount (){
    const admin = await ballot.methods.admin().call(); 
    this.setState({ admin });
  }

  // This function should be moved to the Candidates component
  onSubmit = async (event) => {
    event.preventDefault();

    console.log(this.state.index);
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transcation success...'});

    await ballot.methods.vote(this.state.index).send({
      from: accounts[0],
      gas:'100000'
    })

    this.setState({ message: 'You have been entered!'});
  };


  // This function should handle getting all candidates from the Db
  getCandidates(){
    return [
      {
        name: "Saleh"
      },
      {
        name: "Bola"
      },
      {
        name: "Martini"
      },
      {
        name: "Khedr"
      },
      {
        name: "Joe"
      }
    ];
  };

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
        <Route path="/login" component={LoginForm}/>
        <Route path="/register" component={RegisterForm}/>
        <Route path="/candidates" render={(props) => (
          <>
            <Candidates candidates={this.candidates}/>
          </>
        )}
        />

      </div>
      </Router>
    );
  }
}

export default App;
