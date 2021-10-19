import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import FONTS from '../../../conts/fonts';
import COLORS from '../../../styles/colors';
import Text from '../Text';
const {height} = Dimensions.get('window');

const ScreenLoader = ({loading}) => {
  return (
    loading && (
      <View style={styles.container}>
        <View
          style={{
            height: 60,
            backgroundColor: COLORS.light,
            width: '70%',
            alignItems: 'center',
            borderRadius: 4,
            flexDirection: 'row',
          }}>
          <ActivityIndicator
            size="small"
            color={COLORS.primary}
            style={{marginLeft: 20, marginRight: 15}}
          />
          <Text
            style={{
              fontSize: 12,
              color: COLORS.dark,
            }}>
            Loading
          </Text>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    height,
    width: '100%',
    zIndex: 10000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    marginTop: 5,
    fontSize: 17,
    color: '#fff',
    fontFamily: FONTS.bold,
  },
});

export default ScreenLoader;
