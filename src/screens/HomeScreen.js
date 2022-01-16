import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    async function getData() {
        try {
            await AsyncStorage.getItem('user').then(value => {
                value != null ? setUsername(JSON.parse(value).userName) : setUsername('');
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData();
    }, []);



    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>Hello {username}</Text>
            <Button
                title='Go to Movie details screen'
                onPress={() => navigation.navigate('MovieDetail')}
            />
        </View>
    )
}


export default HomeScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
