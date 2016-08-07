import React from 'react';
import raceData from '../../json/races.json';
import * as utilities from "../utilities.js";
import { DropDown } from '../form-fields/drop-down.js';
import { TextInput } from '../form-fields/text-input.js';
import { CheckBoxGroup } from '../form-fields/checkbox-group.js';
import { SubmitButton } from '../form-fields/submit-button.js';

export class RaceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.setLanguageChoice = this.setLanguageChoice.bind(this);
  };

  onChange(e) {
    this.setState({
      race : document.querySelector('[name=select_race]').value,
    });

    this.resetRaceData();
    this.props.onUpdate(e);
  }

  setLanguageChoice(e) {
    let languageElems = document.querySelectorAll('[name=select_extra_language]') || [];
    let l = languageElems.length;
    let i = 0;

    this.props.charData.selected_languages = this.props.charData.selected_languages || [];

    if (l > 0) {
      for (i=0; i<l; i += 1) {
          this.props.charData.selected_languages.push(languageElems[i].value);
      }
    } else {
      this.props.charData.selected_languages = [];
    }

    this.props.onUpdate(e);
  }

  resetRaceData() {
    this.props.charData.proficiency_choice_tools = [];
    this.props.charData.proficiency_choice_abilities = [];
    this.props.charData.proficiency_choice_weapons = [];
    this.props.charData.proficiency_choice_skills = [];
    this.props.charData.proficiency_choice_languages = [];
    this.props.charData.selected_languages = [];
  }

  getRaceNames() {
    let raceNames = [];
    let race = "";

    for (race in raceData) {
      raceNames.push(raceData[race])
    }

    return raceNames;
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

  getDraconicAncestryForm(thisRaceData) {
    let raceName = this.props.charData.select_race;
    let draconicAncestryForm = "";
    let draconicAncestryChoices = [];
    let item = "";

    if (raceName === "Dragonborn") {

      for (item in thisRaceData.draconic_ancestry) {
        draconicAncestryChoices.push({
          id : thisRaceData.draconic_ancestry[item].name,
          label : thisRaceData.draconic_ancestry[item].name+" | "+thisRaceData.draconic_ancestry[item].damage_type+" | "+thisRaceData.draconic_ancestry[item].breath_weapon,
          name : thisRaceData.draconic_ancestry[item].name
        });
      }
      return <DropDown name="select_draconic_ancestry" className="select-race" label="Select Draconic Ancestry" choices={draconicAncestryChoices} onUpdate={this.onChange}/>;
    }

    return false;
  }

  getAbilityScoreChoiceForm (thisRaceData) {
    let raceName = this.props.charData.select_race;
    let abilityScores = [
      {label : "Strength", name : "ability_score_increase_str", value : 1, id : "str"},
      {label : "Constitution", name : "ability_score_increase_con", value : 1, id : "con"},
      {label : "Dexterity", name : "ability_score_increase_dex", value : 1, id : "dex"},
      {label : "Wisdom", name : "ability_score_increase_wis", value : 1, id : "wis"},
      {label : "Intelligence", name : "ability_score_increase_int", value : 1, id : "int"},
      {label : "Charisma", name : "ability_score_increase_cha", value : 1, id : "cha"}
    ];

    if (raceName === "Half-Elf") {
      return <CheckBoxGroup name="half_elf_abilities" label="Select Abilities" choices={abilityScores} groupLabel="Select Two Abilities" groupName="halfelf_ability_score" optionsLimit={thisRaceData.ability_score_choices} onUpdate={this.props.onUpdate} />;
    }
  }

  getLanguageChoiceForm (thisRaceData) {
    let raceName = this.props.charData.select_race;
    let subRaceName = this.props.charData.select_subrace;
    let thisSubRaceData = utilities.getObjectByName(thisRaceData.subraces,subRaceName);;
    let languageChoiceForm = "";

    if (thisRaceData) {
      if (thisRaceData.proficiencies.languages && thisRaceData.proficiencies.languages.indexOf("choice") > -1) {
        languageChoiceForm = <div><TextInput type="text" label="Extra Language" name="select_extra_language" /><SubmitButton label="Choose" onUpdate={this.setLanguageChoice} /></div>
      }

      if (thisSubRaceData) {
        if (thisSubRaceData.proficiencies && thisSubRaceData.proficiencies.languages && thisSubRaceData.proficiencies.languages.indexOf("choice") > -1) {
          languageChoiceForm = <div><TextInput type="text" label="Extra Language" name="select_extra_language" /><SubmitButton label="Choose" onUpdate={this.setLanguageChoice} /></div>
        }
      }

      if (this.props.charData.selected_languages && this.props.charData.selected_languages.length > 0) {
        languageChoiceForm = <div><SubmitButton label="Choose a different language" onUpdate={this.setLanguageChoice} /></div>
      }
    }

    return languageChoiceForm
  }

  getSubraceForm(thisRaceData) {
    let raceName = this.props.charData.select_race;
    let subRaceName = this.props.charData.select_subrace;
    let thisSubRaceData = utilities.getObjectByName(thisRaceData.subraces,subRaceName);;
    let subraces = thisRaceData.subraces;
    let subRaceForm = "";

    if (thisRaceData) {
      if (subraces && subraces.length) {
        subRaceForm = <DropDown name="select_subrace" label="Select Subrace" choices={subraces} onUpdate={this.props.onUpdate}/>;
      }
    }

    return subRaceForm;
  }


    getThisRaceData() {
      let raceName = this.props.charData.select_race;
      let subRaceName = this.props.charData.select_subrace;
      let thisRaceData = utilities.getObjectByName(raceData,raceName);

      return thisRaceData;
    }


  render() {
    let thisRaceData = this.getThisRaceData();

    return  <div className="form-field race-form">
              <h2>Race</h2>
              <DropDown name="select_race" className="select-race" label="Select Race" choices={this.getRaceNames()} onUpdate={this.onChange}/>
              {this.getSubraceForm(thisRaceData)}
              {this.getLanguageChoiceForm(thisRaceData)}
              {this.getAbilityScoreChoiceForm(thisRaceData)}
              {this.getProficiencyChoices(thisRaceData)}
              {this.getDraconicAncestryForm(thisRaceData)}
            </div>
  }

}
