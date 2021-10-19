import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './app/src/redux/store';
import COLORS from './app/src/styles/colors';
import RootNavigator from './app/src/view/navigators/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      <RootNavigator />
    </Provider>
  );
};
export default App;
