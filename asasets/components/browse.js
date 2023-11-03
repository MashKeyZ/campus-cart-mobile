/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { useNavigation } from '@react-navigation/native';
import React from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   Image,
   TouchableOpacity
 } from 'react-native';


 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const Browse = ({currentUser,token}) => {
  const navigation = useNavigation();
  const navToOrders=()=>{
      navigation.navigate('TrackOrders',{token:token,currentUser:currentUser})
  }
   return (
    <View style={styles.container}>
        <View style={styles.tittleCont}>
            <Text style={styles.tittle}>Explore</Text>
            <View style={styles.gridContainer}>
              <View style={styles.row}>
                <TouchableOpacity style={styles.item}>
                    <Image style={{ width:24,height:24}} source={require('../images/book.png')}/>
                    <Text style={styles.textItem}>Text Books</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Image style={{ width:24,height:24}} source={require('../images/game.png')}/>
                    <Text style={styles.textItem}>Electronics</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.item}>
                    <Image style={{ width:24,height:24}} source={require('../images/compass.png')}/>
                    <Text style={styles.textItem}>Stationary</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Image style={{ width:24,height:24}} source={require('../images/clothing.png')}/>
                    <Text style={styles.textItem}>Clothing</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.item} onPress={navToOrders}>
                    <Image style={{ width:24,height:24}} source={require('../images/promo.png')}/>
                    <Text style={styles.textItem}>Track Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Image style={{ width:24,height:24}} source={require('../images/cash.png')}/>
                    <Text style={styles.textItem}>Promotions</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    width : '100%',
    height : '55%',
    //backgroundColor:'lightblue'
    //paddingHorizontal : FULL_WIDTH *0.02,
    paddingHorizontal: 8,
   },tittleCont:{
    width : '100%',
    height :'100%',
    
   },tittle:{
    fontSize:16,
    fontWeight:'800',
    color: '#545F71',
    marginBottom:5,
   },  gridContainer: {
    flexDirection: 'column', // Arrange items in rows
    //flexWrap: 'wrap',     // Wrap items to the next row when necessary
    //justifyContent: '', // Space evenly between columns
    height:'95%',
  },item:{
    backgroundColor:'#545F71',
    width: '45%',
    height:"100%",
    borderRadius: 15,
    marginBottom:"7%",

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    
    elevation: 8,

    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },textItem:{
    fontSize: 16,
    fontWeight:'500',
    color:'#FFFFFF'
  },icon:{
    width:20,
    height:20,
    tintColor:'#FFFFFF',
  },row:{
    height:"21%",
    width:"100%",
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:'8%',
  }
 });
 
 export default Browse;
 