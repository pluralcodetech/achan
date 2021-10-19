import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getAndUpdateUserData} from '../../helpers/auth/user';
import fetchRequest from '../../helpers/fetchRequest';
import COLORS from '../../styles/colors';
import Button from '../components/buttons/Button';
import CustomInput from '../components/inputs/CustomInput';
import Header from '../components/Layouts/Header';
import PreLoader from '../components/loaders/PreLoader';

const ProfileScreen = ({navigation}) => {
  const {data} = useSelector(state => state.userData);
  const [state, setState] = React.useState({
    ...data,
    showPreloader: false,
  });
  const [error, setError] = React.useState({});
  const isFocused = navigation.isFocused();

  React.useEffect(() => {
    setState({...data, showPreloader: false});
    setError({});
  }, [data, isFocused]);

  const updateProfile = async () => {
    if (!state?.name) {
      setError({...error, name: 'Please input fullname'});
    }

    if (!state?.email) {
      setError({...error, email: 'Please input email'});
    }

    if (state?.email && state?.name) {
      try {
        setState(prevState => ({...prevState, showPreloader: true}));
        const reqData = {
          name: state?.name,
          oldphone: state?.phone,
          email: state?.email,
          address: state?.address,
          state: state?.state,
          city: state?.city,
          medical_history: state?.medical_history,
          passenger_id: state.passenger_id,
        };
        const response = await fetchRequest('update_profile.php', reqData);
        console.log(response);

        if (response?.statuscode == '00') {
          Alert.alert('Success', 'Account Updated');
        } else {
          Alert.alert('Error', response.status);
        }
      } finally {
        setState(prevState => ({...prevState, showPreloader: false}));
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <PreLoader visible={state.showPreloader} />
      <Header />

      <ScrollView style={{padding: 20}} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <CustomInput
                placeholder="Full Name"
                value={state?.name}
                error={error.name}
                onFocus={() => setError({...error, name: null})}
                onChangeText={text =>
                  setState(prevState => ({...prevState, name: text}))
                }
              />
              <CustomInput
                placeholder="Phone Number"
                editable={false}
                value={state?.phone}
                onChangeText={text =>
                  setState(prevState => ({...prevState, phone: text}))
                }
              />
              <CustomInput
                placeholder="Email"
                value={state?.email}
                error={error.email}
                onFocus={() => setError({...error, email: null})}
                onChangeText={text =>
                  setState(prevState => ({...prevState, email: text}))
                }
              />
              <CustomInput
                placeholder="Address"
                value={state?.address}
                onChangeText={text =>
                  setState(prevState => ({...prevState, address: text}))
                }
              />
              <CustomInput
                placeholder="City"
                value={state?.city}
                onChangeText={text =>
                  setState(prevState => ({...prevState, city: text}))
                }
              />
              <CustomInput
                placeholder="State"
                value={state?.state}
                onChangeText={text =>
                  setState(prevState => ({...prevState, state: text}))
                }
              />
              <CustomInput
                placeholder="Medical History"
                textArea
                style={{height: 100}}
                onChangeText={text =>
                  setState(prevState => ({...prevState, medical_history: text}))
                }
              />
              <Button title="Update Profile" onPress={updateProfile} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    resizeMode: 'stretch',
  },
});
export default ProfileScreen;
