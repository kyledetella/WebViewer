/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';

const HEADER = 'rgb(171, 183, 186)';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';

const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'http://kyledetella.com';

const _getInitialState = () => {
  return {
    url: DEFAULT_URL,
    status: 'No Page Loaded',
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    scalesPageToFit: true,
  };
}

class WebviewTester extends Component {
  constructor(props) {
    super();
    this.inputText = '';
    this.state = _getInitialState();
  }

  handleTextInputChange(event) {
    let url = event.nativeEvent.text;

    if (!/^[a-zA-Z-_]+:/.test(url)) {
      url = 'http://' + url;
    }

    this.inputText = url;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.addressBarRow]}>
          <TouchableOpacity
            onPress={this.goBack.bind(this)}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}
          >
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goForward.bind(this)}
            style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}
          >
            <Text>{'>'}</Text>
          </TouchableOpacity>

          <TextInput
            ref={TEXT_INPUT_REF}
            autoCapitalize="none"
            defaultValue={this.state.url}
            onSubmitEditing={this.onSubmitEditing.bind(this)}
            onChange={this.handleTextInputChange.bind(this)}
            clearButtonMode="while-editing"
            style={styles.addressBarTextInput}
          />

          <TouchableOpacity onPress={this.pressGoButton.bind()}>
            <View style={styles.goButton}>
              <Text>Go!</Text>
            </View>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.status}</Text>
        </View>
      </View>
    );
  }

  goBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  goForward() {
    this.refs[WEBVIEW_REF].goForward();
  }

  reload() {
    this.refs[WEBVIEW_REF].reload();
  }

  onShouldStartLoadWithRequest(event) {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  }

  onNavigationStateChange(navState) {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
  }

  onSubmitEditing(event) {
    this.pressGoButton();
  }

  pressGoButton() {
    let url = this.inputText.toLowerCase();
    if (url === this.state.url) {
      this.reload();
    } else {
      this.setState({
        url: url,
      });
    }
    // dismiss keyboard
    this.refs[TEXT_INPUT_REF].blur();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 12,
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 40,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
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
});

AppRegistry.registerComponent('WebviewTester', () => WebviewTester);
