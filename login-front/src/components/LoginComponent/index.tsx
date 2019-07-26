import React, {useCallback, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { LOG_IN_REQUEST } from '../../reducers';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const handledonChangeUserId = useCallback((e) => {
    setUserId(e);
  }, []);
  const handledonChangeUserPassword = useCallback((e) => {
    setUserPassword(e);
  }, []);
  const onPressSubmit = useCallback((e)=>{
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        userId, userPassword
      }
    })
  },[userId, userPassword]);
  
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <View style = {{flexDirection: "column", alignContent: "flex-start"}}>
        <View style ={styles.form}><Text style={{flex:1}}>Id</Text><TextInput style={{flex:3}} onChangeText={handledonChangeUserId} value ={userId} maxLength={12} placeholder="Please, Give me your Id" /></View>
        <View style ={styles.form}><Text style={{flex:1}}>Password</Text><TextInput secureTextEntry={true} style={{flex:3}} onChangeText={handledonChangeUserPassword} maxLength={15} textContentType = "password"  placeholder= "Please, Give me your Password" autoCompleteType = "password" value ={userPassword} /></View>
      </View>
      <Button title="Submit" onPress={onPressSubmit}/>
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

export default LoginComponent;
