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
export class FeaturesSheet extends React.Component {
  constructor(props) {
    super(props);
  };

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
    return <div className="features-sheet">
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
