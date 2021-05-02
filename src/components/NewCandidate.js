import React from "react";
import { Form, Button, Message, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import web3 from "../web3";
import ballot from "../ballot";
import Layout from "./Layout";
import swal from "sweetalert";
import axios from "axios";

class NewCandidate extends React.Component {
  state = {
    candidateName: "",
    candidateSymbol: "",
    candidatePhoto: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ errorMessage: "", loading: true });

    console.log(this.state.candidatePhoto);
    /*try {
      const accounts = await web3.eth.getAccounts();

      await ballot.methods.addCandidate(this.state.candidateName).send({
        from: accounts[0],
        gas: 1000000,
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }*/

    //this.setState({ loading: false });

    // TODO: Insert the new Candidate info into DB
    // To access these variables just write
    // this.state.candidateName/candidateSymbol
    const param = {
      name: this.state.candidateName,
      symbol: this.state.candidateSymbol,
      photo: this.state.candidatePhoto,
    };

    axios
      .post("http://localhost:5000/api/candidates", param)
      .then((res) => {
        if (res.status === 200) {
          swal(
            "Success!",
            "Candidate added to the election successfully!",
            "success"
          );
          window.location.pathname = "/admin";
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
