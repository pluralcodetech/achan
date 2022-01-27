import React from 'react';
import {Modal, View, ActivityIndicator} from 'react-native';
import Text from '../Text';
import COLORS from '../../../styles/colors';

const PreLoader = ({visible, message = 'Loading...'}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
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
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default PreLoader;
