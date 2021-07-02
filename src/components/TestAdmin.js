import React, { Component, useEffect } from "react";
import swal from "sweetalert";
import atob from "atob";
import Layout from "./Layout";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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

    /* TODO: This function should start a new election 
    by accessing the Blockchain and adding a new election to it*/
    const startElection = () => {
        swal("Not implemented yet!!! xD", {
            icon: "error",
        });
    };

    /* TODO: This function should end an on-going election 
    by accessing the Blockchain and removing the running election*/
    const endElection = () => {
        swal("Not implemented yet!!! xD", {
            icon: "error",
        });
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
