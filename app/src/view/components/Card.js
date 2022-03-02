import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import COLORS from '../../styles/colors';
import Text from './Text';
import FONTS from '../../conts/fonts';
import {useNavigation} from '@react-navigation/native';
const Card = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 180,
        flex: 1,
        backgroundColor: '#FDFDFD',
        borderRadius: 10,
        padding: 20,
        elevation: 20,
        shadowColor: COLORS.grey,
        shadowOpacity: 0.3,
        shadowRadius: 20,
        marginVertical: 20,
      }}>
      <View
        style={{
          position: 'absolute',
          height: 180,
          width: 220,
          overflow: 'hidden',
          borderRadius: 10,
        }}>
        <Image
          source={require('../../assets/images/circles.png')}
          style={{
            resizeMode: 'contain',
            left: -60,
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <Text style={{fontSize: 24, fontFamily: FONTS.bold, width: 200}}>
        AIRPORT TAXI 24/7
      </Text>

      <View
        style={{
          position: 'absolute',
          height: 180,
          width: 180,
          overflow: 'hidden',
          borderRadius: 10,
          right: 0,
          bottom: -20,
        }}>
        <Image
          source={require('../../assets/images/cars.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('BookRideScreen')}
        style={{
          height: 50,
          width: 50,
          backgroundColor: COLORS.dark,
          borderRadius: 5,
          top: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: COLORS.white, fontSize: 12, textAlign: 'center'}}>
          Book Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
