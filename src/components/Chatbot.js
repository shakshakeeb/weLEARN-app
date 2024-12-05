import React, { Component } from 'react';

class KommunicateChat extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    (function(d, m){
      // Set up Kommunicate settings with appId, popupWidget, and automaticChatOpenOnNavigation properties
      var kommunicateSettings = {"appId":"36f5850cc1b02ea2f27dcd17ed553b9fd","popupWidget":true,
      "automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }

  render() {
    // Render an empty div as a placeholder for the Kommunicate chat widget
    return (
      <div></div>
    )
  }
}

export default KommunicateChat;
