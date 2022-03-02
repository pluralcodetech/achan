import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
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
import {useIsFocused} from '@react-navigation/native';
import SmallCards from '../components/SmallCards';

const MenuBtn = ({item, navigation}) => {
  return (
    <View style={{marginHorizontal: 20}}>
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
  const isFocused = useIsFocused();
  const {data} = useSelector(state => state.userData);

  const menuList = [
    {name: 'Profile', screen: 'ProfileScreen', icon: 'account-outline'},
    {name: 'Book', screen: 'BookRideScreen', icon: 'taxi'},
  ];
  const cardList = [
    {
      title: 'Book an Airport Taxi',
      image: require('../../assets/images/background2.png'),
    },
    {
      title: 'Where would you like us to take you?',
      image: require('../../assets/images/background1.png'),
    },
  ];

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getAndUpdateUserData();
    setRefreshing(false);
  }, []);

  React.useEffect(() => {
    getAndUpdateUserData();
  }, [isFocused]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <Header home />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{padding: 20}}>
        <Card acoount_balance={data?.wallet} />
        <Text
          style={{
            marginVertical: 20,
            color: COLORS.blue,
            fontFamily: FONTS.bold,
          }}>
          Hello {data?.name}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {menuList.map((item, index) => (
            <MenuBtn item={item} key={index} navigation={navigation} />
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          {cardList.map((item, index) => (
            <SmallCards data={item} key={'card' + index} />
          ))}
        </View>
        <View style={{marginTop: 20}}>
          {data?.trip_details?.length == 0 ? (
            <Text style={{flex: 1, textAlign: 'center', fontSize: 13}}>
              No Transaction yet
            </Text>
          ) : (
            <FlatList
              contentContainerStyle={{paddingBottom: 50}}
              data={data?.trip_details}
              renderItem={({item}) => (
                <ListItem
                  onPress={() => {
                    navigation.navigate('BookRideDetailsScreen', item?.trip_id);
                  }}
                  item={item}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
