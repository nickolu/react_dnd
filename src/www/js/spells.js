import React from 'react';
import ReactDOM from 'react-dom';
import * as utilities from "./utilities.js";
import raceData from '../json/races.json';
import spellData from '../json/spells.json';
import spellDataNew from '../json/spells-new.json';
import { SubmitButton } from './form-fields/submit-button.js';
import { TextInput } from './form-fields/text-input.js';
import { ButtonGroup } from './form-fields/button-group.js';


//TODO: when making multiple selections in school or level, should add to total cards
//TODO: allow filtering via query string
//TODO: make controls fixed and hideable
//TODO: update sortSpellsByProp to work with props other than name (need to create utilities.getObjectByProp() method)
//TODO: add spell sorting to the UI

class SpellBook extends React.Component {
  /**
   * constructor for SpellBook
   * @param  {object} props [element properties/attributes passed in at initialization]
   */
  constructor(props) {
    super(props);

    var sortedSpellData = this.sortSpellsByProp(spellData, "name");

    this.state = {
      spells : sortedSpellData,
      sortSpells : "name",
      filterSpells : [
        {
          "type" : "search",
          "key" : "name",
          "value" : "",
          "usePartialMatch" : true
        }
      ]
    };

    this.update = this.update.bind(this);
  }

  /**
   * updates the state, happens on most DOM events
   * @param  {object} e [event object passed by event listener]
   */
  update(e) {
    var _this = this; 
    var sortedSpellData = _this.sortSpellsByProp(spellData, "name"); 

    this.state.filterSpells.forEach(function(obj) {
      sortedSpellData = _this.getFilteredSpells(sortedSpellData, obj)
      
      _this.setState({
        spells : sortedSpellData,
        filterSpells : _this.state.filterSpells
      }); 
    });  
  }

  /**
   * get the list of classes from the spell data
   * @param  {array} spells     [array of spell objects]
   * @param  {boolean} string   [true if expected return type is a string]
   * @return {array || string}  [array of classes, or string of classes joined by commas]
   */
  getSpellClasses(spells,string) {
    var classes = [];
    for (var prop in spells.class) {
      classes.push(prop);
    }
    if (!string) {
      return classes  
    } else {
      return classes.join(', ');
    }
  }

  /**
   * gets a list of spells filtered by a key and value
   * @param  {array} spells    [array of spells to filter]
   * @param  {object} options   [object of options]
   * @return {array}  [array of spell objects, with filtered items removed]
   */
  getFilteredSpells(spells, options) {
    var usePartialMatch = options.usePartialMatch || false;
    var key = options.key || "";
    var val = options.value || "";
    var spellProp, spellSubProp;
    var filteredSpells = [];

    /**
     * checks if a string exists in another string
     * @param  {string} str1 [string to search]
     * @param  {string} str2 [string to find in str1]
     * @return {boolean}     [whether str2 is found is str1]
     */
    function checkPartialMatch(str1,str2) {
      return usePartialMatch && utilities.shrink(str1).indexOf(utilities.shrink(str2)) > -1;
    }

    /**
     * iterate through all properties of all spells
     * push any spell with a match to the filtered spells array
     */
    for (var i = 0, l = spells.length; i < l; i+=1) {
      for (spellProp in spells[i]) {
        if (spells[i][key] === val || checkPartialMatch(spells[i][key],val)) {
          filteredSpells.push(spells[i]);
          break;        
        } else if (typeof spells[i][spellProp] === "object") {
          /**
           * look through sub objects (like classes) for matches
           */
          for (spellSubProp in spells[i][spellProp]) {
            if (spellSubProp === val || checkPartialMatch(spellSubProp,val)) {
              filteredSpells.push(spells[i]);
              break;
            }
          }
        }
      }
    }

    return filteredSpells;
  }

  /**
   * gets a list of spells sorted by a specified property
   * @param  {array} spells [list of spell objects]
   * @return {array}        [list of spell objects, sorted by given property]
   */
  sortSpellsByProp (spells,prop) {
    var i;
    var l = spells.length;
    var propsArray = [];
    var newSpellSort = [];

    for (i=0; i<l; i+=1) {
      propsArray.push(spells[i][prop]);
    }

    propsArray.sort();

    for (i=0, l=propsArray.length; i<l; i+=1) {
      newSpellSort.push(utilities.getObjectByName(spells,propsArray[i]));
    }

    return newSpellSort;
  }
  

