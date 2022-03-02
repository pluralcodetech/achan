import React from 'react';
import {
  SafeAreaView,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Text from '../../components/Text';
import FONTS from '../../../conts/fonts';
import COLORS from '../../../styles/colors';
import CustomInput from '../../components/inputs/CustomInput';
import PreLoader from '../../components/loaders/PreLoader';
import assets from '../../../conts/assets';
import Button from '../../components/buttons/Button';
import fetchRequest from '../../../helpers/fetchRequest';
import countryCode from '../../../conts/countryCode';
const SignUpScreen = ({navigation}) => {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    phone: '',
    showPreloader: false,
  });
  const [error, setError] = React.useState({});
  const [selectedCountryCode, setSelectedCountryCode] = React.useState('+234');

  const signUp = async () => {
    //Validate individual input
    if (!state.name?.trim()) {
      setError(prevState => ({...prevState, name: 'Please input full name'}));
    }

    if (!state.phone?.trim()) {
      setError(prevState => ({
        ...prevState,
        phone: 'Please input phone number',
      }));
    }

    if (!state.email?.trim()) {
      setError(prevState => ({...prevState, email: 'Please input email'}));
    }

    if (state.phone.trim() && state.name.trim() && state.email.trim()) {
      setState(prevState => ({...prevState, showPreloader: true}));

      try {
        const data = await fetchRequest({
          path: 'signup.php',
          data: {...state, countrycode: selectedCountryCode},
        });
        if (data.statuscode == '00') {
          Alert.alert('Success', data.status);
          //Send user to login screen
          navigation.navigate('SignInScreen');
        } else {
          Alert.alert('Error', data.status);
        }
      } finally {
        setState(prevState => ({...prevState, showPreloader: false}));
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <PreLoader visible={state.showPreloader} />
          <Image source={assets.Logo} style={style.image} />
          <Text style={{fontSize: 18}}>Create An Account</Text>
          <Text style={{fontSize: 12, color: COLORS.grey, marginTop: 20}}>
            Create a new ACHAN passenger account
          </Text>

          {/* Input and button container */}
          <View style={{marginTop: 40, width: '100%'}}>
            <CustomInput
              onChangeText={text => setState({...state, name: text})}
              placeholder="Full Name"
              error={error.name}
              onFocus={() => setError({...error, name: null})}
            />

            <View style={{flexDirection: 'row', width: '100%'}}>
              <CustomInput
                small
                style={{width: 50, flex: 0, marginRight: 5}}
                value={selectedCountryCode}
                onFocus={() => {
                  navigation.navigate('ListScreen', {
                    items: countryCode,
                    onChange: value => setSelectedCountryCode(value?.dial_code),
                  });
                }}
              />
              <CustomInput
                keyboardType="numeric"
                onChangeText={text => setState({...state, phone: text})}
                placeholder="Phone Number"
                error={error.phone}
                onFocus={() => setError({...error, phone: null})}
              />
            </View>
            <CustomInput
              onChangeText={text => setState({...state, email: text})}
              placeholder="Email"
              error={error.email}
              onFocus={() => setError({...error, email: null})}
            />

            {/* Continue button section */}
            <Button title="CONTINUE" onPress={signUp} />
            <Text
              style={{marginTop: 10, textAlign: 'center', fontSize: 12}}
              onPress={() => navigation.navigate('SignInScreen')}>
              Already have an account ?
              <Text style={{color: COLORS.primary, fontFamily: FONTS.bold}}>
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {height: 150, width: 150, marginTop: 50},
});

export default SignUpScreen;
