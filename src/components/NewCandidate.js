import React from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import web3 from '../web3'
import ballot from '../ballot'
import Layout from './Layout'

class NewCandidate extends React.Component {
    state = {
        candidateName: '',
        candidateSymbol: '',
        candidatePhoto: '',
        errorMessage: '',
        loading: false
    }
    
    onSubmit = async (event) =>  {
        event.preventDefault();

        this.setState({ errorMessage: '', loading: true})
        
        try {
            const accounts = await web3.eth.getAccounts();
            
            await ballot.methods
            .addCandidate(this.state.candidateName)
            .send({
                from: accounts[0],
                gas: 1000000
            })
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({loading: false})

        // TODO: Insert the new Candidate info into DB 
        // To access these variables just write   
        // this.state.candidateName/candidateSymbol
    
    }
    
    render() {
        return(
            <Layout>
                <div class="new_candidate_form">
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Name</label>
                            <input 
                            placeholder='Candidate Name'
                            value = {this.state.candidateName}
                            onChange={event => this.setState({ candidateName: event.target.value })} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Symbol</label>
                            <input placeholder='Candidate Symbol'
                            value = {this.state.candidateSymbol}
                            onChange={event => this.setState({ candidateSymbol: event.target.value })} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Photo</label>
                            <input type ="file" placeholder='Candidate Photo'
                            value = {this.state.candidatePhoto}
                            onChange={event => this.setState({ candidatePhoto: event.target.value })} 
                            />
                        </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <Button fluid secondary style={{margin: "0 auto", display: "block", margin:"10% 0px"}} loading={this.state.loading} type='submit'>Add</Button>
                    </Form>
                </div>
            </Layout>
        )
    }
}

export default NewCandidate