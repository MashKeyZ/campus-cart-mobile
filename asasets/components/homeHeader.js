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
   StyleSheet,
   Text,
   View,
   Dimensions,
   Image,
   TouchableOpacity
 } from 'react-native';

 import TopNav from './topNav';
 
 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const HomeHeader = ({options}) => {
   return (
    <View>
        <View style={styles.container}>
            <View style={styles.headerCont}>
                <Text style={[styles.tittle,{color:options.textColor}]}>{options.tittle}</Text>
                <TopNav options={options} />
            </View>
        </View>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    width : '100%',
    height : 'auto',
    
    //paddingHorizontal : FULL_WIDTH *0.02,
   },backGround:{
     height: FULL_HEIGHT,
     width: FULL_WIDTH,
     backgroundColor:'#545F71',
   },headerCont:{
    display:'flex',
    flexDirection:'row',
    width:'auto',
    height: 50,
    justifyContent:'space-between',
    alignItems: 'center',
    //backgroundColor:'blue'
   },tittle:{
    fontSize:34,
    fontWeight:'bold',
   },body:{
    width:'100%',
    height:'20%',
    backgroundColor:'#FFFFFF',
   }
   
 });
 
 export default HomeHeader;
 