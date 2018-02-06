import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Row from './Row';

const Rows = new Mongo.Collection('rows');

class App extends Component {

  renderRows() {
    return this.props.rows.map((item) => (
      <Row key={item._id} data={item} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Тестовое задание (Константин Зайцев)</h1>
        </header>

        <table border="1">
          <tbody>
            <tr>
              <th>Login</th>
              <th>Full name</th>
              <th>Emails</th>
            </tr>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('rows');
  console.log(Rows.find().fetch())
  return {
    rows: Rows.find({}).fetch()
  };
})(App);