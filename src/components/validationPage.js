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
        <div className="aboutPage">{"This application is a test. It lets users add a list of URLs in local storage. Along with the URL it stores the Title of the page returned when fetching the contents of the URL. The Application then fetches the contents of each URL and checks the response type. If the response is 200 OK, it marks the URL as LIVE. If the response when getting the contents of the website throws an error, the application highlights the errored website in the list. The application does this every 5 minutes or ON DEMAND when the URL is clicked by the user. On reload, the website checks the local storage for the list of websites added and loads all of them again."}</div>
        <div className="decleration">{"Built for Cobold Digital by Jampala Chandana"}</div>
      </div>
    );
  }
}
