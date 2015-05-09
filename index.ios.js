'use strict';

var React = require('react-native');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var {
  AppRegistry,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  WebView
} = React;

var styles = require('./lib/style/styles');
var AddressBar = require('./lib/components/address-bar');

var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://braintreepayments.com';

var WebViewer = React.createClass({
  componentDidMount: function () {
    var events = {
      GO_BUTTON_PRESSED: this.navigate,
      BACK_BUTTON_PRESSED: this.goBack,
      FORWARD_BUTTON_PRESSED: this.goForward
    };

    Object.keys(events).forEach((event) => {
      RCTDeviceEventEmitter.addListener(event, events[event]);
    });
  },

  getInitialState: function () {
    return {
      url: DEFAULT_URL,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true
    };
  },

  render: function () {
    return (
      <View style={[styles.container]}>
        <AddressBar
          backButtonEnabled={this.state.backButtonEnabled}
          forwardButtonEnabled={this.state.forwardButtonEnabled}
          url={this.state.url}
          goBack={this.goBack}
          goForward={this.goForward}
        />
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          url={this.state.url}
          javaScriptEnabledAndroid={true}
          onNavigationStateChange={this.onNavigationStateChange}
          startInLoadingState={true}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.status}</Text>
        </View>
      </View>
    );
  },

  goBack: function () {
    this.refs[WEBVIEW_REF].goBack();
  },

  goForward: function () {
    this.refs[WEBVIEW_REF].goForward();
  },

  reload: function () {
    this.refs[WEBVIEW_REF].reload();
  },

  onNavigationStateChange: function(navState) {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
    });
  },

  navigate: function (payload) {
    var {url} = payload;

    if (url === this.state.url) {
      this.reload();
    } else {
      this.setState({
        url: url,
      });
    }
  }

});


exports.title = '<WebView>';
exports.description = 'Base component to display web content';
exports.examples = [
  {
    title: 'WebView',
    render(): ReactElement { return <WebViewer />; }
  }
];

AppRegistry.registerComponent('WebviewTester', () => WebViewer);
