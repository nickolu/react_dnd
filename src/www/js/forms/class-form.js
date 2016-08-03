import React from 'react';
import classData from '../../json/character-classes.json';
import { DropDown } from '../form-fields/drop-down.js'

export class ClassForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      character_class : ''
    };
    this.onChange = this.onChange.bind(this);
  };

  onChange(e) {
    this.setState({
      character_class : document.querySelector('[name=select_class]').value
    });
    this.props.onUpdate(e);
  }

  getChoices() {
    let choices = [];
    let character_class = "";

    for (character_class in classData) {
      choices.push(classData[character_class])
    }

    return choices;
  }

  getQuestions() {
    
    switch ( this.state.character_class ) {
      case "Barbarian" :
        return <div>This is the barbarian form</div>
        break;
      case "Ranger" :
        return <div>This is the ranger form</div>
        break;
      default :
        return '';
    }

  }

  render() {
    return  <div className="form-field character_class-form">
              <h2>Class</h2>
              <DropDown name="select_class" label="Select Class" choices={this.getChoices()} onUpdate={this.onChange}/>
              <div>{this.getQuestions()}</div>
            </div>
  }
}
