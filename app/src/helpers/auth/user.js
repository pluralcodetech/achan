import Store from '../../redux/store';
import {updateUserData} from './auth';
import fetchRequest from '../fetchRequest';

let timeout = null;
//get user data from server and update data
const getAndUpdateUserData = async () => {
  clearTimeout(timeout);
  const {data, loggedIn} = await Store.getState().userData;

  try {
    const reqData = {
      phone: data?.phone,
      passenger_id: data?.passenger_id,
      code: data?.code,
    };
    const response = await fetchRequest({
      path: 'dashboard.php',
      data: reqData,
      displayMessage: false,
    });

    if (response.statuscode == '00') {
      if (loggedIn) {
        console.log('Looged');
        updateUserData({
          loggedIn: true,
          data: response,
        });
      }
    } else {
      //Logout the user
      await updateUserData({
        loggedIn: false,
        data: {},
      });
    }
  } catch (error) {
    console.log(error);
    timeout = setTimeout(getAndUpdateUserData, 10000);
  }
};

export {getAndUpdateUserData};
