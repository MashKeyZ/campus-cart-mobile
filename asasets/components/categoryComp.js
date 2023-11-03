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


 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const CategoryComp = () => {
   return (
    
            <View style={styles.cartegoryCont}>
                <Text style={styles.tittle}>Categories</Text>
              <TouchableOpacity style={styles.imageCont}>
                <Image 
                  source={require('../images/sort.png')}
                  style={{
                    width:23.5,
                    height:20
                  }}
                />
              </TouchableOpacity>
            </View>

   );
 }
 
 const styles = StyleSheet.create({
    tittle:{
    color:'#545F71',
    fontSize:20,
    fontWeight:'bold',
   },imageCont:{
    width:30,
    height:30
   },cartegoryCont:{
    width:"100%",
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
   }
 });
 
 export default CategoryComp;
 