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
    this.props.onUpdate();
  }

  getChoices() {
    let choices = [];
    let background = "";

    for (background in backgroundData) {
      choices.push(backgroundData[background].name)
    }

    return choices;
  }

  render() {
    return  <div className="form-field background-form">
              <DropDown name="select_background" label="Select Background" choices={this.getChoices()} onUpdate={this.onChange}/>
              <div>{this.getQuestions()}</div>
            </div>
  }
}
