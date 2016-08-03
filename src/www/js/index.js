import React from 'react';
import ReactDOM from 'react-dom';
import { CharacterSheet } from './character-sheet.js';
import { DropDown } from './form-fields/drop-down.js';
import { TextInput } from './form-fields/text-input.js';
import { SubmitButton } from './form-fields/submit-button.js';
import { RaceForm } from './forms/race-form.js';
import { ClassForm } from './forms/class-form.js';
import { BiographyForm } from './forms/character-biography-form.js';
import { BackgroundForm } from './forms/background-form.js';
import { AbilityScoresForm } from './forms/ability-scores-form.js';
import { CharacterDetailsForm } from './forms/character-details-form.js';

class DndForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charData : {}
    };

    this.update = this.update.bind(this);
  }

  getAbilityScoreIncrease(e) {
    let abilityScoreIncreaseIndex = e.target.name.indexOf('ability_score_increase');
    let abilityScoreIncrease = this.state.charData.ability_score_increase;
    let abilityScore = "";
    let abilityScoreValue = 0;
    let newAbilityScoreIncreases = {};
    let newCharData = {};

    if (abilityScoreIncreaseIndex > -1) {
      if (e.target.checked) {
        abilityScoreValue = e.target.value;
      }
      abilityScore = e.target.name.substring("ability_score_increase_".length,e.target.name.length);
      newAbilityScoreIncreases = Object.assign({},abilityScoreIncrease,{[abilityScore] : abilityScoreValue});
      newCharData = Object.assign({},this.state.charData,{"ability_score_increase" : newAbilityScoreIncreases});
    }

    return newCharData;
  }

  updateSelectedProficiencies(e) {
    let arrayIndex = 0;
    this.state.charData[e.target.name] = this.state.charData[e.target.name] || [];

    if (this.state.charData[e.target.name]) {
      arrayIndex = this.state.charData[e.target.name].indexOf(e.target.value);
      if (e.target.checked) {
        this.state.charData[e.target.name].push(e.target.value);
      } else {
        if (arrayIndex > -1) {
          this.state.charData[e.target.name].splice(arrayIndex, 1);
        }
      }
    }
  }

  update(e) {
    let newCharData = {};

    if (e.target.name === "select_race") {
      
    }

    if (e.target.name.indexOf('ability_score_increase') > -1) {
      newCharData = this.getAbilityScoreIncrease(e);
    } else if (e.target.name.indexOf('proficiency_choice') > -1) {
      this.updateSelectedProficiencies(e);
    } else {
      newCharData = Object.assign({},this.state.charData,{[e.target.name]:e.target.value});
    }

    this.setState({
      charData : Object.assign({},this.state.charData,newCharData)
    });

    console.log("charData from index.js");
    console.log(this.state.charData);
  }

	render() {
  	return <div className="container">

            <div className="row">
              <div className="col-sm-6">
                <TextInput type="text" label="Your Name (Not your Character's Name)" name="player_name" onChange={this.update}/>
                <TextInput type="text" label="Your Character's Name" name="character_name" onChange={this.update}/>
                <RaceForm onUpdate={this.update} charData={this.state.charData}/>
                <ClassForm onUpdate={this.update} />
                <BackgroundForm onUpdate={this.update} />
                <CharacterDetailsForm onUpdate={this.update} />
                <AbilityScoresForm onUpdate={this.update} />

              </div>
              <div className="col-sm-6 output-column">
                <CharacterSheet charData={this.state.charData}/>
              </div>
            </div>


      		</div>;
	}
}

ReactDOM.render(<DndForm/>, document.querySelector('main'));
