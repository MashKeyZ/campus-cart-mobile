import axios from 'axios';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { HelperText } from 'react-native-paper';
import Input from '../../components/Input';
import Loading from '../../components/loading';
import RegHeader from '../../components/regHeader';
import Stage from '../../components/stage';
import {serverURL} from '../../internet';


const FULL_WIDTH = Dimensions.get('window').width;
const FULL_HEIGHT = Dimensions.get('window').height;

let registrationData ={
    userProfile:{
        firstName:'',
        lastName:"", 
        email:"", 
        studentEmail:"", 
        phoneNumber:"", 
        isStudent:false,
        isVerified:false,
        image:'',
    },address:{
        university:'',
        city:'',
        campus:'',
        location:'',
        residenceName:''
    },campusStore:{
        name:''
    },authUser:{
        password:''
    }
}
 const PersonalDetails = ({navigation}) => {
    const path = require('../../images/user.png')
    const [firstName,setFirstName] =useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [contact,setContact] = useState('')
    const [errorMassege,setErrorMassege] = useState('')
    const [error,setError] = useState(false)
    const [isLoading,setLoading] = useState(false);

    const next =()=>{
        if(firstName==''||lastName==''||email==''|| contact==''){
            setErrorMassege("Please fill all required fields.")
            setError(true)

            return;
        }
        if(!email.includes('@') || !email.includes('.')){
            setError(true)
            setErrorMassege('Please enter a valid email address')
            return;
          }

        if(contact!==''){
            const regex = /^0[678][0-9]{8}$/;
            if(!regex.test(contact)){
                setError(true)
                setErrorMassege('Enter a valid phone number')
                return; 
            }
        }
        registrationData.userProfile.firstName = firstName.trim();
        registrationData.userProfile.lastName = lastName.trim();
        registrationData.userProfile.email = email.trim().toLocaleLowerCase();
        registrationData.userProfile.phoneNumber = contact.trim();
        
        //navigation.push('Address',{registrationData})
        sendData()
    }

    async function sendData(){
        try {
          setLoading(true)
          const response = await axios.post(`${serverURL}/users/signup/userexist`, {
    
              email:email.trim().toLocaleLowerCase(),
              contact:contact.trim()
          });
          console.log('Sending')
          console.log(response)
          if(response.status===201){
            
            navigation.push('Address',{registrationData})
          }else if(response.status===200){
            console.log(response)
            setError(true)
            setErrorMassege(response.data.message)
            return;
          }
 
        } catch (error) {
          
          console.error('Error:', error);
        }finally{
          setLoading(false)
        }
      };

   return (
    <SafeAreaView style={styles.container}>
        <RegHeader step={1}/>
        <Stage heading="Personal Details" image={path}/>

        <View style={styles.textFieldContainer}>
            <HelperText type="error" visible={error}>
                  {errorMassege}
            </HelperText>
            <Input required={true} maxLength={100} name="First Name" text={firstName} setText={setFirstName}/>
            <Input required={true} maxLength={100} name="Last Name" text={lastName} setText={setLastName}/>
            <Input required={true} maxLength={100} name="Email" text={email} setText={setEmail}/>
            <Input required={true} maxLength={10} name="Cell Phone" text={contact} setText={setContact}/>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity style={styles.navButton} onPress={next}>
                <Text style={{
                    color:'#545F71',
                    fontSize:20,
                    fontWeight:'500'
                }}>
                    next
                </Text>
                <Image
                    source={require('../../images/enter.png')}
                    style={{
                        width:30,
                        height:30,
                    }}
                />
              
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
    paddingHorizontal:FULL_WIDTH*0.015,
    paddingVertical:FULL_WIDTH*0.01
   },textFieldContainer:{
    width : '100%',
    height : '75%',

   },footer:{
    width : '100%',
    height : '20%',
    display: 'flex',
    alignItems: 'flex-end',
    
   },navButton:{
    width: '25%',
    height: '40%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

   }
 });
 
 export default PersonalDetails;
 