import React from 'react';
import raceData from '../../json/races.json';
import { DropDown } from '../form-fields/drop-down.js';


export class DwarfForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection : ''
    };

    this.onChange = this.onChange.bind(this);
  };

  getChoices() {
    let thisRaceData = raceData.filter(this.filterByName)[0];
    let choices = [];
    let item = "";

    for (item in thisRaceData.subraces) {
      console.log(thisRaceData.subraces[item]);
      choices.push(thisRaceData.subraces[item]);
    }

    return choices;
  }

  filterByName(obj) {
    if ('name' in obj) {
      if (obj.name === this.props.race) {
        return true;
      }
    }
  }

  onChange(e) {
    this.setState({
      selection : e.target.value
    });
    this.props.onUpdate(e);
  }

  render() {
    return  <div>This is the {this.props.race} form
      <DropDown name="select_subrace" label="Select Subrace" choices={this.getChoices()} onUpdate={this.onChange}/>

    </div>
  }
}
