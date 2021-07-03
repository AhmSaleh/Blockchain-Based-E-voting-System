import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Layout from './Layout';
import axios from "axios";


class Homepage extends Component {
    state = {
        ongoingElection: {},
        elections: []
    }
    
    componentDidMount() {
        this.getElections();
    }

    getElections = async () => {
        axios
        .get("http://localhost:5000/api/elections", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => {
            const elections = res.data;
            this.setState({ elections });
        })
        .catch((err) => alert(err.message));
    }

    goToElection = (id) => {
        window.location.pathname = `/election/${id}`
    }

    goToOngoingElection = () => {
        window.location.pathname = "/candidates";
    }

    classes = {
        root: {
            width: '100%',
            maxWidth: '36ch',
            backgroundColor: "white",
        },
        inline: {
            display: 'inline',
        },
    };

    render() {
        return (
            <Layout>
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
                    </head>

                    <body>
                        {/* Ongoing Election Container*/}
                        <div style={{margin: "auto", marginTop: "50px", marginBottom: "25px", width: "25%"}}>
                            <h2>Ongoing Election</h2>

                            <List className={this.classes.root}>
                                {/* Ongoing election */}
                                <ListItem alignItems="flex-start" onClick={this.goToOngoingElection}>
                                    {/* Question Mark indicating no one has won yet? */}
                                    <ListItemAvatar>
                                        <Avatar alt="?" src=""/>
                                    </ListItemAvatar>

                                    {/* Election details */}
                                    <ListItemText
                                    primary={"Election " + (this.state.elections.length + 1)}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={this.classes.inline}
                                            color="textPrimary"
                                        >
                                            You have not cast your vote yet! <br/>
                                        </Typography>
                                        {"Current status: ongoing"} <br/>
                                        {"Total number of votes so far: 572338"}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                            </List>
                        </div>

                        <Divider variant="inset"/> <br/>

                        {/* Previous Elections Container*/}
                        <div style={{margin: "0 auto", width: "25%"}}>
                            <h2> Previous Elections </h2>

                            {/* TODO: Map elections from DB to this list, and add their indexes just like in the Candidates components */}

                            {/* List of previous elections */}
                            <List className={this.classes.root}>

                                {this.state.elections.length > 0
                                ? this.state.elections.map((election, index) => (
                                    
                                    // Brief details for each election
                                    <ListItem alignItems="flex-start" onClick={() => this.goToElection(election._id)}>
                                        {/* Election winner's avatar */}
                                        <ListItemAvatar>
                                            <Avatar alt="?" src=""/>
                                        </ListItemAvatar>

                                        {/* Election details */}
                                        <ListItemText
                                        primary={"Election " + (index+1)}
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={this.classes.inline}
                                                color="textPrimary"
                                            >
                                                Winner: {election.candidateWinner.name} <br/>
                                            </Typography>
                                            {"Number of votes for winner: " + election.candidateWinnerVotes} <br/>
                                            {"Total number of votes: " + election.totalVotes} 
                                            </React.Fragment>
                                        }
                                        />
                                </ListItem>
                                
                                ))
                                : <h4>There have been no previous elections</h4>}

                            </List>
                        </div>
                    </body>
                </div>
            </Layout>
        );
    }
}

export default Homepage
