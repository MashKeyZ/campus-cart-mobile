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
   Image,
   TouchableOpacity,
   ScrollView
 } from 'react-native';
 import { useNavigation } from '@react-navigation/native';
import HeaderProduct from './headerProduct';


 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const MarketProduct = ({getComLink,setModal,loadProduct,token,product,path,setCart,cart,productId,sendRequest,produc,
    productImages,setProductId,
    newCart}) => {
    const navigation = useNavigation();

    const viewProduct =async()=>{
       // await loadProduct(productId)
        console.log('Navigating to poduct')
        console.log(produc)
        navigation.navigate("Product",{token:token,productId:productId,produc:produc,productImages:productImages,newCart:newCart})
    }
    const removeOrAddToCart=async()=>{
        if(cart.includes(productId)){
            await sendRequest(productId,0,product.userId)
            //const newCart = cart.filter(product=>product!==productId)
            //setCart(newCart)
        }else{
             await sendRequest(productId,1,product.userId)
            //let newCart = [...cart]
            //newCart.push(productId)
            //setCart(newCart)
        }
    }

    const startChat =async()=>{
        await getComLink(product?.userId);
        setProductId(product?.productId)
        setModal(true)
    }
   return (
    <View style={styles.container}>
        <View style={styles.touchableCont}>
            <HeaderProduct options={product}/>
            <TouchableOpacity style={styles.imageCont} onPress={viewProduct}>
                <Image
                    source={{uri:product.imagePath}} // Replace with the actual image path
                    style={{
                    flex: 1,
                    width: undefined,
                    height: undefined,
                    borderRadius: 5, // Optional: Add border radius or other styles
                    }}
                    resizeMode="contain" // Adjust the resizeMode based on your requirement
                />
            </TouchableOpacity>
            <View style={styles.productInfo}>
            
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                    color:'#545F71',
                    fontWeight:'bold',
                    fontSize:13,
                             
                }}>{product.productName}</Text>
            <View style={styles.prices}> 
                <View style={styles.pricesTag}>    
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        color:'#545F71',
                        fontWeight:'700',
                        fontSize:12,
                                
                    }}>R {product?.price}</Text>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        color:'#545F71',
                        fontWeight:'500',
                        textDecorationLine: 'line-through',
                        fontSize:8,
                                
                    }}>{product?.onPromotion?'Was '+ product.prevPrice:''}</Text>
                
                </View>
                <View style={styles.iconsCont}> 
                    <TouchableOpacity style={styles.iconTouchable} onPress={startChat}>
                        <Image 
                            source={require('../images/Icontop-1.png')}
                            style={{
                                width: 25,
                                height:25,
                                tintColor: '#545F71',
                            }}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={removeOrAddToCart} style={styles.iconTouchable}>
                        {!cart.includes(productId)? <Image 
                            source={require('../images/addtocart.png')}
                            style={{
                                width: 25,
                                height:25,
                            }}/>:
                        <View style={{width:25, height:25,display:'flex',}}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                color:'#545F71',
                                fontWeight:'500',
                                fontSize:24,
                               // alignSelf:'center',
                                position:'absolute',
                                top:'-25%',
                                left:'25%',
                            }}>x</Text>
                        </View>}
                            
                    </TouchableOpacity>
                </View>
            </View>
                <View style={styles.bottom}>
                <Image
                                source={require('../images/location.png')}
                                style={{
                                    width:20,
                                    height:20,
                                    
                                }}/>

                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        color:'#545F71',
                        fontWeight:'500',
                        fontSize:10,
                                
                    }}>{product?.university}</Text>
                </View>
            </View>
        </View>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    width : '48%',
    height : FULL_HEIGHT * 0.35,
    //paddingHorizontal : FULL_WIDTH *0.02,
    backgroundColor:'#FFFFFF',
    marginBottom:FULL_HEIGHT*0.015,
    elevation:8,
    borderRadius:10,
    display:'flex',
    alignItems: 'center',
    paddingHorizontal:3,
    paddingVertical:0
   },backGround:{
     height: FULL_HEIGHT,
     width: FULL_WIDTH,
     backgroundColor:'#545F71',
   },headerCont:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    height: "15%",
    justifyContent:'space-between',
    alignItems: 'center',
    //backgroundColor:'blue',
   },tittle:{
    fontSize:36,
    fontWeight:'bold',
   },body:{
    width:'100%',
    height:'20%',
    backgroundColor:'#FFFFFF',
   },touchableCont:{
    width:'99%',
    height:'99%',
    display:'flex',
    alignItems: 'center',
   },tittleCont:{
        width:'80%',
        height:'100%',
        
   },imageTitleCont:{
    borderWidth:.5,
    borderColor:'#545F71',
    borderRadius:100/2,
    width:30,
    height:30,
    alignItems: 'center',
    justifyContent: 'center',
   },subTitle:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
   },imageCont:{
    width:'90%',
    height:'60%',
    
   },productInfo:{
    width:'98%',
    marginVertical:FULL_HEIGHT*0.0025,
   },bottom:{
    display:'flex',
    flexDirection:'row',
   },prices:{
    width:'100%',
    height:'29%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
   },pricesTag:{
    width:'50%',
    height:'100%',
   },iconsCont:{
    width:'50%',
    height:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
   },iconTouchable:{
    elevation:10,
    backgroundColor:'#FFFFFF',
    borderRadius:100/2,
   }
   
 });
 
 export default MarketProduct;
 