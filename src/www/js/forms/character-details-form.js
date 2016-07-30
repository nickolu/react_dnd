import React from 'react';
import classData from '../../json/character-classes.json';
import { RadioGroup } from '../form-fields/radio-group.js';

export class CharacterDetailsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue : {
          moral : 'neutral',
          law : 'neutral'
      }
    };
    this.onChange = this.onChange.bind(this);
  };

  onChange(e) {

    this.props.onUpdate(e);
  }

  render() {
    let choices_lawful = [
      {"name" : "Lawful", "value" : "Lawful"},
      {"name" : "Neutral", "value" : "Neutral"},
      {"name" : "Chaotic", "value" : "Chaotic"}
    ];
    let choices_moral = [
      {"name" : "Good", "value" : "Good"},
      {"name" : "Neutral", "value" : "Neutral"},
      {"name" : "Evil", "value" : "Evil"}
    ];

    return  <div className="form-field character_class-form">
              <h2>Character Details</h2>
              <h3>Alignment</h3>
              <RadioGroup groupName="alignment_lawful" choices={choices_lawful} onUpdate={this.props.onUpdate}/>
              <RadioGroup groupName="alignment_moral" choices={choices_moral} onUpdate={this.props.onUpdate}/>

            </div>
  }
}
