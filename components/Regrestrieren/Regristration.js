import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Alert } from 'react-native';
import { sha256 } from 'js-sha256';

export default function Registration({ navigation }) {
  const { navigate, state } = navigation;
  const [hashedPassword, setHashedPassword] = useState("");
  const [salt, setSalt] = useState("");

  Registration.navigationOptions = () => {
    return {
      title: 'Registration',
    };
  };



  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View>
        <Text style={styles.textOverInput}>Geben Sie ein beliebes Passwort ein</Text>
        <TextInput
          style={styles.input}
          onChangeText={(password) => {
            const salt = sha256(Math.random().toString()).substring(0, 64);
            setSalt(salt);
            const passwordWithSalt = password + salt;
            const hashValue = sha256(passwordWithSalt);
            setHashedPassword(hashValue + salt);
          }}
          placeholder="Passwort"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonLoginView}>
        <Button
          title="Apply"
          onPress={()=>{
            if (hashedPassword) {
                navigation.navigate('LoginPage', { hashedPassword: hashedPassword, salt:salt });
              }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%'
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  input: {
    marginLeft: '4%',
    width: 207,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center'
  },
  buttonLoginView: {
    marginTop: '30%',
    width: '50%'
  },
  buttonRegristrateView: {
    marginTop: 20,
    width: '50%'
  },
  textOverInput: {
    marginTop: '20%',
    paddingBottom: '10%',
    marginLeft: '2%',
  }
});
