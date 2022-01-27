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
import PreLoader from '../../components/loaders/PreLoader';
import Button from '../../components/buttons/Button';
import assets from '../../../conts/assets';
import CustomInput from '../../components/inputs/CustomInput';
import fetchRequest from '../../../helpers/fetchRequest';
import countryCode from '../../../conts/countryCode';

const SignInScreen = ({navigation}) => {
  const [state, setState] = React.useState({
    phone: '',
    showPreloader: false,
  });
  const [error, setError] = React.useState({});
  const [selectedCountryCode, setSelectedCountryCode] = React.useState('+234');

  const signIn = async () => {
    //Validate individual input
    if (!state.phone?.trim()) {
      setError(prevState => ({
        ...prevState,
        phone: 'Please input phone number',
      }));
    }

    if (state.phone.trim()) {
      setState(prevState => ({...prevState, showPreloader: true}));
      console.log(selectedCountryCode);

      try {
        const response = await fetchRequest({
          path: '/otp.php',
          data: {...state, countrycode: selectedCountryCode},
        });
        console.log(response, 'Ressss');
        if (response?.statuscode == '00') {
          //Send user to otp screen
          navigation.navigate('OtpScreen', response);
        } else {
          Alert.alert('Error', response?.status);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setState(prevState => ({...prevState, showPreloader: false}));
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.background,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', paddingHorizontal: 20}}>
          <PreLoader visible={state.showPreloader} />
          <Image source={assets.Logo} style={style.image} />
          <Text style={{fontSize: 18}}>Login</Text>
          <Text
            style={{
              fontSize: 12,
              color: COLORS.grey,
              marginTop: 20,
              textAlign: 'center',
            }}>
            Login to your ACHAN passenger application and book trips to and from
            the airport
          </Text>

          {/* Input and button container */}
          <View style={{marginTop: 40, width: '100%'}}>
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

            {/* Continue button section */}
            <Button title="CONTINUE" onPress={signIn} />
            <Text
              style={{marginTop: 10, textAlign: 'center', fontSize: 12}}
              onPress={() => navigation.navigate('SignUpScreen')}>
              Don`t have an account ?
              <Text style={{color: COLORS.primary, fontFamily: FONTS.bold}}>
                Sign Up
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

export default SignInScreen;
