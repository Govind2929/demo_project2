import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './src/components/Header';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [isNormalUser , setISNormalUser] = useState(true)
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(async() => {
   
   const getDataFromLogin = route.params?.isNormalUser;
   console.log('getDataFromLogin',getDataFromLogin);
   setISNormalUser(getDataFromLogin)
  
  if (getDataFromLogin !== true) {
    const dataString = await AsyncStorage.getItem('credentials');
    console.log('dataStringQ@Q', JSON.parse(dataString)); 
     const userData = JSON.parse(dataString);
 
     
    const userListWithIndex = Object.entries(userData).map(
      ([email, userObject], index) => ({
        ...userObject, // Spread user information
        email, // Include email for key extraction
        serialNumber: index + 1, // Add serial number starting from 1
        
      })
    );
    setUsers(userListWithIndex);
  }
  else {
    setUsers([])
  }

  }, []);
  const extractDate = (dateOfBirthString) => {
    console.log('dateOfBirthString@@',dateOfBirthString);
    const date = '2024-03-28T07:57:38.995Z'
    const parts = date.split('T')[0]; // Split at 'T' (assuming time follows)
    return parts ? parts : 'N/A'; // Handle missing data
  };
  const formatDates = (dateOfBirthString) => {
    const date = new Date(dateOfBirthString);
  return format(date, 'dd-MM-yyyy');
  };


  const renderItem = ({ item }) => (
  <View style={styles.userItemContainer}>
      <View style={styles.userItem}>
       <Text style={styles.userDataText}>{item.serialNumber}</Text>
      <Text style={{   flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,right:5}}>{item.fullName}</Text>
       <Text style={{   flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,right:8}}>{item.email}</Text>
      {/* <Text style={styles.userDataText}>{extractDate(item.dateOfBirth)}</Text> */}
      <Text style={styles.userDataText}>{item.dateOfBirth}</Text>
      <View style={{flexDirection:'row',width:50,justifyContent:'space-between'}}>
      <MaterialCommunityIcons name="eye-outline" size={20} color="#ccc" />
      <MaterialCommunityIcons name="delete" size={20} color="#ccc" />
      </View>
      
    </View>
    <View style={{height:1, width:'100%',backgroundColor:'grey'}}/>
  </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
      <Text style={styles.headerText}>SI No</Text>
      <Text style={styles.headerText}>Name</Text>
      <Text style={styles.headerText}>Email</Text>
      <Text style={styles.headerText}>DOB</Text>
      <Text style={styles.headerText}>Action</Text>
    </View>
    <View style={{height:1, width:'100%',backgroundColor:'#000'}}/>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={{ height:50 }}>
        <Header

          backgroundColor={'#fff'}
          isBackbtnAvailable={false}
          isForDashboar={true}
          
          title={'Home'}
        />

      </View>
      <Text style={styles.title}>USERS</Text>
      {isNormalUser !== true ?
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader} // Add header component
      />
      :
      <View style={{flex:.99,alignItems:'center',justifyContent:'center',}}>
        <Text style={{fontSize:15,color:'#000',fontWeight:'800'}}>
          Only admin can see the registered users.
        </Text>
      </View>
         }

   <View style={{height:50,width:'100%',alignSelf:'baseline',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,paddingVertical:5}}>
      <TouchableOpacity 
      onPress={()=>{
        navigation.navigate('Home')
      }
      }
      style={{ paddingHorizontal:15,paddingTop:6,backgroundColor:'#FFF',alignItems:'center',justifyContent:'center',elevation:3,borderRadius:5}}>
      <Ionicons name="home-outline" size={30} color={'grey'} />
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>{
        navigation.navigate('Profile')
      }
      }
      style={{paddingHorizontal:15,paddingTop:6,backgroundColor:'#FFF',alignItems:'center',justifyContent:'center',elevation:3,borderRadius:5}}>
      <Ionicons name="person-outline" size={30} color={'grey'} />
      </TouchableOpacity>
      </View>
   </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal:0
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000',
    margin: 20,
  },
  headerContainer: {
   paddingHorizontal:5
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft:5,
    color:'#000'
  },
  userItemContainer: {
    paddingHorizontal:5
  },
  userItem: {
    padding: 10,
    flexDirection:'row'
  },
  userDataText: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomeScreen;
