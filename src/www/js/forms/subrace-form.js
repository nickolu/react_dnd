import React from 'react';
import raceData from '../../json/races.json';
import * as utilities from "../utilities.js";
import { DropDown } from '../form-fields/drop-down.js';

export class SubraceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection : ''
    };

    this.onChange = this.onChange.bind(this);
  };

  onChange(e) {
    this.setState({
      selection : e.target.value
    });
    this.props.onUpdate(e);
  }

  render() {
    let thisRaceData = utilities.getObjectByName(raceData,this.props.race);
    let choices = [];

    console.log(this.props.race);

    if (thisRaceData && thisRaceData.subraces) {
      choices = thisRaceData.subraces;
    }

    return  <div>
      <DropDown name="select_subrace" label="Select Subrace" choices={choices} onUpdate={this.onChange}/>
    </div>
  }
}
