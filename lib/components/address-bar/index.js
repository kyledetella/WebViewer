'use strict';

var React = require('react-native');
var styles = require('../../style/styles');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var {
  View,
  TouchableOpacity,
  Text,
  TextInput
} = React;

var TEXT_INPUT_REF = 'urlInput';

module.exports = React.createClass({
  inputText: '',

  render: function () {
    this.inputText = this.props.url;

    return (
      <View style={[styles.addressBarRow]}>
        <TouchableOpacity onPress={this.props.handleGoBackButtonPress}>
          <View
            style={this.props.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
               {'<'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.handleGoForwardButtonPress}>
          <View style={this.props.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
              {'>'}
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput
          ref={TEXT_INPUT_REF}
          autoCapitalize="none"
          value={this.props.url}
          onSubmitEditing={this.onSubmitEditing}
          onChange={this.handleTextInputChange}
          clearButtonMode="while-editing"
          style={styles.addressBarTextInput}
        />
        <TouchableOpacity onPress={this.handleGoButtonPress}>
          <View style={styles.goButton}>
            <Text>
               Go!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  },

  handleTextInputChange: function (event) {
    this.inputText = event.nativeEvent.text;
  },

  handleGoBackButtonPress: function () {
    RCTDeviceEventEmitter.emit('BACK_BUTTON_PRESSED');
  },

  handleGoForwardButtonPress: function () {
    RCTDeviceEventEmitter.emit('FORWARD_BUTTON_PRESSED');
  },

  onSubmitEditing: function(event) {
    this.handleGoButtonPress();
  },

  handleGoButtonPress: function() {
    var url = this.inputText.toLowerCase();

    RCTDeviceEventEmitter.emit('GO_BUTTON_PRESSED', {url: url});

    // dismiss keyboard
    this.refs[TEXT_INPUT_REF].blur();
  }
});
