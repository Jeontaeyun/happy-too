import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import MainPage from '../components/MainPage';
import LoginComponent from '../components/LoginComponent';
import RegisterPage from '../components/RegisterPage';

// For routing in mobile Application(called like navigation)
// We got to use react-native-navigation library

const AppNavigator = createStackNavigator(
{
  Home: MainPage,
  Login: LoginComponent,
  Register: RegisterPage
},
{
  initialRouteName : "Home"
})

const AppConatiner = createAppContainer(AppNavigator);

export default AppConatiner;
