/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React,{useState,useEffect,useCallback} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableOpacity,
   Image,
   FlatList,
   Modal
 } from 'react-native';
import { HelperText } from 'react-native-paper';
import CartComponent from '../components/cartComponent';
import ChatComponent from '../components/chatComponent';
import ChatComponent2 from '../components/chatComponent2';
import Loading from '../components/loading';
import socket from '../socket';
import {serverURL} from '../internet';

 const FULL_WIDTH = Dimensions.get('window').width;
 const FULL_HEIGHT = Dimensions.get('window').height;

 const Inbox = ({navigation,route}) => {
    const token = route.params?.token;
    //const socket = route.params?.socket;
    const currentUser = route.params?.currentUser;
    const profilePath = route.params?.profilePath;
    const [usersList,setUserList]= useState([])
    const [totalPrice,setTotalPrice]= useState(0)
    const [errorMessage,setErrorMassege] = useState('')
    const [error,setError] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const [channels,setChannels] = useState([])
    const [openModal,setOpenModal] =useState(false)

    const goBack=()=>{
        navigation.goBack()
    }
    // This callback will be invoked when the screen is focused
    //When a new message is comes from the socket then update the comm channels bypulling from server
  const onScreenFocus = useCallback(() => {
    loadAllChats() // Call your fetch function
  }, [loadAllChats]);

  // Use useFocusEffect to trigger the callback when the screen is focused
  useFocusEffect(onScreenFocus);

  /**
   * Recieve new message notification
   * FIlter the list of channels using the user 
   * of the recieved message
   * push the message notification
   * update the bumber of unread messages
   * increament the number of unread messages for notications
   * now set the channels list with the new list.
   * when you open the message
   * first set the number of unread messages for that channel to 0
   */


   const loadAllChats= async()=>{

        try {
          setLoading(true)
          //console.log(registrationData)
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          const response = await axios.get(`${serverURL}/channels`, config);
    
          if(response.status==201){
            //console.log('Response:', response.data);
            const newChannels = response.data.channels || [];
            console.log(newChannels)
            setChannels(newChannels)
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
      }
      const loadUsers= async()=>{

        try {
          setLoading(true)
          //console.log(registrationData)
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          const response = await axios.get(`${serverURL}/users/userchannels`, config);
    
          if(response.status==201){
            //console.log('Response:', response.data);
            const newChannels = response.data.channels || [];
            
            setUserList(newChannels)
            setError(false)
            setOpenModal(true)
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
      }
   return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer} >
            <TouchableOpacity onPress={goBack} style={{
                width:40,
                height:40,
                backgroundColor:'#FFFFFF',
                borderRadius:100/2,
                alignItems: 'center',
                justifyContent: 'center',
                elevation:8
            }}>
            <Image
                source={require('../images/back.png')}
                style={{
                    width:25,
                    height:25,
                }}
            />
            </TouchableOpacity>
            <View style={styles.tittleContainer}>
                <Text style={styles.tittleText}>
                   Chats,
                </Text>
            </View>
        </View>

        <View style={styles.bodyContainer}>
        
        <HelperText type="error" visible={error}>
                  {errorMessage}
            </HelperText>

            <FlatList
                data={channels}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item,index }) => (
                  <ChatComponent navigation={navigation} image={item.image} fromUserId={item.fromUserId} text={item._text} time={item.lastWrite} token={token} sendToId={item.userId} user={item} currentUser={currentUser} socket={socket} profilePath={profilePath} />
                )}
                />

                
        </View>
        <View style={styles.footerContainer} >
                <TouchableOpacity onPress={loadUsers} style={{
                    width:50,
                    height:50,
                    backgroundColor:'#4285F4',
                    borderRadius:100/2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation:8
                }}>
                <Text style={{
                    fontSize:30,
                    fontWeight:'500',
                    color:'#545F71'
                }}>
                    <Image
                        source={require('../images/PlusMathnav.png')}
                        style={{
                            width:30,
                            height:30,
                            tintColor:'#FFFFFF'
                        }}
                    />
                </Text>
                </TouchableOpacity>
            </View> 
        <Modal 
             visible={openModal} 
             animationType="slide"
             transparent={true}
        >   
          <View style={styles.modalView}>
          <View style={styles.headerContainerModal} >
                <TouchableOpacity onPress={()=>setOpenModal(false)} style={{
                    width:40,
                    height:40,
                    backgroundColor:'#FFFFFF',
                    borderRadius:100/2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation:8
                }}>
                <Text style={{
                    fontSize:24,
                    fontWeight:'bold',
                    color:'#545F71'
                }}>
                    X
                </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.modalContentContainer}>
              <FlatList
                data={usersList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item,index }) => (
                  <ChatComponent2 navigation={navigation} image={item.image} token={token} sendToId={item.userId} user={item} currentUser={currentUser} socket={socket} setOpenModal={setOpenModal} profilePath={profilePath}/>
                )}
                />
            </View>
          </View>
         
        </Modal>

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
   },tittleContainer:{
    width:'50%',
    height:'100%',
    paddingHorizontal:10,
    justifyContent:'center'
   },tittleText:{
    fontSize:32,
    fontWeight:'500',
    color:'#545F71',
   },bodyContainer:{
    width:FULL_WIDTH,
    height:FULL_HEIGHT*0.899,
    display: 'flex',
    alignItems: 'center',
    paddingVertical:FULL_HEIGHT*0.008,
   },modalView:{
    display: 'flex',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
   },modalContentContainer:{
    width:FULL_WIDTH*0.85,
    height:FULL_HEIGHT*0.70,
    display: 'flex',
    alignItems: 'center',
    //paddingVertical:FULL_HEIGHT*0.02,
    ///paddingHorizontal:FULL_HEIGHT*0.02,
    backgroundColor:'#FFFFFF',
    elevation:8,
    borderRadius:15
   },headerContainerModal:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.075,
    display:'flex',
    justifyContent: 'center',
    paddingHorizontal:FULL_WIDTH*0.02,
    position:'absolute',
    zIndex:5,
    top:FULL_HEIGHT*0.1
   },footerContainer:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.075,
    display:'flex',
    justifyContent: 'center',
    alignItems:'flex-end',
    paddingHorizontal:FULL_WIDTH*0.02,
    position:'absolute',
    zIndex:1,
    //top:FULL_HEIGHT *0.95,
    bottom:10
   }
});
 
 export default Inbox;
 