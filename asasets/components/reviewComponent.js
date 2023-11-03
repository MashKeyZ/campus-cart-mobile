/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
     Modal,
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableOpacity,
   ScrollView,
   Image
 } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
 import { ActivityIndicator, MD2Colors } from 'react-native-paper';

 const FULL_WIDTH = Dimensions.get('window').width;
 const FULL_HEIGHT = Dimensions.get('window').height;

 const TableRow =({tittle,description})=>{
    return(
        <View style={styles.rowContainer}>
        <View style={styles.col1}>
            <Text style={{
            color:'#2C2C4C',
            fontSize:16,
            fontWeight: 'bold',
            paddingHorizontal:5,
            paddingVertical:2

        }}>{tittle}</Text>
        </View>
        <View   style={styles.col2}>
        <Text style={{
            color:'#2C2C4C',
            fontSize:16,
            fontWeight: '500',
            paddingHorizontal:5,
            paddingVertical:2

        }}>: {description}</Text>

        </View>
    </View>
    )
 }
 
 const ReviewComponent = ({state,change,item}) => {
   return (

  

                        <View style={styles.reviewComponentCont}>
                            <View style={styles.headerCont}>
                                <View style={styles.userContainer}>
                                    <View style={styles.imageContainer}>
                                        <Image 
                                            style={{
                                                flex:1,
                                                width:undefined,
                                                height:undefined,
                                                //alignSelf: 'center'
                                                borderRadius:100/2
                                            }}
                                            resizeMode="contain"
                                            source={item?.image?{uri:item?.image}:require('../images/user.png')}
                                            />
                                    </View>
                                    <Text style={{
                                            color:'#545F71',
                                            fontSize:12,
                                            fontWeight: '700',
                                            paddingHorizontal:5,

                                        }}>{item?.firstName?.split(' ')[0]+' '+item?.lastName?.split(' ')[0]}</Text>
                                </View>
                                <View style={styles.timeContainer}>
                                <Text style={{
                                            color:'#545F71',
                                            fontSize:12,
                                            fontWeight: '700',
                                            paddingHorizontal:5,

                                        }}>{item?.createdAt}</Text>

                                </View>

                            </View>
                            <View style={styles.body}>
                                <View style={styles.ratingsContainer}>
                                <Text style={{
                                            color:'#545F71',
                                            fontSize:14,
                                            fontWeight: '700',

                                        }}>{item?.stars}</Text>
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
                                            color:'#545F71',
                                            fontSize:14,
                                            fontWeight: '700',
                                            paddingHorizontal:1,

                                        }}> Ratings</Text>
                                </View>
                                <View style={styles.textContainer}>
                                <Text style={{
                                            color:'#545F71',
                                            fontSize:12,
                                            fontWeight: '700',
                                            paddingHorizontal:1,
                                            paddingVertical:1
                                        }}> {item?.review}
                                        
                                        </Text>
                                </View>
                            </View>
                        </View>

       
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    display: 'flex',
    width : '100%',
    height : '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
   },modalView:{
    display: 'flex',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
   },headerContainer:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.075,
    display:'flex',
    justifyContent: 'center',
    paddingHorizontal:FULL_WIDTH*0.02
   },bodyContainer:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.80,
    paddingHorizontal:FULL_WIDTH*0.02,
   },gradient:{
    flex:1,
    justifyContent:'space-between'
   },tableContainer:{
    borderTopWidth:1,
    borderTopColor:'#545F71',
    borderBottomWidth:1,
    borderBottomColor:'#545F71',
    width:'100%',
   },rowContainer:{
    displayL: 'flex',
    flexDirection:'row',
    width:'100%',
    paddingVertical:1
   },col1:{
    display: 'flex',
    justifyContent: 'center',
    width:'30%',
   },col2:{
    display: 'flex',
    justifyContent: 'center',
    width:'70%',
   },reviewsContianer:{

    width:'100%',
   },reviewComponentCont:{
    width:'100%',
    backgroundColor:'rgba(200,225,255,0.4)',
    //elevation:3,
    borderRadius:10,
    paddingVertical:5,
    paddingHorizontal:2,
    marginBottom:10
   },headerCont:{
    display:'flex',
    flexDirection:'row',
    paddingHorizontal:FULL_WIDTH*0.01,
    paddingVertical:3,
    justifyContent: 'space-between',
    alignItems:'center',
    height:40,
   },userContainer:{
    width:'50%',
    height:"100%",
    
    display: 'flex',
    flexDirection:'row',
    //justifyContent: 'space-around',
    alignItems: 'center',
   },timeContainer:{
    width:'40%',
    height:"100%",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
   },imageContainer:{
    width:28,
    height:28,
    borderRadius:100/2,
    borderWidth:2,
    borderColor:'#545F71',
   },body:{
    width:'100%',
    display: 'flex',
    alignItems:'flex-end',
   },ratingsContainer:{
    width:'91%',
    height:25,
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    //backgroundColor:'blue'
   },textContainer:{
    width:'91%',
    paddingBottom:5
   }
 });
 
 export default ReviewComponent;
 