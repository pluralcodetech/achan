import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FONTS from '../../conts/fonts';
import COLORS from '../../styles/colors';
import Text from './Text';
const ListItem = ({item}) => {
  return (
    <View
      style={{
        flex: 1,
        height: 70,
        backgroundColor: COLORS.white,
        elevation: 2,
        borderWidth: 0.2,
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
        From MMI Airtport to 12 Gbemisola street, Oshodi From MMI Airtport to 12
        Gbemisola street, Oshodi 12 Gbemisola street, Oshodi 12 Gbemisola
      </Text>
      <View style={{justifyContent: 'center'}}>
        <Text style={{color: COLORS.primary, fontFamily: FONTS.bold}}>
          N200
        </Text>
      </View>
    </View>
  );
};

export default ListItem;
