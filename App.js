/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import { NavigationContainer } from '@react-navigation/native';
 //import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
 
 import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
 import HomeScreen from './asasets/screens/home';
 import MarketPlace from './asasets/screens/marketPlace';
 import MyTabs from './asasets/components/tabs';
 import StackNavigator from './asasets/components/stackNavigator';

 // <StackNavigator/><MyTabs/>
 const App = () => {
   return (
     <NavigationContainer>
      
      <StackNavigator/>
     </NavigationContainer>
   );
 }
 
 export default App;
 