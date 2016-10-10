import React from 'react';
import ReactDOM from 'react-dom';
import * as utilities from "./utilities.js";
import monsterData from '../json/monsters.json';
import { SubmitButton } from './form-fields/submit-button.js';
import { TextInput } from './form-fields/text-input.js';
import { ButtonGroup } from './form-fields/button-group.js';
import { ShowHideButton } from './components/show-hide-button.js';


class MonsterBook extends React.Component {
  /**
   * constructor for MonsterBook
   * @param  {object} props [element properties/attributes passed in at initialization]
   */
  constructor(props) {
    super(props);

    var sortedMonsterData = this.sortMonstersByProp(monsterData, "name");

    this.state = {
      monsters : sortedMonsterData,
      sort : "name",
      descriptionSearch : false,
      filterMonsters : [
        {
          "key" : "name",
          "type" : "search",
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
    var sortedMonsterData = _this.sortMonstersByProp(monsterData, "name");

    this.state.filterMonsters.forEach(function(obj) {
      sortedMonsterData = _this.getFilteredMonsters(sortedMonsterData, obj)

      _this.setState({
        monsters : sortedMonsterData,
        filterMonsters : _this.state.filterMonsters
      });
    });
  }

  /**
   * get the list of classes from the monster data
   * @param  {array} monsters     [array of monster objects]
   * @param  {boolean} string   [true if expected return type is a string]
   * @return {array || string}  [array of classes, or string of classes joined by commas]
   */
  getMonsterClasses(monsters,string) {
    var classes = [];
    for (var prop in monsters.class) {
      classes.push(prop);
    }
    if (!string) {
      return classes
    } else {
      return classes.join(', ');
    }
  }

  /**
   * gets a list of monsters filtered by a key and value
   * @param  {array} monsters    [array of monsters to filter]
   * @param  {object} options   [object of options]
   * @return {array}  [array of monster objects, with filtered items removed]
   */
  getFilteredMonsters(monsters, filter) {
    var usePartialMatch = filter.usePartialMatch || false;
    var key = filter.key || "";
    var val = filter.value || "";
    var monsterProp, monsterSubProp;
    var filteredMonsters = [];

    /**
     * checks if a string exists in another string
     * @param  {string} str1 [string to search]
     * @param  {string} str2 [string to find in str1]
     * @return {boolean}     [whether str2 is found is str1]
     */
    function checkPartialMatch(str1,str2) {
      return usePartialMatch && str1.toLowerCase().indexOf(str2.toLowerCase()) > -1;
    }

    function checkFirstCharMatch(str, char) {
      var strArr = str.split("");

      if (strArr[0].toLowerCase() === char.toLowerCase()) {
        return true;
      }
      return false;
    }

    /**
     * iterate through all properties of all monsters
     * push any monster with a match to the filtered monsters array
     */
    for (var i = 0, l = monsters.length; i < l; i+=1) {
      if (filter.type && filter.type === "alphabet" && checkFirstCharMatch(monsters[i].name, val)) {
        filteredMonsters.push(monsters[i]);
      } else {
        for (monsterProp in monsters[i]) {
          if (monsters[i][key] === val || checkPartialMatch(monsters[i][key],val)) {
            filteredMonsters.push(monsters[i]);
            break;
          } else if (typeof monsters[i][monsterProp] === "object") {
          /**
           * look through sub objects (like classes) for matches
           */
            for (monsterSubProp in monsters[i][monsterProp]) {
              if (monsterSubProp === val || checkPartialMatch(monsterSubProp,val)) {
                filteredMonsters.push(monsters[i]);
                break;
              }
            }
          }
        }
      }
    }

    return filteredMonsters;
  }

  /**
   * gets a list of monsters sorted by a specified property
   * @param  {array} monsters [list of monster objects]
   * @return {array}        [list of monster objects, sorted by given property]
   */
  sortMonstersByProp (monsters,prop) {
    var i;
    var l = monsters.length;
    var propsArray = [];
    var newMonsterSort = [];

    for (i=0; i<l; i+=1) {
      propsArray.push(monsters[i][prop]);
    }

    propsArray.sort();

    for (i=0, l=propsArray.length; i<l; i+=1) {
      newMonsterSort.push(utilities.getObjectByName(monsters,propsArray[i]));
    }

    return newMonsterSort;
  }


  /**
   * adds an attribute to the container of monster cards representing the size of card to display
   * @param  {string} size [size for data-card-size attribute]
   */
  updateCardSize(size) {
    var cards = document.querySelector('.monster-card-container');

    cards.setAttribute("data-card-size", size);
  }

  /**
   * renders the input for filtering monsters by text
   */
  renderSearchfilter() {
    var _this = this;
    var filters = _this.state.filterMonsters;
    var descriptionSearch = _this.state.descriptionSearch;

    function filter(e) {
      var name = e.target.value;

      filters.forEach(function(obj){
        if (obj.type && obj.type === "search") {
          if (descriptionSearch) {
            obj.key = "description";
          } else {
            obj.key = "name";
          }
          obj.value = e.target.value;
          obj.usePartialMatch = true;
        }
      });

      _this.setState({
        monsters: _this.state.monsters,
        filterMonsters : filters,
        descriptionSearch : descriptionSearch
      });

      _this.update(e);
    }

    function setDescriptionSearch(e) {
      var isChecked = false;

      if (e.target.checked) {
        isChecked = true;
      } else {
        isChecked = false;
      }

      _this.setState({
        monsters: _this.state.monsters,
        filterMonsters : _this.state.filterMonsters,
        descriptionSearch : isChecked
      });

      _this.update(e);
    }

    return  <div>
              <TextInput type="text" label="Search" name="search_monsters" onChange={filter} />
              <label><input type="checkbox" onClick={setDescriptionSearch} /> Search Description</label>
            </div>
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
    var monsters = [];
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
          monsters : _this.sortMonstersByProp(monsterData, "name"),
          filterMonsters : utilities.removeObject(_this.state.filterMonsters,filter)
        });

      } else {
        e.target.className += " active";
        _this.state.filterMonsters.push(filter);
      }

      _this.update(e);
    }


