import React, { Component } from "react";
import getURL from "./tokens/getURL";
import Button from "@material-ui/core/Button";
import "./urlDetails.css";

export default class UrlDetails extends Component {
  constructor(props) {
    super(props);
    this.interval = {};
    this.time={};
    this.state = {
      lastUpdated:new Date(),
      urlData: localStorage.getItem(this.props.url)
        ? JSON.parse(localStorage.getItem(this.props.url))
        : {},
      url: this.props.url,
    };
  }
  componentDidMount() {
    this.getURLData(this.state.url);
    this.getCurrentTime();
    this.interval = setInterval(async ()=>{await this.getURLData(this.state.url)}, 300000);
    this.time = setInterval(async ()=>{await this.getCurrentTime()}, 60000);
  }
   getCurrentTime = ()=>{    
     const currentTime= new Date().getTime();
     const lastUpdated = this.state.urlData.lastcalled?this.state.urlData.lastcalled  :currentTime;
     console.log("getcurrent time");
     this.setState({lastUpdated:Math.floor((currentTime-lastUpdated)/ 60000)});
   }
  //  getURLData(url) {
  //     getURL(url).then((items) => {
  //      console.log("geturldata");
  //       this.setState({ urlData: JSON.parse(localStorage.getItem(url)) });
  //     });
  // }
  getURLData(url) {
    return new Promise((res, rej) => {
      getURL(url).then((items) => {
         this.setState({ urlData: JSON.parse(localStorage.getItem(url)) });
         res('success')
       }).catch((e) =>{
         rej('failure')
       });
    })
 }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.time);
  }
  render() {
    const { urlData } = this.state;
    return (
      <div className="urlDetails">
        { urlData.status==="ERROR" ? <div className="errorBar"></div>:""}
        <div className="urlData">
          <div className="urlTitle">{urlData.title}</div>
          <div className="url">{this.state.url}</div>
        </div>
        <div className="urlStatus">
            <div className="lastCalled">{`Last called: ${this.state.lastUpdated} mins ago `}</div>
            <Button variant="contained" className={urlData.status?urlData.status:"PENDING"} onClick={async()=>{
                   let status = await this.getURLData(this.state.url);
                   if (status == 'success') {
                     this.getCurrentTime();
                   }
                   }}>{urlData.status?urlData.status:"PENDING" }</Button>

                 {/* <Button variant="contained" className={urlData.status?urlData.status:"PENDING"} onClick={async()=>{await this.getURLData(this.state.url);this.getCurrentTime();}}>{urlData.status?urlData.status:"PENDING" }</Button> */}
        </div>
      </div>
    );
  }
}


