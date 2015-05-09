'use strict';

var eventEmitter;
var EventEmitter = require('EventEmitter');

var events = {GO_BUTTON_PRESSED: 'GO_BUTTON_PRESSED'};

eventEmitter = new EventEmitter();


module.exports = {
  events,

  addListener: eventEmitter.addListener,

  emit: eventEmitter.emit
};
