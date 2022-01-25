import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';
import COLORS from '../../styles/colors';
import Header from '../components/Layouts/Header';
import Text from '../components/Text';
import Button from '../components/buttons/Button';
import fetchRequest from '../../helpers/fetchRequest';
import PreLoader from '../components/loaders/PreLoader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FONTS from '../../conts/fonts';
import {Link} from '@react-navigation/native';
import formatPrice from '../../helpers/formatPrice';

const TripPreviewScreen = ({navigation, route}) => {
  const {data} = useSelector(state => state.userData);
  const [state, setState] = React.useState({
    passenger_id: data?.passenger_id,
    showPreloader: false,
  });
  const {bookingDetails} = route.params;

  const bookRide = async () => {
    const book = async () => {
      setState(prevState => ({...prevState, showPreloader: true}));
      try {
        const response = await fetchRequest('book.php', bookingDetails);
        console.log(response);
        if (response?.statuscode == '00') {
          Alert.alert('Success', response?.status);
          navigation.navigate('BookRideDetailsScreen', response?.trip_id);
        } else {
          Alert.alert('Error', response?.status);
        }
      } finally {
        setState(prevState => ({...prevState, showPreloader: false}));
      }
    };

    Alert.alert('Confirm', 'Book ride?', [
      {text: 'Yes', onPress: () => book()},
      {text: 'No'},
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <Header />
      <PreLoader visible={state.showPreloader} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.card}>
          <Image
            style={{
              position: 'absolute',
              height: 180,
              width: 180,
              resizeMode: 'contain',
              bottom: -25,
              zIndex: -1,
              opacity: 0.1,
            }}
            source={require('../../assets/images/taxi.png')}
          />
          <Text style={{textAlign: 'center', fontSize: 13, flex: 1}}>
            Your ride will be dispatched and sent to your location within
            minutes. Contact us below for more information
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={style.contactBtn}
              activeOpacity={0.7}
              onPress={() => Linking.openURL('tel:' + bookingDetails?.phone)}>
              <View style={style.iconCon}>
                <Icon name="phone-outline" size={24} color={COLORS.blue} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.contactBtn}
              activeOpacity={0.7}
              onPress={() =>
                Linking.openURL('https://wa.me/' + bookingDetails?.phone)
              }>
              <View style={style.iconCon}>
                <Icon name="whatsapp" size={24} color={COLORS.green} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{flex: 1, textAlign: 'center', marginTop: 20}}>
            {bookingDetails?.phone}
          </Text>
        </View>
        <View style={style.tripDetailsCon}>
          <Text style={{textAlign: 'center', flex: 1}}>Trip Cost</Text>
          <Text
            style={{fontSize: 15, marginTop: 10, flex: 1, textAlign: 'center'}}>
            Min Amount:
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: FONTS.bold,
              }}>
              {' '}
              NGN{formatPrice(bookingDetails?.minimum_est)}
            </Text>
          </Text>
          <Text style={{fontSize: 15, flex: 1, textAlign: 'center'}}>
            Max Amount:
            <Text
              style={{
                color: COLORS.blue,
                fontFamily: FONTS.bold,
              }}>
              {' '}
              NGN{formatPrice(bookingDetails?.maximum_est)}
            </Text>
          </Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Button title="Continue" onPress={bookRide} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    paddingVertical: 40,
    backgroundColor: COLORS.white,
    elevation: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  contactBtn: {width: 100, justifyContent: 'center', alignItems: 'center'},
  iconCon: {
    backgroundColor: COLORS.background,
    height: 50,
    width: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripDetailsCon: {
    marginVertical: 20,
    borderStyle: 'dotted',
    borderWidth: 1,
    marginHorizontal: 20,
    borderColor: COLORS.grey,
    padding: 20,
  },
});
export default TripPreviewScreen;
