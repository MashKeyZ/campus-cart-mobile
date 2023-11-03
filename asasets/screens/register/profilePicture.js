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
import ImagePicker from 'react-native-image-crop-picker';
import Loading from '../../components/loading';
import axios from 'axios';


const FULL_WIDTH = Dimensions.get('window').width;
const FULL_HEIGHT = Dimensions.get('window').height;
 const ProfilePicture = ({navigation,route}) => {
  let { registrationData } = route.params;
    const path = require('../../images/image.png')
    const [imagePath, setImagePath] = useState('')
    const [isLoading,setLoading] = useState(false)
    const [errorMessage,setErrorMassege] = useState('')
    const [error,setError] = useState(false)




    const next =async()=>{
      if(imagePath==''){
        setErrorMassege('Please upload a profile picture')
        setError(true)
        return
      }
      registrationData.userProfile.image= imagePath
      try {
        setLoading(true)
        console.log(registrationData)
        const response = await axios.post('https://2ef5-105-233-33-110.ngrok-free.app/users/signup', {
          registrationData
        });
        console.log(response)

        if(response.status==201){
          console.log('Response:', response.data);
          console.log("navigate")
          navigation.replace('Login',{token:response.data.token})
        }else if(response.status==500){
          console.log("Failed "+response.data)
          setErrorMassege('An error occured while creating user, please try again try again')
          setError(true)
        }else{
          setErrorMassege('An error occured while creating user, please try again try again')
          setError(true)
          console.log("Error "+response.data)
        }
        
      } catch (error) {
        setErrorMassege('An error occured while creating user, please try again try again')
        setError(true)
        
        console.error('Error:', error);
      }finally{
        setLoading(false)
      }


        //navigation.push('Login')
    }

    const selectPicture = () => {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
      })
        .then((image) => {
          console.log(image.path);
          return uploadImageToServer(image.path); // Return the promise chain here
        })
        .then((res) => {
          console.log(res)
         
          setImagePath(res.imageUrl); // Assuming the image URL is returned in the response
          
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    
    const uploadImageToServer = async (path) => {
      const formData = new FormData();
      formData.append('image', {
        uri: path,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });
    
      setLoading(true);
    
      try {
        const response = await axios.post('https://2ef5-105-233-33-110.ngrok-free.app/upload/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log('Image uploaded successfully:', response.data);
        return response.data; // Return the response for the next promise chain
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Throw the error to be caught in the next .catch()
      }
    };
    

  

   return (
    <SafeAreaView style={styles.container}>
        <RegHeader step={5}/>
        <Stage heading="Profile Picture" image={path}/>

        <View style={styles.textFieldContainer}>
            <HelperText type="error" visible={error}>
                  {errorMessage}
            </HelperText>
          {
            imagePath==''?
          
          <TouchableOpacity style={styles.pContainer} onPress={selectPicture}>

          <Image
              source={require('../../images/pick-image.png')}
              style={{
                    width:50,
                    height:50,
                    }}
          />
            <Text style={{color:"#545F71",fontWeight:'700',fontSize:12}}>
              Pick Image
            </Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.pContainer} onPress={selectPicture}>

          <Image
              source={{uri:imagePath}}
              style={{
                    width:'100%',
                    height:'100%',
                    borderRadius:100/2
                    }}
              resizeMode = 'contain'
          />
          </TouchableOpacity>
          }

          <Text style={{color:"#545F71",fontWeight:'700',fontSize:18}}>
              Vutlhari Mashimbyi
          </Text>

        </View>
        <View style={styles.footer}>
            <TouchableOpacity style={styles.navButton} onPress={next}>
                <Text style={{
                    color:'#FFFFFF',
                    fontSize:30,
                    fontWeight:'500'
                }}>
                    Done
                </Text>
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
    height : '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

   },footer:{
    width : '100%',
    height : '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
   },navButton:{
    width: '75%',
    height: '35%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor:'#545F71',
    borderRadius:20

   },pContainer:{
    width: FULL_WIDTH * 0.25,
    height: FULL_HEIGHT*0.121,
    borderRadius:100/2,
    borderWidth:1.5,
    borderColor:"#545F71",
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:17,
    
   }
 });
 
 export default ProfilePicture;
 