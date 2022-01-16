import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './components/Spacer';
import { Context as AuthContext } from './context/authContext';
import { NavigationEvents } from 'react-navigation';
import NavLink from './components/NavLink';

const RegisterScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <ScrollView>
            <View style={styles.container}>
                <Spacer><Text h3> Register Screen</Text></Spacer>
                <Input label='Username' onChangeText={setUsername} autoCapitalize='none'
                    autoCapitalize='none' />
                <Spacer />
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
                <Spacer />
                <Input label='Confirm Password' onChangeText={setConfirmPassword} autoCapitalize='none'
                    autoCapitalize='none' />
                <Spacer />
                <Input label='Phone number' onChangeText={setPhoneNumber} autoCapitalize='none'
                    autoCapitalize='none' />
                {state.errorMessage ? <Text style={
                    styles.errorMessage
                }>{state.errorMessage}</Text> : null}

                <Button
                    title='Sign up'
                    style={styles.buttonLayout}
                    onPress={() => signup({ userName, email, password, confirmPassword, phoneNumber })}
                />
                <NavLink
                    routeName="Signin"
                    text="Already have an Account? Signin"
                />
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
export default RegisterScreen