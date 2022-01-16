import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native'
import { Context } from './context/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer from './components/Spacer';

const ProfileScreen = ({ navigation }) => {
    const { state, signout } = useContext(Context);
    const [userDetail, setUserDetail] = useState({});
    const getUserData = async () => {
        const response = await AsyncStorage.getItem('credential');
        if (response) {
            const user = JSON.parse(response);
            setUserDetail(user);
        }
    }
    useEffect(() => {
        console.log('---profile---')
        getUserData()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 48, paddingTop: 50 }}>Profile</Text>
            <Spacer>
                <Text style={styles.user}>USERNAME: {"  "} {userDetail.userName}</Text>
            </Spacer>
            <Spacer>
                <Text style={styles.user}>EMAILID: {"  "} {userDetail.email}</Text>
            </Spacer>
            <Spacer>
                <Text style={styles.user}>PHONENUMBER {"  "} {userDetail.phoneNumber}</Text>
            </Spacer>
            <Button
                title='Sign Out'
                style={styles.button}
                //onPress={() => signin({ userName, email })}
                onPress={() => signout()}
            />
        </View>
    )
}


export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 400
    },
    user: {
        fontSize: 20,
    },
    button: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 35
    }
})
