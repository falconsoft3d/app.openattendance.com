import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLOR } from '../styles/color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, db } from '../utils/firebase/firebaseConfig';
import { collection, addDoc, doc, orderBy,  deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
import moment from 'moment';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Openattendance = () => {
    const [play, setPlay] = useState(false);
    const [stop, setStop] = useState(false);
    const [state, setState] = useState(undefined);
    const [currentDate, setCurrentDate] = useState('');
    const [lastFourTime, setLastFourTime] = useState([]);

    console.log(lastFourTime);

    const loadFourTime = async () => {
        console.log("====================================")
        const querySnapshot = await onSnapshot(collection(db, "entries") , (querySnapshot) => {
            const times = [];
            querySnapshot.forEach((doc) => {
                times.push({ ...doc.data(), id: doc.id });
            });
            setLastFourTime(times);
        });
    }

    const saveState = async () => {
      loadFourTime();
      console.log("====================================")
      console.log(lastFourTime[0].entryAt)

      const time1 = moment(lastFourTime[0].entryAt); 
      console.log(time1)
      console.log("====================================")
      try {
        await AsyncStorage.setItem('openState', state);
      } catch (error) {
        console.log(error);
      }
    }

    const loadState = async () => {
      try {
        const state = await AsyncStorage.getItem('openState', state);
        setState(state)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      setCurrentDate(moment().format('L'));
      loadState();
    }, [])


    const saveEntry = async () => {
      setPlay(true);
      try {
        const docRef = await addDoc(collection(db, "entries"), {
          entryAt: new Date(),
          uid: auth.currentUser.uid,
          type: "in",
          transported : false,
        });
        Toast.show({
          type: 'success',
          text1: 'OK',
          text2: ("Your entry has been saved: ")
        });
        setPlay(false);
        setState("in");
        saveState();
      } catch (e) {
        console.error("Error adding document: ", e);
        setPlay(false);
      }
      
    }


  const saveExit = async () => {
    setStop(true);
    try {
      const docRef = await addDoc(collection(db, "entries"), {
        entryAt: new Date(),
        uid: auth.currentUser.uid,
        type: "out",
        transported : false,
      });
      Toast.show({
        type: 'success',
        text1: 'OK',
        text2: ("Your exit has been saved: ")
      });
      setStop(false);
      setState("out");
      saveState();
    } catch (e) {
      console.error("Error adding document: ", e);
      setStop(false);
    }
  }

  return (
    <>
      <StatusBar  barStyle="light-content" style={styles.bar} />
      <SafeAreaView style={styles.background}>
          <Text style={styles.h1}>{currentDate}</Text>
          <Text style={styles.p}>{ auth.currentUser.email }</Text>
          
          <View style={styles.container}>
            <Text style={styles.h2}>OpenAtt</Text>

            <View style={[styles.centerView, state=='in' ? styles.in : styles.out]}>
                <Text style={styles.greenText}>8:30 to 10 : 12</Text>
                <Text style={styles.greenText}>-- : -- to -- : --</Text>
            </View>


            <View style={styles.totalDiv}>
                <Text style={styles.total}> {state} | Total 03:23</Text>
            </View>

            <View style={styles.btnGroup}>
                <TouchableOpacity style={[ state=='in' ? styles.buttonDisable : styles.buttonPrimary, styles.btn]} onPress={saveEntry} disabled={state=='in' ? true : false}>
                    <Text style={styles.btnText}><Ionicons  name={play ? 'ios-sync' : 'ios-play'}   size={32} 
                          color={ state=='in' ? COLOR.dark_gray : COLOR.white } /></Text>
                </TouchableOpacity>

                <TouchableOpacity style={[state=='out' ? styles.buttonDisable : styles.buttonDanger, styles.btn]} onPress={saveExit} disabled={state=='out' ? true : false}>
                    <Text style={styles.btnText}><Ionicons name={stop ? 'ios-sync' : 'ios-stop'} size={32} 
                          color={ state=='out' ? COLOR.dark_gray : COLOR.white } /></Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonGray, styles.btn]}>
                   <Text style={styles.btnText}><Ionicons name='ios-cloud-download' size={32} color="white" /></Text>
                   {/* ios-sync */}
                </TouchableOpacity>
            </View>            
          </View>
          {/* https://www.veryicon.com/icons/miscellaneous/ionicons-1/ */}
          <View style={styles.Footer}>
                <TouchableOpacity style={styles.footerBtn}>
                    <Ionicons name='ios-build' size={32} color="green" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerBtn} onPress={() => auth.signOut()}>
                    <Ionicons name='md-close-circle' size={32} color="red" />
                </TouchableOpacity>
          </View>  

      </SafeAreaView>
    </>
  )
}

export default Openattendance

const styles = StyleSheet.create({
  bar: {
    backgroundColor: COLOR.green,
  }, 
  background : { 
        backgroundColor: COLOR.dark_green,
        flex: 1,
        height: '100%',
        alignItems: 'center',
  },
  container: {
    backgroundColor: COLOR.white,
    marginTop: 30,
    height: '70%',
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
  },
  h1 : { 
    fontSize: 32,
    color: COLOR.white,
    marginTop: 40,  
  },
  h2: {
    fontSize: 42,
    color: COLOR.dark_gray,
    marginTop: 20,
  },
  p: {
    fontSize: 18,
    color: COLOR.white,
  },
  buttonPrimary :{
    backgroundColor: COLOR.green,
  },

  buttonDisable :{
    backgroundColor: COLOR.White,
    borderWidth: 1,
    borderColor: COLOR.dark_gray,
  },

  buttonDanger :{
    backgroundColor: COLOR.red,
  },

  buttonGray:{
    backgroundColor: COLOR.dark_gray,
  },

  btn : {
    height: 50,
    Color: COLOR.black,
    minWidth: '80%',
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
  },

  btnText : {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
},
total : {
  fontSize: 20,
  color: COLOR.dark_gray,
  fontWeight: 'bold',
},

btnGroup : {
  marginTop: 30,
},

centerView : {
  width: '100%',
  height: 140,
  marginBottom: 20,
  marginTop: 10,
  alignItems: 'center',
  
},

in : {
  backgroundColor: COLOR.green,
},  

out : {
  backgroundColor: COLOR.red,
},

greenText : {
  fontSize: 30,
  color: COLOR.white,
  marginTop: 15,
},
Footer :{
  flexDirection: 'row',
},
footerBtn :{
  backgroundColor: COLOR.white,
  height: 50,
  Color: COLOR.black,
  marginVertical: 20,
  marginHorizontal: 20,
  paddingHorizontal: 20,
  borderRadius: 10,
  justifyContent: 'center',
}
})