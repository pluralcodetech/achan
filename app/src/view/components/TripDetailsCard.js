import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import COLORS from '../../styles/colors';
const TripDetailsCard = ({children}) => {
  return (
    <View style={style.card}>
      <View
        style={{
          position: 'absolute',
          height: 160,
          width: 180,
          resizeMode: 'contain',
          zIndex: -1,
          bottom: 0,
          overflow: 'hidden',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}>
        <Image
          style={{
            height: 160,
            width: 180,
            resizeMode: 'contain',
            bottom: -10,
            opacity: 0.1,
          }}
          source={require('../../assets/images/taxi.png')}
        />
      </View>

      {children}
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    paddingVertical: 40,
    backgroundColor: COLORS.white,
    elevation: 12,
    borderRadius: 10,
    shadowColor: COLORS.grey,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    minHeight: 180,
  },
});

export default TripDetailsCard;
