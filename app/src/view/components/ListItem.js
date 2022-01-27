import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FONTS from '../../conts/fonts';
import COLORS from '../../styles/colors';
import Text from './Text';
const ListItem = ({item, onPress}) => {
  const statusColor = {
    waiting: COLORS.blue,
    complete: COLORS.green,
  };

  return (
    <TouchableOpacity
      disabled={item?.status?.toLowerCase?.() == 'complete'}
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flex: 1,
        height: 70,
        backgroundColor: COLORS.white,
        elevation: 2,
        borderWidth: 0.5,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 20,
      }}>
      <Icon name="checkbox-marked-outline" size={28} color={COLORS.grey} />

      <Text
        numberOfLines={3}
        style={{
          paddingHorizontal: 15,
          fontSize: 10,
          color: COLORS.grey,
          flex: 1,
        }}>
        {item?.from}
      </Text>
      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text
          style={{color: COLORS.primary, fontFamily: FONTS.bold, fontSize: 12}}>
          NGN{item?.amount}
        </Text>
        <View
          style={{
            height: 15,
            minWidth: 50,
            paddingHorizontal: 5,
            backgroundColor:
              statusColor[item?.status?.toLowerCase?.()] || COLORS.blue,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 8, color: COLORS.white, fontFamily: FONTS.bold}}>
            {item?.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
