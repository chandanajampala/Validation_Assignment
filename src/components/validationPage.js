import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UrlDetails from "./urlDetails";
import validURL from "./tokens/validURL";
import "./validationPage.css";

export default class ValidationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: localStorage.getItem("urlForValidation")
        ? JSON.parse(localStorage.getItem("urlForValidation"))
        : [],
      currentUrl: "",
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.currentUrl !== nextState.currentUrl) {
      return false;
    }
    return true;
  }
  addUrl = () => {
    if (validURL(this.state.currentUrl)) {
      if (!localStorage.getItem(this.state.currentUrl)) {
        this.setState(
          { urls: [...this.state.urls, this.state.currentUrl] },
          function () {
            localStorage.setItem(
              "urlForValidation",
              JSON.stringify(this.state.urls)
            );
          }
        );
      } else alert("url already present in tracking list");
    } else alert("enter valid URL");
  };

  render() {
    return (
      <div className="validationPage">
        <div className="header">
          <div className="heading">{"Live Website Tracking"}</div>
          <div className="summary">{`currently tracking ${this.state.urls.length} websites`}</div>
        </div>
        <hr></hr>
        <div className="inputBlock">
          <div>
            <TextField
              className="urlInput"
              label="Input with URL Validation"
              onChange={(e) => {
                this.setState({ currentUrl: e.target.value });
              }}
              variant="outlined"
            />
          </div>
          <Button
            onClick={this.addUrl}
            size="medium"
            variant="contained"
            color="primary"
          >
            {"ADD WEBSITE"}
          </Button>
        </div>
        <div className="Websitelistheading">{"WEBSITES"}</div>
        <div className="urlDetailsContainer">
          {this.state.urls.map((element) => {
            return (
              <div>
                <UrlDetails url={element} />
                <hr></hr>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
