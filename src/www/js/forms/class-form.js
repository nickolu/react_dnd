import React from 'react';
import classData from '../../json/character-classes.json';
import * as utilities from "../utilities.js";

import { DropDown } from '../form-fields/drop-down.js'
import { CheckBoxGroup } from '../form-fields/checkbox-group.js';
import { SkillsForm } from './skills-form.js';

export class ClassForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      character_class : ''
    };
    this.onChange = this.onChange.bind(this);
    this.skillsForm = new SkillsForm(props);
  };

  onChange(e) {

    this.setState({
      character_class : document.querySelector('[name=select_class]').value,
    });


    //this.resetClassData();
    this.skillsForm.setSkillChoices(e);
    this.props.onUpdate(e);
  }

  resetClassData(e) {
    this.props.charData.proficiencies = {}
    this.props.charData.selected_languages = [];
    this.props.charData.feats = [];
    if (e && e.target && e.target.getAttribute('name') === "select_race") {
        this.props.charData.ability_score_increase = {};
    }
  }

  getChoices() {
    let choices = [];
    let character_class = "";

    for (character_class in classData) {
      choices.push(classData[character_class])
    }

    return choices;
  }



  getQuestions() {

    switch ( this.state.character_class ) {
      case "Barbarian" :
        return <div>This is the barbarian form</div>
        break;
      case "Ranger" :
        return <div>This is the ranger form</div>
        break;
      default :
        return '';
    }

  }

  getThisClassData() {
    let className = this.props.charData.select_class;
    let thisClassData = utilities.getObjectByName(classData,className);

    return thisClassData;
  }

  render() {
    let thisClassData = this.getThisClassData();
    return  <div className="form-field character_class-form">
              <h2>Class</h2>
              <DropDown name="select_class" label="Select Class" choices={this.getChoices()} onUpdate={this.onChange}/>
              <div>{this.getQuestions()}</div>

            </div>
  }
}
