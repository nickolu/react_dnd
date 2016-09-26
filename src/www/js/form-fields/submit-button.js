import React from 'react';

export class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
  };


  render() {
  	var cssClass = this.props.cssClass || "btn";

    return  <div className={cssClass} onClick={this.props.onUpdate}>{this.props.label}</div>
  }
}
