/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableWithoutFeedback
 } from 'react-native';
 import { useNavigation, useRoute } from '@react-navigation/native';
import BodyTop from '../components/bodyTop';
import Browse from '../components/browse';
import HomeHeader from '../components/homeHeader'
import SearchBar from '../components/searchBar';

 
 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const Home = ({token,gCart,socket,currentUser,profile}) => {
  //const token = route.params?.token;
  console.log(`Toket : ${token}`)
  const navigation = useNavigation();

  const handleTextInputClick = () => {
    // Navigate to the OtherScreen
    console.log("Navigate")
    navigation.navigate('MarketPlace');
  };
   return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.backGround}>
            <View style={styles.TopSection}>
                <HomeHeader options={{bg:'rgba(217, 217, 217, 0.1)',
                                      textColor:'#FFFFFF',
                                      tittle:'Campus Cart',
                                      cart:gCart?.length||0,
                                      messages:5,
                                      Notifications:3,
                                      token:token,
                                      socket:socket,
                                      currentUser:currentUser,
                                      profile:profile
                                      }}/>
                <View style={{    width:'100%',
                                height:'50%',
                                display: 'flex',
                                justifyContent: 'center',
                                }}>
                     <TouchableWithoutFeedback onPress={handleTextInputClick}>
                    <SearchBar handleTextInputClick={handleTextInputClick}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.Body}>
                <BodyTop options={profile} token={token} currentUser={currentUser}/>
                <Browse options={profile} token={token} currentUser={currentUser}/>
            </View>
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
   },backGround:{
     height: FULL_HEIGHT,
     width: FULL_WIDTH,
     backgroundColor:'#545F71',
   },
   TopSection:{
    width: FULL_WIDTH,
    height: FULL_HEIGHT*0.18,
    //marginTop:FULL_HEIGHT*0.005,
    paddingHorizontal : FULL_WIDTH *0.02,
    justifyContent:'space-around'
   },
   Body:{
    width: FULL_WIDTH,
    height: FULL_HEIGHT*0.77,
    borderTopRightRadius:50,
    borderTopLeftRadius :50,

    backgroundColor :'#FFFFFF',
    paddingHorizontal : FULL_WIDTH *0.02,
    display: 'flex',
    justifyContent : 'space-around',
    paddingTop:FULL_HEIGHT *0.01
   },
 });
 
 export default Home;
 