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
import TripDetailsCard from '../components/TripDetailsCard';
import TripContactDetails from '../components/TripContactDetails';
import TripCost from '../components/TripCost';
import {useIsFocused} from '@react-navigation/native';

const cancel = (state, navigation, setState, setTimeoutRef) => {
  const cancel = async () => {
    setState(prevState => ({...prevState, showPreloader: true}));
    try {
      const response = await fetchRequest({
        path: 'cancel_trip.php',
        data: state,
      });
      if (response.statuscode == '00') {
        navigation.navigate('BookRideScreen');
        Alert.alert('Success', 'Trip cancelled');
        clearTimeout(setTimeoutRef.current);
      } else {
        Alert.alert('Error', response?.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setState(prevState => ({...prevState, showPreloader: false}));
    }
  };

  Alert.alert('Confirm', 'Cancel trip?', [
    {text: 'Yes', onPress: cancel},
    {text: 'No'},
  ]);
};

const ShowButton = ({
  status,
  driverStatus,
  state,
  navigation,
  setTimeoutRef,
  tripDetails,
  setState,
}) => {
  if (
    !tripDetails?.driver_details?.driver_id ||
    driverStatus == 'pending' ||
    (tripDetails?.driver_details?.driver_id &&
      driverStatus == 'active' &&
      status == 'waiting')
  ) {
    return (
      <Button
        onPress={() => cancel(state, navigation, setState, setTimeoutRef)}
        title="Cancel Trip"
        style={{backgroundColor: COLORS.red}}
      />
    );
  }
  return null;
};

const DriverDetailsCard = ({details, maplink, status}) => {
  return (
    <TripDetailsCard style={style.card}>
      <View style={{alignItems: 'center'}}>
        <Image style={style.image} source={{uri: details?.driver_image}} />
        <Text style={{flex: 1, marginTop: 10}}>
          Here is your driver and vehicle information
        </Text>
        <Text style={{fontSize: 13, fontFamily: FONTS.bold, marginTop: 10}}>
          {details?.name}
        </Text>
        <Text style={{fontSize: 13, marginTop: 10}}>
          {details?.car_name}({details?.license_plate})
        </Text>
        <Text style={{fontSize: 13, marginVertical: 10, color: COLORS.green}}>
          {details?.phone}
        </Text>
      </View>
      {status == 'waiting' && (
        <TripContactDetails
          phoneNumber={details?.phone}
          whatsappNumber={details?.phone}
          showNumber={false}
        />
      )}

      <TouchableOpacity
        onPress={() => Linking.openURL(maplink)}
        activeOpacity={0.7}
        style={style.directionIconCon}>
        <Icon name="map-marker-outline" color={COLORS.primary} size={25} />
        <Text style={{fontSize: 13}}>View Directions</Text>
      </TouchableOpacity>
    </TripDetailsCard>
  );
};

const DisplayDetails = ({driverStatus, status, tripDetails}) => {
  //No Driver Avaliable
  if (
    tripDetails?.trip_details?.driver_available.toLowerCase?.() == 'no' &&
    !tripDetails?.driver_details?.driver_id
  ) {
    return (
      <TripDetailsCard>
        <Text
          style={{
            fontSize: 13,
            marginTop: 10,
            textAlign: 'center',
            color: COLORS.red,
          }}>
          Sorry, there is no driver available at this time! you can contact the
          Local administrator below for a special trip arrangement
        </Text>
        <TripContactDetails
          phoneNumber={tripDetails?.achan_details?.phone}
          whatsappNumber={tripDetails?.achan_details?.phone}
        />
      </TripDetailsCard>
    );
  } else if (
    tripDetails?.driver_details?.driver_id == '' ||
    driverStatus == 'pending'
  ) {
    //Waiting for driver
    return (
      <TripDetailsCard>
        <Text style={{fontSize: 13, marginTop: 10, textAlign: 'center'}}>
          Your ride will be dispatched and sent to your location shortly.
          Contact us below for more information
        </Text>
        <TripContactDetails
          phoneNumber={tripDetails?.achan_details?.phone}
          whatsappNumber={tripDetails?.achan_details?.phone}
        />
      </TripDetailsCard>
    );
  } else if (
    tripDetails?.driver_details?.driver_id &&
    driverStatus == 'active' &&
    status != 'complete'
  ) {
    return (
      <DriverDetailsCard
        status={status}
        details={tripDetails?.driver_details}
        maplink={tripDetails?.trip_details?.maplink}
      />
    );
  }

  return null;
};

const DisplayLocation = ({tripDetails}) => {
  return (
    <View
      style={{
        flex: 1,
        marginVertical: 10,
        paddingHorizontal: 40,
      }}>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 5,
          fontSize: 13,
        }}>
        From:{tripDetails?.trip_details?.from}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 13,
        }}>
        To:{tripDetails?.trip_details?.to}
      </Text>
    </View>
  );
};
const BookRideDetailsScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();

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
  const driverStatus =
    tripDetails?.trip_details?.driver_status?.toLowerCase?.();
  const status = tripDetails?.trip_details?.status?.toLowerCase?.();

  React.useEffect(() => {
    if (isFocused) {
      getTripDetails();
    } else {
      clearTimeout(setTimeoutRef.current);
    }
  }, [isFocused]);
  const getTripDetails = async () => {
    clearTimeout(setTimeoutRef.current);

    try {
      const response = await fetchRequest({
        path: 'trip_details.php',
        data: state,
        displayMessage: false,
      });

      if (response?.achan_details) {
        setTripDetails(response);
      } else {
        if (isFocused) {
          // Alert.alert('Error', 'Trip is completed');
          // navigation.goBack();
        }
        clearTimeout(setTimeoutRef.current);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeoutRef.current = setTimeout(() => getTripDetails(), 7000);
    }
  };

  /* show empty page wen loading */

  if (!tripDetails) {
    return <PreLoader visible={true} />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <Header rightButton={null} />
      <PreLoader visible={state.showPreloader} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DisplayLocation
          driverStatus={driverStatus}
          status={status}
          tripDetails={tripDetails}
        />
        <DisplayDetails
          driverStatus={driverStatus}
          status={status}
          tripDetails={tripDetails}
        />
        {/* Show Trip cost */}
        {status == 'complete' && (
          <View>
            <TripCost
              showBoth={false}
              minAmount={tripDetails?.trip_details?.total}
              maxAmount={tripDetails?.trip_details?.total}
            />
            <Text style={{flex: 1, textAlign: 'center', paddingHorizontal: 20}}>
              you can pay driver by cash or bank transfer
            </Text>
          </View>
        )}

        {/* Show Button */}
        <View style={{marginHorizontal: 20}}>
          {status != 'complete' && (
            <Text style={{flex: 1, textAlign: 'center'}}>
              You can choose to pay with cash to your driver at the end of your
              trip
            </Text>
          )}

          <ShowButton
            cancelTrip={() => cancelTrip(navigation, setTimeoutRef)}
            status={status}
            driverStatus={driverStatus}
            navigation={navigation}
            setTimeoutRef={setTimeoutRef}
            state={state}
            setState={setState}
            tripDetails={tripDetails}
          />
        </View>

        {status == 'complete' && (
          <View style={{paddingHorizontal: 20}}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: COLORS.green,
                fontSize: 18,
                fontFamily: FONTS.bold,
                marginTop: 10,
              }}>
              Trip Successful
            </Text>
            <Button
              title="Home"
              onPress={() => navigation.navigate('HomeScreen')}
            />
          </View>
        )}
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
    shadowColor: COLORS.grey,
    shadowOpacity: 0.2,
    shadowRadius: 10,
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
    borderRadius: 70,
  },
  directionIconCon: {
    height: 40,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
export default BookRideDetailsScreen;
