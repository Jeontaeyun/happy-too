import React from './node_modules/react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import MainPage from '../components/MainPage';
import LoginComponent from '../components/LoginComponent';
import RegisterPage from '../components/RegisterPage';

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
