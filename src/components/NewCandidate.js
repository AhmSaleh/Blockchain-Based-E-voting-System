import React from "react";
import { Form, Button, Message, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import web3 from "../web3";
import ballot from "../ballot";
import Layout from "./Layout";
import swal from "sweetalert";
import axios from "axios";
import atob from "atob";

class NewCandidate extends React.Component {
  checkIfAuthenticated() {
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
  }
  componentDidMount() {
    this.checkIfAuthenticated();
  }

  state = {
    candidateName: "",
    candidateSymbol: "",
    candidateDescription: "",
    candidatePhoto: "",
    errorMessage: "",
    loading: false,
    index: -1,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const storeInBlockchain = async () => {
      this.setState({ errorMessage: "", loading: true });
      try {
        const accounts = await web3.eth.getAccounts();

        await ballot.methods.addCandidate(this.state.candidateName).send({
          from: accounts[0],
          gas: 1000000,
        });
        this.setState({ loading: false });
        swal(
          "Success!",
          "Candidate added to the election successfully!",
          "success"
        );
        window.location.pathname = "/new_candidate";
      } catch (err) {
        console.log(err.message);
      }
    };

    const param = {
      name: this.state.candidateName,
      symbol: this.state.candidateSymbol,
      photo: this.state.candidatePhoto,
      description: this.state.candidateDescription
    };

    axios
      .post("http://localhost:5000/api/candidates", param, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ index: res.index });
          storeInBlockchain();
        } else if (res.status === 401)
          swal("Error!", "Unauthenticated!", "error");
        else if (res.status === 403) swal("Error!", "Unauthorized!", "error");
      })
      .catch((err) => {
        swal("Error!", "Failed to add candidate!", "error");
        console.log(err.message);
      });
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ candidatePhoto: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    const { candidatePhoto } = this.state;
    return (
      <Layout>
        <div class="new_candidate_form">
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Candidate Name"
                value={this.state.candidateName}
                onChange={(event) =>
                  this.setState({ candidateName: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Symbol</label>
              <input
                placeholder="Candidate Symbol"
                value={this.state.candidateSymbol}
                onChange={(event) =>
                  this.setState({ candidateSymbol: event.target.value })
                }
              />
            </Form.Field>

            {/*Candidate Desc*/}
            <Form.Field>
              <label>Description</label>
              <input
                type="textarea"
                placeholder="Candidate Description"
                value={this.state.candidateDescription}
                onChange={(event) =>
                  this.setState({ candidateDescription: event.target.value })
                }
              />
            </Form.Field>


            {/*Candidate Photo*/}
            <Form.Field>
              <label>Photo</label>
              <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input"
                onChange={this.imageHandler}
              />
            </Form.Field>
            <div className="img-holder">
              <Image src={candidatePhoto} alt="" size="medium" rounded />
            </div>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button
              fluid
              secondary
              style={{ margin: "0 auto", display: "block", margin: "10% 0px" }}
              loading={this.state.loading}
              type="submit"
            >
              Add
            </Button>
          </Form>
        </div>
      </Layout>
    );
  }
}

export default NewCandidate;
