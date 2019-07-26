import React, {useCallback, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button , ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { SIGN_UP_REQUEST } from '../../reducers';

const RegisterPage = (props) => {
  
  const dispatch = useDispatch();
  const {isSigningUp, signedUp} = useSelector(state=>state);
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const handledonChangeUserId = useCallback((e) => {
    setUserId(e);
  }, []);
  const handledonChangeUserPassword = useCallback((e) => {
    setUserPassword(e);
  }, []);
  const onPressRegister = useCallback((e)=>{
    dispatch({
      type: SIGN_UP_REQUEST,
      data : {
        userId, userPassword
      }
    });
  },[userId, userPassword]);
  // Hooks is save there first State, So if you want to change EventListener
  // You got to fill [] area with Variable
  if(signedUp){
    return props.navigation.navigate('Home');
  }
  return (
    <View style = {styles.container}>
      {isSigningUp? <ActivityIndicator size="large" color="red"/> : <><View style ={{flex:1, flexDirection: "column-reverse", margin: 20}}>
      <Text style= {{fontSize: 20}}>Register</Text>
      </View>
      <View style = {{flex:1, flexDirection: "column", alignContent: "flex-start"}}>
        <View style ={styles.form}><Text style={{flex:1}}>Id</Text><TextInput style={{flex:3}} onChangeText={handledonChangeUserId} value ={userId} maxLength={12} placeholder="Please, Give me your Id" /></View>
        <View style ={styles.form}><Text style={{flex:1}}>Password</Text><TextInput secureTextEntry={true} style={{flex:3}} onChangeText={handledonChangeUserPassword} maxLength={15} textContentType = "password"  placeholder= "Please, Give me your Password" autoCompleteType = "password" value ={userPassword} /></View>
        <Button title="Register" onPress={onPressRegister}/>
      </View></>}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form : {
    width: 300,
    flexDirection : "row",
    justifyContent: "center",
    alignContent: "flex-start"
  }
});

export default RegisterPage;
