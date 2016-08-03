import React from 'react';

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
    return  <div className="form-field">
              <label>{this.props.label}: <br />
                <input type={this.props.type} className="form-control" name={this.props.name} onChange={this.props.onChange}/>
              </label>
            </div>
  }
}
