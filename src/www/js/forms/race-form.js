import React from 'react';
import raceData from '../../json/races.json';
import * as utilities from "../utilities.js";
import { DropDown } from '../form-fields/drop-down.js';
import { TextInput } from '../form-fields/text-input.js';
import { CheckBoxGroup } from '../form-fields/checkbox-group.js';

export class RaceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
  };

  onChange(e) {
    this.setState({
      race : document.querySelector('[name=select_race]').value,
    });

    this.resetRaceData();
    this.props.onUpdate(e);
  }


  resetRaceData() {
    console.log('resetRaceData:')
    console.log(this.props.charData);
    this.props.charData.proficiency_choice_tools = [];
    this.props.charData.proficiency_choice_abilities = [];
    this.props.charData.proficiency_choice_weapons = [];
    this.props.charData.proficiency_choice_skills = [];
    console.log(this.props.charData)
  }

  getChoices() {
    let choices = [];
    let race = "";

    for (race in raceData) {
      choices.push(raceData[race])
    }

    return choices;
  }

  getProficiencyChoices(thisRaceData) {
    let proficiencyChoiceForm = "";
    let proficiencyChoices = [];
    let choiceName = "";
    let choice = "";
    let item = "";
    let i = 0;
    let j = 0;
    let l = 0;

    if (thisRaceData.proficiencies) {
      for (item in thisRaceData.proficiencies) {
        if (thisRaceData.proficiencies[item].indexOf('choice') > -1) {
          choiceName = item+"_choice";
          if (thisRaceData.proficiencies[choiceName]) {
              l = thisRaceData.proficiencies[choiceName].length;

              for (j = 0; j < l; j += 1) {
                choice = thisRaceData.proficiencies[choiceName][j]

                proficiencyChoices.push({
                  "name" : "proficiency_choice_"+item,
                  "label" : utilities.titleCase(choice)+" "+utilities.titleCase(item),
                  "value" : choice,
                  "id" : choice
                })
              }
          }





          proficiencyChoiceForm = <CheckBoxGroup
                                    name="proficiency_choice_form"
                                    label="Select Proficiencies"
                                    choices={proficiencyChoices}
                                    groupLabel="Select Skill Proficiencies"
                                    groupName="proficieny_choices"
                                    optionsLimit={utilities.countItemInArray(thisRaceData.proficiencies[item],"choice")}
                                    onUpdate={this.props.onUpdate}
                                  />
        }
      }
    }

    return proficiencyChoiceForm;
  }

  getSubraceForm() {
    let raceName = this.props.charData.select_race;
    let thisRaceData = utilities.getObjectByName(raceData,raceName);
    let subraces = thisRaceData.subraces;
    let subRaceForm = "";
    let languageChoiceForm = "";
    let abilityScoreChoiceForm = "";

    let abilityScores = [
      {label : "Constitution", name : "ability_score_increase_con", "value" : 1, "id" : "con"},
      {label : "Strength", name : "ability_score_increase_str", "value" : 1, "id" : "str"},
      {label : "Dexterity", name : "ability_score_increase_dex", "value" : 1, "id" : "dex"},
      {label : "Wisdom", name : "ability_score_increase_wis", "value" : 1, "id" : "wis"},
      {label : "Intelligence", name : "ability_score_increase_int", "value" : 1, "id" : "int"},
      {label : "Charisma", name : "ability_score_increase_cha", "value" : 1, "id" : "cha"}
    ];

    if (thisRaceData) {
      if (thisRaceData.languages && thisRaceData.languages.indexOf("choice") > -1) {
        languageChoiceForm = <TextInput type="text" label="Extra Language" name="select_extra_language" onChange={this.props.onUpdate}/>
      }

      if (thisRaceData.subraces && thisRaceData.subraces.length) {
        subRaceForm = <DropDown name="select_subrace" label="Select Subrace" choices={subraces} onUpdate={this.props.onUpdate}/>;
      }

      if (raceName === "Half-Elf") {
        abilityScoreChoiceForm = <CheckBoxGroup name="half_elf_abilities" label="Select Abilities" choices={abilityScores} groupLabel="Select Two Abilities" groupName="halfelf_ability_score" optionsLimit={thisRaceData.ability_score_choices} onUpdate={this.props.onUpdate} />;
      }
    }

    return  <div>
              {subRaceForm}
              {languageChoiceForm}
              {abilityScoreChoiceForm}
              {this.getProficiencyChoices(thisRaceData)}
            </div>;
  }


  render() {
    let thisRaceData = utilities.getObjectByName(raceData,this.props.race);
    return  <div className="form-field race-form">
              <h2>Race</h2>
              <DropDown name="select_race" className="select-race" label="Select Race" choices={this.getChoices()} onUpdate={this.onChange}/>
              {this.getSubraceForm()}
            </div>
  }

}
