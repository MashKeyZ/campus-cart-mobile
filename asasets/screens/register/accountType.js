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
import Menu from '../../components/menu';
import RegHeader from '../../components/regHeader';
import Stage from '../../components/stage';


const FULL_WIDTH = Dimensions.get('window').width;
const FULL_HEIGHT = Dimensions.get('window').height;
 const AccountType = ({navigation,route}) =>{
    let { registrationData } = route.params;
    const path = require('../../images/at-sign.png')
    const [studenEmail, setStudentEmail] = useState('')
    const [shopName, setShopName] = useState('')
    const [location, setLocation] = useState('')
    const [accountType, setType] = useState(true)
    const [errorMessage,setErrorMassege] = useState('')
    const [error,setError] = useState(false)

    const next =()=>{
      if(accountType){
        if(studenEmail=='' || !studenEmail.includes('@') || !studenEmail.includes('.')){
          setError(true)
          setErrorMassege('Please provide a valid student email')
          return;
        }
        
      }else{
        if(location==''){
          setError(true)
          setErrorMassege('PLease choose a location')
          return;
        }else if(shopName==''){
          setError(true)
          setErrorMassege('PLease fill all required fields')
          return;
        } 
      }
      
      registrationData.userProfile.isStudent = accountType
      registrationData.campusStore.name = shopName.trim()
      registrationData.userProfile.studentEmail = studenEmail.trim().toLocaleLowerCase()

      navigation.push('ChoosePassword',{registrationData})
    }

   return (
    <SafeAreaView style={styles.container}>
        <RegHeader step={3}/>
        <Stage heading="Account Type" image={path}/>

        <View style={styles.textFieldContainer}>
             <Menu setType={setType} type={accountType}/>
             <HelperText type="error" visible={error}>
                  {errorMessage}
              </HelperText>
            {accountType?
            <Input required={true} name="Student Email" text={studenEmail} setText={setStudentEmail}/> :
            <Input required={false} name="Shop Name" text={shopName} setText={setShopName}/>
          }

        {accountType?'':
          <TouchableOpacity style={styles.button}>
          <Image 
            source={require('../../images/location.png')}
            style={{
              width:30,
              height:30,
              tintColor:'#FFFFFF'
            }}/>
            <Text style={{
              fontSize:18,
              fontWeight:'600',
              color:'#FFFFFF',
            }}>
              Get Location
            </Text>
        </TouchableOpacity>
        }
        
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

   },button:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1A73E8',
    height:55,
    width:"45%",
    borderRadius:15,
    alignSelf:'center'

   }
 });
 
 export default AccountType;
 