import {Alert} from 'react-native';
import {API} from '../conts/api';
import MESSAGES from '../conts/messages';
import FormData from 'form-data';

const fetchRequest = async (
  path,
  data,
  displayMessage = true,
  method = 'POST',
) => {
  let response;

  try {
    if (method == 'POST') {
      const form = new FormData();
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const value = data[key];
          form.append(key, value);
        }
      }

      response = await fetch(API + path, {
        method,
        body: form,
      });
    } else {
      response = await fetch(API + path, {
        method,
      });
    }

    const res = await response.json();
    return res;
  } catch (error) {
    displayMessage && Alert.alert('Error', MESSAGES.error);
    throw error;
  }
};

export default fetchRequest;
