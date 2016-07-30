import React from 'react';
import ReactDOM from 'react-dom';
import { CharacterSheet } from './character-sheet.js';
import { DropDown } from './form-fields/drop-down.js';
import { TextInput } from './form-fields/text-input.js';
import { SubmitButton } from './form-fields/submit-button.js';
import { RaceForm } from './forms/race-form.js';
import { ClassForm } from './forms/class-form.js';
import { BiographyForm } from './forms/character-biography-form.js';
import { BackgroundForm } from './forms/background-form.js';
import { AbilityScoresForm } from './forms/ability-scores-form.js';
import { CharacterDetailsForm } from './forms/character-details-form.js';

class DndForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ["hello", "world"],
      charData : {}
    };

    // let someCharData = {
    //   player_name : document.querySelector('[name=player_name]').value,
    //   character_name : document.querySelector('[name=character_name]').value,
    //   character_class : document.querySelector('[name=select_character_class]').value,
    //   background : document.querySelector('[name=select_background]').value,
    //   race : document.querySelector('[name=select_race]').value,
    //   alignment_moral : this.state.charData.alignment_moral,
    //   alignment_lawful : this.state.charData.alignment_lawful,
    //   [dataKey] : e.target.value,
    //   alignment : {},
    //   experience_points : '',
    //   stats : {
    //     proficiency_bonus : '',
    //     armor_class : '',
    //     initiative : '',
    //     speed : '',
    //     max_hp : '',
    //     perception : ''
    //   },
    //   ability_scores : {
    //     str : 10,
    //     dex : 10,
    //     con : 10,
    //     int : 10,
    //     wis : 10,
    //     cha : 10
    //   },
    //   saving_throws : {
    //     str : 0,
    //     dex : 0,
    //     con : 0,
    //     int : 0,
    //     wis : 0,
    //     cha : 0
    //   },
    //   skills : {
    //     acrobatics : 0,
    //     animal_handling : 0,
    //     arcana : 0,
    //     athletics : 0,
    //     deception : 0,
    //     history : 0,
    //     insight : 0,
    //     intimidation : 0,
    //     investigation : 0,
    //     medicine : 0,
    //     nature : 0,
    //     perception : 0,
    //     performance : 0,
    //     persuasion : 0,
    //     religion : 0,
    //     sleight_of_hand : 0,
    //     stealth : 0,
    //     survival : 0
    //   },
    //   proficiencies : {
    //     languages : [],
    //     tools : [],
    //     weapons : [],
    //     armor : [],
    //     other : []
    //   },
    //   physical_traits : {
    //     height : '',
    //     weight : '',
    //     age : '',
    //     eyes : '',
    //     hair_color : '',
    //     appearance : ''
    //   },
    //   character_backstory : '',
    //   treasure : '',
    //   spellcasting : {
    //     spell_class : '',
    //     ability : '',
    //     save_dc : '',
    //     attack_bonus : '',
    //     spells : {
    //       lvl_0 : [],
    //       lvl_1 : [],
    //       lvl_2 : [],
    //       lvl_3 : [],
    //       lvl_4 : [],
    //       lvl_5 : [],
    //       lvl_6 : [],
    //       lvl_7 : [],
    //       lvl_8 : [],
    //       lvl_9 : []
    //     }
    //   }
    // }

    this.update = this.update.bind(this);
  }

  update(e) {

    let newData = Object.assign({},this.state.charData,{[e.target.name]:e.target.value});

    this.setState({
      charData : newData
    });

    console.log(newData);

  }

	render() {
  	return <div className="container">

            <div className="row">
              <div className="col-sm-6">
                <TextInput type="text" label="Your Name (Not your Character's Name)" name="player_name" onChange={this.update}/>
                <TextInput type="text" label="Your Character's Name" name="character_name" onChange={this.update}/>
                <RaceForm onUpdate={this.update} charData={this.state.charData}/>
                <ClassForm onUpdate={this.update} />
                <BackgroundForm onUpdate={this.update} />
                <CharacterDetailsForm onUpdate={this.update} />
                <AbilityScoresForm onUpdate={this.update} />

              </div>
              <div className="col-sm-6 output-column">
                <CharacterSheet charData={this.state.charData}/>
              </div>
            </div>


      		</div>;
	}
}

ReactDOM.render(<DndForm/>, document.querySelector('main'));
