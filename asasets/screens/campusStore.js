/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   Image,
   TouchableOpacity,
   ScrollView,
   FlatList
 } from 'react-native';
import { HelperText } from 'react-native-paper';
import CampShop from '../components/campShop';
import HomeHeader from '../components/homeHeader';
import Loading from '../components/loading';
import SearchBar2 from '../components/searchBar2';
import SearchBar3 from '../components/searchBar3';
import {serverURL} from '../internet';


 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const CampusStore = ({token,gCart,socket,currentUser,profile}) => {
  let products =[
    {name: 'Mashimbyi Fast Food',path:require('../images/image.png'),location:'University of Pretoria',ratings:4.7},
    {name: 'Santa Chicken',path:require('../images/laptop.png'),location:'University of Western Cape',ratings:3.7},
    {name: 'King Kota',path:require('../images/image.png'),location:'Cape Peninsula Univerity of Technology',ratings:2.5},
    {name: 'Mashimbyi Fast Food',path:require('../images/image.png'),location:'University of Pretoria',ratings:4.7},
    {name: 'Santa Chicken',path:require('../images/laptop.png'),location:'University of Western Cape',ratings:3.7},
    {name: 'King Kota',path:require('../images/image.png'),location:'Cape Peninsula Univerity of Technology',ratings:2.5},
    {name: 'Mashimbyi Fast Food',path:require('../images/image.png'),location:'University of Pretoria',ratings:4.7},
    {name: 'Santa Chicken',path:require('../images/laptop.png'),location:'University of Western Cape',ratings:3.7},
    {name: 'King Kota',path:require('../images/image.png'),location:'Cape Peninsula Univerity of Technology',ratings:2.5},
    {name: 'Mashimbyi Fast Food',path:require('../images/image.png'),location:'University of Pretoria',ratings:4.7},
    {name: 'Santa Chicken',path:require('../images/laptop.png'),location:'University of Western Cape',ratings:3.7},
    {name: 'King Kota',path:require('../images/image.png'),location:'Cape Peninsula Univerity of Technology',ratings:2.5},
    {name: 'Mashimbyi Fast Food',path:require('../images/image.png'),location:'University of Pretoria',ratings:4.7},
    {name: 'Santa Chicken',path:require('../images/laptop.png'),location:'University of Western Cape',ratings:3.7},
    {name: 'King Kota',path:require('../images/image.png'),location:'Cape Peninsula Univerity of Technology',ratings:2.5},
  ]
  const [stores,setStores]=useState([])
  const [isLoading,setLoading] = useState(false)
  const [errorMessage,setErrorMassege] = useState('')
  const [error,setError] = useState(false)


  const onScreenFocus = useCallback(() => {
      loadProducts();
  }, []);

  // Use useFocusEffect to trigger the callback when the screen is focused
  useFocusEffect(onScreenFocus);
  
  async function loadProducts(){

    try {
      setLoading(true)
      //console.log(registrationData)
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.get(`${serverURL}/users/campusshops`, config);

      if(response.status==201){
        console.log('Response:', response.data);
        const newstores = response.data.stores || [];

        setStores(newstores)
        console.log(stores)
        //setGlobalCart(newCart)
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
   return (
    <SafeAreaView style={styles.container}>
        <View style={styles.TopSection}>
        <HomeHeader options={{bg:'rgba(84, 95, 113, 0.29)',
                                      textColor:'#545F71',
                                      tittle:'Campus Shop',
                                      cart:gCart?.length||0,
                                      messages:2,
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
                <Text style={styles.subTittle}>
                  Shop from your favourite on-campus stores.
                </Text>
                    <SearchBar3/>
                </View>

        </View>
        <View style={styles.Body}> 
   
            <View style={styles.products}>
            <HelperText type="error" visible={error}>
                  {errorMessage}
            </HelperText>
            <FlatList
                data={stores}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                renderItem={({ item }) => (
                  <CampShop options={item} token={token} currentUser={currentUser} />
                )}
                
              />
               
            </View>
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
   },
   TopSection:{
    width: FULL_WIDTH,
    height: FULL_HEIGHT*0.19,
    //marginTop:FULL_HEIGHT*0.005,
    paddingHorizontal : FULL_WIDTH *0.02,
    justifyContent:'space-around',
    shadowColor:'#333333',
  
   },
   Body:{
    width: FULL_WIDTH,
    height: FULL_HEIGHT*0.77,
    paddingHorizontal : FULL_WIDTH *0.025,
    paddingVertical : FULL_HEIGHT*0.01,
    
   },products:{
    width:'100%',
    height:'95%',
    /*display: 'flex',
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent:'space-around',*/
    alignItems: 'center',
  },subTittle:{
    color:'#545F71',
    fontSize:16,
    fontWeight:'800',
    paddingBottom:FULL_HEIGHT*0.015,
  }
 });
 
 export default CampusStore;
 