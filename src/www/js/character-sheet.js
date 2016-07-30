import React from 'react';
import raceData from '../json/races.json';
import classData from '../json/character-classes.json';
import * as utilities from './utilities.js';

export class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);

  };

  getRaceBonus(ability,race) {
    let bonus = 0;
    let specialty_selection = document.querySelector('[name=select_subrace]');
    let thisRaceData = {};
    let item = {};
    let i = 0;


    for (i=0;i<raceData.length;i++) {
      if (raceData[i].name === race) {
        thisRaceData = raceData[i];

        break;
      }
    }

    if (thisRaceData.ability_score_increase && thisRaceData.ability_score_increase[ability]) {
      bonus = Number(thisRaceData.ability_score_increase[ability]) || 0;
    }

    if (thisRaceData.subraces) {
      if (specialty_selection && specialty_selection.value) {
        for (item in thisRaceData.subraces) {
          if (thisRaceData.subraces[item].name === specialty_selection.value) {
            bonus += Number(thisRaceData.subraces[item].ability_score_increase[ability]) || 0;
          }
        }
      }
    }

    return Number(bonus);
  }

  getClassBonus(ability, race) {
    let bonus = 0;
    let specialty_selection = document.querySelector('[name=select_subrace]');
    let thisRaceData = {};
    let item = {};
    let i = 0;


    for (i=0;i<raceData.length;i++) {
      if (raceData[i].name === race) {
        thisRaceData = raceData[i];

        break;
      }
    }

    if (thisRaceData.ability_score_increase && thisRaceData.ability_score_increase[ability]) {
      bonus = Number(thisRaceData.ability_score_increase[ability]) || 0;
    }

    if (thisRaceData.subraces) {
      if (specialty_selection && specialty_selection.value) {
        for (item in thisRaceData.subraces) {
          if (thisRaceData.subraces[item].name === specialty_selection.value) {
            bonus += Number(thisRaceData.subraces[item].ability_score_increase[ability]) || 0;
          }
        }
      }
    }

    return Number(bonus);
  }

  getAbilityScore(name) {
    let base = Number(this.props.charData['ability_score_'+name]) || 0;
    let raceBonus = Number(this.getRaceBonus(name,this.props.charData.select_race)) || 0;
    return  Number(base + raceBonus) || 0;
  }

  getAbilityModifier(ability) {
    if (this.props.charData['ability_score_'+ability]) {
      if (utilities.getModifier(this.getAbilityScore(ability)) && this.getAbilityScore(ability) > 0) {
        return <span>[Modifier: {utilities.getModifier(this.getAbilityScore(ability))}]</span>
      }
    }
  }

  getRacialFeats(raceName) {
    let thisRace = utilities.getObjectByName(raceData,raceName);
    let feats = thisRace.feats || [];
    let allFeats = [];
    let uniqueFeats = [];
    let subrace = {};
    let i = 0;

    if (this.props.charData.select_subrace) {
      subrace = utilities.getObjectByName(thisRace.subraces, this.props.charData.select_subrace);
      console.log('subrace:');
      console.log(subrace);
      allFeats = feats.concat(subrace.feats) || feats;

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
      return <li key={obj}>{obj}</li>
    });
  }

  getClassFeats(heroClass) {
    let thisClass = utilities.getObjectByName(classData,heroClass);
    let feats = thisClass.feats || [];
    let allFeats = [];
    let uniqueFeats = [];
    let specialty = {};
    let i = 0;

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
      return <li key={obj}>{obj}</li>
    });
  }


  render() {
    let selected_race = this.props.charData.select_subrace || this.props.charData.select_race || "";
    let score_names = ['str','con','dex','wis','int','cha'];
    let i = 0;
    let ability_scores = {};
    let race_bonus = {};
    let base_score = {
      str : 0
    };
    let score_breakdown = "";


    for (i in score_names) {
      base_score[score_names[i]] = this.props.charData['ability_score_'+score_names[i]] || 0;
      race_bonus[score_names[i]] = this.getRaceBonus(score_names[i],this.props.charData.select_race) ? " + "+this.getRaceBonus(score_names[i],this.props.charData.select_race) : "";
      score_breakdown = this.getAbilityScore(score_names[i]) == base_score[score_names[i]] ? "" : " ("+base_score[score_names[i]] +""+ race_bonus[score_names[i]]+")";
      ability_scores[score_names[i]] = (this.getAbilityScore(score_names[i])) + score_breakdown;
    }

  	return <div className="character-sheet">
            <h1>Character Sheet</h1>
            <div>Player Name: {this.props.charData.player_name}</div>
            <div>Character Name: {this.props.charData.character_name}</div>
            <div>Race: {selected_race}</div>
            <div>Class: {this.props.charData.select_class}</div>
            <div>Background: {this.props.charData.select_background}</div>
            <div>Alignment: {this.props.charData.alignment_lawful} {this.props.charData.alignment_moral}</div>
            <h2>Ability Scores</h2>
            <ul>
              <li><span className="as-label">Strength:</span> {ability_scores.str} {this.getAbilityModifier('str')}</li>
              <li><span className="as-label">Constitution:</span> {ability_scores.con} {this.getAbilityModifier('con')}</li>
              <li><span className="as-label">Dexterity:</span> {ability_scores.dex} {this.getAbilityModifier('dex')}</li>
              <li><span className="as-label">Wisdom:</span> {ability_scores.wis} {this.getAbilityModifier('wis')}</li>
              <li><span className="as-label">Intelligence:</span> {ability_scores.int} {this.getAbilityModifier('int')}</li>
              <li><span className="as-label">Charisma:</span> {ability_scores.cha} {this.getAbilityModifier('cha')}</li>
            </ul>

            <h2>Racial Features</h2>
            <ul>
              {this.getRacialFeats(this.props.charData.select_race)}
            </ul>

            <h2>Class Features</h2>
            <ul>
              {this.getClassFeats(this.props.charData.select_class)}
            </ul>
          </div>;
	}
}
