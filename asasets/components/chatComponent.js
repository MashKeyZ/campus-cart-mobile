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
 const ChatComponent = ({fromUserId,sendToId,user,token,navigation,currentUser,time,text,profilePath,image}) => {
    const [userId,setUserId] = useState(sendToId)
    const [userName,setUserName] = useState(user?.name||(user.firstName.split(' ')[0]+' '+user.lastName.split(' ')[0]))
    const [lastWrite,setLastWrite] = useState(getTime(time))
    const [_text,setText] = useState(getText(text))
    const [profilePic,setProfilePic] = useState(image)
    function getTime(time){
        let timeArr = time.split('T')
        let newTime = timeArr[0]+' at '+timeArr[1].substring(0,5)
        return newTime;
    }

    function getText(text){
        console.log("Message: " + text)
        if(currentUser!==fromUserId){
            return '=> '+text
        }else{
            return 'You : '+text
        }
    }
    //console.log('User name : '+userName)
    //setCount((prev)=>prev+1)
const navToChats=()=>{
    navigation.push("Chats",{token:token,sendToId:userId,user:{user},name:userName,currentUser:currentUser,linkId:user?.linkId,profilePath:profilePath,image:profilePic})
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
                <Text
                    style={{
                        color:'#9BA5B7',
                        fontWeight:'500',
                        fontSize:14
                    }}
                >{lastWrite}</Text>
            </View>
            <View style={styles.bottomCont}>
                <Text
                               numberOfLines={1}
                               ellipsizeMode="tail"
                    style={{
                        color:'#545F71',
                        fontWeight:'500',
                        fontSize:14
                    }}
                >{_text}</Text>
                <View style={{height:20,width:20,borderRadius:100/2,backgroundColor:'#4285F4',display:'flex',justifyContent:'center',alignItems:'canter'}}>
                <Text
                    style={{
                        color:'#FFFFFF',
                        fontWeight:'500',
                        fontSize:14,
                        //padding:2,
                        alignSelf:'center',
                        
                    }}
                ></Text>
                </View>
            </View>
          </View>    
        </TouchableOpacity>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    display: 'flex',
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.08,
    alignItems:'center',
    //justifyContent: 'center',
    
   },compContainer:{
    width : FULL_WIDTH*0.985,
    height : '100%',
    display:'flex',
    flexDirection:'row',
    //alignItems: 'center',
    justifyContent:'space-evenly',
    
    //paddingHorizontal:3
    //backgroundColor:'red'
   },leftColumn:{
    display:'flex',
    width:'16%',
    height:'100%',   
    alignItems: 'center',
    justifyContent:'center',
    //backgroundColor:'red'
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
 