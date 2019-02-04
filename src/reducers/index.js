var { combineReducers } = require('redux');

module.exports = combineReducers({
  users: require('./users'),
});