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
import TripDetailsCard from '../components/TripDetailsCard';
import TripContactDetails from '../components/TripContactDetails';
import TripCost from '../components/TripCost';

const TripPreviewScreen = ({navigation, route}) => {
  const {data} = useSelector(state => state.userData);
  const [state, setState] = React.useState({
    phone: data?.phone,
    passenger_id: data?.passenger_id,
    showPreloader: false,
  });
  const {bookingDetails} = route.params || {};

  const bookRide = async () => {
    const book = async () => {
      setState(prevState => ({...prevState, showPreloader: true}));

      try {
        const response = await fetchRequest({
          path: 'book.php',
          data: {
            ...state,
            state: bookingDetails?.state,
            trip_to: bookingDetails?.trip_to,
            trip_from: bookingDetails?.trip_from,
            passenger_id: data?.passenger_id,
            area: bookingDetails?.destination_area,
          },
        });

        if (response?.statuscode == '00') {
          setTimeout(() => {
            navigation.navigate('BookRideDetailsScreen', response?.trip_id);
          }, 200);
        } else {
          Alert.alert('Error', response?.status);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setState({...state, showPreloader: false});
      }
    };
    Alert.alert('Confirm', 'Book ride?', [
      {text: 'Yes', onPress: book},
      {
        text: 'No',
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <Header rightButton={null} />
      <PreLoader visible={state.showPreloader} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginVertical: 10,
            paddingHorizontal: 40,
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 5,
              fontSize: 13,
            }}>
            From: {bookingDetails?.trip_from}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
            }}>
            To: {bookingDetails?.trip_to}
          </Text>
        </View>

        <TripDetailsCard>
          <Text style={{textAlign: 'center', fontSize: 13, flex: 1}}>
            Your ride will be dispatched and sent to your location within
            minutes. Contact us below for more information
          </Text>
          <TripContactDetails
            phoneNumber={bookingDetails?.achan_details?.phone}
            whatsappNumber={bookingDetails?.achan_details?.whatsapp_num}
          />
        </TripDetailsCard>
        <TripCost
          minAmount={bookingDetails?.minimum_est}
          maxAmount={bookingDetails?.maximum_est}
        />

        <View style={{marginHorizontal: 20}}>
          <Button title="Continue" onPress={bookRide} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripPreviewScreen;
