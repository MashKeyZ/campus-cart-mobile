/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableOpacity,
   Image,
   ScrollView
 } from 'react-native';

 const FULL_WIDTH = Dimensions.get('window').width;
 const FULL_HEIGHT = Dimensions.get('window').height;
 //productUserId
 const OrderProductComp = ({item}) => {

   return (
    <View style={styles.container}>
       <View style={styles.compContainer}>
        <View style={styles.leftCol}>

        <Image
                    source={{uri:item.imagePath}} // Replace with the actual image path
                    style={{
                    flex: 1,
                    width: undefined,
                    height: undefined,
                    borderRadius: 5, // Optional: Add border radius or other styles
                    }}
                    resizeMode="contain" // Adjust the resizeMode based on your requirement
                />

        </View>
        <View style={styles.rightCol}>
          <View style={styles.headerCont}>
              <Text style={{
                fontSize:16,
                fontWeight: "bold",
                color:"#545F71",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
                {item.productName}
              </Text>

              <Text style={{
                fontSize:14,
                fontWeight: "700",
                color:"#9BA5B7",
              }}>
                R {item.price}
              </Text>
          </View>
          <View style={styles.ratingsCont}>
          <Text style={{
                                            color:'#9BA5B7',
                                            fontSize:14,
                                            fontWeight: '700',

                                        }}>{item.productRatings}</Text>
                                <Image 
                                            style={{
                                                width:20,
                                                height:20,
                                                //alignSelf: 'center'
                                            }}
                                            resizeMode="contain"
                                            source={require('../images/star.png')}
                                            />
                                <Text style={{
                                            color:'#9BA5B7',
                                            fontSize:14,
                                            fontWeight: '700',
                                            paddingHorizontal:1,

                                        }}> Ratings</Text>
          
          </View>
          <View style={styles.quantityCont}>

            <Text style={{
              color:'#545F71',
              fontSize:24,
              fontWeight: '700',
              paddingHorizontal:10
            }}>
              Quantity : {item.quantity}
            </Text>
          </View>            
        </View>
       </View>

    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    flex:1,
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.15,
    alignItems:'center',
    marginBottom:10
   },compContainer:{
    width : FULL_WIDTH*0.965,
    height : FULL_HEIGHT*0.14,
    backgroundColor:'#FFFFFF',
    elevation:8,
    borderRadius:10,
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal:5
   },leftCol:{
    width: '26%',
    height:'90%',

   },rightCol:{
    width: '72%',
    height:'90%',
 
   },headerCont:{
    width:'100%',
    height:'35%',

   },
   ratingsCont:{
    width:'100%',
    height:'21%',
    display:'flex',
    flexDirection:'row',
    marginVertical:3
   },
   quantityCont:{
    width:'100%',
    height:'44%',
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center'

   },increamentButton:{
    width:30,
    height:30,
    backgroundColor:'#FFFFFF',
    borderRadius:100/2,
    elevation: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   }
 });
 
 export default OrderProductComp;
 