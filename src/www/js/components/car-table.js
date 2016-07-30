import React from 'react';

export const CarTable = props => <table className="table">
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {props.items.map(item => <tr key={item.id}>
                <td>{item.make}</td>
                <td>{item.model}</td>
                <td>{item.year}</td>
                <td>{item.color}</td>
              </tr>)}
          </tbody>
        </table>
