import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button, Dimensions } from 'react-native';

export default function HomePage({ navigation }) {

  const { width } = Dimensions.get('window');
  const [myObjectsFromStorage, setMyObjectsFromStorage] = useState([]);
  
  const itemWidth = width * 0.8;

  HomePage.navigationOptions = () => {
    return {
      title: 'Passwort Manager',
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerShown: false,
    };
  };

  useEffect(() => {
    const loadItems = async () => {
      try {
        const items = await AsyncStorage.getItem('myObjektsInStorage');
        const parsedItems = JSON.parse(items);
        setMyObjectsFromStorage(parsedItems);
      } catch (error) {
        console.error(error);
      }
    };
    loadItems();
  }, []);


  const newItem = () => {
    console.log(navigation);
    console.log("gedrückt");
    navigation.navigate('addNewItemToList');
  };

  const handlePress = (index) => {
    console.log("ich bin item:", index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ScrollView}>
        <ScrollView>
          {myObjectsFromStorage.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.object, { width: itemWidth }]}
              onPress={() => handlePress(index)}
            >
              <Text style={styles.textInObject}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.neuerEintragButton}>
        <Button
          title="neuer Eintrag"
          onPress={newItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474747',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 20,
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    marginBottom: 20,
  },
  object: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#6E6E6E',
    borderRadius: 10,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  textInObject: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  ScrollView: {
    height: '80%'
  },

  neuerEintragButton:{
    marginBottom: 0,
    width: '40%',
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    
  }

});
