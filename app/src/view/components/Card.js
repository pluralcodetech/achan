import React from 'react';
import {View} from 'react-native';
import formatPrice from '../../helpers/formatPrice';
import COLORS from '../../styles/colors';
import Text from './Text';
const Card = ({acoount_balance}) => {
  return (
    <View
      style={{
        height: 160,
        flex: 1,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 20,
      }}>
      <Text style={{color: COLORS.white, fontSize: 15}}>Ride Wallet</Text>
      <Text style={{color: COLORS.white, fontSize: 24}}>
        NGN{formatPrice(acoount_balance)}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: COLORS.white, fontSize: 23}}>****</Text>
        <Text style={{color: COLORS.white, fontSize: 23}}>****</Text>
        <Text style={{color: COLORS.white, fontSize: 23}}>****</Text>
        <Text style={{color: COLORS.white, fontSize: 23}}>****</Text>
      </View>
      <View></View>
    </View>
  );
};

export default Card;
