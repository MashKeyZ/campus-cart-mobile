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
 const ChatComponent = ({sendToId,user,token,navigation,currentUser,setOpenModal,profilePath,image}) => {
    const [userId,setUserId] = useState(sendToId)
    const [userName,setUserName] = useState(user?.name||(user.firstName.split(' ')[0]+' '+user.lastName.split(' ')[0]))
    const [profilePic,setProfilePic] = useState(image)
    console.log('User name : '+userName)
    //setCount((prev)=>prev+1)
const navToChats=()=>{
  setOpenModal(false);
    navigation.push("Chats",{token:token,sendToId:userId,user:{user},name:userName,currentUser:currentUser,profilePath:profilePath,image:profilePic})
}

   return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.compContainer} onPress={navToChats}>
          <View style={styles.leftColumn}>
            <View style={styles.imageContainer}>
            <Image
                    source={{uri:profilePic}} // Replace with the actual image path
                    style={{
                    width: 55,
                    height: 55,
                    //tintColor:'#FFFFFF',
                    borderRadius:100/2
                    }}
                    resizeMode="contain" // Adjust the resizeMode based on your requirement
                />
            </View>
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.topCont}>
                <Text
                    style={{
                        color:'#545F71',
                        fontWeight:'bold',
                        fontSize:16
                    }}
                >{user?.name||(user.firstName.split(' ')[0]+' '+user.lastName.split(' ')[0])}</Text>
            </View>
          </View>    
        </TouchableOpacity>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.08,
    alignItems:'center',
    
   },compContainer:{
    width : FULL_WIDTH*0.985,
    height : '100%',
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    //paddingHorizontal:3
    //backgroundColor:'red'
   },leftColumn:{
    display:'flex',
    width:'20%',
    height:'100%',   
    alignItems: 'center',
    justifyContent:'center',
   },rightColumn:{
    display:'flex',
    width:'80%',
    height:'100%',
    borderBottomWidth:0.6,
    borderBottomColor: '#545F71'  ,
    justifyContent:'space-evenly'
   },imageContainer:{
    display:'flex',
    width:55,
    height:55,   
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#9BA5B7',
    borderRadius:100/2
   },topCont:{
    width:'100%',
    height:'40%',
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    //backgroundColor:'red'
   },bottomCont:{
    width:'100%',
    height:'40%',
    //backgroundColor:'blue'
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
   },
 });
 
 export default ChatComponent;
 