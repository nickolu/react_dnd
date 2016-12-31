import React from 'react';
import { TextInput } from '../form-fields/text-input.js';
import { CheckBoxGroup } from '../form-fields/checkbox-group.js';
import { ShowHideButton } from './show-hide-button.js';

export class SearchFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFor : ['name']
    }

    this.filter = this.filter.bind(this);
    this.setPropertySearch = this.setPropertySearch.bind(this);
    
  };

  filter() {
      var name = document.querySelector('[name=search]').value;
      var filters = this.props.context.state.additiveFilters || [];
      var searchFor = this.state.searchFor;
      var newFilters = [];

      searchFor.forEach(function(prop){
        var hasFilter = false;
        
        filters.forEach(function(filter){
          if (filter.key === prop && filter.type === "search") {
            hasFilter = true;
            filter.value = name;
          }
        });

        if (!hasFilter) {
          filters.push({
            "key" : prop,
            "type" : "search",
            "value" : name,
            "usePartialMatch" : true
          });  
        }
        
      });

      this.props.context.setState({
        spells: this.props.context.state.spells,
        additiveFilters : filters
      });

      this.props.onUpdate();
  }

  setPropertySearch(e) {
      var isChecked = false;
      var searchFor = this.state.searchFor; // array
      var filters = this.props.context.state.additiveFilters || [];
      var key = e.target.getAttribute('data-id');
      var i = 0;


      if (e.target.checked) {
        searchFor.push(key);
      } else {
        searchFor.splice(searchFor.indexOf(key),1);
        filters.forEach(function(filter){
          if (filter.key === key && filter.type === "search") {
            filters.splice(i,1);
          }
          i++;
        }); 
      }

      this.setState({
        searchFor : searchFor
      });

      this.filter();
      this.props.onUpdate();
  } 
  

  render() {

    return  <div>
              <TextInput type="text" label="Search" name="search" onChange={this.filter} />
              <ShowHideButton target={".advanced-search"} showText="+" hideText="-" startClosed="true"/><span>Advanced Search</span>
              <CheckBoxGroup cssClass="advanced-search height-zero" name="search_for_props" label="choices" choices={this.props.searchForChoices} groupLabel="Search In" groupName="search_for_props" onUpdate={this.setPropertySearch} />
            </div>
  }
}
