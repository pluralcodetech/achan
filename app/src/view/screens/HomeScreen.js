import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import FONTS from '../../conts/fonts';
import {getAndUpdateUserData} from '../../helpers/auth/user';
import COLORS from '../../styles/colors';
import Card from '../components/Card';
import Header from '../components/Layouts/Header';
import ListItem from '../components/ListItem';
import Text from '../components/Text';

const MenuBtn = ({item, navigation}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate(item?.screen)}
        style={{
          height: 45,
          width: 45,
          backgroundColor: COLORS.dark,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
        }}>
        <Icon name={item?.icon} size={22} color={COLORS.white} />
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 5,
          textAlign: 'center',
          fontSize: 12,
          color: COLORS.grey,
        }}>
        {item?.name}
      </Text>
    </View>
  );
};

const HomeScreen = ({navigation}) => {
  const menuList = [
    {name: 'Profile', screen: 'ProfileScreen', icon: 'account-outline'},
    {name: 'Book', screen: 'BookRideScreen', icon: 'taxi'},
    {name: 'Top Up', screen: 'TopUpScreen', icon: 'credit-card-outline'},
  ];

  const {data} = useSelector(state => state.userData);
  React.useEffect(() => {
    getAndUpdateUserData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <Header home />
      <ScrollView style={{padding: 20}}>
        <Card acoount_balance={data?.wallet} />
        <Text
          style={{
            marginVertical: 20,
            color: COLORS.blue,
            fontFamily: FONTS.bold,
          }}>
          Hello {data?.name}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {menuList.map((item, index) => (
            <MenuBtn item={item} key={index} navigation={navigation} />
          ))}
        </View>
        <View style={{marginTop: 20}}>
          {data?.trip_details?.length == 0 ? (
            <Text style={{flex: 1, textAlign: 'center', fontSize: 13}}>
              No Transaction yet
            </Text>
          ) : (
            <FlatList
              data={data?.trip_details}
              renderItem={({item}) => <ListItem item={item} />}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    resizeMode: 'stretch',
  },
});
export default HomeScreen;
