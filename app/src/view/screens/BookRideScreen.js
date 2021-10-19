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

const BookRideScreen = ({navigation}) => {
  const {data} = useSelector(state => state.userData);
  const [state, setState] = React.useState({
    phone: data?.phone,
    passenger_id: data?.passenger_id,
    showPreloader: true,
    destinationAddress: '',
  });
  const [airports, setAirports] = React.useState([]);
  const [destinationAreas, setDestinationAreas] = React.useState([]);
  const [seletedAirport, setSelectedAirport] = React.useState(null);
  const [seletedDestinationArea, setSeletedDestinationArea] =
    React.useState(null);

  React.useEffect(() => {
    getLocations();
  }, [navigation]);

  const getLocations = async () => {
    try {
      setState(prevState => ({...prevState, showPreloader: true}));
      const response = await fetchRequest('address_book.php', '', false, 'GET');
      if (response?.airports) {
        const filteredAirPorts = response?.airports.map(item => ({
          ...item,
          name: item.airport,
        }));
        setAirports(filteredAirPorts);
        const filteredDestinationArea = response?.areas.map(item => ({
          ...item,
          name: item.area,
        }));
        setDestinationAreas(filteredDestinationArea);

        setState(prevState => ({...prevState, showPreloader: false}));
      }
    } catch (error) {
      //Send the request after 7s
      setTimeout(() => getLocations(), 7000);
    }
  };

  const getTripPreiview = async () => {
    if (!seletedAirport) {
      Alert.alert('Error', 'Please choose airport');
    } else if (!seletedDestinationArea) {
      Alert.alert('Error', 'Please choose destination area');
    } else if (!state.destinationAddress) {
      Alert.alert('Error', 'Please input destination address');
    } else {
      const bookingDetails = {
        ...state,
        trip_from: seletedAirport,
        area: seletedDestinationArea,
        trip_to: state.destinationAddress,
      };

      setState({...state, showPreloader: true});
      try {
        const response = await fetchRequest('trip_preview.php', bookingDetails);
        if (response?.statuscode == '00') {
          navigation.navigate('TripPreviewScreen', {
            bookingDetails: {...bookingDetails, ...response},
          });
        } else {
          Alert.alert('Error', response?.status);
        }
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
              <Text style={style.inputTitle}>Airport:</Text>
              <CustomInput
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
                value={state?.destinationAddress}
                onChangeText={text => {
                  setState(prevState => ({
                    ...prevState,
                    destinationAddress: text,
                  }));
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
    height: 180,
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
  },
});
export default BookRideScreen;
