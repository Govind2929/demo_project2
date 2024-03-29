import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons'; // Assuming you're using Ionicons

const CustomBottomTab = ({ screens, activeColor = 'blue', inactiveColor = 'gray' }) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, // Hide default tab labels for cleaner design
        tabBarStyle: {
          backgroundColor: '#fff', // Set background color
          borderTopWidth: 0, // Remove default top border
          shadowColor: 'transparent', // Remove default shadow
        },
      }}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name={screen.icon} size={24} color={color} />
            ),
            tabBarActiveTintColor: activeColor,
            tabBarInactiveTintColor: inactiveColor,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default CustomBottomTab;
