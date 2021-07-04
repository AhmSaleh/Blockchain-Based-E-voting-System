import React, { Component, useEffect, useState } from "react";
import swal from "sweetalert";
import atob from "atob";
import Layout from "./Layout";
import { makeStyles } from "@material-ui/core/styles";
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
  };

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

    if (candidates[0] === -1) return;

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

    if (candidateWinner[0] === -1) return;

    // Save election
    const param = {
      candidateWinner: candidateWinner,
      candidateWinnerVotes: winnerVotes,
      totalVotes: totalVotes,
      candidates: candidates,
    };

    axios
      .post("http://localhost:5000/api/elections", param, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          swal("Success!", "Election ended successfully!", "success");
        }
      })
      .catch((err) => {
        swal("Error! SAVING ELECTION", err.message, "error");
        return;
      });

    // Delete all candidates
    axios
      .delete("http://localhost:5000/api/candidates", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Candidates deleted successfully");
        }
      })
      .catch((err) => swal("Error! DELETING CANDIDATES", err.message, "error"));
  };

  const useStyles = makeStyles(() => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: "#333",
    },
  }));

  const classes = useStyles();

  return (
    <Layout>
      <div
        style={{ marginTop: "100px", marginLeft: "320px" }}
        class="container px-10 py-10"
        id="hanging-icons"
      >
        <h2 class="pb-2 border-bottom">Admin Options</h2>
        <div class="row g-4 py-5 row-cols-1 row-cols-lg-4">
          <div class="col d-flex align-items-start">
            <img
              style={{
                marginBottom: "9px",
                marginRight: "5px",
                objectFit: "cover",
                width: "20px",
                height: "20px",
              }}
              src="https://img.icons8.com/ios-filled/50/000000/add-user-male.png"
            />
            <div>
              <h3>Add User</h3>
              <p>
                Add a new user to the system to be eligible to vote. Users then have to register with their own passwords. 
              </p>
              {/* Add User Button */}
              <a
                style={{
                  color: "white",
                  fontWeight: "400",
                  textDecoration: "none",
                }}
                onClick={addUser}
                class="btn btn-secondary btn-md"
              >
                Add User{" "}
              </a>
            </div>
          </div>

          <div class="col d-flex align-items-start">
            <img
              style={{
                marginBottom: "9px",
                marginRight: "5px",
                objectFit: "cover",
                width: "20px",
                height: "20px",
              }}
              src="https://img.icons8.com/material-rounded/24/000000/add-property.png"
            />
            <div>
              <h3>Add Canddiate</h3>
              <p>
                Add a new candidate to the system, with their <strong>Name</strong>, <strong>Symbol</strong>,
                <strong>Description</strong>, and <strong>Photo</strong>. The candidate will be added to the ongoing election.
                If there is no ongoing election, adding a candidate starts a new election.
              </p>
              {/* Add Candidate Button */}
              <a
                style={{
                  color: "white",
                  fontWeight: "400",
                  textDecoration: "none",
                }}
                onClick={addCandidate}
                class="btn btn-secondary btn-md"
              >
                Add Candidate{" "}
              </a>
            </div>
          </div>

          <div class="col d-flex align-items-start">
            <img
              style={{
                marginBottom: "9px",
                marginRight: "5px",
                objectFit: "cover",
                width: "20px",
                height: "20px",
              }}
              src="https://img.icons8.com/material-rounded/24/000000/remove-delivery.png"
            />
            <div>
              <h3>Remove Candidate</h3>
              <p>
                Remove a candidate from an ongoing election.
              </p>
              {/* Remove Candidate Button */}
              <a
                style={{
                  color: "white",
                  fontWeight: "400",
                  textDecoration: "none",
                }}
                onClick={removeCandidate}
                class="btn btn-secondary btn-md"
              >
                Remove Candidate{" "}
              </a>
            </div>
          </div>
        </div>

        <div
          style={{ width: "360px", marginLeft: "370px" }}
          class="row g-4 py-5 row-cols-1 row-cols-lg-4"
        >
          <div class="col d-flex align-items-start">
            <img
              style={{
                marginBottom: "9px",
                marginRight: "5px",
                objectFit: "cover",
                width: "20px",
                height: "20px",
              }}
              src="https://img.icons8.com/ios-filled/50/000000/tv-off.png"
            />
            <div>
              <h3>End Election</h3>
              <p>
                End an ongoing election. The election then gets added to the database with its
                winner, losers and total number of votes, and winner votes. 
              </p>
              {/* End Election Button */}
              <a
                style={{
                  color: "white",
                  fontWeight: "400",
                  textDecoration: "none",
                }}
                onClick={endElection}
                class="btn btn-secondary btn-md"
              >
                End Election{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestAdmin;
