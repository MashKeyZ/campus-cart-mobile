/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import axios from 'axios';
import React,{useState,useEffect, useRef} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableOpacity,
   Image,
   FlatList,
   TextInput
 } from 'react-native';
import { HelperText } from 'react-native-paper';
import CartComponent from '../components/cartComponent';
import ChatComponent from '../components/chatComponent';
import Loading from '../components/loading';
import MessageComponent from '../components/messageComponent';
//import io from 'socket.io-client';
import socket from '../socket';
import {serverURL} from '../internet';

 const FULL_WIDTH = Dimensions.get('window').width;
 const FULL_HEIGHT = Dimensions.get('window').height;

 const Chats = ({navigation,route}) => {
    //console.log(user)
    //const socket =  io('https://f29b-105-233-33-110.ngrok-free.app');
    const token = route.params?.token
    const name = route.params?.name;
    const currentUser = route.params?.currentUser;
    const sendToId = route.params?.sendToId;
    const comLink = route.params?.linkId||'';
    const profilePath = route.params?.profilePath;
    console.log("My profile : "+profilePath)
    const image = route.params?.image;
    const ws = useRef(null);
    const flatListRef = useRef(null);
    const [products,setProducts]= useState([])
    const [totalPrice,setTotalPrice]= useState(0)
    const [errorMessage,setErrorMassege] = useState('')
    const [error,setError] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const [inputMessage,setInputMessage] = useState('')
    const [linkId,setLinkId] = useState(comLink)
    const [messages,setMessages] = useState([])
    /**
     *  {fromServer:true,text:'Hello,', time:'12-02-2023 at 21:36pm'},
        {fromServer:false,text:'Hello, \nHow are you sir?', time:'12-02-2023 at 21:40pm'},
        {fromServer:true,text:'I am very fine thank you, how are you?', time:'12-02-2023 at 21:41pm'},
        {fromServer:false,text:'I am doing well.\nHow is the weather in Cape Town', time:'12-02-2023 at 21:44pm'},
        {fromServer:true,text:'It was a bit cold today, but you know i like it when it is cold.', time:'12-02-2023 at 21:46pm'},
        {fromServer:true,text:'How about that side?', time:'12-02-2023 at 21:50pm'},
        {fromServer:false,text:'Well it is hot as usual, hahaha', time:'12-02-2023 at 21:51pm'},
        {fromServer:true,text:'Yaa, these things happen', time:'12-02-2023 at 21:55pm'},
    
     */
    const goBack=()=>{
        navigation.pop()
    }

    //let socket;

    useEffect(() => {
      // Initialize and connect to the socket server
      //socket = io('https://f29b-105-233-33-110.ngrok-free.app');
  
      // Event handler for 'authenticate' event
      socket.on('message', (resp) => {
        console.log('Received message from server:', resp);
        let newMessage = JSON.parse(resp)
        newMessage.fromServer = true;
        /*const parsedTime = JSON.parse(resp.time);
        const parsedSendToId = JSON.parse(resp.sendTo);
        const parsedText = JSON.parse(resp.text);
        const text ={fromServer:true,text:parsedText,time:parsedTime}*/
        if(newMessage.linkId === linkId){
          setMessages(data=>[...data,newMessage])
        }
        
        // Assuming response.data.token is accessible here
        //socket.emit('authenticate', response.data.token);
      });
  
      // Clean up the socket connection when the component unmounts
    
    }, []);



    useEffect(()=>{
        loadAllChats()
    },[])

    async function loadAllChats(){

        try {
          setLoading(true)
          //console.log(registrationData)
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          const response = await axios.post(`${serverURL}/channels/chats`,
          {data:{
            linkId:linkId,
            user_1_id: currentUser,
            user_2_id: sendToId,
          }} 
          ,config);
    
          if(response.status==201){
            //console.log('Response:', response.data);
            const updatedMessages = response.data?.messages || [];
            const newLinkId = response.data?.linkId;
            if(newLinkId) setLinkId(newLinkId)
            
            setMessages(updatedMessages.reverse())
            setError(false)
          }else if(response.status==500){
            setErrorMassege('An error occured, please try again try again')
            setError(true)
          }else if(response.status==401){
            setErrorMassege('Un authorized')
            setError(true)}
            else{
            setErrorMassege('An error occured, please try again try again')
            setError(true)
            console.log("Error "+response.data)
          }
          
        } catch (error) {
          setErrorMassege('An error occured, please try again try again')
          setError(true)
          
          console.error('Error:', error);
        }finally{
          setLoading(false)
        }
       //navigation.push('Login')
      }

      const sendMessage = ()=> {
        if(inputMessage==='') return;
        
        console.log('Sending message : '+inputMessage)
              // Get the current date and time
        const currentDate = new Date();
        
        // Format the date and time
        const formattedDateTime = formatDateTime(currentDate);
        const text ={linkId:linkId,sendTo:sendToId,fromServer:false,_text:inputMessage,_time:formattedDateTime,fromUserId:currentUser}
        console.log('sending : ' + sendToId)
        socket.emit('message',JSON.stringify(text))
        
        setMessages(data=>[...data,text])
       // flatListRef.current.scrollToEnd({animated: true});
        setInputMessage('')
      };

      function formatDateTime(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        let hours = date.getHours();
        const amOrPm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12;  // Convert 24-hour to 12-hour format
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${day}-${month}-${year} at ${hours}:${minutes}${amOrPm}`;
      }
      
   return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer} >
            <TouchableOpacity onPress={goBack} style={{
                width:'20%',
                height:40,
                backgroundColor:'#FFFFFF',
                borderRadius:100/2,
                display:'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                elevation:5
            }}>
            <Image
                source={require('../images/back.png')}
                style={{
                    width:25,
                    height:25,
                }}
            />
             <View style={styles.imageContainer}>
            <Image
                    source={{uri:image}} // Replace with the actual image path
                    style={{
                    width: 40,
                    height: 40,
                    //tintColor:'#FFFFFF',
                    borderRadius:100/2
                    }}
                    resizeMode="contain" // Adjust the resizeMode based on your requirement
                />
            </View>
            </TouchableOpacity>
            <View style={styles.tittleContainer}>
                <Text style={styles.tittleText}>
                   {name}
                </Text>
                <Text style={styles.statusText}>
                   Online
                </Text>
            </View>
        </View>

        <View style={styles.bodyContainer}>
                <FlatList
                renderItem={({item}) =><MessageComponent item={item}image={image} currentUser={currentUser}from={item.fromUserId} time={item._time} text={item._text} profilePath={profilePath}token={token} navigation={navigation}/>}
                data={messages}
                keyExtractor={(item,i)=>i}
                style={styles.scroll}
                ref={flatListRef}
                onContentSizeChange={() => {
                flatListRef.current.scrollToEnd({animated: true});
                }}
                keyboardShouldPersistTaps="always"
            />
            {/*</View>*/}
            <View style={styles.foorterContainer}>
            <TextInput
                placeholder="Type a message..."
                placeholderTextColor="#545F71"
                style={styles.textInput}
                onChangeText={setInputMessage}
                fontSize ={16}
                color="#545F71"
                value={inputMessage}
                multiline={true}
                />
            <TouchableOpacity style={{
                        width:50,
                        height:50,
                        borderRadius:100/2,
                        backgroundColor:'rgba(84, 95, 113, 0.29)',
                        alignItems: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    //onPress={navToInbox}
                    onPress={sendMessage}
                    >
                        <Image style={{width:32,
                                       height:32, 
                                       tintColor:'#545F71'}} 
                                       source={require('../images/Icontop-1.png')}/>
                    </TouchableOpacity>
            </View>  
        </View>

        <Loading state={isLoading}/>
    </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    flex:1,
    width : FULL_WIDTH,
    height : FULL_HEIGHT,
    backgroundColor:'#FFFFFF',
   },headerContainer:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.07,
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    paddingHorizontal:FULL_WIDTH*0.02,
    elevation:8,
    backgroundColor:'#FFFFFF',
    position:'relative',
    top:3,
    zIndex:10
   },tittleContainer:{
    width:'80%',
    height:'100%',
    paddingHorizontal:10,
    justifyContent:'center',
    //backgroundColor:'red'
   },tittleText:{
    fontSize:20,
    fontWeight:'500',
    color:'#545F71',
   },statusText:{
    fontSize:16,
    fontWeight:'500',
    color:'#9BA5B7',
   },bodyContainer:{
    width:FULL_WIDTH,
    height:FULL_HEIGHT*0.899,
    display: 'flex',
    alignItems: 'center',
    paddingVertical:FULL_HEIGHT*0.008,
   },imageContainer:{
    display:'flex',
    width:40,
    height:40,   
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#9BA5B7',
    borderRadius:100/2
   },scroll:{
    maxHeight:FULL_HEIGHT*0.8,
    width:'100%',
  },messageListContainer:{
    width:'100%',
    maxHeight:FULL_HEIGHT*0.8,
    backgroundColor:'red',
  },
  foorterContainer:{
    width:'100%',
    height:FULL_HEIGHT*0.08,
    //backgroundColor:'blue',
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },textInput:{
    width:'80%',
    maxHeight:'100%',
    borderWidth:1,
    borderColor:'#545F71',
    borderRadius:100/2,
    backgroundColor:'#FFFFFF',
    paddingHorizontal:20
  }
 });
 
 export default Chats;
 