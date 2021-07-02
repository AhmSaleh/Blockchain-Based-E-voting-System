import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Layout from './Layout';

const Homepage = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: '36ch',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }));

    const classes = useStyles();

    const goToElection = (e) => {
        alert(e.target.parent);
    }

    const goToOngoingElection = () => {
        window.location.pathname = "/candidates";
    }

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

                        <List className={classes.root}>
                            {/* Ongoing election */}
                            <ListItem alignItems="flex-start" onClick={goToOngoingElection}>
                                {/* Question Mark indicating no one has won yet? */}
                                <ListItemAvatar>
                                <Avatar alt="?" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                {/* Election details */}
                                <ListItemText
                                primary="US Presidential Election 2024"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
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

                    <Divider variant="inset"/>

                    {/* Previous Elections Container*/}
                    <div style={{margin: "0 auto", width: "25%"}}>
                        <h2> Previous Elections </h2>

                        {/* TODO: Map elections from DB to this list, and add their indexes just like in the Candidates components */}

                        {/* List of elections */}
                        <List className={classes.root}>

                            {/* First election */}
                            <ListItem alignItems="flex-start" name="Joe Biden's ID" onClick={goToElection}>
                                {/* Candidate Avatar */}
                                <ListItemAvatar>
                                <Avatar alt="Joe Biden" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                {/* Election details */}
                                <ListItemText
                                primary="US Presidential Election 2020"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Winner: Joe Biden <br/>
                                    </Typography>
                                    {"Number of votes for winner: 25000"} <br/>
                                    {"Total number of votes: 137000"}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            
                            <Divider variant="inset" component="li" />

                            {/* Second election */}
                            <ListItem alignItems="flex-start">
                                {/* Candidate Avatar */}
                                <ListItemAvatar>
                                <Avatar alt="Donald Trump" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                {/* Election details */}
                                <ListItemText
                                primary="US Presidential Election 2016"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Winner: Donald Trump <br/>
                                    </Typography>
                                    {"Number of votes for winner: 23471"} <br/>
                                    {"Total number of votes: 128632"}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            
                            <Divider variant="inset" component="li" />
                            
                            {/* Third election */}
                            <ListItem alignItems="flex-start">
                                {/* Candidate Avatar */}
                                <ListItemAvatar>
                                <Avatar alt="Barack Obama" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                {/* Election details */}
                                <ListItemText
                                primary="US Presidential Election 2012"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Winner: Barack Obama <br/>
                                    </Typography>
                                    {"Number of votes for winner: 25391"} <br/>
                                    {"Total number of votes: 208516"}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>

                        </List>
                    </div>
                </body>
            </div>
        </Layout>
    )
}

export default Homepage
