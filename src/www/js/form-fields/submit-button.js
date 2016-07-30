
import React from 'react';

export class SubmitButton extends React.Component {
  constructor(props) {
    super(props);

  };

  render() {
    return  <button onClick={this.props.onUpdate}>Submit</button>
  }
}
