/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import axios from 'axios';
import React,{useState} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   Image,
   TouchableOpacity,
   TextInput
 } from 'react-native';
import Loading from '../components/loading';
//import io from 'socket.io-client';
import socket from '../socket';
import {serverURL} from '../internet';
 
 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;

 const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logInError,setLogInError] = useState('');
  const [isLoading,setLoading] = useState(false);


  const navigateToRegister =()=>{
    navigation.push("PersonalDetails")
  }

  const sendData = async () => {

    if(email ==='' || password ===''){
      setLogInError('Please fill all fields.')
      return;
    }

    if(!email.includes('@')||!email.includes('.')){
      setLogInError('Enter a valid email address')
      return;
    }
    
    
    try {
      setLoading(true)
      const response = await axios.post(`${serverURL}/users/login`, {

          email:email.trim().toLocaleLowerCase(),
          password:password.trim(),

      });
      console.log('Sending')

      if(response.data.status=="Ok"){
        const config = {
          headers: {
            'Authorization': `Bearer ${response.data.token}`
          }
        };
        const resp = await axios.get(`${serverURL}/products/`, config);
        const updatedProducts = resp.data.products || [];
        const newCart = resp.data.cart || [];
        //const socket =  io('https://f29b-105-233-33-110.ngrok-free.app');

        // To send a message
        socket.emit('authenticate', response.data.token);

        // To receive a message
        socket.on('newuser', (message) => {
          console.log('Received message from server:', message);
          //socket.emit('authenticate', response.data.token);
        });
        let gCart = newCart.filter((item)=>item===null )
        navigation.navigate('HomeTabs',{token:response.data.token,gProducts:updatedProducts,gCart:gCart,socket:' socket',currentUser:response.data.userId,profile:response.data.profile})
      }else{
       
        setLogInError("Invalid Input")
      }
      

      
    } catch (error) {
      
      console.error('Error:', error);
    }finally{
      setLoading(false)
    }
  };

   return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
          <Image 
          source={require(('../images/logo.png'))}
          style={{
            width: '50%',
          }}
          resizeMode="contain"
          />
      </View>
      <View style={styles.body}>

        <View style={styles.inputContainer}>
        <Image
          source={require('../images/at-sign.png')}
          style={{
            width:24,
            height:24,
            position: 'absolute',
            left:5
          }}
          />


        <TextInput
        
        placeholder="Email"
        placeholderTextColor="#545F71"
        style={styles.textInput}
        onChangeText={setEmail}
        fontSize ={18}
        color="#545F71"
        value={email}
        />
        </View>

        <View style={styles.inputContainer}>
        <Image
          source={require('../images/passwordIcon.png')}
          style={{
            width:24,
            height:25,
            position: 'absolute',
            left:5,
            bottom: 27
          }}
          />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#545F71"
          style={styles.textInput}
          onChangeText={setPassword}
          fontSize ={18}
          color="#545F71"
          value={password}
          secureTextEntry={true}
        />
          <Text style={{color:'red',fontSize:12}}>
            {logInError}
          </Text>
        </View>

      </View>
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={sendData}>
            <Text
              style={{
                color:"#FFFFFF",
                fontSize: 20,
                fontWeight:'500',

              }}
              >Log In</Text>
          </TouchableOpacity>
      
      
      <View style={styles.dividerCont}>

        <View style={styles.divider}>

        </View>
        <Text style={{
          fontSize:12,
          fontWeight:'600',
          padding:8,
          backgroundColor:'#FFFFFF',
          position:'absolute',
          color:'#545F71',
          zIndex:10
        }}>
          Do not have an account?
        </Text>
      </View>

      <TouchableOpacity style={styles.button2} onPress={navigateToRegister}>
            <Text
              style={{
                color:'#545F71',
                fontSize: 20,
                fontWeight:'500',

              }}
              >Sign Up</Text>
          </TouchableOpacity>
      </View>  
      <Loading state={isLoading}/>       
    </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    flex:1,
    width : '100%',
    height : '100%',
    backgroundColor:'#FFFFFF',
   },header:{
    width: '100%',
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   },body:{
    width: '100%',
    height: '28%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
    
   },footer:{
    width: '100%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'red'
    
   },button:{
    backgroundColor:'#545F71',
    width: FULL_WIDTH*0.7,
    height: FULL_HEIGHT*0.065,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30
   },textInput:{
    width:'100%',
    borderBottomWidth:1,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'#2C2C4C',
    padding:10,
    textAlign: 'center',
   },inputContainer:{
    width:'80%',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
   },dividerCont:{
    width:'80%',
    height:'25%',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
   },divider:{
    width:FULL_WIDTH*0.7,
    height:1,
    backgroundColor:'#2C2C4C'
   },button2:{
    backgroundColor:'#FFFFFF',
    width: FULL_WIDTH*0.7,
    height: FULL_HEIGHT*0.065,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    borderWidth:2,
    borderColor: '#545F71',
   }
 });
 
 export default Login;
 