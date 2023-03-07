import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { sha256 } from 'js-sha256';

export default function LoginPage({ navigation }) {

  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [hashedPassword, setHashedPassword] = useState("");
  const [usedSalt, setSalt] = useState("");
  const [checkInput, setCheckInput] = useState("");

  LoginPage.navigationOptions = {
    title: 'LoginPage',
  };

  useEffect(() => {

    const hashedPassword = navigation.getParam('hashedPassword');
    setHashedPassword(hashedPassword);
    const usedSalt = navigation.getParam('salt');
    setSalt(usedSalt);


  }, [LoginPage.navigationOptions]);

  useEffect(() => {
    console.log("checkInput", checkInput);
    console.log("hashedPassword", hashedPassword);
    if (hashedPassword == null || hashedPassword == "") {
      Alert.alert(
        "Error",
        "Sie müssen sich zuerst registrieren",
        [
          {
            text: "OK",
            onPress: handleRegisterPress
          }
        ]
      );
      
    }
    else if (checkInput == hashedPassword) {
      console.log("super");
      navigation.navigate('HomePage');
    } else {
      Alert.alert(
        "Error",
        "Bitte überprüfen Sie die Eingabe"
      )
    }
  }, [checkInput]);

  const handleRegisterPress = () => {
    setIsRegistered(true); // setze den Zustand auf "true" wenn der Button betätigt wird
    navigation.navigate('Regristration');
  };

  const setCryptPassword = () => {
    const salt = usedSalt;
    const passwordWithSalt = password + salt;
    const hashValue = sha256(passwordWithSalt);
    setCheckInput(hashValue + salt);
  }

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.title}>Sign In</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Passwort"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonLoginView}>
        {isRegistered && (
          <Button
            title="Einloggen"
            onPress={setCryptPassword}
          />)}
      </View>


     
    </View>
  );
}


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
    marginTop: '20%',
    width: 200,
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
  }
});