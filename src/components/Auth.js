import React, {useState} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const changeForm = () => {
    setIsLogin(!isLogin);
  }


  return (
    <View style={styles.view}>
        <Image source={require('../assets/logo.png')} 
                style={styles.logo} />
        {isLogin ? <LoginForm changeForm={changeForm}/> : <RegisterForm changeForm={changeForm}/>}
    </View>    
  )
}

const styles = StyleSheet.create({ 
    view : {
        flex: 1,
        alignItems: 'center',
    },
    logo : {
        width: '80%',
        height: 240,
        marginTop: 50,
        marginBottom: 50,
    }
});

export default Auth