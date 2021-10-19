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
import {updateUserData} from '../../../helpers/auth/auth';

const OtpScreen = ({navigation, route}) => {
  const {phone} = route.params;
  const [state, setState] = React.useState({
    phone,
    otp: '',
    code: '',
    showPreloader: false,
  });
  const [error, setError] = React.useState({});
  const verifyOtp = async () => {
    //Validate individual input
    if (!state.otp?.trim()) {
      setError(prevState => ({
        ...prevState,
        otp: 'Please input otp code',
      }));
    }

    if (state.otp.trim()) {
      setState(prevState => ({...prevState, showPreloader: true}));

      try {
        const data = await fetchRequest('login.php', state);
        console.log(phone);
        if (data.statuscode == '00') {
          const userData = {
            loggedIn: true,
            data: {...data, code: state.code, otp: state.otp},
          };

          updateUserData(userData);

          //Send user to home screen
          navigation.navigate('Home');
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
        paddingHorizontal: 20,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <PreLoader visible={state.showPreloader} />
          <Image source={assets.Logo} style={style.image} />
          <Text style={{fontSize: 18}}>Verify Phone</Text>
          <Text
            style={{
              fontSize: 12,
              color: COLORS.grey,
              marginTop: 20,
              textAlign: 'center',
            }}>
            An OTP has been sent to your phone number, kindly enter below to
            validate
          </Text>

          {/* Input and button container */}
          <View style={{marginTop: 40, width: '100%'}}>
            <CustomInput
              keyboardType="number-pad"
              onChangeText={text => setState({...state, otp: text, code: text})}
              placeholder="Enter OTP"
              error={error.otp}
              onFocus={() => setError({...error, otp: null})}
            />

            {/* Continue button section */}
            <Button title="CONTINUE" onPress={verifyOtp} />
            <Text
              style={{marginTop: 10, textAlign: 'center', fontSize: 12}}
              onPress={() => navigation.navigate('SignInScreen')}>
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

export default OtpScreen;
