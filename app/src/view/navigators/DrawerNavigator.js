import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import COLORS from '../../styles/colors';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FONTS from '../../conts/fonts';
import Text from '../components/Text';
import {useSelector} from 'react-redux';
import {logoutUser} from '../../helpers/auth/auth';
import {useNavigation} from '@react-navigation/core';
import ProfileScreen from '../screens/ProfileScreen';
import BookRideScreen from '../screens/BookRideScreen';
import BookRideDetailsScreen from '../screens/BookRideDetailsScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const {data} = useSelector(state => state.userData);
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: COLORS.background, padding: 0}}>
      <View
        style={{
          height: 200,
          backgroundColor: COLORS.primary,
          top: -10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="account-circle" color={COLORS.white} size={80} />
        <Text style={{color: COLORS.white}}>{data?.name?.toUpperCase()}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        activeTintColor={COLORS.dark}
        inactiveTintColor={COLORS.dark}
        onPress={() => logoutUser(navigation)}
        icon={({size}) => <Icon name="logout" size={size} />}
        label="Logout"
        labelStyle={{left: -20}}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerItemStyle: {
          backgroundColor: COLORS.background,
        },
        drawerLabelStyle: {
          left: -20,
        },
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.dark,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerIcon: ({color, size}) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="BookRideScreen"
        component={BookRideScreen}
        options={{
          title: 'Book Ride',
          drawerIcon: ({color, size}) => (
            <Icon name="taxi" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
