import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {userDataAction} from '../../redux/actions';
import Store from '../../redux/store';
import {openMessageModal} from '../../view/components/modals/MessageAlertModal';

//get the user data from AsyncStorage
const getUserData = async () => {
  const newData = {loggedIn: false, data: {}};

  try {
    let userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      await updateUserData(newData);
      return newData;
    } else {
      return (userData = JSON.parse(userData));
    }
  } catch (error) {
    return false;
  }
};

const logoutUser = navigation => {
  Alert.alert('Confirm', 'Logout account?', [
    {text: 'No'},
    {
      text: 'Yes',
      onPress: async () => {
        //clear the user data
        await updateUserData({
          loggedIn: false,
          data: {},
        });
      },
    },
  ]);
};

//dispatch data when user  open the app
const dispatchUserDataToStore = async () => {
  const data = await getUserData();
  if (data) {
    await Store.dispatch(userDataAction(data));
  }
};

const updateUserData = async data => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    //dispatch to store
    await Store.dispatch(userDataAction(data));

    //save to user device
  } catch (error) {}
};

export {updateUserData, dispatchUserDataToStore, logoutUser};
