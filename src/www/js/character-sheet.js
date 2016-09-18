import React from 'react';

import { ProficiencySheet } from './character-sheet/proficiency-sheet.js';
import { FeaturesSheet } from './character-sheet/features-sheet.js';
import { AbilityScoresSheet } from './character-sheet/ability-scores-sheet.js';
import { ProfileSheet } from './character-sheet/profile-sheet.js';


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
   * render - renders content to the DOM
   *
   * @return {type}  view for CharacterSheet
   */
  render() {
  	return <div className="character-sheet">
            <h1>Character Sheet</h1>
            <ProfileSheet charData={this.props.charData}/>
            <AbilityScoresSheet charData={this.props.charData}/>
            <ProficiencySheet charData={this.props.charData}/>
            <FeaturesSheet charData={this.props.charData}/>
          </div>;
	}
}
