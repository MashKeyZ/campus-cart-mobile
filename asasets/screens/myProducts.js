/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import axios from 'axios';
import React,{useState,useEffect, useRef} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableOpacity,
   Image,
   FlatList,
   Modal
 } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import CartComponent from '../components/cartComponent';
import Dialog from '../components/dialog';
import Loading from '../components/loading';
import ProductComponent from '../components/productComponent';
import {serverURL} from '../internet';
import socket from '../socket';

 const FULL_WIDTH = Dimensions.get('window').width;
 const FULL_HEIGHT = Dimensions.get('window').height;

 const MyProducts = ({navigation,route}) => {
    const token = route.params?.token;
    const currentUser = route.params?.currentUser;
    const [products,setProducts]= useState([])
    const [totalPrice,setTotalPrice]= useState(0)
    const [errorMessage,setErrorMassege] = useState('')
    const [error,setError] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const [openModal,setModal] = useState(false)
    const [quantity,setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [productId,setProductId] = useState('')
    const [modalPath,setPathModal] = useState('')
    const [modalName,setModalName] = useState('')
    const [dialogVisible,setDialog] = useState(false)
    const flatListRef = useRef(null);
    const [index,setIndex] = useState(-1)

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
          console.log("Sendingto : "+currentUser);
          const response = await axios.get(`${serverURL}/products/getmine/${currentUser}`, config);
    
          if(response.status==201){
            //console.log('Response:', response.data);
            const updatedProducts = response.data.products || [];
            console.log(updatedProducts)
            setProducts(updatedProducts)
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

      async function updateProduct(){

        try {
          setLoading(true)
          //console.log(registrationData)
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
              const response = await axios.put(`${serverURL}/products/`,
                {product:{productId: productId,
                      quantity: parseInt(quantity)||null,
                      price: parseFloat(price)||null}}
              , config);
    
          if(response.status==201){
            setProducts((prevProducts) => {
                const updatedProducts = [...prevProducts];
                const productToUpdate = { ...updatedProducts[index] }; // Create a copy of the specific product
                productToUpdate.product.quantity = quantity || productToUpdate.product.quantity; // Update quantity if provided, otherwise keep the current value
                productToUpdate.product.price = price || productToUpdate.product.price; // Update price if provided, otherwise keep the current value
                updatedProducts[index] = productToUpdate; // Replace the old product with the updated one
                return updatedProducts;
              });
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
      }

      const sendUpdateRequest=()=>{
        //setProductId(productId)
        setModal(false)
        updateProduct()
      }

      const handlePriceChange = (text) => {
        // Ensure the input is a valid number (optional)
        const numericInput = text.replace(/[^0-9]/g, '');
        setPrice(numericInput);
      };
      const handleQuantityChange = (text) => {
        // Ensure the input is a valid number (optional)
        const numericInput = text.replace(/[^0-9]/g, '');
        setQuantity(numericInput);
      };

      const deleteItem =async()=>{
        try {
            setDialog(false)
            setLoading(true)
            //console.log(registrationData)
            const config = {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            };
                const response = await axios.put(`${serverURL}/products/${productId}`,{}, config);
      
            if(response.status==200){
              const newProducts = products.filter(item=>item.product.productId!==productId)
              setProducts(newProducts)
              
              setError(false)
            }else if(response.status==500){
              console.log(response)
              setErrorMassege('An error occured, please try again try again')
              setError(true)
            }else if(response.status==401){
              setErrorMassege('Unauthorized request')
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
                    My Products
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
                  <ProductComponent setIndex={setIndex} setOpenModal={setModal} setDialog={setDialog} setProductId={setProductId} item={item} productId={item.product.productId} setPathModal={setPathModal} index={index} name={item.product.productName} cartItems={products} price={item.product.price} path={item.product.imagePath} ratings={item.product.productRatings} setModalName={setModalName} quantity={item.product.quantity}/>
                )}
                ref={flatListRef}
                onContentSizeChange={() => {
                flatListRef.current.scrollToEnd({animated: true});
                }}
                />
    
        </View>

        <Modal
             visible={openModal} 
             animationType="slide"
             transparent={true}
        >   
          <View style={styles.modalView}>
          <View style={styles.headerContainerModal} >
                <TouchableOpacity onPress={()=>setModal(false)} style={{
                    width:40,
                    height:40,
                    backgroundColor:'#FFFFFF',
                    borderRadius:100/2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation:8
                }}>
                <Text style={{
                    fontSize:24,
                    fontWeight:'bold',
                    color:'#545F71'
                }}>
                    X
                </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.modalContentContainer}>
                <View style={styles.topModal}>
                <Image
                    source={{uri:modalPath}} // Replace with the actual image path
                    style={{
                    flex: 1,
                    width: 110,
                    height:'auto',
                    borderRadius: 5, // Optional: Add border radius or other styles
                    }}
                    resizeMode="contain" // Adjust the resizeMode based on your requirement
                />
                 <Text style={{
                fontWeight:'700',
                fontSize:20,
                color:'#545F71'
                }}>
                {modalName}
                </Text>
                </View>
                <TextInput
                  mode="flat"
                  label={"New Price (R)"}
                  placeholder={"Price"}
                  placeholderTextColor="#545F71"
                  style={styles.textInputPrice}
                  onChangeText={handlePriceChange}
                  fontSize ={18}
                  textColor="#545F71"
                  outlineColor="#545F71"
                  activeOutlineColor="rgba(66, 133, 244, 1)"
                  value={price}
                  keyboardType="numeric"
                  //maxLength={max}   
              />

                <TextInput
                  mode="flat"
                  label={"New Stock Quantity"}
                  placeholder={"Stock Quantity"}
                  placeholderTextColor="#545F71"
                  style={styles.textInputStock}
                  onChangeText={handleQuantityChange}
                  fontSize ={18}
                  textColor="#545F71"
                  outlineColor="#545F71"
                  activeOutlineColor="rgba(66, 133, 244, 1)"
                  value={quantity}
                  keyboardType="numeric"
                  //maxLength={max}   
              />
            <TouchableOpacity style={styles.checkOutButton2} onPress={sendUpdateRequest}>
            <Text style={{
                fontWeight:'bold',
                fontSize:20,
                color:'#FFFFFF'
            }}>
               Save Changes
            </Text>
            </TouchableOpacity>
            </View>

            
          </View>
         
        </Modal>
        <Dialog openDialog={dialogVisible} deleteItem={deleteItem} setDialog={setDialog} tittle={"Delete Item"} text={"Are you sure you want to delete this item?"}/>
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
    width:'50%',
    height:'100%',
    paddingHorizontal:10,
    justifyContent:'center'
   },tittleText:{
    fontSize:26,
    fontWeight:'500',
    color:'#545F71',
   },bodyContainer:{
    width:FULL_WIDTH,
    height:FULL_HEIGHT*0.87,
    display: 'flex',
    alignItems: 'center'
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
    },modalView:{
        display: 'flex',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
       },modalContentContainer:{
        width:FULL_WIDTH*0.85,
        height:FULL_HEIGHT*0.70,
        display: 'flex',
        alignItems: 'center',
        paddingVertical:FULL_HEIGHT*0.03,
        paddingHorizontal:FULL_HEIGHT*0.01,
        backgroundColor:'#FFFFFF',
        elevation:8,
        borderRadius:15,
        justifyContent: 'space-around',
        alignItems: 'center'
       },headerContainerModal:{
        width : FULL_WIDTH,
        height : FULL_HEIGHT*0.075,
        display:'flex',
        justifyContent: 'center',
        paddingHorizontal:FULL_WIDTH*0.02,
        position:'absolute',
        zIndex:5,
        top:FULL_HEIGHT*0.1
       },topModal:{
        width:'100%',
        height:FULL_HEIGHT*0.20,
        //backgroundColor:'blue',
        justifyContent: 'center',
        alignItems: 'center'
       },textInputPrice:{
        width:'95%',
        backgroundColor:'rgba(255,255,255,0.6)',
        borderColor:'#545F71',
        alignSelf: 'center'
      },textInputStock:{
        width:'95%',
        backgroundColor:'rgba(255,255,255,0.6)',
        borderColor:'#545F71',
        alignSelf: 'center',
        marginTop:15
      },checkOutButton2:{
        width:'90%',
        height:FULL_HEIGHT * 0.064,
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#545F71',
        borderRadius:15,
        position: 'relative',
        bottom:0,
        }
 });
 
 export default MyProducts;
 