import React from 'react';
import ReactDOM from 'react-dom';
import * as utilities from "./utilities.js";
import raceData from '../json/races.json';
import spellData from '../json/spells.json';
import { SubmitButton } from './form-fields/submit-button.js';


class DndForm extends React.Component {
  constructor(props) {
    super(props);

    var sortedSpellData = this.sortSpellsByName(spellData);

    this.state = {
      spells : sortedSpellData,
      filterSpells : []
    };

    this.update = this.update.bind(this);
  }

  update(e) {
    var i;
    var spellsToUse;
    var sortedSpellData = this.sortSpellsByName(spellData);

    for (i=0; i<this.state.filterSpells.length; i+=1) {
      sortedSpellData = this.getFilteredSpells(sortedSpellData, this.state.filterSpells[i].key, this.state.filterSpells[i].value)
    }

    this.setState({
      spells : sortedSpellData,
      filterSpells : this.state.filterSpells
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

  getFilteredSpells(spells,key,val) {
    var filteredSpells = [];
    var i;
    var prop, prop2;

    for (i = 0; i < spells.length; i+=1) {
      for (prop in spells[i]) {
        if (typeof spells[i][prop] === "object") {
          for (prop2 in spells[i][prop]) {
            if (prop2 === val) {
              filteredSpells.push(spells[i]);
              break;
            }
          }
        } else if (spells[i][key] === val) {
          filteredSpells.push(spells[i]);
          break;
        }
      }
    }

    return this.sortSpellsByName(filteredSpells);
  }


  sortSpellsByName (spells) {
    var i;
    var l = spells.length;
    var nameArray = [];
    var newSpellSort = [];

    for (i=0; i<l; i+=1) {
      nameArray.push(spells[i].name);
    }

    nameArray.sort();

    for (i=0, l=nameArray.length; i<l; i+=1) {
      newSpellSort.push(utilities.getObjectByName(spells,nameArray[i]));
    }

    return newSpellSort;

  }

  removeObject(arr,obj) {
    var i;
    var l = arr.length;
    var prop;
    
    for (i=0; i<l; i+=1) {
      if (arr[i] && arr[i].value === obj.value && arr[i].key === obj.key) {
        arr.splice(i,1);
      }
    }

    return arr;
  }

  getSpells() {

    var spells = <div>{this.state.spells.map(spell => <div key={spell.name}>
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
              )}</div>;
    if (this.state.spells.length === 0) {
      spells = <h4 className="no-spells">No spells matching the selected filters</h4>
    }

    return spells;
  }

  filterButton(key,val,label) {
    var _this = this;
    var spells = [];
    var label = label || val;

    for (var i = 0; i < spellData.length; i++) {
      for (var prop in spellData[i][key]) {
        
        if (prop === val) {
          spells.push(spellData[i]);
        }
      }
    }
    
    function filter(e) {
      
      var filter = {
        "key" : key,
        "value" : val
      };
      

      if (e.target.className.indexOf("active") > -1) {
        e.target.className = e.target.className.replace(/active/g,'');
        
        _this.setState({
          spells : _this.sortSpellsByName(spellData),
          filterSpells : _this.removeObject(_this.state.filterSpells,filter)
        });
      } else {
        e.target.className += " active";
        _this.state.filterSpells.push(filter);
      }
      
      _this.update(e);
    }
      

    return <SubmitButton label={label} onUpdate={filter} />
  }

  arrayUnique(array) {
      var a = array.concat();
      for(var i=0; i<a.length; ++i) {
          for(var j=i+1; j<a.length; ++j) {
              if(a[i] === a[j])
                  a.splice(j--, 1);
          }
      }

      return a;
  }



	render() {
    
    return <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h2>Spells ({this.state.spells.length})</h2>
                {this.filterButton("concentration","yes","Concentration")}
                {this.filterButton("ritual","yes","Ritual")}
                <div>
                  <h3>Class</h3>
                  {this.filterButton("class","Bard")}
                  {this.filterButton("class","Cleric")}
                  {this.filterButton("class","Druid")}
                  {this.filterButton("class","Sorcerer")}
                  {this.filterButton("class","Warlock")}
                  {this.filterButton("class","Wizard")}
                </div>

                <div>
                  <h3>School</h3>
                  {this.filterButton("school","Conjuration")}
                  {this.filterButton("school","Divination")}
                  {this.filterButton("school","Enchantment")}
                  {this.filterButton("school","Evocation")}
                  {this.filterButton("school","Illusion")}
                  {this.filterButton("school","Necromancy")}
                  {this.filterButton("school","Transmutation")}
                </div>
                
                <div>
                  <h3>Level</h3>
                  {this.filterButton("level","Cantrip")}
                  {this.filterButton("level","1st")}
                  {this.filterButton("level","2nd")}
                  {this.filterButton("level","3rd")}
                  {this.filterButton("level","4th")}
                  {this.filterButton("level","5th")}
                  {this.filterButton("level","6th")}
                  {this.filterButton("level","7th")}
                  {this.filterButton("level","8th")}
                  {this.filterButton("level","9th")}
                </div>
                {this.getSpells()}
                
              </div>
            </div>
      		</div>;
	}
}

ReactDOM.render(<DndForm/>, document.querySelector('main'));
