import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
var mysql = require('sync-mysql');
var mysqlEvents = require('mysql-events');

const dsn = {
  host     : '216.55.176.76',
  user     : 'meteor_test',
  password : 'QFAZ7xMSWN7xQXkapUoO',
  database : 'meteor_test'
};

const connection = new mysql(dsn);
const dbEventsConnection = mysqlEvents(dsn);

Meteor.startup(() => {
});

rows = new Mongo.Collection("rows");

Meteor.publish('rows', function() {
  const keys = {};
  const fetch = () => {
    const data = connection.query('SELECT em.id AS _id, em.alias, us.login, CONCAT(us.fname, " ", us.lname) AS uname FROM emails AS em, users AS us WHERE em.id=us.id');
    data.forEach(element => {
      if (keys[element._id]) {
        this.changed('rows', element._id, element);
      } else {
        keys[element._id] = true;
        this.added('rows', element._id, element);
      }
    });
  };
  fetch();
  this.ready();
  let dbEvent = dbEventsConnection.add(
    'meteor_test',
    () => {
      fetch();
    },
    'Active'
  );
  // const interval = Meteor.setInterval(fetch, 5000);
  this.onStop(() => {
    dbEventsConnection.stop();
    // Meteor.clearInterval(interval);
  });
});