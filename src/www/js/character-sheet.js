import React from 'react';
import raceData from '../json/races.json';
import classData from '../json/character-classes.json';
import backgroundData from '../json/backgrounds.json';
import featsData from '../json/feats.json';
import * as utilities from './utilities.js';


/**
 * CharacterSheet
 *
 * Represents the output for the character builder form
 */
export class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
  };


  /**
   * getProfileInfo - gets the markup for profile information
   *
   * @return {react object} view for the profile information block
   */
  getProfileInfo() {
    let selected_race = this.props.charData.select_subrace || this.props.charData.select_race || "";

    return  <div>
              <div>Player Name: {this.props.charData.player_name}</div>
              <div>Character Name: {this.props.charData.character_name}</div>
              <div>Race: {selected_race}</div>
              <div>Class: {this.props.charData.select_class}</div>
              <div>Background: {this.props.charData.select_background}</div>
              <div>Alignment: {this.props.charData.alignment_lawful} {this.props.charData.alignment_moral}</div>
            </div>
  }




  /**
   * getRaceAbilityScoreBonus - description
   *
   * @param  {string} ability name of the ability score to return
   * @param  {string} race    name of the race to check
   * @return {number}         ability score bonus for selected race
   */
  getRaceAbilityScoreBonus(ability,race) {
    let thisRaceData = utilities.getObjectByName(raceData, race);
    let subraceSelect = document.querySelector('[name=select_subrace]');
    let bonus = 0;
    let subraceName = "";
    let thisSubRaceData = {};

    if (subraceSelect) {
      thisSubRaceData = utilities.getObjectByName(thisRaceData.subraces, subraceSelect.value);
    }

    if (thisRaceData.ability_score_increase && thisRaceData.ability_score_increase[ability]) {
      bonus = Number(thisRaceData.ability_score_increase[ability]) || 0;
    }

    if (thisSubRaceData && thisSubRaceData.ability_score_increase && thisSubRaceData.ability_score_increase[ability]) {
      bonus += Number(thisSubRaceData.ability_score_increase[ability]) || 0;
    }

    return Number(bonus);
  }


  /**
   * getSelectedAbilityScoreBonus - gets ability score bonuses selected by the user
   *
   * @param  {string} ability name of the ability score to return
   * @return {number}         ability score bonus for selected ability
   */
  getSelectedAbilityScoreBonus(ability) {
    let thisRaceData = this.props.charData;
    let bonus = 0;

    if (thisRaceData && thisRaceData.ability_score_increase && thisRaceData.ability_score_increase[ability]) {
      bonus = thisRaceData.ability_score_increase[ability] || 0;
    }

    return Number(bonus);
  }


  /**
   * getAbilityScore - gets the total ability score for selected ability
   *
   * @param  {string} name ability score to return
   * @return {number}      total ability score for selected ability from all sources
   */
  getAbilityScore(name) {
    let base = Number(this.props.charData['ability_score_'+name]) || 0;
    let raceBonus = Number(this.getRaceAbilityScoreBonus(name,this.props.charData.select_race)) || 0;
    let selectedBonus = Number(this.getSelectedAbilityScoreBonus(name)) || 0;

    return  Number(base + raceBonus + selectedBonus) || 0;
  }


  /**
   * getAbilityScores - gets the markup for ability scores
   *
   * @return {react object}  view for the ability scores block
   */
  getAbilityScores() {
    let selected_race = this.props.charData.select_subrace || this.props.charData.select_race || "";
    let score_names = ['str','con','dex','wis','int','cha'];
    let i = 0;
    let ability_scores = {};
    let race_bonus = {};
    let selected_bonus = {};
    let base_score = {};
    let score_breakdown = "";

    for (i in score_names) {
      base_score[score_names[i]] = this.props.charData['ability_score_'+score_names[i]] || 0;
      race_bonus[score_names[i]] = this.getRaceAbilityScoreBonus(score_names[i],this.props.charData.select_race) ? " + "+this.getRaceAbilityScoreBonus(score_names[i],this.props.charData.select_race) : "";
      selected_bonus[score_names[i]] = this.getSelectedAbilityScoreBonus(score_names[i]) ? " + "+this.getSelectedAbilityScoreBonus(score_names[i]) : "";
      score_breakdown = this.getAbilityScore(score_names[i]) === base_score[score_names[i]] ? "" : " ("+base_score[score_names[i]] +""+ race_bonus[score_names[i]]+""+selected_bonus[score_names[i]]+")";
      ability_scores[score_names[i]] = (this.getAbilityScore(score_names[i])) + score_breakdown;
    }

    return  <ul>
              <li><span className="as-label">Strength:</span> {ability_scores.str} {this.getAbilityModifier('str')}</li>
              <li><span className="as-label">Constitution:</span> {ability_scores.con} {this.getAbilityModifier('con')}</li>
              <li><span className="as-label">Dexterity:</span> {ability_scores.dex} {this.getAbilityModifier('dex')}</li>
              <li><span className="as-label">Wisdom:</span> {ability_scores.wis} {this.getAbilityModifier('wis')}</li>
              <li><span className="as-label">Intelligence:</span> {ability_scores.int} {this.getAbilityModifier('int')}</li>
              <li><span className="as-label">Charisma:</span> {ability_scores.cha} {this.getAbilityModifier('cha')}</li>
            </ul>
  }


  /**
   * getAbilityModifier - gets the ability modifier for an ability score
   *
   * @param  {string} ability name of the ability modifier to return
   * @return {number}         total modifier for the ability score
   */
  getAbilityModifier(ability) {
    if (this.props.charData['ability_score_'+ability]) {
      if (utilities.getModifier(this.getAbilityScore(ability)) && this.getAbilityScore(ability) > 0) {
        return <span>[Modifier: {utilities.getModifier(this.getAbilityScore(ability))}]</span>
      }
    }
  }


  /**
   * getProficiencies - gets the markup for the list of proficiences from selected type
   *
   * @param  {string} type type of character proficiencies to get (race, class, background)
   * @return {react object}      view for the list of proficiencies
   */

   getProficiencies(type) {
     let raceName = document.querySelector('[name=select_race]') ? document.querySelector('[name=select_race]').value : "";
     let subraceName = document.querySelector('[name=select_subrace]') ? document.querySelector('[name=select_subrace]').value : "";
     let thisCharData = this.props.charData || {};
     let thisRaceData = utilities.getObjectByName(raceData, raceName);
     let thisSubraceData = utilities.getObjectByName(thisRaceData.subraces, subraceName);
     let proficiencies = {};
     let id = -1;

     proficiencies[type] = [];

     if (thisCharData.proficiencies && thisCharData.proficiencies[type]) {
       proficiencies[type] = proficiencies[type].concat(thisCharData.proficiencies[type]);
     }

     if (thisSubraceData.proficiencies && thisSubraceData.proficiencies[type]) {
       proficiencies[type] = proficiencies[type].concat(thisSubraceData.proficiencies[type]);
     }

     if (proficiencies[type]) {
       return proficiencies[type].map(function(obj) {
         id += 1;

         if (obj !== "choice") {
           return <li key={id}>{obj}</li>
         }
       });
     }

   }

  /**
   * getRacialFeats - gets list of features of selected race and subrace
   *
   * @param  {string} raceName name of chosen race
   * @return {react object}          view for list of racial features
   */
  getRacialFeats(raceName) {
    let thisRace = utilities.getObjectByName(raceData,raceName);
    let feats = [];
    let allFeats = [];
    let uniqueFeats = [];
    let subrace = {};
    let i = 0;
    let j = -1;

    if (thisRace.feats && thisRace.feats.length) {
      feats = thisRace.feats;
    }

    if (this.props.charData.select_subrace) {
      subrace = utilities.getObjectByName(thisRace.subraces, this.props.charData.select_subrace);

      if (subrace && subrace.feats) {
        allFeats = feats.concat(subrace.feats) || feats;
        feats = allFeats;
      }
    }

    if (this.props.charData.feats) {
      allFeats = feats.concat(this.props.charData.feats) || allFeats;
      feats = allFeats;
    }

    if (feats) {
      for (i in feats) {
        if (uniqueFeats.indexOf(feats[i]) === -1) {
          if (featsData[feats[i]]) {
            uniqueFeats.push(featsData[feats[i]]);
          } else {
            uniqueFeats.push({
              "name" : feats[i],
              "description" : "feat not defined"
            });
          }
        }
      }
    }

    if (uniqueFeats) {
      return uniqueFeats.map(function(obj){
        j += 1;
        return  <li key={j}>
                  <h4>{obj.name}</h4>
                  <p>{obj.description}</p>
                </li>
      });
    }

  }

  /**
   * getClassFeats - gets list of features of selected class
   *
   * @param  {string} heroClass name of chosen class
   * @return {react object}          view for list of class features
   */
  getClassFeats(heroClass) {
    let thisClass = utilities.getObjectByName(classData,heroClass);
    let feats = thisClass.feats || [];
    let uniqueFeats = [];
    let specialty = {};
    let allFeats = [];
    let i = 0;
    let j = -1;

    if (this.props.charData.select_specialty) {
      specialty = utilities.getObjectByName(thisClass.specialties, this.props.charData.select_specialty);
      allFeats = feats.concat(specialty.feats) || feats;

      for (i in allFeats) {
        if (uniqueFeats.indexOf(allFeats[i]) === -1) {
          uniqueFeats.push(allFeats[i]);
        }
      }
    } else {
      for (i in feats) {
        if (uniqueFeats.indexOf(feats[i]) === -1) {
          uniqueFeats.push(feats[i]);
        }
      }
    }

    return uniqueFeats.map(function(obj){
      j += 1;
      return <li key={j}>{obj}</li>
    });
  }

  /**
   * getBackgroundFeats - gets list of features of selected background
   *
   * @param  {string} background name of chosen background
   * @return {react object}          view for list of background features
   */
  getBackgroundFeats(background) {
    let thisBackground = utilities.getObjectByName(backgroundData,background);
    let feats = thisBackground.feats || [];
    let allFeats = [];
    let uniqueFeats = [];
    let i = 0;
    let j = -1;

    for (i in feats) {
      if (uniqueFeats.indexOf(feats[i]) === -1) {
        uniqueFeats.push(feats[i]);
      }
    }

    if (uniqueFeats) {
      return uniqueFeats.map(function(obj){
        j += 1;
        return <li key={j}>{obj}</li>
      });
    }
  }


  /**
   * render - renders content to the DOM
   *
   * @return {type}  view for CharacterSheet
   */
  render() {
  	return <div className="character-sheet">
            <h1>Character Sheet</h1>
            {this.getProfileInfo()}

            <h2>Ability Scores</h2>
            {this.getAbilityScores()}

            <h2>Proficiencies</h2>
            <h4>Skills</h4>
            <ul>
              {this.getProficiencies('skills')}
            </ul>

            <h4>Saving Throws</h4>
            <ul>
              {this.getProficiencies('saving_throws')}
            </ul>

            <h4>Tools</h4>
            <ul>
              {this.getProficiencies('tools')}
            </ul>

            <h4>Weapons</h4>
            <ul>
              {this.getProficiencies('weapons')}
            </ul>

            <h4>Languages</h4>
            <ul>
              {this.getProficiencies('languages')}
            </ul>

            <h2>Racial Features</h2>
            <ul>
              {this.getRacialFeats(this.props.charData.select_race)}
            </ul>

            <h2>Class Features</h2>
            <ul>
              {this.getClassFeats(this.props.charData.select_class)}
            </ul>

            <h2>Background Features</h2>
            <ul>
              {this.getBackgroundFeats(this.props.charData.select_background)}
            </ul>
          </div>;
	}
}
