'use strict';

var {StyleSheet} = require('react-native');
var addressBarStyles = require('./address-bar');
var constants = require('../constants.json');


var styles = StyleSheet.create(Object.assign({
  container: {
    flex: 1,
    backgroundColor: constants.styles.HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 28,
  },
  webView: {
    backgroundColor: constants.styles.BGWASH,
    height: 350,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 22,
  },
  statusBarText: {
    color: 'white',
    fontSize: 13,
  },
  spinner: {
    width: 20,
    marginRight: 6,
  },
}, addressBarStyles));

module.exports = styles;
