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
 const ProductComponent = ({index,setModalName,setOpenModal,setProductId, setPathModal, setIndex, name, price, path,ratings,productId,setDialog,quantity}) => {

    //console.log(item)
 const updateProduct=()=>{
    setProductId(productId);
    setPathModal(path);
    setOpenModal(true);
    setModalName(name);
    setIndex(index)
    //setModal(true)
 }

 const deleteProduct=()=>{
    console.log('Delete product')
    setProductId(productId);
    setDialog(true)
 }

   return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.compContainer}>
        <View style={styles.leftCol}>

        <Image
                    source={{uri:path}} // Replace with the actual image path
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

              >
                {name}
              </Text>

              <Text style={{
                fontSize:14,
                fontWeight: "700",
                color:"#9BA5B7",
              }}>
                R {price}
              </Text>
          </View>
          <View style={styles.ratingsCont}>
          <Text style={{
                                            color:'#9BA5B7',
                                            fontSize:14,
                                            fontWeight: '700',

                                        }}>{ratings}</Text>
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

                                        }}> Ratings </Text>
            <Text style={{
                fontSize:14,
                fontWeight: "700",
                color:"#9BA5B7",
              }}>
                || Stock Quantity : {quantity}
              </Text>
          
          </View>
       
          <View style={styles.quantityCont}>
            <TouchableOpacity style={{
                width:'45%',
                height:'80%',
                borderColor:'#545F71',
                borderWidth:1,
                borderRadius:10,
                display:'flex',
                flexDirection:'row',
                justifyContent: 'center',
                alignItems: 'center',
                
                
            }} onPress={updateProduct}>
                <Image
                source={require('../images/edit.png')}
                style={{
                    width:20,
                    height:20,
                    tintColor: '#545F71',
                }}
                />

                <Text style={{
                    fontSize:20,
                    color:'#545F71',
                    paddingHorizontal:5
                }}>
                    Edit
                </Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={{
                width:'45%',
                height:'80%',
                borderColor:'red',
                borderWidth:1,
                borderRadius:10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'row',
                display:'flex'
            }} onPress={deleteProduct}>
                <Image
                source={require('../images/trash.png')}
                style={{
                    width:20,
                    height:20,
                    //tintColor: '#545F71',
                }}
                />
                <Text style={{
                    fontSize:20,
                    color:'red',
                    paddingHorizontal:5
                }}>
                    Delete
                </Text>
            </TouchableOpacity>
          </View>            
        </View>
       </TouchableOpacity>

    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    flex:1,
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.16,
    alignItems:'center',
    marginBottom:10
   },compContainer:{
    width : FULL_WIDTH*0.965,
    height : FULL_HEIGHT*0.15,
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
    justifyContent:'space-evenly',
    //backgroundColor:'blue'

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
 
 export default ProductComponent;
 