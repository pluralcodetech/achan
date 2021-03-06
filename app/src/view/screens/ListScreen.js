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

const searchItem = (text, items, setFilteredItems) => {
  const newItems = items.filter(item => {
    return item?.name?.toLowerCase().search(text?.toLowerCase()) > -1;
  });

  setFilteredItems(newItems);
};

const List = ({
  item,
  selectValue = () => {},
  navigation,
  onChange = () => {},
}) => {
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
      <Text style={{fontSize: 12}}>
        {item?.name} {item?.dial_code}
      </Text>
    </TouchableOpacity>
  );
};

const ListScreen = ({navigation, route}) => {
  const {items, selectValue, onChange} = route.params || {};
  const [filteredItems, setFilteredItems] = React.useState([]);

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
            searchItem(text, items, setFilteredItems);
          }}
          placeholder="Search"
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

export default ListScreen;
