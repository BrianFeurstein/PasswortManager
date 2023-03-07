import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button, Dimensions } from 'react-native';

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

export default function HomePage({ navigation }) {
  const { navigate, state } = navigation;
  const { width } = Dimensions.get('window');
  const [myObjectsFromStorage, setMyObjectsFromStorage] = useState([]);

  const itemWidth = width * 0.8;



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


  const handlePress = (index) => {
    try{

      const mySelectedItem = myObjectsFromStorage[index];
      navigation.navigate('editObject',{mySelectedItem:mySelectedItem});
    }catch(error){
      console.error(error);
    }
    
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Passwort Manager</Text>
      </View>
      <View style={styles.ScrollView}>
        <ScrollView>
          {myObjectsFromStorage && myObjectsFromStorage.map((item, index) => (
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
          onPress={() => {
            try{
              navigation.navigate('addNewItemToList');
            }catch(error){
              console.error(error);
            }
            
          }}
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

  neuerEintragButton: {
    marginBottom: 0,
    width: '40%',
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',

  }

});
