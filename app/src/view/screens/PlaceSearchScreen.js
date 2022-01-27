import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import COLORS from '../../styles/colors';
import Text from '../components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const List = ({item, selectValue, navigation, onChange = () => {}}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        selectValue(item?.name);
        navigation.goBack();
        onChange(item);
      }}
      style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.grey,
      }}>
      <Text style={{fontSize: 12}}>{item?.name}</Text>
    </TouchableOpacity>
  );
};

const getPlaces = async (google_key, value, setFilteredItems) => {
  if (!value) return;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&key=${google_key}`,
    );

    const places = response.data?.results;

    const newItems = (places ?? []).map(item => {
      return {name: item?.formatted_address};
    });

    setFilteredItems(newItems);
  } catch (error) {
    console.log(error);
  }
};

const PlaceSearchScreen = ({navigation, route}) => {
  const {items, selectValue, onChange} = route.params || {};
  const [filteredItems, setFilteredItems] = React.useState([]);
  const {data} = useSelector(state => state.userData);

  React.useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <View style={{padding: 20, flexDirection: 'row'}}>
        <Icon
          name="arrow-left"
          size={28}
          color={COLORS.primary}
          onPress={navigation.goBack}
        />
        <TextInput
          onChangeText={text => {
            getPlaces(data?.google_key, text, setFilteredItems);
          }}
          placeholder="Search for places"
          placeholderTextColor={COLORS.grey}
          style={{
            height: 40,
            flex: 1,
            borderBottomColor: COLORS.primary,
            borderBottomWidth: 1,
            marginLeft: 10,
            color: COLORS.dark,
          }}
        />
      </View>
      <FlatList
        data={filteredItems}
        renderItem={({item}) => (
          <List
            item={item}
            navigation={navigation}
            selectValue={selectValue}
            onChange={onChange}
          />
        )}
      />
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
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginBottom: 20,
  },
});
export default PlaceSearchScreen;