  /**
   * adds an attribute to the container of spell cards representing the size of card to display
   * @param  {string} size [size for data-card-size attribute]
   */
  updateCardSize(size) {
    var cards = document.querySelector('.spell-card-container');
    
    cards.setAttribute("data-card-size", size);
  }

  /**
   * renders the input for filtering spells by text
   */
  renderSearchfilter() {
    var _this = this;
    var filters = _this.state.filterSpells;
    var searchDescription = false;
    
    function filter(e) {
      var name = e.target.value;
      
      filters.forEach(function(obj){
        if (obj.type && obj.type === "search") {
          obj.key = "name";
          obj.value = e.target.value;
          obj.usePartialMatch = true;
        } 
      });

      _this.setState({
        spells: _this.state.spells,
        filterSpells : filters
      });

      console.log(_this.state);
      
      _this.update(e);
    }

    return <div><TextInput type="text" label="Search" name="search_spells" onChange={filter} /></div>
  }

  /**
   * renders the buttons for changing card size
   */
  renderCardSizeButton() {
    var _this = this;

    function updateSize(e) {
      var size = e.target.innerHTML;
      var active = document.querySelector(".size-buttons .btn.active");
      var buttons = document.querySelectorAll(".size-buttons");

      if (e.target.className.indexOf("active") > -1) {
        e.target.className = "btn";
        size = "";
      } else if (active) {
        active.className = active.className.replace(/active/g,""); 
        e.target.className += " active";
      } else {
        e.target.className += " active";
      }
      
      _this.updateCardSize(size);
    }
    
    return <div className="size-buttons">
             <SubmitButton label="xs" onUpdate={updateSize} />
             <SubmitButton label="sm" onUpdate={updateSize} />
             <SubmitButton label="md" onUpdate={updateSize} />
             <SubmitButton label="lg" onUpdate={updateSize} />
             <SubmitButton label="xl" onUpdate={updateSize} />
           </div>
  }

  /**
   * renders a json object as a string in the DOM
   * @param  {object} data [JSON object to render]
   */
  renderJSON (data) {
    return <div>{JSON.stringify(data)}</div>
  }

  /**
   * makes a button that filters the state by specified key and value
   * @param  {string} key   [key to search]
   * @param  {string} val   [value to search]
   * @param  {string} label [label for the button]
   */
  renderFilterButton(key,val,label,usePartialMatch) {
    var _this = this;
    var spells = [];
    var label = label || val;
    var usePartialMatch = usePartialMatch || false;
    
    function filter(e) {
      var filter = {
        "key" : key,
        "value" : val,
        "usePartialMatch" : usePartialMatch
      };   

      if (e.target.className.indexOf("active") > -1) {
        e.target.className = e.target.className.replace(/active/g,'');
        
        _this.setState({
          spells : _this.sortSpellsByProp(spellData, "name"),
          filterSpells : utilities.removeObject(_this.state.filterSpells,filter)
        });

      } else {
        e.target.className += " active";
        _this.state.filterSpells.push(filter);
      }
      
      _this.update(e);
    }
      

    return <SubmitButton label={label} onUpdate={filter} />
  }

  renderTestFilter(label,filter) {
    var _this = this;
    
    function filter() {
      _this.filterByProperty(label,filter)
    }
    return <SubmitButton label={label} onUpdate={filter} />
  }

  /**
   * renders a group of buttons which filter the spells by a key and list of options
   * @param  {string}   key           the value for the spell filter key ("class","level","school", etc)
   * @param  {array}    choices       list of options for the provided key
   * @param  {boolean}  multiSelect   whether to allow multiple options to be selected at one time
   * @return {ButtonGroup}            <ButtonGroup /> element to render
   */
  renderFilterButtonGroup(key,choices,multiSelect) {
    var _this = this;
    var spells = [];
    
    function filter(e,choice,isActive) {
      var activeBtns = document.querySelectorAll("."+key+".btn.active");
      var i = 0;
      var removeFilter = {};
      var filter = {
        "key" : key,
        "value" : typeof choice === "string" ? choice : choice.val
      };   

      if (isActive) {
        _this.setState({
          spells : _this.sortSpellsByProp(spellData, "name"),
          filterSpells : utilities.removeObject(_this.state.filterSpells,filter)
        });

      } else if (!multiSelect) {
        for (i=0; i<activeBtns.length; i++) {
          if (!(activeBtns[i].innerHTML === filter.value)) {
            removeFilter = utilities.getObjectsByProp(_this.state.filterSpells, "value", activeBtns[i].innerHTML)[0];
          }
        }

        _this.setState({
          spells : _this.state.spells,
          filterSpells : utilities.removeObject(_this.state.filterSpells,removeFilter)
        });
        
        _this.state.filterSpells.push(filter);
      } else {
        _this.state.filterSpells.push(filter);
      }
      
      _this.update(e);
    }
      

    return <ButtonGroup choices={choices} groupLabel={key} onUpdate={filter} multiSelect={multiSelect}/>
  }


