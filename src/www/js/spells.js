import React from 'react';
import ReactDOM from 'react-dom';
import * as utilities from "./utilities.js";
import raceData from '../json/races.json';
import spellData from '../json/spells.json';
import { SubmitButton } from './form-fields/submit-button.js';


class DndForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spells : spellData
    };

    this.update = this.update.bind(this);
  }

  update(e) {
    this.setState({
      charData : Object.assign({},this.state.charData,newCharData)
    });
  }

  getSpellClasses(spell,string) {
    var classes = [];
    for (var prop in spell.class) {
      classes.push(prop);
    }
    if (!string) {
      return classes  
    } else {
      return classes.join(', ');
    }
    
  }

  filterSpellPropertyButton(key,val) {
    var _this = this;
    var spells = [];

    for (var i = 0; i < spellData.length; i++) {
      for (var prop in spellData[i][key]) {
        
        if (prop === val) {
          spells.push(spellData[i]);
        }
      }
    }
    
    function filter() {
        _this.setState({
          spells : spells
        }); 
    }

    return <SubmitButton label={val} onUpdate={filter} />
  }

  getSpells() {
    return <div>{this.state.spells.map(spell => <div key={spell.name}>
                     <div className="spell-card col-xs-12 col-sm-6 col-md-4 ">
                      <div className="spell-card-inner">
                        <h2 className="spell_name">{spell.name}</h2>
                         <p className="spell_casting_time">Casting Time: {spell.casting_time}</p>
                         <p className="spell_class">Class: {this.getSpellClasses(spell,true)}</p>
                         <p className="spell_concentration">Concentration: {spell.concentration}</p>
                         <p className="spell_duration">Duration: {spell.duration}</p>
                         <p className="spell_level">Level: {spell.level}</p>
                         <p className="spell_page">Page: {spell.page}</p>
                         <p className="spell_range">Range: {spell.range}</p>
                         <p className="spell_ritual">Ritual: {spell.ritual}</p>
                         <p className="spell_school">School: {spell.school}</p>
                      </div>
                       
                     </div>
                   </div>
              )}</div>
  }

  filterButton(label,prop,name) {
    var _this = this;
    function filter() {
    _this.setState({
        spells : utilities.getObjectsByProp(spellData, prop, name)
      });  
    }
    return <SubmitButton label={label} onUpdate={filter} />
  }



	render() {
    
    return <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h2>Spells</h2>
                {this.filterButton("Concentration","concentration","yes")}
                {this.filterButton("Ritual","ritual","yes")}
                <div>
                  <h3>Class</h3>
                  {this.filterSpellPropertyButton("class","Bard")}
                  {this.filterSpellPropertyButton("class","Cleric")}
                  {this.filterSpellPropertyButton("class","Druid")}
                  {this.filterSpellPropertyButton("class","Sorcerer")}
                  {this.filterSpellPropertyButton("class","Warlock")}
                  {this.filterSpellPropertyButton("class","Wizard")}
                </div>

                <div>
                  <h3>School</h3>
                  {this.filterButton("Conjuration","school","Conjuration")}
                  {this.filterButton("Divination","school","Divination")}
                  {this.filterButton("Enchantment","school","Enchantment")}
                  {this.filterButton("Evocation","school","Evocation")}
                  {this.filterButton("Illusion","school","Illusion")}
                  {this.filterButton("Necromancy","school","Necromancy")}
                  {this.filterButton("Transmutation","school","Transmutation")}
                </div>
                
                <div>
                  <h3>Level</h3>
                  {this.filterButton("Cantrip","level","Cantrip")}
                  {this.filterButton("1st Level","level","1st")}
                  {this.filterButton("2nd Level","level","2nd")}
                  {this.filterButton("3rd Level","level","3rd")}
                  {this.filterButton("4th Level","level","4th")}
                  {this.filterButton("5th Level","level","5th")}
                  {this.filterButton("6th Level","level","6th")}
                  {this.filterButton("7th Level","level","7th")}
                  {this.filterButton("8th Level","level","8th")}
                  {this.filterButton("9th Level","level","9th")}
                </div>
                {this.getSpells()}
                
              </div>
            </div>
      		</div>;
	}
}

ReactDOM.render(<DndForm/>, document.querySelector('main'));
