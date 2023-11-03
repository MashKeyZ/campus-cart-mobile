/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import axios from 'axios';
import React,{useState,useEffect} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableOpacity,
   Image,
   FlatList
 } from 'react-native';
import { HelperText } from 'react-native-paper';
import CartComponent from '../components/orderProductComp';
import Loading from '../components/loading';
import {serverURL} from '../internet';

 const FULL_WIDTH = Dimensions.get('window').width;
 const FULL_HEIGHT = Dimensions.get('window').height;

 const OrderScreen = ({navigation,route}) => {
    const token = route.params?.token;
    const orderId = route.params?.orderId;

    const [products,setProducts]= useState([])
    const [totalPrice,setTotalPrice]= useState(0)
    const [errorMessage,setErrorMassege] = useState('')
    const [error,setError] = useState(false)
    const [isLoading,setLoading] = useState(false)

    const goBack=()=>{
        navigation.goBack()
    }

    useEffect(()=>{
        loadProducts()
    },[])

    async function loadProducts(){

        try {
          setLoading(true)
          //console.log(registrationData)
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          var encodedId = orderId.replace('#','%23')
          const response = await axios.get(`${serverURL}/orders/orderproducts/${encodedId }`, config);
    
          if(response.status==201){
            //console.log('Response:', response.data);
            const updatedProducts = response.data.products || [];
            console.log(updatedProducts)
            setProducts(updatedProducts)
            setError(false)
            let total = 0.0;
            for(let i=0;i <updatedProducts.length;i++){
                //console.log("Item : "+updatedProducts[i])
                total = parseFloat(total) + parseFloat(updatedProducts[i].price)*parseInt(updatedProducts[i].quantity);
            }
            setTotalPrice(total);
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

      async function sendCartRequest(productId,quant,pUserId){

        try {
          setLoading(true)
          //console.log(registrationData)
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          console.log("Quantity : "+quant)
              const response = await axios.put(`${serverURL}/cart/`,
                {product:{productId: productId,
                      quantity: quant,
                      productUserId:pUserId}}
              , config);
    
          if(response.status==201){
            console.log('Response:', response.data.cart);
            //const newCart = response.data.cart || [];
            //setCart(newCart)
            setError(false)
          }else if(response.status==500){
            console.log(response)
            setErrorMassege('An error occured, please try again try again')
            setError(true)
          }else if(response.status==401){
            setErrorMassege('Un authorized')
            setError(true)}
          else{
            setErrorMassege('An error occured, please try again try again')
            setError(true)
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
        <View style={styles.headerContainer} >
            <TouchableOpacity onPress={goBack} style={{
                width:40,
                height:40,
                backgroundColor:'#FFFFFF',
                borderRadius:100/2,
                alignItems: 'center',
                justifyContent: 'center',
                elevation:8
            }}>
            <Image
                source={require('../images/back.png')}
                style={{
                    width:25,
                    height:25,
                }}
            />
            </TouchableOpacity>
            <View style={styles.tittleContainer}>
                <Text style={styles.tittleText}>
                {orderId}
                </Text>
            </View>
        </View>

        <View style={styles.bodyContainer}>
        <HelperText type="error" visible={error}>
                  {errorMessage}
            </HelperText>

            <FlatList
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item,index }) => (
                  <CartComponent index={index} item={item} />
                )}
              
                
              />
                
        </View>

        <View style={styles.footerContainer}>
            <Text style={{
                fontWeight:'bold',
                fontSize:24,
                color:'#2C2C4C'
            }}>
               Total : R {totalPrice}
            </Text>
           
        </View>
        <Loading state={isLoading}/>
    </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    flex:1,
    width : FULL_WIDTH,
    height : FULL_HEIGHT,
    backgroundColor:'#FFFFFF',
   },headerContainer:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.075,
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    paddingHorizontal:FULL_WIDTH*0.02
   },tittleContainer:{
    width:'80%',
    height:'100%',
    paddingHorizontal:10,
    justifyContent:'center'
   },tittleText:{
    fontSize:22,
    fontWeight:'500',
    color:'#545F71',
   },bodyContainer:{
    width:FULL_WIDTH,
    height:FULL_HEIGHT*0.75,
    display: 'flex',
    alignItems: 'center',
    
   },footerContainer:{
    width:FULL_WIDTH,
    height:FULL_HEIGHT*0.14,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems:'center',
    paddingHorizontal:FULL_WIDTH*0.055,
   },checkOutButton:{
    width:'100%',
    height:FULL_HEIGHT * 0.064,
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#F8C134',
    borderRadius:15,
    }
 });
 
 export default OrderScreen;
 