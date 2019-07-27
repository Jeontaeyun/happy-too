import React, {useCallback} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { LOG_OUT_REQUEST } from '../../reducers';

const MainPage = (props) => {
    const dispatch = useDispatch();
    const {isLogined, me} = useSelector(state=>state);
    const onPressLogin = useCallback((e) => {
      return props.navigation.push('Login');
    },[])
    const onPressLogout = useCallback((e) => {
        dispatch({
          type: LOG_OUT_REQUEST
        })
    },[])
    const onPressRegister = useCallback((e) => {
      return props.navigation.push('Register');
    },[])
    return (
    <View style = {styles.container}>
      <View style = {{flex:1, flexDirection: "column", alignContent : "center",justifyContent: "flex-end"}}>
          <Text>{isLogined? `Welcome ${me.userId} ` : "Hi it's just Login Task for Happy Too"}</Text>
      </View>
        <View style ={{flex:1, flexDirection: "row", justifyContent: "center"}}>
         {isLogined? <Button title = "Logout" onPress ={onPressLogout}></Button> : 
         <><Button onPress ={onPressLogin} title = "Login" color = "#fffff"/>
          <Button onPress ={onPressRegister} title = "Register" color = "#84158"/></>}

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default MainPage;
