import React from 'react';
import ReactDOM from 'react-dom';
import * as utilities from "./utilities.js";
import npcTraits from '../json/npc-traits.json';
import { TextInput } from './form-fields/text-input.js';
import { SubmitButton } from './form-fields/submit-button.js';

class Generator extends React.Component {
  /**
   * constructor for SpellBook
   * @param  {object} props [element properties/attributes passed in at initialization]
   */
  constructor(props) {
    super(props);

    this.state = {
      lockedInputs : [],
      dependency : "",
      name : "[character name]",
      race : "[race]",
      alignment_lawful : "[lawfulness]",
      alignment_moral : "[morality]",
      distinguishing_marks : "[distinguishing mark]",
      gender : "[gender]",
      high_ability : "[high_ability]",
      low_ability : "[low_ability]",
      talents : "[talent]",
      mannerisms : "[mannerism]",
      interaction_traits : "[interaction trait]",
      bonds : "[bond]",
      flaws : "[flaw]",
      ideals : "[ideal]",
      emotion : "[emotion]",
      eye_color : "[eye color]",
      eye_shape : "[eye shape]",
      hair_color : "[hair color]",
      parents : "[parents]",
      children : "[children]",
      siblings : "[siblings]",
      extended_family : "[extended_family]",
      family_relationship : "[family_relationship]",
      maritial_status : "[maritial_status]"
    };
    this.updateAll = this.updateAll.bind(this);
    this.updateState = this.updateState.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.replaceInput = this.replaceInput.bind(this);
  }

  /**
   * updates all values
   * each input which is not locked will be updated with a new random value
   */
  
  updateAll() {
    let inputEls = document.querySelectorAll('input');
    let _this = this;

    inputEls.forEach((obj) => {
      let objName = obj.getAttribute("name");
      let dependency = "";
      let dependencyVal = "";

      _this.replaceInputWithRandom(objName)

    });
  }

  /**
   * updates each property in the state with the value from its related input element
   * @param  {object || string} e - event object passed from the triggering event or name of property to update
   */
  updateState(e) {
    let inputName = "";
    let inputValue = "";
    let newState = {}

    if (typeof e === "string") {
      inputName = e;
      inputValue = document.querySelector('input[name='+inputName+']').value;
    } else {
      inputName = e.target.getAttribute('name');
      inputValue = e.target.value;
    }

    newState = Object.assign(this.state,{
      [inputName] : inputValue
    })

    this.setState(newState);
  }

  /**
   * gets a random item from array
   * @param  {array}  arr - array of items to pick from
   * @return {string}  
   */
  getRandom(arr) {
    let randomIndex = Math.round(Math.random() * (arr.length - 1));
    let item = "";

    return arr[randomIndex];
  }

  
  /**
   * replaces the value of target input with specified value
   * @param  {string} inputName - name of input/property
   * @param  {string} val       - value to replace with
   */
  replaceInput(inputName,val) {
    let inputEl = document.querySelector('[name='+inputName+']');
    
    inputEl.value = val;
    this.updateState(inputName);
  }

  /**
   * replaces the value of target input with a random value
   * @param  {string} inputName - name of input/property
   */
  replaceInputWithRandom(inputName) {
    let randomVal = "";
    let dependency = "";
    let dependencyVal = "";
    let shouldNotEqual = "";
    let traitsArr = npcTraits.traits[inputName];

    if (npcTraits.options[inputName]) {
      shouldNotEqual = npcTraits.options[inputName].shouldNotEqual || "";
      
      if (npcTraits.options[inputName].dependencies) {
        dependency = this.getRandom(npcTraits.options[inputName].dependencies) || [];  
      }
      
      if (dependency) { 
        dependencyVal = this.state[dependency].toLowerCase();
        traitsArr = npcTraits.traits[inputName][dependencyVal];
      }

      randomVal = this.getRandom(traitsArr);
      
      while (randomVal === this.state[shouldNotEqual]) {
        console.log('should not equal!');
        randomVal = this.getRandom(traitsArr);
      }

    } else if (Array.isArray(npcTraits.traits[inputName])) {
      randomVal = this.getRandom(npcTraits.traits[inputName]);
    }

    this.replaceInput(inputName,randomVal);
  }

