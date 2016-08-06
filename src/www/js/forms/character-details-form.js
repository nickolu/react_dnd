import React from 'react';
import classData from '../../json/character-classes.json';
import raceData from '../../json/races.json';
import * as utilities from "../utilities.js";
import { RadioGroup } from '../form-fields/radio-group.js';
import { TextInput } from '../form-fields/text-input.js';

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

              <h3>Age</h3>
              <p>{this.props.formDescription('age')}</p>
              <TextInput type="text" label="Your Age" name="select_age" />

              <h3>Size</h3>
              <p>{this.props.formDescription('size')}</p>
              <TextInput type="text" label="Your Size" name="select_size" />

              <h3>Alignment</h3>
              <p>{this.props.formDescription('alignment')}</p>
              <RadioGroup groupName="alignment_lawful" choices={choices_lawful} onUpdate={this.props.onUpdate}/>
              <RadioGroup groupName="alignment_moral" choices={choices_moral} onUpdate={this.props.onUpdate}/>

            </div>
  }
}
