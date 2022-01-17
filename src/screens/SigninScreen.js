import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Input, Text, Button } from 'react-native-elements'
import Spacer from '../components/Spacer';
import { Context } from '../context/authContext';
import { NavigationEvents } from 'react-navigation';
import NavLink from '../components/NavLink';

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(Context);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        clearErrorMessage();
    }, [])

    return (
        <View style={styles.container}>
            {/*   <NavigationEvents
                onDidFocus={clearErrorMessage}
            /> */}
            <Spacer><Text h3> Sign in</Text></Spacer>
            <Input label='Email' onChangeText={setEmail} autoCapitalize='none'
                autoCapitalize='none' />
            <Spacer />
            <Input
                label='Password'
                onChangeText={setPassword}
                autoCapitalize='none'
                autoCapitalize='none'
                secureTextEntry
            />
            {state.errorMessage ? <Text style={
                styles.errorMessage
            }>{state.errorMessage}</Text> : null}
            <Button
                title='Sign in'
                style={styles.buttonLayout}
                onPress={() => signin({ email, password })}
            />
            <NavLink
                routeName="Signup"
                text="Want to creat a account ? Signup"
            />
        </View>
    )
}

export default SigninScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50
    },
    buttonLayout: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    accountMsg: {
        fontSize: 16,
        color: 'green',
        marginLeft: 15,
        marginTop: 15
    },
    link: {
        color: 'blue',
        paddingTop: 10
    }
})
