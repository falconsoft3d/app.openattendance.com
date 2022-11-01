import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'
import { auth } from '../utils/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { validateEmail } from '../utils/validations'
import Toast from 'react-native-toast-message';
import { COLOR } from '../styles/color';

export default function LoginForm() {
    const [formData, setFormData] = useState(defaulValue());
    const [formError, setFormError] = useState({});

    const loginFirebase = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Login
            const user = userCredential.user;
            // console.log(user);
            Toast.show({
                type: 'success',
                text1: 'Hola',
                text2: 'You have successfully logged in 👋'
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'The email or password is incorrect'
              });
          });
      }

      const login = () => {
        let errors = {};
        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            if (!formData.repeatPassword) errors.repeatPassword = true;
        } 
        
        else if (!validateEmail(formData.email)) {
                errors.email = true;
                console.log("Email incorrecto");
        }
        
        else if (formData.password.length < 6) { 
            errors.password = true;
            console.log("Su contraseña es menor a 6 caracteres");
        } else {
            loginFirebase(formData.email, formData.password);
            console.log("Registrado");
        }
        setFormError(errors);
        console.log(errors);
        
        if (errors.password) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Your password is less than 6 characters'
              });
        }

        if (errors.email) {
          Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Wrong email'
            });
      }

      } 

    return (
        <>
      <TextInput  style={[styles.h1]}>
        OPTT
      </TextInput>

      <TextInput style={[styles.p]}>
            openattendance.com
      </TextInput>
      

      <TextInput style={[styles.input, formError.email && styles.error]}
            placeholder="Email"
            placeholderTextColor={COLOR.input_text}
            autoCapitalize='none'
            onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
      />

      <TextInput style={[styles.input, formError.password && styles.error]}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={COLOR.input_text}
              autoCapitalize='none'
              onChange={(e) => setFormData({...formData, password: e.nativeEvent.text})}
        />
   

     <TouchableOpacity onPress={login} style={styles.buttonPrimary}>
                <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.textGray}>By Marlon Falcon Hernández</Text>
        <Text style={styles.textGray}>www.marlonfalcon.com</Text>
      </View>
    </>
  )
}

function defaulValue() {
    return {
      email: '', 
      password: '',
    }
  }


const styles = StyleSheet.create({
    btnText : {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    input : {
        height: 50,
        color: COLOR.black,
        width: '80%',
        marginBottom: 25,
        backgroundColor: COLOR.input_background,
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: COLOR.dark_gray
    }
    ,
    login : {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
    },
    error : {
        borderColor: '#940c0c',
    },
    h1 : {
        fontSize: 82,
        fontWeight: 'bold',
        color: COLOR.green,
        marginVertical: 20,
    },
    p : {
        fontSize: 21,
        color: COLOR.green,
        marginBottom: 60,
    },
    
    buttonPrimary :{
      height: 50,
      Color: COLOR.black,
      width: '80%',
      marginBottom: 25,
      backgroundColor: COLOR.green,
      paddingHorizontal: 20,
      borderRadius: 50,
      justifyContent: 'center',
    },
    textGray :{
      color: COLOR.dark_gray,
    }

    ,
    footer : {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 30,
    }

})