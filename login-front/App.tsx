import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainPage from './src/components/MainPage';
import LoginComponent from './src/components/LoginComponent';
import RegisterPage from './src/components/RegisterPage';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import reducers from './src/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/sagas';

const App = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers ,applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return (
    <Provider store = {store}>
      <View style={styles.container}>
        <MainPage/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
