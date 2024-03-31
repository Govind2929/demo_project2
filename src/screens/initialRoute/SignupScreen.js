
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import Toast from 'react-native-simple-toast';

const SignUpScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [gender, setGender] = useState('Male'); // Initial gender selection
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [credentials, setCredentials] = useState({});
    const [date, setDate] = useState(new Date());
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
    const [selectedGender, setSelectedGender] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        const retrieveCredentials = async () => {
            try {
                const dataString = await AsyncStorage.getItem('credentials');
                if (dataString) {
                    setCredentials(JSON.parse(dataString)); // Parse stored credentials
                }
            } catch (error) {
                console.error('Error retrieving credentials:', error);
            }
        };

        retrieveCredentials();
    }, []); // Empty dependency array to run only once on component mount

    const formatDates = (dateOfBirthString) => {
        const date = new Date(dateOfBirthString);
      return format(date, 'dd-MM-yyyy');
      };
    const handleSignUp = async () => {

  // Validate full name (optional, adjust as needed)
  if (!fullName) {
    Toast.show('Please enter your full name.', Toast.SHORT);
    return;
  }
  if (!email) {
           
    Toast.show('Please enter your email address.', Toast.SHORT);
    return;
}
  // Validate email format
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_REGEX.test(email)) {
    Toast.show('Please enter a valid email address.', Toast.SHORT);
    return;
  }

  // Validate mobile number format (adjust based on your region)
  const MOBILE_REGEX = /^\d{10}$/; // Example for 10-digit phone numbers
  if (!MOBILE_REGEX.test(mobileNumber)) {
    Toast.show('Please enter a valid mobile number.', Toast.SHORT);
    return;
  }
  
  if (!selectedGender) {
    Toast.show('Please select your gender', Toast.SHORT);
    return;
  }
  if (!dateOfBirth) {
    Toast.show('Please select your date of birth', Toast.SHORT);
    return;
  }
  // Validate password length
  if (password.length < 4) {
    Toast.show('Password must be at least 4 characters long.', Toast.SHORT);
    return;
  }

  // Validate password confirmation
  if (password !== confirmPassword) {
    Toast.show('Passwords do not match.', Toast.SHORT);
    return;
  }
        const storedCredentials = await AsyncStorage.getItem('credentials');
        if (storedCredentials) {
          const parsedCredentials = JSON.parse(storedCredentials);
          const existingEmails = Object.values(parsedCredentials).map(user => user.email);
          if (existingEmails.includes(email)) {
            Toast.show('Email already exists. Please try with a different email or login.', Toast.SHORT);
            return;
          }
        }
        const newCredentials = {
            [email]: { // Use email as unique username
                fullName,
                email,
                mobileNumber,
                gender,
                dateOfBirth,
                password,
            },
        };

        const updatedCredentials = {
            ...credentials,
            ...newCredentials, // Merge new credentials with existing ones
        };

        try {
            const dataToSave = JSON.stringify(updatedCredentials);
            await AsyncStorage.setItem('credentials', dataToSave);
            console.log('Sign Up successful!', dataToSave);
            navigation.navigate('LoginScreen');
            // Additional actions after successful sign up (e.g., navigate to another screen)
        } catch (error) {
            console.error('Error storing credentials:', error);
            alert('Sign Up failed. Please try again.');
        }
    };

    const formatDate = (date) => {
        // You can adjust the date format as needed
        let day = date.getDate();
        let month = date.getMonth() + 1; // Month is 0-based
        let year = date.getFullYear();

        // Ensuring single digit day and month values are prefixed with a '0' for consistency
        day = day < 10 ? `0${day}` : day;
        month = month < 10 ? `0${month}` : month;

        return `${day}/${month}/${year}`;
    };
    const extractDate = (dateOfBirthString) => {
        console.log('dateOfBirthString@@',dateOfBirthString);
        const date = extractDate
        const parts = dateOfBirthString.split('T')[0]; // Split at 'T' (assuming time follows)
        return parts ? parts : 'N/A'; // Handle missing data
      };
    const GenderCheckbox = ({ label, value, onChange }) => {
        return (
            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => onChange(value)}>
                <View style={[styles.checkbox, selectedGender === value && styles.checkedCheckbox]}>
                    {selectedGender === value && <View style={styles.innerCheckbox} />}
                </View>
                <Text style={styles.checkboxLabel}>{label}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Logo (optional) */}
                <View style={{ height: 85, width: 100, }}>
                    <Image
                        resizeMode={'contain'}
                        source={require('../../assets/samplelogo.jpg')}
                        style={{ height: '100%', width: '100%' }}
                    />
                </View>
                <View style={{ height: width - 120, width: '100%', bottom: 15, }}>
                    <Image
                        resizeMode={'contain'}
                        source={require('../../assets/employees.jpg')}
                        style={{ height: '100%', width: '100%' }}
                    />
                </View>
                <Text style={styles.title}>SIGN IN</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name*"
                    autoCapitalize="none"
                    placeholderTextColor={'#000'}
                    onChangeText={setFullName}
                    value={fullName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email ID*"
                    autoCapitalize="none"
                    placeholderTextColor={'#000'}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />


                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number*"
                    keyboardType="phone-pad"
                    placeholderTextColor={'#000'}
                    onChangeText={setMobileNumber}
                    value={mobileNumber}
                />
                <View style={styles.genderSelectionContainer}>
                    <Text style={{ marginRight: 10, color: '#000', fontSize: 15, }}>
                        Gender*
                    </Text>
                    <GenderCheckbox label="Male" value="Male" onChange={setSelectedGender} />
                    <GenderCheckbox label="Female" value="Female" onChange={setSelectedGender} />
                    <GenderCheckbox label="Other" value="Other" onChange={setSelectedGender} />
                </View>


                <TouchableOpacity
                    onPress={() => setPickerVisible(true)} style={{ marginBottom: 0, }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Select Date*"
                        placeholderTextColor={'#000'}
                        color={'#000'}
                        editable={false} // This makes the TextInput not directly editable
                        value={formatDate(date)} // Use formatted date
                    />
                </TouchableOpacity>

                <DatePicker
                    modal
                    open={isPickerVisible}
                    date={date}
                    mode="date" // Set mode to 'date' to only select the date
                    onConfirm={(date) => {       
                        const filteredDate =  formatDates(date)
                        setDate(date);
                        setDateOfBirth(filteredDate)
                        console.log('setDatesetDate',filteredDate);
                        setPickerVisible(false);
                    }}
                    onCancel={() => {
                        setPickerVisible(false);
                    }}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={{
                            flex: 1,
                            height: 40,
                            width: '85%',
                        }}
                        placeholder="Password*"
                        placeholderTextColor={'#000'}
                        secureTextEntry={passwordVisibility} // Controlled by state
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
                        <Icon name={passwordVisibility ? 'eye-off' : 'eye'} size={20} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{
                            flex: 1,
                            height: 40,
                            width: '85%',
                        }}
                        placeholder="Confirm Password*"
                        secureTextEntry={confirmPasswordVisibility} // Controlled by state
                        placeholderTextColor={'#000'}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                    />
                    <TouchableOpacity onPress={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}>
                        <Icon name={confirmPasswordVisibility ? 'eye-off' : 'eye'} size={20} color="grey" />
                    </TouchableOpacity>
                </View>
               

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handleSignUp()

                    }}>
                    <Text style={styles.buttonText} >
                        Save
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        marginBottom: 10,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        width: '89%',
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10,
        marginHorizontal: 20
    },
    input: {
        height: 40,
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

    genderSelectionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkedCheckbox: {
        borderColor: 'dodgerblue',
    },
    innerCheckbox: {
        height: 12,
        width: 12,
        backgroundColor: 'dodgerblue',
        borderRadius: 3,
    },
    checkboxLabel: {
        color: '#000',
    },
});

export default SignUpScreen;
