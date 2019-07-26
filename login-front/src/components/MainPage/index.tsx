import React, {useCallback, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const MainPage = (props) => {
    const [login, setLogin] = useState(false);
    const onPressLogin = useCallback((e) => {
      return props.navigation.push('Login');
    },[])
    const onPressLogout = useCallback((e) => {},[])
    const onPressRegister = useCallback((e) => {
      return props.navigation.push('Register');
    },[])
    return (
    <View style = {styles.container}>
      <View style = {{flex:1, flexDirection: "column", alignContent : "center",justifyContent: "flex-end"}}>
          <Text> Hi it's just Login Task for Happy Too </Text>
      </View>
        <View style ={{flex:1, flexDirection: "row", justifyContent: "center"}}>
         {login? <Button title = "Logout" onPress ={onPressLogout}></Button> : 
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
