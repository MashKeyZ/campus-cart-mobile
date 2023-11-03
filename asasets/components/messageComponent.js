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
   TouchableOpacity,
   Image,
   ScrollView
 } from 'react-native';

 const FULL_WIDTH = Dimensions.get('window').width;
 const FULL_HEIGHT = Dimensions.get('window').height;
 //productUserId
 const  MessageComponent = ({time,item,path,text,currentUser,from,profilePath,image,token,navigation}) => {
    console.log("Path: " + profilePath);
    let fromServer = false;
    if(from===currentUser){
        fromServer = false;
    }else{
        fromServer = true;
    }

    const navToProduct=()=>{
        navigation.navigate("Product",{token:token,productId:item?.productId})
    }
    const navToOrders=()=>{
        navigation.navigate("OrderScreen",{token:token,orderId:item?.orderId})
    }

   return (
    <View style={styles.container}>
        <Text style={{
            fontSize:12,
            fontWeight:'600',
            color:'#9BA5B7',
            justifyContent: 'center',
            alignSelf: 'center',
        }}>
            {time}
        </Text>
        {item?.productId?
         <TouchableOpacity style={styles.attatchment} onPress={navToProduct}>
            <Image
                    source={require('../images/attach.png')} // Replace with the actual image path
                    style={{
                    width: 30,
                    height: 30,
                    tintColor:'#9BA5B7',
                    borderRadius:100/2
                    }}
                    resizeMode="contain" // Adjust the resizeMode based on your requirement
                />
         <Text style={{
             fontSize:12,
             fontWeight:'600',
             color:'#9BA5B7',
             justifyContent: 'center',
             alignSelf: 'center',
             backgroundColor:'#FFFFFF',
             borderColor:'#9BA5B7',
             borderWidth:1,
             paddingHorizontal:20,
             paddingVertical:5,
             borderRadius:10
         }}>
             #View Product ?
         </Text>
     </TouchableOpacity>
        :''}
        {item?.orderId?
         <TouchableOpacity style={styles.attatchment} onPress={navToOrders}>
              <Image
                    source={require('../images/attach.png')} // Replace with the actual image path
                    style={{
                    width: 30,
                    height: 30,
                    tintColor:'#9BA5B7',
                    borderRadius:100/2
                    }}
                    resizeMode="contain" // Adjust the resizeMode based on your requirement
                />
         <Text style={{
             fontSize:12,
             fontWeight:'600',
             color:'#9BA5B7',
             justifyContent: 'center',
             alignSelf: 'center',
             backgroundColor:'#FFFFFF',
             borderColor:'#9BA5B7',
             borderWidth:1,
             paddingHorizontal:20,
             paddingVertical:5,
             borderRadius:10
             
         }}>
             #View Order ?
         </Text>
     </TouchableOpacity>
        :''}
       <View style={[styles.compContainer,{justifyContent:fromServer?'flex-start':'flex-end'}]}>
        {fromServer?
            <View style={styles.imageContainer}>
            <Image
                    source={{uri:image}} // Replace with the actual image path
                    style={{
                    width: 30,
                    height: 30,
                    //tintColor:'#FFFFFF',
                    borderRadius:100/2
                    }}
                    resizeMode="contain" // Adjust the resizeMode based on your requirement
                />
            </View>:''} 
            <View style={[styles.rightColumn]}>
                <View style={fromServer?styles.textCont:styles.textContRight}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'600',
                    color:'#FFFFFF',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    padding:10
                }}>
                    {text}
                </Text>
                </View>
            </View> 
            {!fromServer?
            <View style={styles.imageContainer}>
            <Image
                    source={{uri:profilePath}} 
                    style={{
                    width: 30,
                    height: 30,
                    //tintColor:'#FFFFFF',
                    borderRadius:100/2
                    }}
                    resizeMode="contain" // Adjust the resizeMode based on your requirement
                />
            </View>:''} 
       
            
        </View>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    display:'flex',
    width : FULL_WIDTH,
    //height : FULL_HEIGHT*0.08,
    paddingHorizontal:FULL_WIDTH*0.01,
    paddingVertical:FULL_WIDTH*0.01,
    backgroundColor:'#FFFFFF',
   },compContainer:{
    //width : FULL_WIDTH*0.985,
    //height : '100%',
    display:'flex',
    flexDirection:'row',
    alignItems: 'flex-end',

   },leftColumn:{
    display:'flex',
    width:'20%',

   },rightColumn:{
    display:'flex',
    maxWidth:'70%',
    height:'auto',
   },imageContainer:{
    display:'flex',
    width:30,
    height:30,   
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#9BA5B7',
    borderRadius:100/2
   },textCont:{
    backgroundColor:'#9BA5B7',
    width:'auto',
    marginLeft:3,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderBottomRightRadius:20
   },textContRight:{
    backgroundColor:'#4285F4',
    width:'auto',
    marginRight:3,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20
   },attatchment:{
    display:'flex',
    flexDirection:'row',
    backgroundColor:'#FFFFFF',
             borderColor:'#9BA5B7',
             borderWidth:1,
    borderRadius:10,
    width:'48%',
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
   }

 });
 
 export default MessageComponent;
 