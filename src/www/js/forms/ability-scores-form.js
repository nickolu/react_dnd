import React from 'react';
import { DropDown } from '../form-fields/drop-down.js';
import { TextInput } from '../form-fields/text-input.js';

export class AbilityScoresForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      con : 10,
      dex : 10,
      str : 10,
      wis : 10,
      int : 10,
      cha : 10
    };

    this.onChange = this.onChange.bind(this);
  };

  onChange(e) {
    console.log(e.target.value);
    this.props.onUpdate(e);
  }

  getChoices() {
    let choices = [];
    let ability_score = "";

    for (ability_score in ability_scoreData) {
      choices.push(ability_scoreData[ability_score].name)
    }

    return choices;
  }


  render() {

    return  <div className="form-field ability_score-form">
              <h2>Ability Scores</h2>
              <TextInput type="number" label="Strength" name="ability_score_str" onChange={this.onChange}/>
              <TextInput type="number" label="Constitution" name="ability_score_con" onChange={this.onChange}/>
              <TextInput type="number" label="Dexterity" name="ability_score_dex" onChange={this.onChange}/>
              <TextInput type="number" label="Wisdom" name="ability_score_wis" onChange={this.onChange}/>
              <TextInput type="number" label="Intelligence" name="ability_score_int" onChange={this.onChange}/>
              <TextInput type="number" label="Charisma" name="ability_score_cha" onChange={this.onChange}/>
            </div>
  }
}
