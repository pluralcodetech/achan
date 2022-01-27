import React from 'react';
import FONTS from '../../../conts/fonts';
import COLORS from '../../../styles/colors';
import {View, StyleSheet, Platform, useColorScheme} from 'react-native';
import Text from '../Text';
import {s} from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';

const CustomPicker = ({
  onValueChange,
  error,
  data,
  style,
  placeHolder,
  enabled = true,
  value = '',
}) => {
  const colorScheme = useColorScheme();

  let itemColor =
    colorScheme == 'dark'
      ? Platform.OS == 'ios'
        ? COLORS.grey
        : COLORS.white
      : Platform.OS == 'ios'
      ? COLORS.dark
      : COLORS.grey;

  const dataSet = (data ?? []).map(item => ({
    ...item,
    value: item?.value?.toString?.()?.trim?.(),
    color: itemColor,
  }));
  const [selectedValue, setSelectedValue] = React.useState('');
  React.useEffect(() => {
    if (selectedValue == '') {
      setSelectedValue(value?.toString?.().trim());
    }
  }, [data]);

  return (
    <View
      style={{
        marginBottom: 20,
      }}>
      <View
        style={[
          styles.inputContainer,
          {
            ...style,
            borderColor: error ? COLORS.red : COLORS.primary,
            backgroundColor: !enabled ? COLORS.lightBlue : COLORS.white,
          },
        ]}>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          style={
            Platform.OS == 'ios'
              ? {
                  inputIOS: {
                    color: COLORS.black,
                    fontSize: 13,
                    fontFamily: FONTS.regular,
                  },
                  placeholder: {color: COLORS.grey},
                  paddingLeft: 30,
                }
              : {
                  inputAndroid: {
                    color: COLORS.black,
                    fontSize: 13,
                    fontFamily: FONTS.regular,
                  },
                  placeholder: {color: COLORS.grey},
                  inputAndroidContainer: {
                    textAlign: 'center',
                  },
                }
          }
          value={selectedValue}
          placeholder={{
            value: '',
            label: placeHolder,
            color: itemColor,
          }}
          onValueChange={value => {
            const stringValue = value?.toString()?.trim();

            onValueChange(stringValue);
            setSelectedValue(stringValue);
          }}
          items={dataSet}
        />
      </View>
      {error && (
        <Text
          style={{
            fontSize: 10.5,
            paddingLeft: 10,
            marginTop: 5,
            color: COLORS.red,
          }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.white,
    height: '100%',
    paddingHorizontal: 5,
    borderColor: COLORS.grey,
    borderWidth: 1,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 20,
  },
});

export default CustomPicker;
