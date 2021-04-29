import React, { Component } from 'react';
import swal from 'sweetalert';

class Admin extends Component {

    // Navigating to the NewCandidate.js component
    addCandidate = () => {
        window.location.pathname="/newcandidate"
    }

    // Navigating to the RemoveCandidate.js component
    removeCandidate = () => {
        window.location.pathname="/removecandidate"
    }

    /* TODO: This function should start a new election 
    by accessing the Blockchain and adding a new election to it*/
    startElection = () => {
        swal("Not implemented yet!!! xD", {
            icon: "error",
          });
    }

    /* TODO: This function should end an on-going election 
    by accessing the Blockchain and removing the running election*/
    endElection = () => {
        swal("Not implemented yet!!! xD", {
            icon: "error",
          });
    }

    render() {
        return (
            <div>
                <head>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
                </head>

                <body>
                    <div className="row justify-content-center">
                        {/* Adding Candidate Button */}
                        <div className="col-12 col-sm-6 col-lg-1">
                            <button className="btn btn-primary rounded-pill" onClick={this.addCandidate}>Add Candidate</button>
                        </div>

                        {/* Removing Candidate Button */}
                        <div className="col-12 col-sm-6 col-lg-1">
                            <button className="btn btn-danger rounded-pill" onClick={this.removeCandidate}>Remove Candidate</button>
                        </div>
                    </div>

                    <br/>

                    <div className="row justify-content-center">
                        {/* Starting Election Button */}
                        <div className="col-12 col-sm-6 col-lg-1">
                            <button className="btn btn-primary rounded-pill" onClick={this.startElection}>Start Election</button>
                        </div>

                        {/* Ending Election Button */}
                        <div className="col-12 col-sm-6 col-lg-1">
                            <button className="btn btn-danger rounded-pill" onClick={this.endElection}>End Election</button>
                        </div>
                    </div>
                </body>
            </div>
        )
    }
}

export default Admin
