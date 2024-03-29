import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
//import { Avatar, Divider, Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';

const EditProfile = () => {
  const [fullName, setFullName] = useState('admin');
  const [email, setEmail] = useState('admin@google.com');
  const [mobileNumber, setMobileNumber] = useState('9400801956');
  const [dateOfBirth, setDateOfBirth] = useState('23-12-1998');
  const [password, setPassword] = useState('12346');
  const [confirmPassword, setConfirmPassword] = useState('12346');
  const [selectedGender, setSelectedGender] = useState('Male');
  const [date, setDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('loggedInUser');
        const parsedData = JSON.parse(userData);
        console.log('parsedData2', parsedData.gender);
        if (parsedData) {
          setFullName(parsedData.fullName);
          setEmail(parsedData.email);
          setMobileNumber(parsedData.mobileNumber);
          setDateOfBirth(parsedData.dateOfBirth)
          setDate(new Date(parsedData.dateOfBirth));
          setSelectedGender(parsedData.gender)
          setPassword(parsedData.password)
          setConfirmPassword(parsedData.password)
        } else {
          // Handle no user data found
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    getUser();
  }, []);

  
  
  const updateUserData = async (updatedData) => {
    try {
      const stringifiedData = JSON.stringify(updatedData);
      await AsyncStorage.setItem('loggedInUser', stringifiedData);
      alert('Data updated successfully!'); // Replace with appropriate feedback
      navigation.goBack({ data: updatedData });
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error saving data. Please try again.'); // Inform user about error
    }
  };

  const handleSave = () => {
    const updatedData = {
      fullName,
      email,
      mobileNumber,
      dateOfBirth: dateOfBirth, // Convert to ISO string format
      gender: selectedGender, // Handle gender update (if applicable)
      password, // Consider security implications of storing plain text passwords
    };
    updateUserData(updatedData);
    
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

  return (
    <SafeAreaView>
        <View style={{ height:50 }}>
        <Header
          onBackPressed={()=>navigation.goBack()}
          backgroundColor={'#fff'}
          isBackbtnAvailable={true}
          isForDashboard={false}
          
          title={'Back'}
        />
      </View>
      <ScrollView>
        <View style={{ margin: 15, borderWidth: 1, borderRadius: 15, borderColor: 'grey', marginBottom: 0 }}>
        <View style={{ margin: 18,flexDirection:'row',justifyContent:'space-between' }}>
            {/* personal info */}
            <Text style={{ fontSize: 13, color: '#000', fontWeight: 'bold' }}>
              Edit User
            </Text>
            <AntDesign name="plus" size={15} color={'#000'} />
          </View>

          <View style={{ height: 1, width: '100%', backgroundColor: 'grey' }} />
          <View style={{ margin: 18 }}>
            <Text>
              You are with us since November 12,2023
            </Text>
          </View>

          <View style={{ marginVertical: 6, marginHorizontal: 18 }}>
            <Text>
              Full Name*
            </Text>
            {/* <Text style={{ marginTop: 8 }}>
              {fullName}
            </Text> */}
            <TextInput
            style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name" // Optional placeholder
            />
          </View>
          <View style={{ marginTop: 10, marginBottom: 10, marginHorizontal: 18 }}>
            <Text>
              Email*
            </Text>
            {/* <Text style={{ marginTop: 8 }}>
              {email}
            </Text> */}
             <TextInput
             style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your full name" // Optional placeholder
            />
          </View>
          <View style={{ marginTop: 10, marginBottom: 10, marginHorizontal: 18 }}>
            <Text>
              Mobile Number*
            </Text>
            {/* <Text style={{ marginTop: 8 }}>
              {mobileNumber}
            </Text> */}
             <TextInput
             style={styles.input}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              placeholder="Enter your full name" // Optional placeholder
            />
          </View>
           <Text style={{ marginRight: 10, color: '#000', fontSize: 12, marginTop: 15, marginHorizontal: 20 }}>
            Gender
          </Text>
          <View style={styles.genderSelectionContainer}>
           
           <GenderCheckbox label="Male" value="Male" onChange={setSelectedGender} />
          <GenderCheckbox label="Female" value="Female" onChange={setSelectedGender} />
          <GenderCheckbox label="Other" value="Other" onChange={setSelectedGender} /> 
          </View> 

          <View style={{ margin: 18 }}>
            <Text>
              DOB*
            </Text>
            {/* <Text style={{ marginTop: 8 }}>
          
              {formatDates(dateOfBirth)}
            </Text> */}
            <TouchableOpacity
            onPress={() => setPickerVisible(true)} style={{ marginBottom: 0, }}>
            <TextInput
              style={styles.input}
              placeholder="Select Date*"
              placeholderTextColor={'#000'}
              color={'#000'}
              editable={false} // This makes the TextInput not directly editable
              value={dateOfBirth} // Use formatted date
            />
          </TouchableOpacity>

          <DatePicker
            modal
            open={isPickerVisible}
            date={date}
            mode="date" // Set mode to 'date' to only select the date
            onConfirm={(date) => {
                setDateOfBirth(formatDate(date));
                console.log('onConfirm2',formatDate(date));
              setPickerVisible(false);
            }}
            onCancel={() => {
              setPickerVisible(false);
            }}
          />
          </View>
          <Text style={{ marginRight: 10, color: '#000', fontSize: 14, marginTop: 5, marginHorizontal: 20, fontWeight: 'bold' }}>
            Change Password
          </Text>
          <View style={{ marginTop: 10, marginBottom: 0, marginHorizontal: 18,top:10 }}>

            <Text>
              Password*
            </Text>
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
              
          </View>
          <View style={{ height: 1, width: '89%', backgroundColor: 'grey', alignSelf: 'center' }} />
          <View style={{ marginTop: 20, marginBottom: 0, marginHorizontal: 18,top:10 }}>
            <Text>
              Confirm Password*
            </Text>
           
             <View style={styles.inputContainer}>
                    <TextInput
                        style={{
                            flex: 1,
                            height: 40,
                            width: '85%',
                        }}
                        placeholder="Confirm your Password"
                        secureTextEntry={confirmPasswordVisibility} // Controlled by state
                        placeholderTextColor={'#000'}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                    />
                    <TouchableOpacity onPress={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}>
                        <Icon name={confirmPasswordVisibility ? 'eye-off' : 'eye'} size={20} color="grey" />
                    </TouchableOpacity>
                </View>
          </View>
          <View style={{ height: 1, width: '89%', backgroundColor: 'grey', alignSelf: 'center', marginBottom: 20 }} />


        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({


  genderSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 15,
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
    borderRadius: 10,
  },
  checkboxLabel: {
    color: '#000',
    fontSize: 12
  },
  input: {
    height: 37,
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    //  padding: 8,
    // marginHorizontal: 20
  },
  button: {
    backgroundColor: '#000', // Add button styling (optional)
    padding: 10,
    borderRadius: 25,
    width: 190,
    height: 45,
    alignSelf: 'center',
    marginTop: 35,
    marginBottom:70
},
buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
},
inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
},
});

export default EditProfile;
