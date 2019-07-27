# Happy Too Login Task |  FRONTEND

## 01. React Native

### (01) What is the React Native

- The react native is a framework making easy to develope mobile application running on IOS, Android. 

- The react native can use most of react concept such as JSX, state, props, Component. **But it's supposed to use native component which is provided from IOS, Android**, not web component.

- ``` sudo npm i -g expo-cli ```  for installing expo environment

- ``` expo init $projectName ``` for creating react-native project 

### (02) How to use

```javascript

import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

```

this use react grammer like JSX, props, state, but we got to use the native component

## 02. React Native Navigationn

### (01) What is the React Native Navigation

- For navigating, like router in web , we have to use navigate library like react-native-navigation. And It can help to change sceens with button. 

- ``` npm i --save react-native-navigation ``` for installing 


### (02) How to use

```javascript

import React from 'react';
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


```

- We can use **createAppContainer**, **createStackNavigator** to use navigation. Also we can set initial screens with "initialRouteName" option.

```javascript

import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers, { LOAD_USER_REQUEST } from './src/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/sagas';
import AppContainer  from './src/screens';

const App = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers ,applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return (
    <Provider store = {store}>
        <AppContainer />
    </Provider>
  );
}

export default App;

```

- And we can use navigation as component like this. 