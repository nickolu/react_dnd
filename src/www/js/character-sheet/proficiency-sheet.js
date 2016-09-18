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
export class ProficiencySheet extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * getProficiencies - gets the markup for the list of proficiences from selected type
   *
   * @param  {string} type type of character proficiencies to get (race, class, background)
   * @return {react object}      view for the list of proficiencies
   */

   getProficiencies(type) {
     let thisCharData = this.props.charData || {};
     let proficiencies = {};
     let id = -1;

     proficiencies[type] = [];

     if (thisCharData.proficiencies && thisCharData.proficiencies[type]) {
       proficiencies[type] = proficiencies[type].concat(thisCharData.proficiencies[type]);
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
   * render - renders content to the DOM
   *
   * @return {type}  view for CharacterSheet
   */
  render() {
    return <div className="proficiency-sheet">
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
          </div>;
	}
}
