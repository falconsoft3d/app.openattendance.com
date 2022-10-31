import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { validateEmail } from '../utils/validations';
import { auth } from '../utils/firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterForm(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaulValue());
  const [formError, setFormError] = useState({});
  const simplePassword = ["demo", "123456", "password"];

  const registerFirebase = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  }

  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
        if (!formData.email) errors.email = true;
        if (!formData.password) errors.password = true;
        if (!formData.repeatPassword) errors.repeatPassword = true;
    } 
    
    else if (!validateEmail(formData.email)) {
            errors.email = true;
            console.log("Email incorrecto");
    }

    else if (formData.password !== formData.repeatPassword) {
        errors.password = true;
        errors.repeatPassword = true;
        console.log("password", formData.password);
        console.log("repeatPassword", formData.repeatPassword);
        console.log("Las contraseñas no coinciden");
    } 

    else if (simplePassword.includes(formData.password)) {
        errors.password = true;
        errors.repeatPassword = true;
        console.log("Su contraseña es muy simple");
    }
    
    else if (formData.password.length < 6) { 
        errors.password = true;
        errors.repeatPassword = true;
        console.log("Su contraseña es menor a 6 caracteres");
    } else {
        registerFirebase(formData.email, formData.password);
    }
    setFormError(errors);
    console.log(errors);
  } 


  return (
    <>
      <TextInput style={[styles.input, formError.email && styles.error]}
            placeholder="Correo Electronico"
            placeholderTextColor="#969696"
            autoCapitalize='none'
            onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
      />

    <TextInput style={[styles.input, formError.password && styles.error]}
            secureTextEntry={true}
            placeholder="Contraseña"
            placeholderTextColor="#969696"
            autoCapitalize='none'
            onChange={(e) => setFormData({...formData, password: e.nativeEvent.text})}
      />

    <TextInput style={[styles.input, formError.repeatPassword && styles.error]}
            secureTextEntry={true}
            placeholder="Repetir Contraseña"
            placeholderTextColor="#969696"
            autoCapitalize='none'
            onChange={(e) => setFormData({...formData, repeatPassword: e.nativeEvent.text})}
      />

     <TouchableOpacity onPress={register}>
                <Text style={styles.btnText}>Registrate</Text>
      </TouchableOpacity>
      
      <View style={styles.login}>
        <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Iniciar Sección</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

function defaulValue() {
  return {
    email: '', 
    password: '',
    repeatPassword: '',
  }
}

const styles = StyleSheet.create({
    btnText : {
        color: '#fff',
        fontSize: 18,
    },
    input : {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    }
    ,
    login : {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
    },
    error : {
        borderColor: '#940c0c',
    }
})