/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import { Provider } from 'react-redux';
import SampleRN from './src/SampleRN';
import configureStore from './src/store/configureStore';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      store: null,
      persistor: null,
      isLoadingStore: true
    }
  }

  componentWillMount() {
    const {store, persistor} = configureStore(() => {
      this.setState({store, persistor, isLoadingStore: false});
    });
  }

  render() {
    if(this.state.isLoadingStore) {
      return <View />
    }
    return (
      <Provider store={this.state.store} persistor={this.state.persistor}>
        <SampleRN />
      </Provider>
    );
  }
}
