/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   Image,
   TouchableOpacity,
   ScrollView
 } from 'react-native';


 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const HeaderProduct = ({options}) => {
  let name = options?.firstName.split(' ')[0]+' '+options?.lastName.split(' ')[0] || options.name

   return (

        <TouchableOpacity style={styles.headerCont}>
                <View style={styles.imageTitleCont}>
                <Image
                    source={{uri:options.image}}
                    style={{
                        width:30,
                        height:30,
                        borderRadius:100/2
                    }}/>
                </View>
                    <View style={styles.tittleCont}>
                        <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            color:'#545F71',
                            fontWeight:'bold',
                            fontSize:11,
                            
                        }}>{name}</Text>
                        <View style={styles.subTitle}>
                            <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                color:'#545F71',
                                fontWeight:'400',
                                fontSize:10,
                                
                            }}>{options?.productRatings}</Text>
                              <Image
                                source={require('../images/star.png')}
                                style={{
                                    width:15,
                                    height:15,
                                    marginHorizontal:2
                                }}/>
                            <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                color:'#545F71',
                                fontWeight:'400',
                                fontSize:10,
                                
                            }}>Ratings</Text>
                        </View>
                    </View>
                
            </TouchableOpacity>

   );
 }
 
 const styles = StyleSheet.create({
   container:{
    width : '45%',
    height : '40%',
    //paddingHorizontal : FULL_WIDTH *0.02,
    backgroundColor:'#FFFFFF',
    marginBottom:FULL_HEIGHT*0.015,
    elevation:8,
    borderRadius:10,
    display:'flex',
    alignItems: 'center',
    paddingHorizontal:3,
    //paddingVertical:2
   },backGround:{
     height: FULL_HEIGHT,
     width: FULL_WIDTH,
     backgroundColor:'#545F71',
   },headerCont:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    height: "14%",
    justifyContent:'space-between',
    alignItems: 'center',
    //backgroundColor:'blue',
   },tittle:{
    fontSize:36,
    fontWeight:'bold',
   },body:{
    width:'100%',
    height:'20%',
    backgroundColor:'#FFFFFF',
   },touchableCont:{
    width:'99%',
    height:'99%',
    display:'flex',
    alignItems: 'center',
 
   },tittleCont:{
        width:'80%',
        height:'100%',
        display:'flex',
        justifyContent: 'center',
   },imageTitleCont:{
    borderWidth:.5,
    borderColor:'#545F71',
    borderRadius:100/2,
    width:30,
    height:30,
    alignItems: 'center',
    justifyContent: 'center',
   },subTitle:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
   }
   
 });
 
 export default HeaderProduct;
 