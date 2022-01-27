import React from 'react';
import {StyleSheet, View} from 'react-native';
import COLORS from '../../styles/colors';
import FONTS from '../../conts/fonts';
import formatPrice from '../../helpers/formatPrice';
import Text from './Text';
const TripCost = ({minAmount, maxAmount, showBoth = true}) => {
  return (
    <View style={style.tripDetailsCon}>
      <Text style={{textAlign: 'center', flex: 1}}>Trip Cost</Text>
      {!showBoth ? (
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 18, marginTop: 10}}>
          NGN{formatPrice(maxAmount)}
        </Text>
      ) : (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 18,
            }}>
            NGN{formatPrice(minAmount)}
            {' - '}
          </Text>

          <Text
            style={{
              fontSize: 18,
            }}>
            NGN{formatPrice(maxAmount)}
          </Text>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  tripDetailsCon: {
    marginVertical: 20,
    borderStyle: 'dotted',
    borderWidth: 1,
    marginHorizontal: 20,
    borderColor: COLORS.grey,
    padding: 20,
  },
});

export default TripCost;
