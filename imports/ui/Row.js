import React, { Component } from 'react';
 
export default class Row extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.login}</td>
        <td>{this.props.data.uname}</td>
        <td>{this.props.data.alias}</td>
      </tr>
    );
  }
}