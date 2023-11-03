/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { useNavigation } from '@react-navigation/native';
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
import { Divider } from 'react-native-paper';


 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const BodyTop = ({options,token,currentUser}) => {
    const navigation = useNavigation();
    const navToOrders=()=>{
        navigation.navigate('MyOrders',{token:token,currentUser:currentUser})
    }
   return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touch}>
        <Image
                source={require('../images/balanceNew.png')}
                style={{width: '100%',
                        height: '100%',
                        borderRadius:20, 
                        // <Divider horizontalInset={true} bold={true} theme={{colors: { primary: 'white' }}}/>
                    }}
            />
            <View style={styles.contentContainer}>
                <Text
                    style={{
                        fontSize:20,
                        fontWeight: '500',
                        color:'#FFFFFF',

                    }}
                >Hi,</Text>
                <Text
                    style={{
                        fontSize:26,
                        fontWeight: '400',
                        color:'#FFFFFF',
                        
                    }}
                >{options?.firstName.split(' ')[0]+' '+options?.lastName.split(' ')[0]}</Text>
                    <View style={styles.subTitle}>
                            <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                color:'#FFFFFF',
                                fontWeight:'400',
                                fontSize:14,
                                
                            }}>{options?.ratings.toFixed(2)}</Text>
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
                                color:'#FFFFFF',
                                fontWeight:'400',
                                fontSize:14,
                                
                            }}>Ratings</Text>
                    </View>
                <View style={{width:60,height:60,position: 'absolute',top:'-30%',right:'15%',borderRadius:100/2,alignItems:'canter',justifyContent:'center',display:'flex',backgroundColor:'#FFFFFF',borderWidth:2,borderColor:'#545F71'}}>
                <Image
                source={require('../images/logobg.png')}
                style={{width: 60,
                        height: 60,
                        
                        borderRadius:100/2
                    }}
                />
                </View>
                <View style={{width:60,height:60,position: 'absolute',top:'-30%',right:'-1%',borderRadius:100/2,alignItems:'canter',justifyContent:'center',display:'flex',backgroundColor:'#FFFFFF',borderWidth:2,borderColor:'#545F71'}}>
                <Image
                source={require('../images/logobg.png')}
                style={{width: 60,
                        height: 60,
                        
                        borderRadius:100/2
                    }}
                />
                </View>
                
                <View style={{width:75,height:75,position: 'absolute',top:'-30%',right:'5%', backgroundColor:'#FFFFFF',borderRadius:100/2,elevation:8,borderWidth:2,borderColor:'#545F71',alignItems:'canter',justifyContent:'center',display:'flex'}}>
                <Image
                source={{uri:options.image}}
                style={{width: 71,
                        height: 71,
                        
                        borderRadius:100/2
                    }}
                />
                </View>
              


            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch} onPress={navToOrders}>
        <Image
                source={require('../images/listedNew.png')}
                style={{width: '100%',
                        height: '100%', 
                        borderRadius:20,
                    }}
            />
            <View style={styles.contentContainer2}>
            <Image style={{ width:35,height:35}} source={require('../images/cash.png')}/>
                <Text style={{
                    color:"#FFFFFF",
                    fontSize:20
                }}>
                    View your orders
                </Text>
            </View>
        </TouchableOpacity>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    width : '100%',
    height : '45%',
    display: 'flex',
    justifyContent : 'space-evenly',
    //paddingHorizontal : FULL_WIDTH *0.02,
    paddingHorizontal:5,
    //backgroundColor:'blue'
   },touch:{
    width : '100%',
    height : '35%',
    borderRadius:20, 
    backgroundColor:'#FFFFFF',
        // For Android
        elevation: 15, // Adjust the elevation value for the shadow depth
        // For iOS
        //shadowColor: '#333333',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.5, // Adjust the shadow opacity
        shadowRadius: 10, // Adjust the shadow radius
   },contentContainer:{
    position: 'absolute',
    zIndex:5,
    width:'100%',
    height:'100%',
    display: 'flex',
    //flexDirection: 'row',
    //alignItems: 'center',
    //paddingHorizontal:'5%',
    //justifyContent:'space-around'
    paddingHorizontal : FULL_WIDTH *0.02,
    paddingVertical : FULL_HEIGHT *0.004,
   },content:{
    width: '45%',
    height:'100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
   },divider:{
    height: '80%',
    width:2,
    backgroundColor:"#FFFFFF"
   },tittle:{
    color: '#FFFFFF',
    fontWeight:"bold",
    fontSize:24,
   },balance:{
    color: '#FFFFFF',
    fontWeight:"700",
    fontSize:24,
   },subTitle:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
   },contentContainer2:{
    position: 'absolute',
    zIndex:5,
    width:'100%',
    height:'100%',
    display: 'flex',
    //flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal:'5%',
    justifyContent:'center',
    paddingHorizontal : FULL_WIDTH *0.02,
    paddingVertical : FULL_HEIGHT *0.004,
   }
   
 });
 
 export default BodyTop;
 