  /**
   * renders a trait
   * @param  {function} onUpdate - function to run on update
   * @return {react} - react element
   */
  renderInput(traitName,label) {
    let _this = this;

    function replace() {
      _this.replaceInputWithRandom(traitName);
    }

    function toggleLock(e) {
      let isLocked = utilities.contains(_this.state.lockedInputs,traitName);

      if (isLocked) {
        e.target.className = e.target.className.replace('locked','unlocked');
        _this.state.lockedInputs.splice(_this.state.lockedInputs.indexOf(traitName),1);

      } else {
        e.target.className = e.target.className.replace('unlocked','locked');
        _this.state.lockedInputs.push(traitName);

      }
    }

    return <div>
      <span className="trait-label">{label}</span>
      <SubmitButton 
       type="text" 
       cssClass="btn-lock unlocked glyphicon glyphicon-lock"
       label="" 
       name="lock_input" 
       onUpdate={toggleLock}
      />
      <TextInput 
       type="text" 
       name={traitName}
       onChange={this.updateState}
      />
      <SubmitButton 
       type="text" 
       cssClass="btn-refresh glyphicon glyphicon-refresh"
       label="" 
       name="get_random" 
       onUpdate={replace}
      />
    </div>
  }
  
  /**
   * puts everything in the DOM
   */
	render() {
    let _this = this;
    let genderPronounPossessive = getGenderPronoun(this.state.gender).possessive;
    let genderPronounPersonal = getGenderPronoun(this.state.gender).personal;

    function getGenderPronoun(gender) {
      let pronoun = "";
      let possessive = "";

      gender = gender || "";

      switch (gender.toLowerCase()) {
        case "male" : 
          return {
            personal : "He",
            possessive : "His"
          }
        case "female" : 
          return {
            personal : "She",
            possessive : "Her"
          }
        default : 
          return {
            personal : "This character",
            possessive : "Their"
          }
      }
    }

    function renderDescription(traitName) {
      let traitValue = _this.state[traitName].toLowerCase();
      let traitDescription = traitValue;

      if (npcTraits.descriptions[traitName] && npcTraits.descriptions[traitName][traitValue]) {
        traitDescription = npcTraits.descriptions[traitName][traitValue].toLowerCase();
      }

      return <span className="keyword">{traitDescription}</span>
    }
    
    return  <div className="container generator">
              <div className="row">
                <div className="col-sm-12">
                  <h2>NPC Generator</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  This {renderDescription("gender")} {renderDescription("race")} has a {renderDescription("alignment_lawful")}-{renderDescription("alignment_moral")} alignment and {renderDescription("distinguishing_marks")}. You can see {renderDescription("emotion")} in {genderPronounPossessive.toLowerCase()} {renderDescription("eye_color")}, {renderDescription("eye_shape")} eyes. {genderPronounPersonal} is {renderDescription("high_ability")} yet {renderDescription("low_ability")}. Impressively, {genderPronounPersonal.toLowerCase()} is {renderDescription("talents")}. {genderPronounPersonal} often {renderDescription("mannerisms")} and has a {renderDescription("interaction_traits")} way of speaking. {genderPronounPersonal} is {renderDescription("bonds")} and believes in {renderDescription("ideals")}, but is troubled by {genderPronounPossessive.toLowerCase()} {renderDescription("flaws")}. <br/><br/>

                  {genderPronounPersonal} is {renderDescription("maritial_status")} with {renderDescription("children")}. The rest of {genderPronounPossessive.toLowerCase()} family consists of {renderDescription("siblings")}, {renderDescription("extended_family")}, and {renderDescription("parents")}. {genderPronounPersonal} has a {renderDescription("family_relationship")} relationship with most of them.
                </div>
                <div className="col-sm-6">
                  <SubmitButton 
                   type="text" 
                   label="Randomize All" 
                   name="randomize_all" 
                   onUpdate={this.updateAll}
                  />

                  {this.renderInput("race","Race")}
                  {this.renderInput("gender","Gender")}
                  {this.renderInput("alignment_lawful","Lawful Alignment")}
                  {this.renderInput("alignment_moral","Moral Alignment")}
                  {this.renderInput("distinguishing_marks", "Distinguishing Mark")}
                  {this.renderInput("high_ability", "High Ability")}
                  {this.renderInput("low_ability", "Low Ability")}
                  {this.renderInput("talents", "Talent")}
                  {this.renderInput("mannerisms", "Mannerism")}
                  {this.renderInput("interaction_traits", "Interaction Trait")}
                  {this.renderInput("bonds", "Bond")}
                  {this.renderInput("flaws", "Flaw")}
                  {this.renderInput("ideals", "Ideal")}
                  {this.renderInput("emotion", "Emotion")}

                  <p>Physical</p>

                  {this.renderInput("eye_color","Eye color")}
                  {this.renderInput("eye_shape","Eye shape")}
                  {this.renderInput("hair_color","Hair color")}

                  <p>Family</p>

                  {this.renderInput("parents","Parents")}
                  {this.renderInput("siblings","siblings")}
                  {this.renderInput("extended_family","Extended_family")}
                  {this.renderInput("children","Children")}
                  {this.renderInput("family_relationship","Family relationship")}
                  {this.renderInput("maritial_status","Maritial Status")}
                </div>

                
              </div>
            </div>;
	}
}

ReactDOM.render(<Generator/>, document.querySelector('main'));
