import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'signup':
            return { errorMessage: '', data: action.payload }
        case 'signin':
            return { errorMessage: '', data: action.payload }
        case 'clear_error_message':
            console.log({ ...state })
            return { ...state, errorMessage: '' }
        default:
            state;
    }
};

const clearErrorMessage = dispatch => () => {
    console.log('clear message')
    dispatch({ type: 'clear_error_message' })
};

const signup = dispatch => {
    console.log("..dispatch>>signup", dispatch);
    return async ({ userName, email, password, confirmPassword, phoneNumber }) => {
        const data = {
            userName: userName, email: email, password: password, confirmPassword: confirmPassword, phoneNumber: phoneNumber
        }
        console.log("data>>", data)
        try {
            if (userName && email && password && confirmPassword && phoneNumber !== null) {
                await AsyncStorage.getItem('credential').then(value => {
                    const d = JSON.parse(value);
                    console.log("d>>", d.password, d.confirmPassword)
                    if (value !== null) {
                        if (d.userName === userName || d.email === email) {
                            dispatch({ type: 'add_error', payload: `username or email id already exist` })

                        } else if (data.password != data.confirmPassword) {
                            dispatch({ type: 'add_error', payload: 'password does not match' })
                        }
                        else {
                            AsyncStorage.setItem(
                                "credential",
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
                                "credential",
                                JSON.stringify(data)
                            )
                            dispatch({ type: 'signup', payload: data })
                            navigate('Home')
                        }
                    }
                })
            }
            else {
                dispatch({ type: 'add_error', payload: 'Enter email id  and password' })
            }
        }
        catch (error) {
            dispatch({ type: 'add_error', payload: 'Something went wrong' })
        }
    }
}
const signin = dispatch => ({ email, password }) => {
    try {
        const data = {
            email: email, password: password
        }
        console.log(data)
        if (data.email && data.password !== null) {
            AsyncStorage.getItem('credential').then(value => {
                const d = JSON.parse(value)
                if (d.userName === email && d.password === password || d.email === email && d.password === password) {
                    AsyncStorage.setItem(
                        "user",
                        JSON.stringify(data)
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
const signout = (dispatch) => {
    console.log("....signout......")
    // navigate('Signin')
}
export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, signout, clearErrorMessage },
    { isSignedIn: false, errorMessage: '' }
)