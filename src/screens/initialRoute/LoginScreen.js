import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
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
        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
           
            Toast.show('Please enter your Email.', Toast.SHORT);
            return;
        }
        else if (!EMAIL_REGEX.test(email)) {
            Toast.show('Please enter a valid email address.', Toast.SHORT);
            return;
          }
       else if ( !password) {
           
            Toast.show('Please enter your password.', Toast.SHORT);
            return;
        }
        else if (password.length < 4) {
            Toast.show('Password must be at least 4 characters long.', Toast.SHORT);
            return;
          }
          else  if (isCheckbox === true) {
            console.log('Login successful!s');
            navigation.navigate('Home', { isNormalUser: false });
        }
        else  if (loginCredentials === null) {
            console.log('Login successful!s');
            Toast.show('User not found, Please Sign up.', Toast.SHORT);
            // navigation.navigate('Home');
        }
        else {
            console.log('else calleds' ,loginCredentials);
            const loginCredential = loginCredentials[email]
            if (!loginCredential || loginCredential?.password !== password) { // Optional chaining
                console.log('validCredentials', loginCredential, loginCredential?.password);
                
                Toast.show('Invalid Email or password.', Toast.SHORT);
                return;

            }
            const user = Object.values(loginCredentials).find(user => user.email === email && user.password === password);
            // Successful login
            console.log('useruser',user);
            const jsonData = JSON.stringify(user); // Convert user object to JSON string
            await AsyncStorage.setItem('loggedInUser', jsonData); 
            console.log('Login successful!');
            navigation.navigate('Home', { isNormalUser: true });
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
                onChangeText={(text)=>{
                    setIsCheckbox(false)
                    setEmail(text)
                }}
                value={email}
            />

            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor={'#000'}
                    secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                    onChangeText={(text)=>{
                        setIsCheckbox(false)
                        setPassword(text)
                    }}
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
        marginHorizontal: 20
    },
    button: {
        backgroundColor: '#000',
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkedCheckbox: {
        width: 15,
        height: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 15,
    },
    checkboxText: {
        fontSize: 16,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    passwordInput: {
        flex: 1,
        height: 40,
    },
    eyeIconContainer: {
        paddingHorizontal: 10, 
    },
    eyeIcon: {
        width: 20,
        height: 20,
    },
});

export default LoginScreen;
