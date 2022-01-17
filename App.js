import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from "./src/screens/HomeScreen";
import MovieDetailScreen from "./src/screens/MovieDetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import SigninScreen from "./src/screens/SigninScreen";
import { Provider as AuthProvider } from './src/context/authContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

const bottomTabNavigator = createBottomTabNavigator({
  mainFlow: createStackNavigator({
    Home: HomeScreen,
    MovieDetail: MovieDetailScreen
  }),
  Account: createSwitchNavigator({
    AuthScreen: ResolveAuthScreen,
    Signup: RegisterScreen,
    Signin: SigninScreen,
    Profile: ProfileScreen
  }),
});

const App = createAppContainer(bottomTabNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }} />
    </AuthProvider>
  )
}