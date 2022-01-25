import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../Text';
import COLORS from '../../../styles/colors';

const Button = ({title, style, textStyle, onPress, ...props}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...props}
      onPress={onPress}
      style={
        Array.isArray(style) ? [styles.btn, style] : {...styles.btn, ...style}
      }>
      <Text
        style={
          Array.isArray(style)
            ? [styles.title, textStyle]
            : {...styles.title, ...textStyle}
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});

export default Button;
