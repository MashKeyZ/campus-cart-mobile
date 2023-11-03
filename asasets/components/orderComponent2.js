/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
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
 import DropDown from "react-native-paper-dropdown";
 const FULL_WIDTH = Dimensions.get('window').width;
 const FULL_HEIGHT = Dimensions.get('window').height;
 import socket from '../socket';
 //productUserId
 const OrderComponent = ({token,item,getComLink,setOrderId,setModal}) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [category,setCategory] = useState('')
    const [orderStatus,setOrderStatus] = useState(item.orderStatus)
    const navigation = useNavigation()
    //console.log(item)
 const getLink=async()=>{
  await getComLink(item?.fromUserId)
  setOrderId(item?.orderId)
        setModal(true)
 }

 const deleteProduct=()=>{
    console.log('Delete product')
    //setProductId(productId);
    //setDialog(true)
 }
 const categoryList = [
    {
      label: "In Progress",
      value: "In Progress",
    },
    {
      label: "Declined",
      value: "Declined",
    },{
      label: "Ready",
      value: "Ready",
    }
  ];

  useEffect(()=>{

    socket.on('orderstatus', (resp) => {
      console.log('Received message from server:', resp);
      let newMessage = JSON.parse(resp)
      

      if(newMessage.orderId === item?.orderId){
        console.log("Order status : "+newMessage?.orderStatus)
        setOrderStatus(newMessage?.orderStatus)
      }
      
      // Assuming response.data.token is accessible here
      //socket.emit('authenticate', response.data.token);
    });
    
  },[])

  const navToProducts =()=>{
    navigation.navigate("OrderScreen",{token:token,orderId:item.orderId})
  }

   return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.compContainer} onPress={navToProducts}>
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

              >
                Order No: {item.orderId} 
              </Text>
              <Text style={{
                fontSize:14,
                fontWeight: "700",
                color:"#9BA5B7",
              }}>
                Status : {orderStatus} || Total :R {item.total}
              </Text>

          </View>
          <View style={styles.quantityCont}>
          <View style={styles.textInputDrop}>
          
            </View>

          </View> 
          <TouchableOpacity style={styles.iconTouchable} onPress={getLink}>
                        <Image 
                            source={require('../images/Icontop-1.png')}
                            style={{
                                width: 35,
                                height:35,
                                tintColor: '#545F71',
                            }}/>
                    </TouchableOpacity>           
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
   },textInputDrop:{
    width:'100%',
    backgroundColor:'rgba(255,255,255,0.6)',
    borderColor:'#545F71',
    alignSelf: 'center',
    marginTop:15
  },iconTouchable:{
    elevation:10,
    backgroundColor:'#FFFFFF',
    borderRadius:100/2,
    position:'absolute',
    zIndex:1,
    right:0,
   }
 });
 
 export default OrderComponent;
 