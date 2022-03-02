import React from 'react';
import {useWindowDimensions, View, Image, TouchableOpacity} from 'react-native';
import Text from './Text';
import COLORS from '../../styles/colors';
import FONTS from '../../conts/fonts';
import {useNavigation} from '@react-navigation/native';
const SmallCards = ({data}) => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  return (
    <View
      style={{
        height: 180,
        width: width * 0.5 - 25,
        borderRadius: 10,
        elevation: 20,
        shadowColor: COLORS.grey,
        shadowOpacity: 0.3,
        shadowRadius: 30,
        backgroundColor: COLORS.white,
      }}>
      <Image
        source={data?.image}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          borderRadius: 10,
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}>
        <Text
          style={{
            color: COLORS.white,
            flex: 1,
            fontFamily: FONTS.bold,
            fontSize: 13,
          }}>
          {data?.title}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('BookRideScreen')}
          style={{
            backgroundColor: COLORS.white,
            height: 30,
            width: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 10,
              color: COLORS.primary,
              fontFamily: FONTS.bold,
            }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SmallCards;
