import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
//import { Avatar, Divider, Icon } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';

const Profile = () => {
  const [fullName, setFullName] = useState('admin');
  const [email, setEmail] = useState('admin@gmail.com');
  const [mobileNumber, setMobileNumber] = useState('9400801956');
  const [dateOfBirth, setDateOfBirth] = useState('23-12-1998');
  const [isGenderMale, setGenderMale] = useState(true);
  const [isGenderFemale, setGenderFemale] = useState(false);
  const [isGendeOther, setGenderOther] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [password, setPassword] = useState('12346');
  const [date, setDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const navigation = useNavigation();

  const handleSave = () => {

    alert('Data saved successfully!');
  };
  useEffect(() => {

    console.log('profile calledssz');
    const getUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('loggedInUser');
        const parsedData = JSON.parse(userData);
        console.log('parsedData2', parsedData.dateOfBirth);
        if (parsedData) {
          setFullName(parsedData.fullName);
          setEmail(parsedData.email);
          setMobileNumber(parsedData.mobileNumber);
          setDateOfBirth(parsedData.dateOfBirth)
          // setDate(new Date(parsedData.dateOfBirth));
          setPassword(parsedData.password)
          if (parsedData.gender == 'Male') {
            setGenderMale(true)
            setGenderFemale(false)
            setGenderOther(false)
          }
          else if (parsedData.gender == 'Female') {
            setGenderFemale(true)
            setGenderMale(false)
            setGenderOther(false)
          }
          else if (parsedData.gender == 'Other'){
            setGenderOther(true)
            setGenderFemale(false)
            setGenderMale(false)
          }// Assuming parsedData.dateOfBirth is a valid date string
        } else {
          // Handle no user data found
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    getUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log('useCallback',);
      const getUser = async () => {
        try {
          const userData = await AsyncStorage.getItem('loggedInUser');
          const parsedData = JSON.parse(userData);
          console.log('parsedData2', parsedData.dateOfBirth);
          if (parsedData) {
            setFullName(parsedData.fullName);
            setEmail(parsedData.email);
            setMobileNumber(parsedData.mobileNumber);
            setDateOfBirth(parsedData.dateOfBirth)
          //  setDate(new Date(parsedData.dateOfBirth));
            setPassword(parsedData.password)
            if (parsedData.gender == 'Male') {
              setGenderMale(true)
              setGenderFemale(false)
              setGenderOther(false)
            }
            else if (parsedData.gender == 'Female') {
              setGenderFemale(true)
              setGenderMale(false)
              setGenderOther(false)
            }
            else if (parsedData.gender == 'Other'){
              setGenderOther(true)
              setGenderFemale(false)
              setGenderMale(false)
            }// Assuming parsedData.dateOfBirth is a valid date string
          } else {
            // Handle no user data found
          }
        } catch (error) {
          console.error('Error retrieving user data:', error);
        }
      };
      getUser();
    }, [])
  );

  // const formatDates = (dateOfBirthString) => {
  //   // Parse the date string into a Date object
  //   const date = new Date(dateOfBirthString);

  //   // Use date-fns to format the date (adjust the format as needed)
  //   return format(date, 'dd-MM-yyyy');
  // };


  // const GenderCheckbox = ({ label, value, onChange }) => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.checkboxContainer}
  //       onPress={() => {
  //         // console.log('value',value);
  //         // onChange(value)
  //       }}>
  //       <View style={[styles.checkbox, selectedGender === value && styles.checkedCheckbox]}>
  //         {selectedGender === value && <View style={styles.innerCheckbox} />}
  //       </View>
  //       <Text style={styles.checkboxLabel}>{label}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  // const formatDate = (date) => {
  //   // You can adjust the date format as needed
  //   let day = date.getDate();
  //   let month = date.getMonth() + 1; // Month is 0-based
  //   let year = date.getFullYear();

  //   // Ensuring single digit day and month values are prefixed with a '0' for consistency
  //   day = day < 10 ? `0${day}` : day;
  //   month = month < 10 ? `0${month}` : month;

  //   return `${day}/${month}/${year}`;
  // };

  return (
    <SafeAreaView>
      <View style={{ height: 50 }}>
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
          <View style={{ margin: 18, flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* personal info */}
            <Text style={{ fontSize: 13, color: '#000', fontWeight: 'bold' }}>
              Personal information
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
            <Text style={{ marginTop: 8 }}>
              {fullName}
            </Text>
          </View>
          <View style={{ height: 1, width: '89%', backgroundColor: 'grey', alignSelf: 'center' }} />
          <View style={{ marginTop: 28, marginBottom: 10, marginHorizontal: 18 }}>
            <Text>
              Email*
            </Text>
            <Text style={{ marginTop: 8 }}>
              {email}
            </Text>
          </View>
          <View style={{ height: 1, width: '89%', backgroundColor: 'grey', alignSelf: 'center' }} />
          <View style={{ marginTop: 28, marginBottom: 10, marginHorizontal: 18 }}>
            <Text>
              Mobile Number*
            </Text>
            <Text style={{ marginTop: 8 }}>
              {mobileNumber}
            </Text>
          </View>
          <View style={{ height: 1, width: '89%', backgroundColor: 'grey', alignSelf: 'center' }} />
          <Text style={{ marginRight: 10, color: '#000', fontSize: 12, marginTop: 45, marginHorizontal: 20 }}>
            Gender
          </Text>
          <View style={styles.genderSelectionContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
              }}>
              <View style={[styles.checkbox, isGenderMale === true  && styles.checkedCheckbox]}>
                {isGenderMale === true && <View style={styles.innerCheckbox} />}
              </View>
              <Text style={styles.checkboxLabel}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
              }}>
              <View style={[styles.checkbox, isGenderFemale  === true && styles.checkedCheckbox]}>
                {isGenderFemale  === true && <View style={styles.innerCheckbox} />}
              </View>
              <Text style={styles.checkboxLabel}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
              }}>
              <View style={[styles.checkbox, isGendeOther  === true && styles.checkedCheckbox]}>
                {isGendeOther  === true && <View style={styles.innerCheckbox} />}
              </View>
              <Text style={styles.checkboxLabel}>Other</Text>
            </TouchableOpacity>
            {/* <GenderCheckbox label="Men" value="men" onChange={setSelectedGender} />
          <GenderCheckbox label="Women" value="women" onChange={setSelectedGender} />
          <GenderCheckbox label="Other" value="other" onChange={setSelectedGender} /> */}
          </View>

          <View style={{ margin: 18 }}>
            <Text>
              DOB*
            </Text>
            <Text style={{ marginTop: 8 }}>
              {dateOfBirth}
            </Text>
           
          </View>
          <Text style={{ marginRight: 10, color: '#000', fontSize: 14, marginTop: 5, marginHorizontal: 20, fontWeight: 'bold' }}>
            Change Password
          </Text>
          <View style={{ marginTop: 10, marginBottom: 0, marginHorizontal: 18, top: 10 }}>

            <Text>
              Password*
            </Text>
            <TextInput
              value={password}
              secureTextEntry={true} // Mask characters
              editable={false} // Disable text editing
              style={{ marginTop: 0 }}
            />
          </View>
          <View style={{ height: 1, width: '89%', backgroundColor: 'grey', alignSelf: 'center' }} />
          <View style={{ marginTop: 20, marginBottom: 0, marginHorizontal: 18, top: 10 }}>
            <Text>
              Confirm Password*
            </Text>
            <TextInput
              value={password}
              secureTextEntry={true} // Mask characters
              editable={false} // Disable text editing
              style={{ marginTop: 0 }}
            />

          </View>
          <View style={{ height: 1, width: '89%', backgroundColor: 'grey', alignSelf: 'center', marginBottom: 20 }} />
          {/* <View style={{ height: 100, width: '2%',  alignSelf: 'center',paddingBottom:20 }} /> */}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {

          navigation.navigate('EditProfile')
        }}>
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
});

export default Profile;
