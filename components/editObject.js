import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { sha256 } from 'js-sha256';
import AsyncStorage from '@react-native-async-storage/async-storage';

editObject.navigationOptions = () => {
    return {
        headerStyle: {
            backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerShown: false,
       
    };
};


export default function editObject({ navigation }) {
    const [selectedItem, setSelectedItem] = useState({});
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comment, setComment] = useState("");
    const [objectList, setObjectList] = useState([]);
    
    useEffect(()=>{
        const getSelectedItem = navigation.getParam('mySelectedItem');
        setSelectedItem(getSelectedItem);

    },[]);

    useEffect(()=>{
        setTitle(selectedItem['title']);
        setUsername(selectedItem['username']);
        setEmail(selectedItem['email']);
        setPassword(selectedItem['password']);
        setComment(selectedItem['comment']);
    },[selectedItem])


    const output = () => {
        if (title == "") {
            Alert.alert(
                "Warning",
                "Geben Sie ein Titel ein!"
            )
        }

        else if (username == "") {
            Alert.alert(
                "Warning",
                "Geben Sie ein Benutzername ein!"
            )
        }

        else if (password == "") {
            Alert.alert(
                "Warning",
                "Geben Sie ein Passwort ein!"
            )
        }
        else {
            const newObject = {
                id: objectList.length + 1,
                title: title,
                username: username,
                password: password,
                comment: comment,
                email: email,
            }


            console.log(title);
            setObjectList([...objectList, newObject]);
            AsyncStorage.setItem('myObjektsInStorage', JSON.stringify(objectList));
            navigation.navigate('HomePage', { myObject: objectList });
            
        }

    }


    const back = () => {
        //navigation.navigate('HomePage', { myObject: objectList });
    }

  

    return (
        <ScrollView>
            <View style={styles.main}>
                <View>
                    <Text style={styles.title}>Neuer Eintrag</Text>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputContainers}>
                        <Text>Titel</Text>
                        <TextInput
                            style={styles.Textinput}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Titel"
                            secureTextEntry={false}
                        />
                    </View>
                    <View style={styles.inputContainers}>
                        <Text>Benutzername</Text>
                        <TextInput
                            style={styles.Textinput}
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Benutzername"
                            secureTextEntry={false}
                        />
                    </View>
                    <View style={styles.inputContainers}>
                        <Text>E-Mail</Text>
                        <TextInput
                            style={styles.Textinput}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="E-Mail"
                            secureTextEntry={false}
                        />
                    </View>
                    <View style={styles.inputContainers}>
                        <Text>Passwort</Text>
                        <TextInput
                            style={styles.Textinput}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Passwort"
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.inputContainers}>
                        <Text>Notiz</Text>
                        <TextInput
                            style={styles.Textinput}
                            value={comment}
                            onChangeText={setComment}
                            placeholder="Notiz"
                            secureTextEntry={false}
                        />
                    </View>
                </View>
                <View style={styles.neuerEintragButton}>
                    <Button
                        title="Feld hinzufügen"
                        onPress={output} />
                </View>
                <View style={styles.neuerEintragButton}>
                    <Button
                        title="Abbrechen"
                        onPress={back} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        marginTop: '15%',
        backgroundColor: '#F2F2F2',
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333333'
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20
    },
    inputContainers: {
        marginBottom: 10
    },
    Textinput: {
        backgroundColor: '#EEEEEE',
        borderRadius: 5,
        padding: 10
    },
    neuerEintragButton: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        backgroundColor: '#333333',
        borderRadius: 5,
        padding: 5,
        marginBottom: 2
    },
    neuerEintragText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