    return <SubmitButton label={label} onUpdate={filter} />
  }

  /**
   * renders a group of buttons which filter the monsters by a key and list of options
   * @param  {string}   key           the value for the monster filter key ("class","level","school", etc)
   * @param  {array}    choices       list of options for the provided key
   * @param  {boolean}  multiSelect   whether to allow multiple options to be selected at one time
   * @return {ButtonGroup}            <ButtonGroup /> element to render
   */
  renderFilterButtonGroup(key,choices,multiSelect,type,usePartialMatch) {
    var _this = this;
    var monsters = [];

    function filter(e,choice,isActive) {
      var activeBtns = document.querySelectorAll("."+key+".btn.active");
      var val = typeof choice === "string" ? choice : choice.val;
      var i = 0;
      var removeFilter = {};
      var addFilter = {
        "key" : key,
        "value" : val,
        "usePartialMatch" : usePartialMatch || false
      };

      if (type) {
        addFilter.type = type;
      }

      if (isActive) {
        _this.setState({
          monsters : _this.sortMonstersByProp(monsterData, "name"),
          filterMonsters : utilities.removeObject(_this.state.filterMonsters,addFilter)
        });

      } else if (!multiSelect) {
        for (i=0; i<activeBtns.length; i++) {
          if (!(activeBtns[i].innerHTML === addFilter.value)) {
            removeFilter = utilities.getObjectsByProp(_this.state.filterMonsters, "value", activeBtns[i].getAttribute("data-key"))[0];
          }
        }

        _this.setState({
          monsters : _this.state.monsters,
          filterMonsters : utilities.removeObject(_this.state.filterMonsters,removeFilter)
        });

        _this.state.filterMonsters.push(addFilter);
      } else {
        _this.state.filterMonsters.push(addFilter);
      }

      _this.update(e);
    }


    return <ButtonGroup choices={choices} groupLabel={key} onUpdate={filter} multiSelect={multiSelect}/>
  }


  /**
   * renders the list of monsters
   */
  renderMonsters() {
    var monsters = <div className="monster-card-container">{this.state.monsters.map(monster => <div key={monster.name} className="monster-card col-xs-12 col-sm-6 col-md-4">
                     <div className="monster-card-inner">
                        <h2 className="monster_name">{monster.name}</h2>
                        <p className="monster-card-property monster_size"><strong>size:</strong> {monster.size}</p>
                        <p className="monster-card-property monster_type"><strong>type:</strong> {monster.type}</p>
                        <p className="monster-card-property monster_subtype"><strong>subtype:</strong> {monster.subtype}</p>
                        <p className="monster-card-property monster_alignment"><strong>alignment:</strong> {monster.alignment}</p>
                        <p className="monster-card-property monster_armor_class"><strong>armor_class:</strong> {monster.armor_class}</p>
                        <p className="monster-card-property monster_hit_points"><strong>hit_points:</strong> {monster.hit_points}</p>
                        <p className="monster-card-property monster_hit_dice"><strong>hit_dice:</strong> {monster.hit_dice}</p>
                        <p className="monster-card-property monster_speed"><strong>speed:</strong> {monster.speed}</p>
                        <p className="monster-card-property monster_strength"><strong>strength:</strong> {monster.strength} </p>
                        <p className="monster-card-property monster_dexterity"><strong>dexterity:</strong> {monster.dexterity}</p>
                        <p className="monster-card-property monster_constitution"><strong>constitution:</strong> {monster.constitution}</p>
                        <p className="monster-card-property monster_intelligence"><strong>intelligence:</strong> {monster.intelligence}</p>
                        <p className="monster-card-property monster_wisdom"><strong>wisdom:</strong> {monster.wisdom}</p>
                        <p className="monster-card-property monster_charisma"><strong>charisma:</strong> {monster.charisma}</p>
                        <p className="monster-card-property monster_constitution_save"><strong>constitution_save:</strong> {monster.constitution_save}</p>
                        <p className="monster-card-property monster_intelligence_save"><strong>intelligence_save:</strong> {monster.intelligence_save}</p>
                        <p className="monster-card-property monster_wisdom_save"><strong>wisdom_save:</strong> {monster.wisdom_save}</p>
                        <p className="monster-card-property monster_history"><strong>history:</strong> {monster.history}</p>
                        <p className="monster-card-property monster_perception"><strong>perception:</strong> {monster.perception}</p>
                        <p className="monster-card-property monster_damage_vulnerabilities"><strong>damage_vulnerabilities:</strong> {monster.damage_vulnerabilities}</p>
                        <p className="monster-card-property monster_damage_resistances"><strong>damage_resistances:</strong> {monster.damage_resistances}</p>
                        <p className="monster-card-property monster_damage_immunities"><strong>damage_immunities:</strong> {monster.damage_immunities}</p>
                        <p className="monster-card-property monster_condition_immunities"><strong>condition_immunities:</strong> {monster.condition_immunities}</p>
                        <p className="monster-card-property monster_senses"><strong>senses:</strong> {monster.senses}</p>
                        <p className="monster-card-property monster_languages"><strong>languages:</strong> {monster.languages}</p>
                        <p className="monster-card-property monster_challenge_rating"><strong>challenge_rating:</strong> {monster.challenge_rating}</p>
                      </div>
                   </div>
              )}</div>;


    if (this.state.monsters.length === 0) {
      monsters = <div className="monster-card-container"><h4 className="no-monsters">No monsters matching the selected filters</h4></div>
    }

    return monsters;
  }

  renderFilters(id, className, label, filterOptions) {
    var filterClass = 'filter-'+id;
    var targetFilter = '.'+filterClass;

    return <div className={className}>
              <h5>{label}</h5><ShowHideButton target={targetFilter} showText="+" hideText="-" />
              <div className={filterClass}>
                {this.renderFilterButtonGroup(id,filterOptions.choices,filterOptions.multiSelect,filterOptions.type, filterOptions.usePartialMatch)}
              </div>

            </div>
  }

  /**
   * puts everything in the DOM
   */
	render() {
    var _this = this;

    return <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h2>Monsters ({this.state.monsters.length})</h2>
                <div className="card-size-controls">
                  <h4 className="card-size-controls-title">Card Size</h4>
                  {this.renderCardSizeButton()}
                </div>
                <p>Filters: <ShowHideButton target=".filters-wrapper" showText="+" hideText="-" /></p>
                <div className="row filters-wrapper">
                    <div className="col-xs-12 col-sm-6 col-md-3">
                      {this.renderSearchfilter()}

                    </div>
                    {this.renderFilters('type','col-xs-3', 'Type', {
                      'choices' : ["Aberration","Beast","Celestial","Construct","Dragon","Elemental","Fey","Fiend","Giant","Humanoid","Monstrosity","Ooze","Plant","Undead"],
                      'multiSelect' : false,
                      'usePartialMatch' : true
                    })}
                    
                    {this.renderFilters('size','col-xs-3', 'Size', {
                      'choices' : ["Tiny","Small","Medium","Large","Huge","Gargantuan"],
                      'multiSelect' : false,
                      'usePartialMatch' : false
                    })}

                    {this.renderFilters('name','col-xs-12', 'Filter Alphabetically', {
                      'choices' : ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
                      'multiSelect' : false,
                      'type' : 'alphabet',
                      'usePartialMatch' : false
                    })}
                    
                </div>

                {this.renderMonsters()}

              </div>
            </div>
      		</div>;
	}
}

ReactDOM.render(<MonsterBook/>, document.querySelector('main'));
