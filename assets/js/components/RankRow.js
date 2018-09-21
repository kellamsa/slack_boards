import React, { Component } from 'react';
import { Socket } from "phoenix";

class RankRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emojis: {},
      emojiMap: {}
    };
  }

  componentDidMount() {
    const token = "";
    const _this = this;

    fetch("https://slack.com/api/rtm.connect?token=" + token)
      .then(res => res.json())
      .then((result) => {
          const sock = new WebSocket(result.url + "?token=" + token);

          sock.addEventListener("reaction_added", function(event) {
            console.log(event.data);
          });

          sock.onmessage = function(event) {
            const data = JSON.parse(event.data);

            if (data.type === "reaction_added") {
              const reaction = data.reaction

              const reactionObject = { [reaction]: ((_this.state.emojis[reaction] || 0) + 1) }

              const emojis = Object.assign(_this.state.emojis, reactionObject);

              _this.setState({ emojis });
            }
          };
        },
        (error) => {
          console.log("Error: " + error)
        }
      )

    fetch("https://slack.com/api/emoji.list?token=" + token)
      .then(res => res.json())
      .then((result) => {
        _this.setState({ emojiMap: result.emoji });
      });
  }

  render() {
    return (
      <div>
        <h1>SLACKBOARDS</h1>
        <div className="rank-row-container row">
          {
            Object.entries(this.state.emojis)
              .sort((emoji1, emoji2) => {
                return emoji2[1] - emoji1[1];
              })
              .map((emoji) => {
                const rankRowEmoji = emoji[0];
                const rankRowCount = emoji[1];
                const rankRowImage = this.state.emojiMap[rankRowEmoji];

                return (
                  <div className="rank-row" key={rankRowEmoji}>
                    <div className="rank-row-emoji" styles={{display : 'inline-block'}}>{rankRowEmoji}</div>
                    <img className="rank-row-image" src={rankRowImage} styles={{display : 'inline-block'}} />
                    <h3 className="rank-row-count" styles={{display : 'inline-block'}}>{rankRowCount}</h3>
                    <br />
                  </div>
                );
              })
          }
        </div>
      </div>
    )
  }
}

export default RankRow;
