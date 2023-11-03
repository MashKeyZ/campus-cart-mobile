/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { useNavigation } from '@react-navigation/native';
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
 const CampShop = ({options,token,currentUser}) => {
    const navigation = useNavigation();
    const navToShop =()=>{
        navigation.navigate('StoreScreen',{token:token,currentUser:currentUser,store:options})
    }
   return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.touchableCont} onPress={navToShop}>
        <View style={styles.imageCont}>
        <Image 
            source={{uri:options.image}}
            style={{
                flex: 1,
                width: undefined,
                height: undefined,
                borderRadius: 5, // Optional: Add border radius or other styles
                }}
                resizeMode="contain" 
            />
        </View>
        <View style={styles.tittleCont}>
                        <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            color:'#2C2C4C',
                            fontWeight:'700',
                            fontSize:20,
                            
                        }}>{options?.name}</Text>
                        <View style={styles.subTitle}>
                            <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                color:'#545F71',
                                fontWeight:'700',
                                fontSize:16,
                                
                            }}>{options?.avgRatings?.toFixed(2)}</Text>
                              <Image
                                source={require('../images/star.png')}
                                style={{
                                    width:20,
                                    height:20,
                                    marginHorizontal:2
                                }}/>
                            <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                color:'#545F71',
                                fontWeight:'700',
                                fontSize:16,
                                
                            }}>Ratings</Text>
                        </View>
                <View style={styles.bottom}>
                <Image
                                source={require('../images/location.png')}
                                style={{
                                    width:20,
                                    height:20,
                                    
                                }}/>

                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        color:'#545F71',
                        fontWeight:'500',
                        fontSize:10,
                                
                    }}>{options?.university}</Text>
                </View>
                    </View>
                
                <Image
                    source={require('../images/enter.png')}
                    style={{
                        width:40,
                        height:40
                    }}
                />
                
        </TouchableOpacity>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    width : '100%',
    height : FULL_HEIGHT * 0.12,
    //paddingHorizontal : FULL_WIDTH *0.02,
    backgroundColor:'#FFFFFF',
    marginBottom:FULL_HEIGHT*0.015,
    //elevation:5,
    //borderRadius:10,
    display:'flex',
    alignItems: 'center',
    paddingHorizontal:3,
    paddingVertical:0
   },backGround:{
     height: FULL_HEIGHT,
     width: FULL_WIDTH,
     backgroundColor:'#545F71',
   },headerCont:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    height: "15%",
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
    width:'98%',
    height:'99%',
    display:'flex',
    alignItems: 'center',
    flexDirection:'row',
    backgroundColor:'#FFFFFF',
    elevation:5,
    borderRadius:10,
    paddingHorizontal:3,
   },tittleCont:{
        width:'65%',
        height:'100%',
        display:'flex',
        justifyContent: 'center',
        marginHorizontal:10
        
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
   },imageCont:{
    width:'22%',
    height:'90%',
    
   },productInfo:{
    width:'98%',
    marginVertical:FULL_HEIGHT*0.0025,
   },bottom:{
    display:'flex',
    flexDirection:'row',
   },iconTouchable:{
    elevation:10,
    backgroundColor:'#FFFFFF',
    borderRadius:100/2,
   }
   
 });
 
 export default CampShop;
 