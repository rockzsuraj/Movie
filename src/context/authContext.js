import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';
const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'signin':
            return { errorMessage: '', data: action.payload }
        case 'signup':
            return { errorMessage: '', data: action.payload }
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        // case 'signout':
        //     return { errorMessage: '', data: action.payload }
        default:
            state;
    }
};

const localSignin = dispatch => async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
        dispatch({ type: 'signin', payload: user });
        navigate('Profile');
    } else {
        navigate('Signup')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' })
};


const signup = dispatch => async ({ userName, email, password, confirmPassword, phoneNumber }) => {
    try {
        const data = {
            userName: userName, email: email, password: password, confirmPassword: confirmPassword, phoneNumber: phoneNumber
        }
        console.log("data>>", data)
        if (userName && email && password && confirmPassword && phoneNumber !== null) {
            await AsyncStorage.getItem(`${email}`).then(value => {
                if (value) {
                    const d = JSON.parse(value);
                    console.log("d>>", d.password, d.confirmPassword)
                    if (d.userName === userName || d.email === email) {
                        dispatch({ type: 'add_error', payload: `username or email id already exist` })

                    } else if (data.password != data.confirmPassword) {
                        dispatch({ type: 'add_error', payload: 'password does not match' })
                    }
                    else {
                        AsyncStorage.setItem(
                            `${email}`,
                            JSON.stringify(data)
                        )
                        dispatch({ type: 'signup', payload: data })
                        navigate('Home')
                    }
                } else {
                    if (data.password != data.confirmPassword) {
                        dispatch({ type: 'add_error', payload: 'password does not match' })
                    } else {
                        AsyncStorage.setItem(
                            `${email}`,
                            JSON.stringify(data)
                        )
                        dispatch({ type: 'signup', payload: data })
                        navigate('Home')
                    }
                }
            })
        }
        else {
            dispatch({ type: 'add_error', payload: 'All fields are manadatory' })
        }
    }
    catch (error) {
        console.log(error.message, "////???")
        dispatch({ type: 'add_error', payload: 'Something went wrong' })
    }
}


const signin = dispatch => async ({ email, password }) => {
    console.log('signin called');
    try {
        const data = {
            email: email, password: password
        }
        console.log(data)
        if (data.email && data.password !== null) {
            await AsyncStorage.getItem(`${email}`).then(value => {
                const d = JSON.parse(value)
                if ((d.email === email && d.password === password)) {
                    AsyncStorage.setItem(
                        'user',
                        JSON.stringify({ userName: d.userName, email: d.email, phoneNumber: d.phoneNumber })
                    )
                    dispatch({ type: 'signin', payload: data })
                    navigate('Profile')
                } else {
                    dispatch({ type: 'add_error', payload: 'Enter valid Email or password' })
                }
            })
        } else {
            dispatch({ type: 'add_error', payload: 'Enter email id  and password' })
        }

    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        }
        )
    }
}


export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, clearErrorMessage, localSignin },
    { isSignedIn: false, errorMessage: '' }
)