import React from 'react';
import {View, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import COLORS from '../../styles/colors';
import Text from './Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const TripContactDetails = ({
  phoneNumber = '',
  whatsappNumber = '',
  showNumber = true,
}) => {
  return (
    <View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={style.contactBtn}
          activeOpacity={0.7}
          onPress={() => Linking.openURL('tel:' + phoneNumber)}>
          <View style={style.iconCon}>
            <Icon name="phone-outline" size={24} color={COLORS.blue} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.contactBtn}
          activeOpacity={0.7}
          onPress={() => Linking.openURL('https://wa.me/' + whatsappNumber)}>
          <View style={style.iconCon}>
            <Icon name="whatsapp" size={24} color={COLORS.green} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20}}>
        {showNumber && (
          <Text style={{flex: 1, textAlign: 'center'}}>{phoneNumber}</Text>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contactBtn: {width: 100, justifyContent: 'center', alignItems: 'center'},
  iconCon: {
    backgroundColor: COLORS.background,
    height: 50,
    width: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TripContactDetails;
