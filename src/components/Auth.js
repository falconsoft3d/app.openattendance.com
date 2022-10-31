import React, {useState} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LoginForm from './LoginForm';

function Auth() {
  return (
    <View style={styles.view}>
        <LoginForm />
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