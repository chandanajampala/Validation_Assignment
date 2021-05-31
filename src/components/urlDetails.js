import React, { Component } from "react";
import getURL from "./tokens/getURL";
import Button from "@material-ui/core/Button";
import "./urlDetails.css";

export default class UrlDetails extends Component {
  constructor(props) {
    super(props);
    this.interval = {};
    this.state = {
      urlData: localStorage.getItem(this.props.url)
        ? JSON.parse(localStorage.getItem(this.props.url))
        : {},
      url: this.props.url,
    };
  }
  componentDidMount() {
    this.getURLData(this.state.url);
    this.interval = setInterval(async ()=>{await this.getURLData(this.state.url)}, 30000);
  }
   getURLData(url) {
     getURL(url).then((items) => {
        this.setState({ urlData: JSON.parse(localStorage.getItem(url)) });
      });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { urlData } = this.state;
    return (
      <div className="urlDetails">
        <div className="urlData">
          <div className="urlTitle">{urlData.title}</div>
          <div className="url">{this.state.url}</div>
        </div>
        <div className="urlStatus">
            <div className="lastCalled">{`Last called: ${urlData.lastcalled} `}</div>
                 <Button variant="contained" className={urlData.status?urlData.status:"PENDING"} onClick={()=>{this.getURLData(this.state.url)}}>{urlData.status?urlData.status:"PENDING" }</Button>
        </div>
      </div>
    );
  }
}

// import React,{ useEffect, useState } from 'react'
// import getURL from './tokens/getURL';
// export default function UrlDetails(props) {
//     const [urlData, seturlData] = useState({});
//     useEffect(() => {
//         // seturlData(JSON.parse(localStorage.getItem(props.url)));
//         getURL(props.url)
//           .then(items => {
//             seturlData(JSON.parse(localStorage.getItem(props.url)));

//           })
//       })
//     return (

//     )
// }
