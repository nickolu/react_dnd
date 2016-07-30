import React from 'react';
import raceData from '../../json/races.json';
import * as utilities from "../utilities.js";
import { DropDown } from '../form-fields/drop-down.js';
import { DwarfForm } from '../race-forms/dwarf-form.js';
import { SubraceForm } from './subrace-form.js';

export class RaceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      race : ''
    };
    this.onChange = this.onChange.bind(this);
  };

  onChange(e) {
    this.setState({
      race : document.querySelector('[name=select_race]').value
    });
    this.props.onUpdate(e);
  }

  getChoices() {
    let choices = [];
    let race = "";

    for (race in raceData) {
      choices.push(raceData[race])
    }

    return choices;
  }

  getQuestions() {
    var component_name = this.state.race + "Form";

    switch ( this.state.race ) {
      case "Dwarf" :
        return
        break;
      case "Elf" :
        return <div>This is the elf form</div>
        break;
      default :
        return '';
    }

  }

  getSubraceForm(race) {
    let thisRaceData = utilities.getObjectByName(raceData,this.state.race);

    if (thisRaceData.subraces && thisRaceData.subraces.length) {
      return <SubraceForm race={this.state.race} onUpdate={this.onChange}/>
    }
    return "";
  }



  render() {
    return  <div className="form-field race-form">
              <h2>Race</h2>
              <DropDown name="select_race" label="Select Race" choices={this.getChoices()} onUpdate={this.onChange}/>
              {this.getSubraceForm(this.state.race)}

            </div>
  }
}
