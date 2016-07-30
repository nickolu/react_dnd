import React from 'react';
import raceData from '../../json/races.json';
import * as utilities from "../utilities.js";
import { DropDown } from '../form-fields/drop-down.js';

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

  getSubraceForm() {
    var dropdown;
    let thisRaceData = utilities.getObjectByName(raceData,this.props.charData.select_race)
    let subraces = thisRaceData.subraces;
    console.log(thisRaceData);

    if (thisRaceData && thisRaceData.subraces && thisRaceData.subraces.length) {
      return <DropDown name="select_subrace" label="Select Subrace" choices={subraces} onUpdate={this.onChange}/>
    }


  }

  render() {
    let thisRaceData = utilities.getObjectByName(raceData,this.props.race);
    return  <div className="form-field race-form">
              <h2>Race</h2>
              <DropDown name="select_race" label="Select Race" choices={this.getChoices()} onUpdate={this.onChange}/>
              {this.getSubraceForm()}

            </div>
  }
}
