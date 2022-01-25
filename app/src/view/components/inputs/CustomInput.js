import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FONTS from '../../../conts/fonts';
import COLORS from '../../../styles/colors';
import Text from '../Text';

const CustomInput = ({
  error,
  onFocus = () => {},
  textArea,
  editable = true,
  inputStyle,
  ...props
}) => {
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        marginBottom: 20,
      }}>
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
            height: textArea ? 100 : 50,
            backgroundColor: editable ? COLORS.white : COLORS.background,
          },
        ]}>
        <TextInput
          {...props}
          placeholderTextColor={COLORS.dark}
          onFocus={() => {
            onFocus();
            setIsFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
          style={{...inputStyle, ...style.input}}
          multiline={textArea}
          editable={editable}
        />
      </View>
      {error && (
        <Text style={{fontSize: 10, marginTop: 5, color: COLORS.red}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 0,
  },
  input: {
    color: COLORS.dark,
    fontFamily: FONTS.regular,
    fontSize: 11,
    paddingHorizontal: 20,
  },
});
export default CustomInput;
