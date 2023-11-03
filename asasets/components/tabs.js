import React from 'react';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import CampusStore from '../screens/campusStore';
import Home from '../screens/home';
import ListItem from '../screens/listItem';
import MarketPlace from '../screens/marketPlace';
import MyProfile from '../screens/myProfile';


const Tab = createBottomTabNavigator();

const  MyTabs =()=> {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#F8C134"
      inactiveColor='#2C2C4C'
      screenOptions={{
        //tabBarActiveTintColor: '#e91e63',
        headerShown:false,
      }}
      barStyle={{ backgroundColor: '#FFFFFF',
                    borderTopColor: '#2C2C4C',
                    borderTopWidth:0.5,
                    height: 50,
                    paddingVertical:0
                }}
      shifting = {true}
      labeled ={false}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/home1.png')} // Use your custom icon path
              style={{ width: 35, height: 35, tintColor: color,marginTop: 0  }} // Define dimensions and color
            />
          ),
        }}
      />
      <Tab.Screen
        name="MarketPlace"
        component={MarketPlace}
        options={{
          tabBarLabel: 'MarketPlace',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/FastCartnav.png')} // Use your custom icon path
              style={{ width: 35, height: 35, tintColor: color,marginTop: 0   }} // Define dimensions and color
            />
          ),
        }}
      />
      <Tab.Screen
        name="ListItem"
        component={ListItem}
        options={{
          tabBarLabel: 'List Item',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/PlusMathnav.png')} // Use your custom icon path
              style={{ width: 35, height: 35, tintColor: color,marginTop: 0   }} // Define dimensions and color
            />
          ),
        }}
      />
    <Tab.Screen
        name="CampusStore"
        component={CampusStore}
        options={{
          tabBarLabel: 'Campus Store',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/SmallBusinessnav.png')} // Use your custom icon path
              style={{ width: 35, height: 35, tintColor: color,marginTop: 0  }} // Define dimensions and color
            />
          ),
        }}
      />
    <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/Usernav.png')} // Use your custom icon path
              style={{ width: 35, height: 35, tintColor: color,marginTop: 0   }} // Define dimensions and color
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs
