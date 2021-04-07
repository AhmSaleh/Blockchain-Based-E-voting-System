import logo from './logo.svg';
import { Component } from 'react'
import './App.css';
import web3 from './web3'
import ballot from './ballot'

class App extends Component {
  
  state = {
     admin: '',
     message:'',
     candidateIndex:0
  };

  async componentDidMount (){
    const admin = await ballot.methods.admin().call(); 

    this.setState({ admin });
  }

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


  render() {
    return (
      <div>
        <h2>Ballot Contract</h2>
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
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default App;
