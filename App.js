import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './app/src/redux/store';
import COLORS from './app/src/styles/colors';
import RootNavigator from './app/src/view/navigators/RootNavigator';
import codePush from 'react-native-code-push';
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  updateDialog: false,
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};
const App = () => {
  const codePushConfig = async () => {
    if (!__DEV__) {
      try {
        codePush.notifyAppReady();
        const update = await codePush.checkForUpdate();
        //update is availaible show alert
        if (!update) {
          console.log('The app is up to datees!');
        } else if (update) {
          codePush.sync();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    codePushConfig();
  }, []);
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      <RootNavigator />
    </Provider>
  );
};
export default codePush(codePushOptions)(App);
