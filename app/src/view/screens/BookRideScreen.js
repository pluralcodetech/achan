import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import COLORS from '../../styles/colors';
import CustomInput from '../components/inputs/CustomInput';
import Header from '../components/Layouts/Header';
import Text from '../components/Text';
import Button from '../components/buttons/Button';
import fetchRequest from '../../helpers/fetchRequest';
import PreLoader from '../components/loaders/PreLoader';
import listOfstates from '../../conts/listOfstates';
import {useIsFocused} from '@react-navigation/native';

const BookRideScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();

  const {data} = useSelector(state => state.userData);
  const [state, setState] = React.useState({
    phone: data?.phone,
    passenger_id: data?.passenger_id,
    showPreloader: false,
  });
  const [airports, setAirports] = React.useState([]);
  const [destinationAreas, setDestinationAreas] = React.useState([]);
  const [seletedAirport, setSelectedAirport] = React.useState(null);
  const [seletedState, setSelectedState] = React.useState('');
  const [destinationAddress, setDestinationAddress] = React.useState('');
  const [seletedDestinationArea, setSeletedDestinationArea] =
    React.useState(null);

  const resetBookRideScreen = () => {
    setSelectedState('');
    setSelectedAirport('');
    setDestinationAddress('');
    setSeletedDestinationArea('');
  };
  React.useEffect(() => {}, [route]);
  const getAirportLocations = async state => {
    try {
      setState(prevState => ({...prevState, showPreloader: true}));
      const response = await fetchRequest({
        path: 'address_book.php',
        data: {state: state?.name.toLowerCase?.()},
        displayMessage: false,
      });
      console.log(response);
      if (response?.airports) {
        const filteredAirPorts = (response?.airports ?? []).map(item => ({
          ...item,
          name: item.airport,
        }));
        setAirports(filteredAirPorts);

        const filteredDestinationArea = (response?.areas ?? []).map(item => ({
          ...item,
          name: item.area,
        }));
        setDestinationAreas(filteredDestinationArea);

        setState(prevState => ({...prevState, showPreloader: false}));
      } else {
        setState(prevState => ({...prevState, showPreloader: false}));
      }
    } catch (error) {
      console.log(error);
      //Send the request after 7s
      // setTimeout(() => getAirportLocations(), 7000);
    }
  };

  const getTripPreiview = async () => {
    if (!seletedState) {
      Alert.alert('Error', 'Please choose state');
    } else if (!seletedAirport) {
      Alert.alert('Error', 'Please choose airport');
    } else if (!seletedDestinationArea) {
      Alert.alert('Error', 'Please choose destination area');
    } else if (!destinationAddress) {
      Alert.alert('Error', 'Please input destination address');
    } else {
      const bookingDetails = {
        ...state,
        trip_from: seletedAirport,
        area: seletedDestinationArea,
        trip_to: destinationAddress,
        state: seletedState,
      };

      setState({...state, showPreloader: true});
      try {
        const response = await fetchRequest({
          path: 'trip_preview.php',
          data: bookingDetails,
        });
        console.log(response, 'res....');
        if (response?.statuscode == '00') {
          navigation.navigate('TripPreviewScreen', {
            bookingDetails: {...bookingDetails, ...response},
            resetBookRideScreen,
          });
        } else {
          Alert.alert('Error', response?.status);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setState({...state, showPreloader: false});
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <Header />
      <PreLoader visible={state.showPreloader} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.card}>
          <View style={{alignItems: 'center', width: 30, paddingTop: 20}}>
            <View style={style.circle} />
            <View style={style.line} />
            <View style={[style.circle, {backgroundColor: COLORS.dark}]} />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <View>
              <Text style={style.inputTitle}>State:</Text>
              <CustomInput
                placeholder="Select state"
                value={seletedState}
                onChangeText={value => {
                  console.log(value);
                }}
                onFocus={() => {
                  navigation.navigate('ListScreen', {
                    items: listOfstates,
                    selectValue: setSelectedState,
                    onChange: value => getAirportLocations(value),
                  });
                }}
              />
            </View>
            <View>
              <Text style={style.inputTitle}>Airport:</Text>
              <CustomInput
                placeholder="Select airport"
                value={seletedAirport}
                onFocus={() => {
                  navigation.navigate('ListScreen', {
                    items: airports,
                    selectValue: setSelectedAirport,
                  });
                }}
              />
            </View>
            <View>
              <Text style={style.inputTitle}>Destination Area:</Text>
              <CustomInput
                placeholder="Select destination area"
                value={seletedDestinationArea}
                onFocus={() => {
                  navigation.navigate('ListScreen', {
                    items: destinationAreas,
                    selectValue: setSeletedDestinationArea,
                  });
                }}
              />
            </View>

            <View>
              <Text style={style.inputTitle}>Destination Address:</Text>
              <CustomInput
                placeholder="Select destination address"
                value={destinationAddress}
                onFocus={() => {
                  navigation.navigate('PlaceSearchScreen', {
                    selectValue: setDestinationAddress,
                  });
                }}
              />
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Button title="Book Trip" onPress={getTripPreiview} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  inputTitle: {
    fontSize: 12,
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: COLORS.green,
  },
  line: {
    height: 250,
    width: 2,
    backgroundColor: COLORS.dark,
  },
  card: {
    margin: 20,
    paddingVertical: 20,
    paddingRight: 20,
    paddingLeft: 10,
    backgroundColor: COLORS.white,
    elevation: 12,
    borderRadius: 10,
    flexDirection: 'row',
    shadowColor: COLORS.grey,
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
export default BookRideScreen;
