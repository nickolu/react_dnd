import React from 'react';

export class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection : '',
      charData : this.props.charData
    };

    this.onChange = this.onChange.bind(this);
  };

  onChange(e) {

    this.setState({
      selection : e.target.value
    });

    this.props.onUpdate(e);
  }
  render() {
    let concatClasses = this.props.className+" drop-down form-field"
    return  <div className={concatClasses}>
              <select name={this.props.name} value={this.state.selection} onChange={this.onChange}>
                <option value="" defaultValue="selected">{this.props.label}</option>
                {this.props.choices.map(choice => <option key={choice.name} data-index={choice.id} value={choice.name}>{choice.name}</option>)}
              </select>
            </div>
  }
}
