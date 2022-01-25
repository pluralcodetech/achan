import React from 'react';
import {View, Animated, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import assets from '../../../conts/assets';
import COLORS from '../../../styles/colors';
import {useNavigation} from '@react-navigation/core';

const Header = ({home}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 70,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      {home ? (
        <Image source={assets.Logo} style={{height: 60, width: 60}} />
      ) : (
        <Icon
          name="arrow-left"
          size={28}
          color={COLORS.primary}
          onPress={navigation.goBack}
        />
      )}

      <Icon
        name="menu"
        size={28}
        color={COLORS.primary}
        onPress={navigation.toggleDrawer}
      />
    </View>
  );
};

export default Header;
