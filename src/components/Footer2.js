import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment >
        <footer style = {{backgroundColor: "#ececec", position: "absolute", bottom: 0, width:"100%"}} className="py-5">
            <div style = {{color: "rgb(104, 104, 104)", height: "calc(100% - 60px)"}} class="container"><p class="m-0 text-center"> &copy; 2020-2021</p></div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
