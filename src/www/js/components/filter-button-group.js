import React from 'react';
import * as utilities from "../utilities.js";
import { ButtonGroup } from '../form-fields/button-group.js';

/**
 * renders a group of buttons which filter the spells by a key and list of options
 * @param  {string}   key           the value for the spell filter key ("class","level","school", etc)
 * @param  {array}    choices       list of options for the provided key
 * @param  {boolean}  multiSelect   whether to allow multiple options to be selected at one time
 * @return {ButtonGroup}            <ButtonGroup /> element to render
 */
export class FilterButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timesSet : 0
    }

    this.filter = this.filter.bind(this);
  };

  

  filter(e,choice,isActive) {
      var activeBtns = document.querySelectorAll("."+this.props.prop+".btn.active");
      var val = typeof choice === "string" ? choice : choice.val;
      var filtersArr = this.props.additiveFilters ? this.props.context.state.additiveFilters : this.props.context.state.subtractiveFilters
      var removeFilter = {};
      var i = 0;
      var addFilter = {
        "key" : this.props.prop,
        "value" : val,
        "usePartialMatch" : this.props.usePartialMatch || false
      };

      console.log(filtersArr);
      console.log(this.props.additiveFilters);

      if (this.props.type) {
        addFilter.type = this.props.type;
      }

      if (isActive) {
        // the button was active when clicked, so make it inactive and remove its filter
        this.props.context.setState({
          spells : utilities.sortObjectsByProp(this.props.data, "name"),
          [filtersArr] : utilities.removeObject(filtersArr,addFilter)
        });

        this.setState({
          timesSet : this.state.timesSet - 1
        });

      } else if (!this.props.multiSelect) {
        // the button was not active and multiSelect is off, so switch the active button, remove the old filter, and add this one

        for (i=0; i<activeBtns.length; i++) {
          if (!(activeBtns[i].innerHTML === addFilter.value)) {
            removeFilter = utilities.getObjectsByProp(filtersArr, "value", activeBtns[i].getAttribute("data-key"))[0];
          }
        }

        this.props.context.setState({
          spells : this.props.context.state.spells,
          [filtersArr] : utilities.removeObject(filtersArr,removeFilter)
        });

        filtersArr.push(addFilter);
      } else {
        // the button was not active and multiSelect is on, so just add the filter for whichever button was clicked
        filtersArr.push(addFilter);
      }

      
      console.log(this.state);
      this.props.onUpdate(e);
    }

  render() {
    return <ButtonGroup choices={this.props.choices} groupLabel={this.props.prop} onUpdate={this.filter} multiSelect={this.props.multiSelect}/>
  }
}
