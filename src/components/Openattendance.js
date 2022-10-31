import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR } from '../styles/color';

const Openattendance = () => {
  return (
    <>
      <StatusBar  barStyle="light-content" style={styles.bar} />
      <SafeAreaView style={styles.background}>
          <Text style={styles.h1}>30 JULY 2022</Text>
          <Text style={styles.p}>mfalconsoft@gmail.com</Text>
          
          <View style={styles.container}>
            <Text style={styles.h2}>workday</Text>

            <View style={styles.greenView}>
                <Text style={styles.greenText}>8:30 to 10 : 12</Text>
                <Text style={styles.greenText}>-- : -- to -- : --</Text>
            </View>


            <View style={styles.totalDiv}>
                <Text style={styles.total}>Total 03:23</Text>
            </View>

            <View style={styles.btnGroup}>
                <TouchableOpacity style={[styles.buttonPrimary, styles.btn]}>
                    <Text style={styles.btnText}>Entry</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonDanger, styles.btn]}>
                    <Text style={styles.btnText}>Stop</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonGray, styles.btn]}>
                    <Text style={styles.btnText}>Correct</Text>
                </TouchableOpacity>
            </View>
            
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
    marginTop: 50,
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
},
btnGroup : {
  marginTop: 30,
},
greenView : {
  backgroundColor: COLOR.green,
  width: '100%',
  height: 140,
  marginBottom: 20,
  marginTop: 10,
  alignItems: 'center',
},
greenText : {
  fontSize: 30,
  color: COLOR.white,
  marginTop: 15,
},
})