  /**
   * renders the list of spells
   */
  renderSpells() {
    var spells = <div className="spell-card-container">{this.state.spells.map(spell => <div key={spell.name} className="spell-card col-xs-12 col-sm-6 col-md-4">
                     <div className="spell-card-inner">
                        <h2 className="spell_name">{spell.name}</h2>
                        <p className="spell-card-property spell_level"><strong>Level:</strong> {spell.level}</p>
                        <p className="spell-card-property spell_components"><strong>Components:</strong> {spell.components}</p>
                        <p className="spell-card-property spell_casting_time"><strong>Casting Time:</strong> {spell.casting_time}</p>
                        <p className="spell-card-property spell_range"><strong>Range:</strong> {spell.range}</p>
                        <p className="spell-card-property spell_duration"><strong>Duration:</strong> {spell.duration}</p>
                        <p className="spell-card-property spell_concentration"><strong>Concentration:</strong> {spell.concentration}</p>
                        <p className="spell-card-property spell_ritual"><strong>Ritual:</strong> {spell.ritual}</p>
                        <p className="spell-card-property spell_class"><strong>Class:</strong> {this.getSpellClasses(spell,true)}</p>
                        <p className="spell-card-property spell_page"><strong>Page:</strong> {spell.page}</p>
                        <p className="spell-card-property spell_school"><strong>School:</strong> {spell.school}</p>
                        <hr />
                        <p className="spell_school" dangerouslySetInnerHTML={ { __html: spell.description } }></p>
                      </div>
                   </div>
              )}</div>;


    if (this.state.spells.length === 0) {
      spells = <h4 className="no-spells">No spells matching the selected filters</h4>
    }

    return spells;
  }

  /**
   * puts everything in the DOM
   */
	render() {
    var classOptions = ["Bard","Cleric","Druid","Paladin","Ranger","Sorcerer","Warlock","Wizard"];
    var levelOptions = ["Cantrip","1st","2nd","3rd","4th","5th","6th","7th","8th","9th"];
    var schoolOptions = ["Conjuration","Divination","Enchantment","Evocation","Illusion","Necromancy","Transmutation"];
    var castingTimeOptions = ["1 action","1 reaction","1 bonus action","1 minute","10 minutes","1 hour","24 hours"];
    var _this = this;

    return <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h2>Spells ({this.state.spells.length})</h2>
                <div className="card-size-controls">
                  <h4 className="card-size-controls-title">Card Size</h4>
                  {this.renderCardSizeButton()}
                </div>
                <div className="row filters-wrapper">
                    <div className="col-xs-12 col-sm-6 col-md-3">
                      <h3>Search</h3>
                      {this.renderSearchfilter()}  
                      {this.renderFilterButton("concentration","yes","Concentration")}
                      {this.renderFilterButton("ritual","yes","Ritual")}
                    </div>
                    
                    <div className="col-xs-12 col-sm-6 col-md-3">
                      <h3>Components</h3>
                      {this.renderFilterButton("components","V","Verbal",true)}
                      {this.renderFilterButton("components","S","Somatic",true)}
                      {this.renderFilterButton("components","M","Material",true)}
                      {this.renderFilterButton("components","gp","GP",true)}
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                      <h3>School</h3>
                      {this.renderFilterButtonGroup("school",schoolOptions,false)}
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                      <h3>Casting Time</h3>
                      {this.renderFilterButtonGroup("casting_time",castingTimeOptions,false)}
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <h3>Class</h3>
                      {this.renderFilterButtonGroup("class",classOptions,true)}
                    </div>

                    <div className="col-xs-12 col-sm-6">
                      <h3>Level</h3>
                      {this.renderFilterButtonGroup("level",levelOptions,false)}
                    </div>
                  
                </div>
                {this.renderSpells()}
                
              </div>
            </div>
      		</div>;
	}
}

ReactDOM.render(<SpellBook/>, document.querySelector('main'));
