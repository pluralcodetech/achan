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
  small,
  style,
  ...props
}) => {
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        marginBottom: 20,

        ...style,
      }}>
      <View
        style={[
          styles.inputContainer,
          {
            borderWidth: 1,
            borderColor: error
              ? COLORS.red
              : isFocus
              ? COLORS.primary
              : COLORS.grey,
            height: textArea ? 100 : 50,
            backgroundColor: editable ? COLORS.white : COLORS.background,
            paddingVertical: textArea ? 10 : 0,
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
          style={{
            ...inputStyle,

            ...styles.input,
            paddingHorizontal: small ? 10 : 20,
          }}
          multiline={textArea}
          editable={editable}
        />
      </View>
      {error && !small && (
        <Text style={{fontSize: 10, marginTop: 5, color: COLORS.red}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: '100%',
  },
});
export default CustomInput;
