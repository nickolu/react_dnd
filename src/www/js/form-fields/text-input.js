import React from 'react';

/**
 * TextInput();
 *
 * Params: 
 * 
 * @param {string} type - type attribute for input element ("text" || "paragraph")
 * @param {string} name - name attribute for input element 
 * @param {string} label - text label for element
 * @param {function} onChange - function to execute when the value of the input changes
 *
 * Example: 
 * 
  <TextInput 
     type="text" 
     label="Character Name" 
     name="character_name" 
     onChange={this.update}
   />
 */

export class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      charData : {
        player_name : ''
      }
    };
    this.onChange = this.onChange.bind(this);
  };

  onChange(e) {
    this.setState({
      // charData : Object.assign({},this.state.charData,{[e.target.name]:e.target.value})
      charData : Object.assign({},this.state.charData,{[e.target.name]:e.target.value}),
      userInput : [e.target.value]
    });
  }

  render() {
    let label = this.props.label ? this.props.label : "";
    return  <div className="form-field">
              <label>{label} 
                <input type={this.props.type} className="form-control" name={this.props.name} onChange={this.props.onChange}/>
              </label>
            </div>
  }
}
