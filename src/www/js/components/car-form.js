import React from 'react';


export class CarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCar: {
        make: '',
        model: '',
        year: '',
        color: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.addItem = this.addItem.bind(this);
  };
  onChange(e) {
    this.setState({
      newCar : Object.assign({},this.state.newCar,{[e.target.name]:e.target.value})
    });
  };
  addItem() {
    console.log('hellow orld');
    this.props.onAddItem({
      make: this.state.newCar.make,
      model: this.state.newCar.model,
      year: this.state.newCar.year,
      color: this.state.newCar.color
    });
    this.setState({
      newCar: {
        make: '',
        model: '',
        year: '',
        color: ''
      }
    });
  };
  render() {
    return <form className="col-xs-4">
      <h2>New Car:</h2>
      <div className="form-group">
        <div>
          <label>Make:
            <input type='text' className="form-control" name='make' value={this.state.newCar.make} onChange={this.onChange}/>
          </label>
        </div>

        <div>
          <label>Model:
            <input type='text' className="form-control" name='model' value={this.state.newCar.model} onChange={this.onChange}/>
          </label>
        </div>


        <div>
          <label>Year:
            <input type='text' className="form-control" name='year' value={this.state.newCar.year} onChange={this.onChange}/>
          </label>
        </div>

        <div>
          <label>Color:
            <input type='text' className="form-control" name='color' value={this.state.newCar.color} onChange={this.onChange}/>
          </label>
        </div>

        <div>
          <button className="btn btn-primary" name='submit' type='button' onClick={this.addItem}>Add Item</button>
        </div>
        <div>{this.state.newCar.make} | {this.state.newCar.model} | {this.state.newCar.year} | {this.state.newCar.color}</div>
      </div>
      </form>
  }
}
