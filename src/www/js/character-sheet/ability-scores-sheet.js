import React from 'react';
import raceData from '../../json/races.json';
import classData from '../../json/character-classes.json';
import backgroundData from '../../json/backgrounds.json';
import featsData from '../../json/feats.json';
import * as utilities from '../utilities.js';


/**
 * CharacterSheet
 *
 * Represents the output for the character builder form
 */
export class AbilityScoresSheet extends React.Component {
  constructor(props) {
    super(props);
  };


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
   * render - renders content to the DOM
   *
   * @return {type}  view for CharacterSheet
   */
   render() {
     return <div className="ability-scores-sheet">
             <h2>Ability Scores</h2>
             {this.getAbilityScores()}

           </div>;
 	}
}
