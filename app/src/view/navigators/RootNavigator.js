import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/authScreens/SignUpScreen';
import SignInScreen from '../screens/authScreens/SignInScreen';
import OtpScreen from '../screens/authScreens/OtpScreen';
import {useSelector} from 'react-redux';
import {
  closeMessageModal,
  MessageAlertModal,
} from '../components/modals/MessageAlertModal';
import DrawerNavigator from './DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dispatchUserDataToStore} from '../../helpers/auth/auth';
import ListScreen from '../screens/ListScreen';
import BookRideDetailsScreen from '../screens/BookRideDetailsScreen';
import TripPreviewScreen from '../screens/TripPreviewScreen';

const Stack = createStackNavigator();
const RootNavigator = () => {
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [showSplashScreen, setShowSplashScreen] = React.useState(true);
  const data = useSelector(state => state.userData);

  const messageAlertData = useSelector(state => state.messageAlertData);

  React.useEffect(() => {
    setLoggedIn(data.loggedIn);
  }, [data]);

  React.useEffect(async () => {
    dispatchUserDataToStore();
    //Hide splashscreen after 4s
    setTimeout(() => setShowSplashScreen(false), 0);
  }, []);

  {
    return showSplashScreen ? (
      <SplashScreen />
    ) : (
      <NavigationContainer>
        {/* Render custom message alert */}
        {/* <MessageAlertModal
          visible={messageAlertData?.visible}
          title={messageAlertData?.title}
          message={messageAlertData?.message}
          option={messageAlertData?.option}
          closeModal={closeMessageModal}
        /> */}
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loggedIn ? (
            <>
              <Stack.Screen name="Home" component={DrawerNavigator} />
              <Stack.Screen
                options={{...TransitionPresets.ModalSlideFromBottomIOS}}
                name="ListScreen"
                component={ListScreen}
              />
              <Stack.Screen
                name="TripPreviewScreen"
                component={TripPreviewScreen}
              />
              <Stack.Screen
                name="BookRideDetailsScreen"
                component={BookRideDetailsScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default RootNavigator;
