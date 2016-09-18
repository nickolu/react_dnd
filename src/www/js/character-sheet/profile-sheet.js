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
export class ProfileSheet extends React.Component {
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
   * render - renders content to the DOM
   *
   * @return {type}  view for CharacterSheet
   */
  render() {
    return <div className="profile-sheet">
            {this.getProfileInfo()}
          </div>;
	}
}
