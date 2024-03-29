// 


import React  from 'react';
import { View , TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import 'react-native-gesture-handler';
import Profile from './src/screens/profile';
import LoginScreen from './src/screens/initialRoute/LoginScreen';
import SignUpScreen from './src/screens/initialRoute/SignupScreen';
import EditProfile from './src/screens/editProfile';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();


function MyStack() {
  return (
    <Stack.Navigator  >
        <Stack.Screen 
      name='LoginScreen'
      component={LoginScreen}
      options={{headerShown: false}}
      />
       <Stack.Screen 
      name='SignUpScreen'
      component={SignUpScreen}
      options={{headerShown: false}}
      />
    
       
      <Stack.Screen 
      name='Home'
      component={Home}
      options={{headerShown: false}}
      /> 
     
      <Stack.Screen
       name="Profile"
        component={Profile} 
        options={{headerShown: false}}
        />
      
          <Stack.Screen
       name="EditProfile"
        component={EditProfile} 
        options={{headerShown: false}}
        />
        
     </Stack.Navigator>
  );
}






export default function App() {
  return (
    <NavigationContainer >
    <MyStack />
    </NavigationContainer>
  );
}