import React, { Component, useEffect, useState } from "react";
import swal from "sweetalert";
import atob from "atob";
import Layout from "./Layout";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import web3 from "../web3";
import ballot from "../ballot";
import axios from "axios";

const TestAdmin = () => {
    const checkIfAuthenticated = () => {
        const token = localStorage.getItem("token");
        let decoded;
        if (!token) {
            swal("Error!", "Unauthenticated!", "error");
            window.location.pathname = "/login";
        }
        try {
            decoded = JSON.parse(atob(token.split(".")[1]));
        } catch (err) {
            console.log(err.message);
            swal("Error!", "An error has occured!", "error");
            window.location.pathname = "/login";
        }
        if (!decoded.isAdmin) {
            swal("Error!", "Unauthorized!", "error");
            window.location.pathname = "/login";
        }
    };

    useEffect(() => {
        checkIfAuthenticated();
    }, []);

    // Navigating to the NewCandidate.js component
    const addCandidate = () => {
        window.location.pathname = "/new_candidate";
    };

    // Navigating to the RemoveCandidate.js component
    const removeCandidate = () => {
        window.location.pathname = "/remove_candidate";
    };

    const addUser = () => {
        window.location.pathname = "/add_user";
    };

    const endElection = () => {
        swal({
            title: "Are you sure?",
            text: "Once you end the election, your action cannot undone!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willEnd) => {
        if (willEnd) {
            endElectionYesCallback();
        } else {
            swal("You did not end the election.");
        }
        });
    }

  const endElectionYesCallback = async () => {
    
    var candidates = [];
    var candidateWinner = {};

    const accounts = await web3.eth.getAccounts();

    const totalVotes = await ballot.methods.totalVotes().call();

    // End Election in Blockchain
    await ballot.methods.endElection().send({
      from: accounts[0],
      gas: 1000000,
    });

    // Retrive Winner, total votes, and winner votes from Blockchain
    const winnerIndex = await ballot.methods.winnerIndex().call();
    const winnerVotes = await ballot.methods.winnerVotes().call();

    // Retrieve all other candidates from Database where ID/Index != ID/Index of Winner, then add their votes
    candidates = await axios
                        .get(`http://localhost:5000/api/candidates/getall/${winnerIndex}`)
                        .then((res) => {
                            return res.data;
                        })
                        .catch((err) => {
                            alert("GETTING CANDIDATES " + err.message);
                            return [-1];
                        });

    if(candidates[0] === -1) return;

    // Retrieve the winner candidate
    candidateWinner = await axios
                            .get(`http://localhost:5000/api/candidates/${winnerIndex}`)
                            .then((res) => {
                                return res.data;          
                            })
                            .catch((err) => {
                                alert("GETTING WINNER CANDIDATE " + err.message);
                                return [-1];
                            });
    
    if(candidateWinner[0] === -1) return;

    // Save election
    const param = {
      candidateWinner: candidateWinner,
      candidateWinnerVotes: winnerVotes,
      totalVotes: totalVotes,
      candidates: candidates,
    };

    axios.post("http://localhost:5000/api/elections", param, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
            if(res.status === 200){
              swal("Success!", "Election ended successfully!", "success");
            }
        })
        .catch((err) => {
            swal("Error! SAVING ELECTION", err.message, "error");
            return;
        });

    // Delete all candidates
    axios.delete("http://localhost:5000/api/candidates", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
            if(res.status === 200){
              console.log("Candidates deleted successfully");
            }
        })
        .catch((err) => swal("Error! DELETING CANDIDATES", err.message, "error"));

  };

    const useStyles = makeStyles(() => ({
            root: {
                width: '100%',
                maxWidth: 360,
                backgroundColor: "#333",
            },
        }));

    const classes = useStyles();
  
    return(
        <Layout>
            <div>
                <head>
                    <link
                    href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
                    rel="stylesheet"
                    id="bootstrap-css"
                    />
                    <link
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    rel="stylesheet"
                    />
                    <link
                    href="../static/button_styles.css"
                    rel="stylesheet"
                    />
                </head>

                <body>
                    <div className={classes.root} style={{margin: "5% auto"}} >
                        {/* List of admin control buttons */}
                        <List component="nav" aria-label="main mailbox folders">
                            {/* Add Candidate Button */}
                            <ListItem button onClick={addCandidate}>
                                <ListItemText primary="Add Candidate" style={{color: "#ffc312"}}/>
                            </ListItem>

                            {/* Remove Candidate Button */}
                            <ListItem button onClick={removeCandidate}>
                                <ListItemText primary="Remove Candidate" style={{color: "white"}}/>
                            </ListItem>

                            {/* Add User Button */}
                            <ListItem button onClick={addUser}>
                                <ListItemText primary="Add User" style={{color: "#ffc312"}}/>
                            </ListItem>

                            {/* End Election Button */}
                            <ListItem button onClick={endElection}>
                                <ListItemText primary="End Election" style={{color: "white"}}/>
                            </ListItem>
                        </List>
                    </div>
                </body>
            </div>
        </Layout>
    );
  }

export default TestAdmin;
