import React from 'react';
import {SafeAreaView, Image} from 'react-native';
import assets from '../../conts/assets';

import COLORS from '../../styles/colors';

const SplashScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image style={{height: 150, width: 150}} source={assets.Logo} />
    </SafeAreaView>
  );
};

export default SplashScreen;
