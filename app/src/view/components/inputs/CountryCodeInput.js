import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import COLORS from '../../../styles/colors';
import FONTS from '../../../conts/fonts';
import CustomPicker from './Picker';
const CountryCodeInput = ({style}) => {
  const [error, setError] = React.useState('');
  const [isFocus, setIsFocus] = React.useState(false);
  return (
    <View
      style={{
        ...style,
        marginBottom: 20,
      }}>
      <CustomPicker />
      <View
        style={[
          style.inputContainer,
          {
            borderWidth: 1,
            borderColor: error
              ? COLORS.red
              : isFocus
              ? COLORS.primary
              : COLORS.grey,
            height: 50,
            width: 50,
            backgroundColor: COLORS.white,
          },
        ]}></View>
      {/* {error && (
        <Text style={{fontSize: 10, marginTop: 5, color: COLORS.red}}>
          {error}
        </Text>
      )} */}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  input: {
    color: COLORS.dark,
    fontFamily: FONTS.regular,
    fontSize: 11,
    paddingHorizontal: 20,
  },
});
export default CountryCodeInput;
