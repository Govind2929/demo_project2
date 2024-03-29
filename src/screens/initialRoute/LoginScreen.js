// import React from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native'
// const LoginScreen = () => {
//     const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       {/* Logo (optional) */}
//       <Text style={styles.logo}>Your App Logo</Text>

//       <Text style={styles.title}>Sign In</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="username"
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry={true}
//       />

//       <TouchableOpacity onPress={() => {
//           navigation.navigate('Home')
//       }} >
//         <Text>
//         Sign In
//         </Text>
//       </TouchableOpacity>

//       <Text style={styles.link}>Don't have an account? Sign Up</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   logo: {
//     fontSize: 30,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 8,
//   },
//   link: {
//     marginTop: 10,
//   },
// });

// export default LoginScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [credentials, setCredentials] = useState({}); // State to store retrieved credentials
    const [isCheckbox, setIsCheckbox] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle showPassword state on icon press
    };
    useEffect(() => {
        console.log('retrieveCredential@ called1###');
    }, []);
    useEffect(() => {

    }, []);

    const handleRememberMe = () => {
        // setIsCheckbox(!isCheckbox);
        if (isCheckbox === false) {
            setEmail('admin@gmail.com')
            setPassword('12346')
            setIsCheckbox(true);
        }
        else {
            setIsCheckbox(false);
            setEmail('')
            setPassword('')
        }
    };

    const retrieveCredential = async () => {
        console.log('retrieveCredential@');
        try {
            const dataString = await AsyncStorage.getItem('credentials');
            if (dataString) {
                setCredentials(JSON.parse(dataString));
                console.log('dataString1', JSON.parse(dataString)); // Parse stored credentials
            }
            const loginCredentials = JSON.parse(dataString)
            handleLogin(loginCredentials)
        } catch (error) {
            console.error('Error retrieving credentials:', error);
        }

    }; // Empty dependency array to run only once on component mount

    const handleLogin = async (loginCredentials) => {
        console.log('handleLogin', email, password);
        if (!email || !password) {
            alert('Please enter Email and password.');
            return;
        }


        // Await for credential retrieval
        // Ensure credentials are fetched first
       
      //  const validCredentials = credentials[email];
        // console.log('validCredentials1', validCredentials, credentials);
        // console.log('validCredentials2', validCredentials?.password); // Optional chaining for safe access

        if (isCheckbox === true) {
            console.log('Login successful!s');
            navigation.navigate('Home');
        }
        else {
            console.log('else called');
            const loginCredential = loginCredentials[email]
            if (!loginCredential || loginCredential?.password !== password) { // Optional chaining
                console.log('validCredentials', loginCredential, loginCredential?.password);
                alert('Invalid Email or password.');
                return;

            }
            const user = Object.values(loginCredentials).find(user => user.email === email && user.password === password);
            // Successful login
            console.log('useruser',user);
            const jsonData = JSON.stringify(user); // Convert user object to JSON string
            await AsyncStorage.setItem('loggedInUser', jsonData); 
            console.log('Login successful!');
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo (optional) */}
            <View style={{ height: 85, width: 100, }}>
                <Image
                    resizeMode={'contain'}
                    source={require('../../assets/samplelogo.jpg')}
                    style={{ height: '100%', width: '100%' }}
                />
            </View>
            <View style={{ height: width - 100, width: '100%', bottom: 30, }}>
                <Image
                    resizeMode={'contain'}
                    source={require('../../assets/employees.jpg')}
                    style={{ height: '100%', width: '100%' }}
                />
            </View>
            <Text style={styles.title}>SIGN IN</Text>

            <TextInput
                style={styles.input}
                placeholder="Email ID"
                autoCapitalize="none"
                placeholderTextColor={'#000'}
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />

            {/* <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={'#000'}
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            /> */}
            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor={'#000'}
                    secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity style={styles.eyeIconContainer} onPress={toggleShowPassword}>
                    <MaterialCommunityIcons name="eye-outline" size={20} color="#ccc" />  
                </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={handleRememberMe}>
                    <View style={styles.checkbox}>
                        {isCheckbox && <View style={styles.checkedCheckbox} />}
                    </View>
                </TouchableOpacity>
                <Text style={styles.checkboxText}>login as admin</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={retrieveCredential}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <View >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.link}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SignUpScreen');
                        }}
                        style={{ alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                        <Text style={{ color: '#000', }}> Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        //alignItems: 'center',
        // padding: 20,
        backgroundColor: '#fff'
    },
    logo: {
        fontSize: 30,
        marginBottom: 20,
    },
    title: {
        fontSize: 17,
        marginBottom: 20,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    input: {
        height: 50,
        width: '85%',
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10,
        //  padding: 8,
        marginHorizontal: 20
    },
    button: {
        backgroundColor: '#000', // Add button styling (optional)
        padding: 10,
        borderRadius: 15,
        width: 190,
        height: 45,
        alignSelf: 'center',
        marginVertical: 35
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    link: {
        marginTop: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20,
        marginVertical: 20
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        // backgroundColor:'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkedCheckbox: {
        width: 15,
        height: 15,
        backgroundColor: '#4CAF50', // Adjust color as desired
        borderRadius: 15,
        // marginLeft: 5,
    },
    checkboxText: {
        fontSize: 16,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%', // Adjust as needed
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    passwordInput: {
        flex: 1, // Allow text input to fill available space
        height: 40,
    },
    eyeIconContainer: {
        paddingHorizontal: 10, // Adjust padding for icon
    },
    eyeIcon: {
        width: 20,
        height: 20,
    },
});

export default LoginScreen;
