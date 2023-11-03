import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { ProgressBar, MD3Colors, TextInput, HelperText } from 'react-native-paper';
import Input from '../../components/Input';
import Menu from '../../components/menu';
import RegHeader from '../../components/regHeader';
import Stage from '../../components/stage';


const FULL_WIDTH = Dimensions.get('window').width;
const FULL_HEIGHT = Dimensions.get('window').height;
 const ChoosePassword = ({navigation,route}) => {
  let { registrationData } = route.params;

    const path = require('../../images/passwordIcon.png')
    const [password, setPassword] = useState('')
    const [progress, setProgress] = useState(0.0)
    const [pColor ,setPColor]= useState('#EA4335')
    const [char, setChar] = useState(false)
    const [lower,setLower]=useState(false)
    const [upper,setUpper]=useState(false)
    const [special, setSpecial]=useState(false)
    const [confirmPassword, setConfirmPassword]=useState('')
    const [location, setLocation] = useState('')
    const [accountType, setType] = useState(true)
    const [error,setError] = useState(false)

    const next =()=>{
        if(password==''||confirmPassword==''){
          setError(true)
          return;
        }
        registrationData.authUser.password = password.trim();
        navigation.push('ProfilePicture',{registrationData})
    }

    useEffect(() => {
      // Initialize progress based on the password length
      let updatedProgress = Math.max(0, password.length >= 8 ? 0.25 : 0);
      if(password.length > 8){
        setChar(true)
      }else{
        setChar(false)
      }
      // Check if password has uppercase letter
      if (password.match(/[A-Z]/)) {
        updatedProgress += 0.25;
        setUpper(true);
      } else {
        setUpper(false);
      }
    
      // Check if password has a number
      if (password.match(/[0-9]/)) {
        updatedProgress += 0.25;
        setLower(true);
      } else {
        setLower(false);
      }
    
      // Check if password contains special characters
      if (containsSpecialChars(password)) {
        updatedProgress += 0.25;
        setSpecial(true);
      } else {
        setSpecial(false);
      }
    
      // Update the progress
      setProgress(updatedProgress);

      if(updatedProgress<=0.25){
        setPColor("#EA4335")
      }else if(updatedProgress>0.25 && updatedProgress<=0.50){
        setPColor("#FBBC04")
      }else if(updatedProgress>0.50 && updatedProgress<=0.75){
        setPColor("#1A73E8")
      }else if(updatedProgress>0.75 ){
        setPColor("#34A853")
      }
    }, [password]);
    

  function containsSpecialChars(str) {
    const specialChars = `!@#$%&*`;
  
    const result = specialChars.split('').some(specialChar => {
      if (str.includes(specialChar)) {
        return true;
      }
  
      return false;
    });
  
    return result;
  }

  const hasErrors = () => {
    return confirmPassword!==password&&confirmPassword!=='';
  };

   return (
    <SafeAreaView style={styles.container}>
        <RegHeader step={4}/>
        <Stage heading="Choose Password" image={path}/>

        <View style={styles.textFieldContainer}>
             <View style={styles.passwordCont}>
             <HelperText type="error" visible={error}>
                  PLease fill all required fields!!
              </HelperText>

             <TextInput
              mode="outlined"
              label={"Password"}
              placeholder={"Password"}
              placeholderTextColor="#545F71"
              style={styles.textInput}
              onChangeText={setPassword}
              fontSize ={18}
              textColor="rgba(66, 133, 244, 1)"
              outlineColor="#545F71"
              activeOutlineColor="rgba(66, 133, 244, 1)"
              value={password}
              secureTextEntry={true}      
          />
              <ProgressBar progress={progress} style={{backgroundColor:'grey'}} color={pColor} />
             <View style={styles.strengthCont}>

                <View style={styles.prog}>
                  {!char?
                  <Image source={require('../../images/circle.png')}
                  style={{
                    width:15,
                    height:15,
                    marginRight:5
                  }}/>:
                  <Image source={require('../../images/check.png')}
                  style={{
                    width:15,
                    height:15,
                    marginRight:5
                  }}/>}
                  <Text style={{
                    color:char?"#1A73E8":'#BAC0CA',
                    fontSize:16,
                    fontWeight:'600'
                  }}>8 - 12 Characters</Text>
                </View>

                <View style={styles.prog}>
                  {!upper?
                  <Image source={require('../../images/circle.png')}
                  style={{
                    width:15,
                    height:15,
                    marginRight:5
                  }}/>:
                  <Image source={require('../../images/check.png')}
                  style={{
                    width:15,
                    height:15,
                    marginRight:5
                  }}/>}
                  <Text style={{
                    color:upper?"#1A73E8":'#BAC0CA',
                    fontSize:16,
                    fontWeight:'600'
                  }}>At least one capital letter</Text>
                </View>

                <View style={styles.prog}>
                  {!lower?
                  <Image source={require('../../images/circle.png')}
                  style={{
                    width:15,
                    height:15,
                    marginRight:5
                  }}/>:
                  <Image source={require('../../images/check.png')}
                  style={{
                    width:15,
                    height:15,
                    marginRight:5
                  }}/>}
                  <Text style={{
                    color:lower?"#1A73E8":'#BAC0CA',
                    fontSize:16,
                    fontWeight:'600'
                  }}>At least on number</Text>
                </View>

                <View style={styles.prog}>
                  {!special?
                  <Image source={require('../../images/circle.png')}
                  style={{
                    width:15,
                    height:15,
                    marginRight:5
                  }}/>:
                  <Image source={require('../../images/check.png')}
                  style={{
                    width:15,
                    height:15,
                    marginRight:5
                  }}/>}
                  <Text style={{
                    color:special?"#1A73E8":'#BAC0CA',
                    fontSize:16,
                    fontWeight:'600'
                  }}>At least one special character @#$%&</Text>
                </View>

             </View>

             <TextInput
              mode="outlined"
              label={"Confirm Password"}
              placeholder={"Confirm Password"}
              placeholderTextColor="#545F71"
              style={styles.textInput}
              onChangeText={setConfirmPassword}
              fontSize ={18}
              textColor="rgba(66, 133, 244, 1)"
              outlineColor="#545F71"
              activeOutlineColor="rgba(66, 133, 244, 1)"
              value={confirmPassword}
              secureTextEntry={true}      
          />
                <HelperText type="error" visible={hasErrors()}>
                  Password does not match!
              </HelperText>
             
             </View>
             
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
    display: 'flex',
    alignItems:'center',


   },footer:{
    width : '100%',
    height : '20%',
    display: 'flex',
    alignItems: 'flex-end',
    
   },passwordCont:{
    width:'100%',
    height:'30%',
    
   },textInput:{
    width:'100%',
    backgroundColor:'#FFFFFF',
    borderColor:'#545F71',
  },strengthCont:{
    display:'flex',
    padding:5,
    width:'100%',
    
  
  },prog:{
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
  },navButton:{
    width: '25%',
    height: '40%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

   }
 });
 
 export default ChoosePassword;
 