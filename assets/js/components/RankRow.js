import React, { Component } from 'react';
import { Socket } from "phoenix";

class RankRow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // //slack api request here, need token
    // fetch("")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result)
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       console.log("Error: " + error)
    //     }
    //   )

      let socket = new Socket("/socket", {params: {token: window.userToken}});
      socket.connect();
      let channel = socket.channel("emoji:all", {});

      console.log("joining...");
      channel.join()
        .receive("ok", response => { console.log("Joined successfully", response) });
  }

  render() {
    return (
      <div className="rank-row row">
        <div className="ranking-container col-lg-3">
          1.
        </div>
        <div className="emoji-container">
          <img src="https://emoji.slack-edge.com/T035W0HUW/ultrafastparrot/35e4b9259b94f773.gif"></img>
        </div>
        <div className="count-container">
          1000
        </div>
      </div>
    )
  }
}

export default RankRow;
