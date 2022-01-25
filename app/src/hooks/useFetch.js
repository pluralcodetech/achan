import React from 'react';
import {Alert} from 'react-native';
import {API} from '../conts/api';
import MESSAGES from '../conts/messages';
const useFetch = () => {
  const [reqResponse, setreqResponse] = React.useState(null);
  const [reqError, setReqError] = React.useState(null);

  const fetchData = async (path, data) => {
    setReqError(null);
    setreqResponse(null);
    try {
      const response = await fetch(API + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      const data = await response.json();
      setreqResponse(data);
      console.log(data);
      // setState(prevState => ({...prevState, showPreloader: false}));
      // if (data.status == 'success') {
      //   openMessageModal(
      //     'Success',
      //     'Registration was succesful, You can now sign in.',
      //   );
      //   navigation.replace('SignInScreen');
      // } else {
      //   openMessageModal('Error', data.message, 'error');
      // }
    } catch (error) {
      setReqError(error);
      Alert.alert('Error', MESSAGES.error);
    }
  };

  return {fetchData, reqResponse, reqError};
};

export default useFetch;
