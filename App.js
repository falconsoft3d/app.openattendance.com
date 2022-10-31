import {SafeAreaView, Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react'
import Openattendance from './src/components/Openattendance';
import { auth } from './src/utils/firebase/firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Auth from './src/components/Auth';
import Toast from 'react-native-toast-message';

const App = () => {
  const [user, setUser] = useState(undefined);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      setUser(response);
    });
  }, [])

  if (user === undefined) return null;

  return (
    <>
    <StatusBar  barStyle="light-content"  />
    <SafeAreaView style={styles.background}>
        {user ? <Openattendance user={user}/> : <Auth/>}
    </SafeAreaView>
    <Toast />
  </>
  )
}

export default App

const styles = StyleSheet.create({ 
  background : {
       backgroundColor: '#15212b',
       height: '100%'
  }
});


