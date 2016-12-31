import React from 'react';

/**
 * TextInput();
 *
 * Params: 
 * 
 * @param {string} cssClass - type attribute for input element ("text" || "paragraph")
 * @param {string || number} value - value to associate with button click (optional)
 * @param {string} label - text label for element
 * @param {function} onUpdate - function to execute when the button is clicked
 *
 * Example: 
 * 
  <SubmitButton 
     type="text" 
     label="Submit" 
     name="submit_data" 
     onChange={this.update}
   />
 */
export class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
  	var cssClass = "btn ";

  	if (this.props.cssClass) {
  		cssClass += this.props.cssClass;	
  	}
  	

    return  <div className={cssClass} data-key={this.props.value} onClick={this.props.onUpdate}>{this.props.label}</div>
  }
}
