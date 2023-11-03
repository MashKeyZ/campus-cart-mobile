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
import Input from '../../components/Input';
import RegHeader from '../../components/regHeader';
import Stage from '../../components/stage';
import { HelperText } from 'react-native-paper';


const FULL_WIDTH = Dimensions.get('window').width;
const FULL_HEIGHT = Dimensions.get('window').height;

const Address = ({navigation,route}) => {
    let { registrationData } = route.params;
    const path = require('../../images/location.png')
    const [university, setUniversity]= useState('')
    const [campus,setCampus] = useState('')
    const [city, setCity] = useState('')
    const [residence, setResidence] = useState('')
    const [errorMassege,setErrorMassege] = useState('')
    const [error,setError] = useState(false)

    const next =()=>{
        if(university ==''||campus==''||city==''){
            setErrorMassege("Please fill all required fields.")
            setError(true)

            return;            
        }

        registrationData.address.university = university.trim();
        registrationData.address.campus =campus.trim();
        registrationData.address.city = city.trim();
        registrationData.address.residenceName = residence.trim();

        navigation.push('AccountType',{ registrationData })
    }

   return (
    <SafeAreaView style={styles.container}>
        <RegHeader step={2}/>
        <Stage heading="Address" image={path}/>

        <View style={styles.textFieldContainer}>
        <HelperText type="error" visible={error}>
                  {errorMassege}
            </HelperText>
            <Input required={true} name="University" text={university} setText={setUniversity}/>
            <Input required={true} name="Campus" text={campus} setText={setCampus}/>
            <Input required={true} name="City" text={city} setText={setCity}/>
            <Input required={false} name="Student Residence" text={residence} setText={setResidence}/>
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

   }
 });
 
 export default Address;
 