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

const SignInScreen = ({navigation}) => {
  const [state, setState] = React.useState({
    phone: '',
    showPreloader: false,
  });
  const [error, setError] = React.useState({});
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

      try {
        const data = await fetchRequest('otp.php', state);
        if (data.statuscode == '00') {
          console.log(data);
          //Send user to otp screen
          navigation.navigate('OtpScreen', {phone: state.phone});
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
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
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
            <CustomInput
              onChangeText={text => setState({...state, phone: text})}
              placeholder="Phone Number"
              error={error.phone}
              onFocus={() => setError({...error, phone: null})}
            />

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
