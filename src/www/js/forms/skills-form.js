import React from 'react';
import * as utilities from "../utilities.js";
import raceData from '../../json/races.json';
import classData from '../../json/character-classes.json';
import backgroundData from '../../json/backgrounds.json';
import { CheckBoxGroup } from '../form-fields/checkbox-group.js';
import { DropDown } from '../form-fields/drop-down.js';
import { TextInput } from '../form-fields/text-input.js';

export class SkillsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onChange = this.onChange.bind(this);
    this.setSkillChoices = this.setSkillChoices.bind(this);
  };

  onChange(e) {
    this.props.onUpdate(e);
  }

  setSkillChoices(e) {
    let type = e.target.getAttribute("name");
    let proficiency = e.target.value;
    let raceName = this.props.charData.select_race || {};
    let className = this.props.charData.select_class || {};
    let backgroundName = this.props.charData.select_background || {};
    let thisRaceData = utilities.getObjectByName(raceData,raceName);
    let thisClassData = utilities.getObjectByName(classData,className);
    let thisBackgroundData = utilities.getObjectByName(backgroundData,backgroundName);
    let subRaceName = this.props.charData.select_subrace || "";
    let thisSubRaceData =  utilities.getObjectByName(thisRaceData.subraces,subRaceName);
    let subraceProficiencies = thisSubRaceData.proficiencies || {};
    console.log(this.props.charData);
    this.props.charData.proficiencies = this.props.charData.proficiencies || {};
    this.props.charData.proficiencies[type] = this.props.charData.proficiencies[type] || [];

    if (e.target.getAttribute("name") === "select_subrace") {
      thisSubRaceData = utilities.getObjectByName(thisRaceData.subraces, e.target.value);
    } else {
      thisSubRaceData = {};
    }

    if (e.target.getAttribute("name") === "select_race") {
      thisRaceData = utilities.getObjectByName(raceData, e.target.value);
      thisSubRaceData = {};
    }

    if (e.target.getAttribute("name") === "select_class") {
      thisClassData = utilities.getObjectByName(classData, e.target.value);
    }

    if (e.target.getAttribute('type') === "checkbox") {
      if (e.target.checked) {
        this.props.charData.proficiencies[type].push(e.target.value);
      } else {
        if (this.props.charData.proficiencies[type].indexOf(e.target.value) > -1) {
          this.props.charData.proficiencies[type].splice(this.props.charData.proficiencies[type].indexOf(proficiency), 1);
        }
      }
    }

    this.props.charData.proficiencies = Object.assign(this.props.charData.proficiencies,thisRaceData.proficiencies,thisSubRaceData.proficiencies,thisClassData.proficiencies);
    this.props.onUpdate(e);
  }

  getSkillChoiceForm() {
    let raceName = this.props.charData.select_race || {};
    let className = this.props.charData.select_class || {};
    let backgroundName = this.props.charData.select_background || {};
    let thisRaceData = utilities.getObjectByName(raceData,raceName);
    let thisClassData = utilities.getObjectByName(classData,className);
    let thisBackgroundData = utilities.getObjectByName(backgroundData,backgroundName);
    let groupName = "select_skills_"+this.props.source;
    let skillChoiceForm = <span></span>;
    let skillChoices = [];
    let optionsLimit = 0;
    let choiceName = "";
    let choice = "";
    let item = "";
    let thisData = {};
    let i = 0;
    let j = 0;
    let l = 0;

    thisData.proficiencies = thisData.proficiencies || {};
    thisData.proficiencies.skills = thisData.proficiencies.skills || [];
    thisData.proficiencies.skills_choice = thisData.proficiencies.skills_choice || [];

    if (thisRaceData && thisRaceData.proficiencies && thisRaceData.proficiencies.skills) {
      thisData.proficiencies.skills = thisData.proficiencies.skills.concat(thisRaceData.proficiencies.skills);

      if (thisRaceData.proficiencies.skills_choice) {
        thisData.proficiencies.skills_choice = thisData.proficiencies.skills_choice.concat(thisRaceData.proficiencies.skills_choice);
      }
    }

    if (thisClassData && thisClassData.proficiencies && thisClassData.proficiencies.skills) {
      thisData.proficiencies.skills = thisData.proficiencies.skills.concat(thisClassData.proficiencies.skills);

      if (thisClassData.proficiencies.skills_choice) {
        thisData.proficiencies.skills_choice = thisData.proficiencies.skills_choice.concat(thisClassData.proficiencies.skills_choice);
      }
    }

    if (thisBackgroundData && thisBackgroundData.proficiencies && thisBackgroundData.proficiencies.skills) {
      thisData.proficiencies.skills = thisData.proficiencies.skills.concat(thisBackgroundData.proficiencies.skills);

      if (thisBackgroundData.proficiencies.skills_choice) {
        thisData.proficiencies.skills_choice = thisData.proficiencies.skills_choice.concat(thisBackgroundData.proficiencies.skills_choice);
      }
    }

    if (thisData.proficiencies) {
      for (item in thisData.proficiencies) {
        if (thisData.proficiencies[item].indexOf('choice') > -1) {
          choiceName = item+"_choice";

          if (item !== "languages") {
            if (thisData.proficiencies[choiceName]) {
                l = thisData.proficiencies[choiceName].length;

                for (j = 0; j < l; j += 1) {
                  choice = thisData.proficiencies[choiceName][j]

                  skillChoices.push({
                    "name" : item,
                    "label" : utilities.titleCase(choice)+" "+utilities.titleCase(item),
                    "value" : choice,
                    "id" : choice
                  })
                }
                skillChoiceForm = <CheckBoxGroup
                                          name="skill_choice_form"
                                          label="Select Skills"
                                          choices={skillChoices}
                                          groupLabel="Select Skills"
                                          groupName={groupName}
                                          optionsLimit={utilities.countItemInArray(thisData.proficiencies[item],"choice")}
                                          onUpdate={this.setSkillChoices}
                                        />
            }
          }
        }
      }
    }

    return skillChoiceForm;
  }

  render() {
    return <div>{this.getSkillChoiceForm()}</div>
  }
}
