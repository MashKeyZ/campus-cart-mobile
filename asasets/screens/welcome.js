/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   Image,
   SafeAreaView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   Dimensions,
 } from 'react-native';
 
 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;

 const Welcome = ({navigation}) => {
  const navigate=()=>{
    navigation.replace('Login')
  }
   return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topCont}>
        <Image 
          source={require(('../images/logo.png'))}
          style={{
            width: '90%',
            
          }}
          resizeMode="contain"
          />
          <Text style={{
            paddingTop:15,
            color:'#2C2C4C',
            fontSize: 36,
            fontWeight: 'bold',
          }}>Campus Cart</Text>
          <Text style={{
            color:'#2C2C4C',
            fontSize: 12,
            fontWeight: '500',
          }}>The University Student Market</Text>
      </View>
      <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={navigate}>
            <Text
              style={{
                color:"#FFFFFF",
                fontSize: 20,
                fontWeight:'800',

              }}
              >Let's go</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    flex:1,
    width : '100%',
    height : '100%',
    backgroundColor:'#FFFFFF',
    display:'flex',
    justifyContent: 'center',
    //alignItems: 'center',
   },topCont:{
    width : '100%',
    height : '80%',

    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
   },footer:{
    width : '100%',
    height:'20%',
    //backgroundColor:'red',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
   },button:{
    backgroundColor:'#545F71',
    width: FULL_WIDTH*0.7,
    height: FULL_HEIGHT*0.07,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30
   }
 });
 
 export default Welcome;
 