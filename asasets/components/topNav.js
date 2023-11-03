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
 
 import { Badge } from 'react-native-paper';
 import { useNavigation } from '@react-navigation/native';
 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const TopNav = ({options}) => {
    const navigation =useNavigation()

    const navToCart =()=>{
       
        navigation.navigate("CartScreen",{token:options.token,name:options.profile.firstName})
    }

    const navToInbox=()=>{
        navigation.navigate("Inbox",{token:options.token,socket:options.socket,currentUser:options.currentUser,profilePath:options.profile.image})
    }
   return (
    <View style={styles.topNav}>
                   {/*} <TouchableOpacity style={{
                            width:40,
                            height:40,
                            borderRadius:100/2,
                            backgroundColor:options.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image style={{width:24,height:24, tintColor:options.textColor,}} source={require('../images/Icontop-2.png')}/>
                            <View style={styles.badgeCont}>
                               
                                <Badge>{options.Notifications}</Badge>
                            </View>
                           
                        </TouchableOpacity>*/}

                    <TouchableOpacity style={{
                        width:40,
                        height:40,
                        borderRadius:100/2,
                        backgroundColor:options.bg,
                        alignItems: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={navToInbox}
                    >
                        <Image style={{width:24,height:24, tintColor:options.textColor}} source={require('../images/Icontop-1.png')}/>
                        <View style={styles.badgeCont}>
                            <Badge></Badge>
                        </View>
                    
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width:40,
                        height:40,
                        borderRadius:100/2,
                        backgroundColor:options.bg,
                        alignItems: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal:5
                    }}
                    onPress={navToCart}
                    >
                        <Image style={{width:24,height:24, tintColor:options.textColor}} source={require('../images/Icontop.png')}/>
                        <View style={styles.badgeCont}>
                            <Badge>{options.cart}</Badge>
                            
                        </View>
                    </TouchableOpacity>
                </View>
   );
 }
 
 const styles = StyleSheet.create({
    topNav:{
    display:'flex',
    width:"40%",
    height:'100%',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'flex-end'
   },badge:{
    fontSize:16,
    alignSelf: 'center',
    color: '#FFFFFF',
    
   },badgeCont:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width:20,
    height:20,
    backgroundColor:'red',
    borderRadius:100/2,
    position:'absolute',
    top:0,
    right:-5,
   }
   
 });
 
 export default TopNav;
 