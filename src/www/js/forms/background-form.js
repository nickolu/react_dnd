import React from 'react';
import backgroundData from '../../json/backgrounds.json';
import { DropDown } from '../form-fields/drop-down.js';

export class BackgroundForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      background : '',
    };
    this.onChange = this.onChange.bind(this);
  };

  onChange(e) {
    this.setState({
      background : document.querySelector('[name=select_background]').value
    });
    this.props.onUpdate(e);
  }

  getChoices() {
    let choices = [];
    let background = "";

    for (background in backgroundData) {
      choices.push(backgroundData[background])
    }

    return choices;
  }

  getQuestions() {
    console.log(this.state.background);

    switch ( this.state.background ) {
      case "Acolyte" :
        return <div>This is the Acolyte form</div>
        break;
      case "Criminal" :
        return <div>This is the Criminal form</div>
        break;
      case "Custom" :
        return <div>This is the Custom form</div>
      default :
        return '';
    }

  }

  render() {
    return  <div className="form-field background-form">
              <h2>Background</h2>
              <DropDown name="select_background" label="Select Background" choices={this.getChoices()} onUpdate={this.onChange}/>
              <div>{this.getQuestions()}</div>
            </div>
  }
}
