import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import COLORS from '../../styles/colors';
import Header from '../components/Layouts/Header';
import Text from '../components/Text';
import Button from '../components/buttons/Button';
import fetchRequest from '../../helpers/fetchRequest';
import PreLoader from '../components/loaders/PreLoader';
import FONTS from '../../conts/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import formatPrice from '../../helpers/formatPrice';

const TripCost = ({details}) => {
  return (
    <View style={style.tripCostCon}>
      <Text style={{textAlign: 'center', flex: 1}}>Trip Cost</Text>
      {details?.driver_status?.toLowerCase?.() != 'complete' && (
        <View>
          <Text
            style={{fontSize: 15, marginTop: 10, flex: 1, textAlign: 'center'}}>
            Min Amount:
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: FONTS.bold,
              }}>
              {' '}
              NGN{formatPrice(details?.mincost)}
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
              NGN{formatPrice(details?.maxcost)}
            </Text>
          </Text>
        </View>
      )}
      {details?.driver_status?.toLowerCase?.() == 'complete' && (
        <Text
          style={{
            fontSize: 22,
            flex: 1,
            textAlign: 'center',
            fontFamily: FONTS.bold,
          }}>
          NGN{formatPrice(details?.total)}
        </Text>
      )}
    </View>
  );
};

const DriverDetailsCard = ({details, maplink}) => {
  return (
    <View style={style.card}>
      <Image
        style={style.illusImage}
        source={require('../../assets/images/taxi.png')}
      />
      <View style={{alignItems: 'center'}}>
        <Image style={style.image} />
        <Text style={{flex: 1, marginTop: 10}}>
          Here is your driver and vehicle information
        </Text>
        <Text style={{fontSize: 13, fontFamily: FONTS.bold, marginTop: 10}}>
          {details?.name}
        </Text>
        <Text style={{fontSize: 13, marginTop: 10}}>
          {details?.car_name}({details?.license_plate})
        </Text>
        <Text style={{fontSize: 13, marginVertical: 10}}>{details?.phone}</Text>
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL(maplink)}
        activeOpacity={0.7}
        style={style.directionIconCon}>
        <Icon name="map-marker-outline" color={COLORS.primary} size={25} />
        <Text style={{fontSize: 13}}>View Directions</Text>
      </TouchableOpacity>
    </View>
  );
};

const BookRideDetailsScreen = ({navigation, route}) => {
  const trip_id = route.params;
  const {data} = useSelector(state => state.userData);
  const [state, setState] = React.useState({
    phone: data?.phone,
    passenger_id: data?.passenger_id,
    showPreloader: false,
    trip_id,
  });
  const [tripDetails, setTripDetails] = React.useState('');
  const setTimeoutRef = React.useRef(null);

  React.useEffect(() => {
    setState(prevState => ({...prevState, showPreloader: true}));
    getTripDetails();
    return () => {
      clearTimeout(setTimeoutRef.current);
    };
  }, []);
  const getTripDetails = async () => {
    clearTimeout(setTimeoutRef.current);
    try {
      const response = await fetchRequest('trip_details.php', state, false);

      if (response?.achan_details) {
        setTripDetails(response);
        setState(prevState => ({...prevState, showPreloader: false}));
      } else {
        navigation.goBack();
        Alert.alert('Error', response?.status);
      }
    } finally {
      setTimeoutRef.current = setTimeout(() => getTripDetails(), 7000);
    }
  };

  const cancelTrip = () => {
    const cancel = async () => {
      try {
        const response = await fetchRequest('cancel_trip.php', state);
        if (response.statuscode == '00') {
          navigation.navigate('BookRideScreen');
          Alert.alert('Success', 'Trip cancelled');
          clearTimeout(setTimeoutRef.current);
        } else {
          Alert.alert('Error', response?.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    Alert.alert('Confirm', 'Cancel trip?', [
      {text: 'Yes', onPress: cancel},
      {text: 'No'},
    ]);
  };

  const DisplayDetails = () => {
    console.log(tripDetails);
    if (
      tripDetails?.trip_details?.driver_status?.toLowerCase?.() == 'active' &&
      (tripDetails?.trip_details?.status?.toLowerCase?.() == 'active' ||
        tripDetails?.trip_details?.status?.toLowerCase?.() == 'waiting')
    ) {
      return (
        <DriverDetailsCard
          details={tripDetails?.driver_details}
          maplink={tripDetails?.trip_details?.maplink}
        />
      );
    }
    //Show waiting for driver
    if (
      tripDetails?.trip_details?.driver_status?.toLowerCase?.() != 'active' &&
      tripDetails?.trip_details?.status?.toLowerCase?.() != 'complete'
    ) {
      return (
        <View style={style.card}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{flex: 1, textAlign: 'center', marginTop: 10}}>
            Waiting for a Driver
          </Text>
        </View>
      );
    }

    return null;
  };

  const DisplayLocation = () => {
    if (
      tripDetails?.trip_details?.driver_status?.toLowerCase?.() == 'active' &&
      (tripDetails?.trip_details?.status?.toLowerCase?.() == 'active' ||
        tripDetails?.trip_details?.status?.toLowerCase?.() == 'complete')
    ) {
      return (
        <Text style={{flex: 1, textAlign: 'center', marginVertical: 10}}>
          {tripDetails?.trip_details?.from}
        </Text>
      );
    }
    return null;
  };

  const ShowButton = () => {
    if (
      tripDetails?.trip_details?.driver_status?.toLowerCase?.() == 'pending' ||
      (tripDetails?.trip_details?.driver_status?.toLowerCase?.() == 'active' &&
        tripDetails?.trip_details?.status?.toLowerCase?.() == 'waiting')
    ) {
      return (
        <Button
          onPress={cancelTrip}
          title="Cancel Trip"
          style={{backgroundColor: COLORS.red}}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <Header />
      <PreLoader visible={state.showPreloader} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DisplayLocation />
        <DisplayDetails />

        <TripCost details={tripDetails?.trip_details} />

        <View style={{marginHorizontal: 20}}>
          <Text style={{flex: 1, textAlign: 'center'}}>
            You can choose to pay with cash to your driver at the end of your
            trip
          </Text>
          <ShowButton />
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
  tripCostCon: {
    marginVertical: 20,
    borderStyle: 'dotted',
    borderWidth: 1,
    marginHorizontal: 20,
    borderColor: COLORS.grey,
    padding: 20,
  },
  illusImage: {
    position: 'absolute',
    height: 180,
    width: 180,
    resizeMode: 'contain',
    bottom: -25,
    zIndex: -1,
    opacity: 0.1,
  },
  image: {
    height: 70,
    width: 70,
    backgroundColor: COLORS.red,
    borderRadius: 50,
  },
  directionIconCon: {
    height: 40,
    backgroundColor: COLORS.background,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default BookRideDetailsScreen;
