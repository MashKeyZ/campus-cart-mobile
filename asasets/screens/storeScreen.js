/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   Image,
   TouchableOpacity,
   ScrollView,
   FlatList,
   Modal
 } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import CategoryComp from '../components/categoryComp';
import Filter from '../components/filter';
import HomeHeader from '../components/homeHeader';
import ItemList from '../components/itemList';
import Loading from '../components/loading';
import MarketProduct from '../components/marketProduct';
import SearchBar2 from '../components/searchBar2';
import {serverURL} from '../internet';
import socket from '../socket';

 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const StoreScreen = ({navigation,route}) => {
    const store = route.params?.store;
    const currentUser = route.params?.currentUser;
    const token = route.params?.token;
const [products,setProducts]= useState([])
  const [isLoading,setLoading] = useState(false)
  const [cart,setCart] = useState([])
  const [errorMessage,setErrorMassege] = useState('')
  const [error,setError] = useState(false)
  const [reachedEnd, setReachedEnd] = useState(false);
  const [pIntendedScreens, setPIntendedScreens] = useState(true)
  const [filterText, setFilterText] = useState('all')
  const [displayList, setDisplayList] = useState(products)
  const [doNotUpdate,setDoNotUpdate] = useState(false)
  const [product,setProduct] =useState([])
  const [productImages,setProductImages] =useState([])
  const [newCart,setNewCart]= useState([])
  const [linkId,setLinkId] = useState(undefined)
  const [productId,setProductId] = useState('')
  const [message,setMessage] = useState('')
  const [openModal,setModal] = useState(false)
  const [sendToId,setToUserId] = useState()
  
  
  const onScreenFocus = useCallback(() => {
    
    if(filterText.toLowerCase()=='all' ){
      loadProducts();
      setReachedEnd(false);
      console.log("Displaying All")
      //const newList =[...products]
     // loadProducts();
      setDisplayList(products)
    }else if(filterText.toLowerCase()=='search'){

    }else{
      let newList = products.filter(item=> item.category==filterText)
      setDisplayList(newList)
    }
  }, []);

  // Use useFocusEffect to trigger the callback when the screen is focused
  useFocusEffect(onScreenFocus);

  /*useEffect(() => {
    if (reachedEnd ) {
      // Invoke your function here
      //loadProducts();
      setReachedEnd(false); // Reset the state for the next end reached event
      //reachedEnd=false
      console.log("Triggered")
    }
    //setGlobalCart(cart)
  }, [reachedEnd]);*/

  useEffect(()=>{
        if(filterText.toLowerCase()=='all' ){
          console.log("Displaying All")
          //const newList =[...products]
         // loadProducts();
          setDisplayList(products)
        }else if(filterText.toLowerCase()=='search'){

        }else{
          let newList = products.filter(item=> item.category==filterText)
          setDisplayList(newList)
        }
        

  },[doNotUpdate])


  async function loadProducts(){

    try {
      setLoading(true)
      //console.log(registrationData)
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.get(`${serverURL}/products/campus/${store?.storeId}`, config);

      if(response.status==201){
        console.log('Response:', response.data);
        const updatedProducts = response.data.products || [];

        setProducts(updatedProducts)
        setDisplayList([...products,...updatedProducts])
        const newCart = response.data?.cart || [];
        setCart(newCart)
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

  async function sendCartRequest(productId,quant,pUserId){
    try {
      setLoading(true)
      //console.log(registrationData)
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      let response=null;
      switch(quant){
        case 1:
          response = await axios.post(`${serverURL}/cart/`,
            {data:{productId: productId,
                  quantity: quant,
                  productUserId:pUserId}}
          , config);
          break;
        
          case 0:
            response = await axios.put(`${serverURL}/cart/`,
                {product:{productId: productId,
                      quantity: quant,
                      productUserId:pUserId}}
              , config);
              break;
      }

      if(response.status==201){
        console.log('Response:', response.data);
        const newCart = response.data.cart || [];
        setCart(newCart)
        
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
      }
      
    } catch (error) {
      setErrorMassege('An error occured, please try again try again')
      setError(true)
      
      console.error('Error:', error);
    }finally{
      setLoading(false)
    }
  }

  async function loadProductByIp(product){

    try {
      setLoading(true)
      //console.log(registrationData)
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.get(`${serverURL}/products/${product}`, config);

      if(response.status==201){
        //console.log('Response:', response.data);
        const updatedProducts = response.data.product ;
        const newCart = response.data.cart || [];
        const newImages = response.data.images || [];
       

        
        setProduct(updatedProducts)
        setProductImages(newImages)
        setNewCart(newCart)
        console.log(newReviews)
        setReviews(newReviews)
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

  async function getComLink(userId){

    try {
      setLoading(true)
      //console.log(registrationData)
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.post(`${serverURL}/channels/chats`,
      {data:{
        linkId:linkId,
        user_1_id: currentUser,
        user_2_id: userId,
      }} 
      ,config);

      if(response.status==201){
        //console.log('Response:', response.data);

        const newLinkId = response.data?.linkId;
        if(newLinkId) setLinkId(newLinkId)
        setToUserId(userId)
        //setMessages(updatedMessages.reverse())
        
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

  const sendMessage = ()=> {
    if(message==='') return;
    
    //console.log('Sending message : '+inputMessage)
          // Get the current date and time
    const currentDate = new Date();
    
    // Format the date and time
    const formattedDateTime = formatDateTime(currentDate);
    const text ={linkId:linkId,sendTo:sendToId,fromServer:false,_text:message,_time:formattedDateTime,fromUserId:currentUser,productId:productId}
    console.log('sending : ' + sendToId)
    socket.emit('message',JSON.stringify(text))
    
   // setMessages(data=>[...data,text])
   // flatListRef.current.scrollToEnd({animated: true});
   setLinkId(undefined)
    setMessage('')
    setModal(false)
    
  };

  function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;  // Convert 24-hour to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}-${month}-${year} at ${hours}:${minutes}${amOrPm}`;
  }

  const goBack=()=>{
    navigation.goBack()
}

   return (
    <SafeAreaView style={styles.container}>
        <View style={styles.TopSection}>
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
                    {store?.name}
                </Text>
            </View>
        </View>
                
                <CategoryComp/>
        </View>
        <View style={styles.Body}> 
            <Filter filter={setFilterText} setDoNotUpdate={setDoNotUpdate} doNotUpdate={doNotUpdate}/>
            <View style={styles.products}>
            <HelperText type="error" visible={error}>
                  {errorMessage}
            </HelperText>
              <FlatList
                  data={displayList}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  renderItem={({ item }) => (
                    <MarketProduct token={token} setModal={setModal} product={item} path={item?.productImage} setCart={setCart}cart={cart} productId={item?.productId} sendRequest={sendCartRequest}
                    produc = {product}
                    productImages={productImages}
                     newCart={newCart}
                     loadProduct={loadProductByIp}
                     getComLink={getComLink}
                     setProductId={setProductId}
                     />
                  )}
                  onEndReached={() => {
                    // Logic to handle reaching the end of the list
                    setReachedEnd(true);
                  }}
                  onEndReachedThreshold={0.01}
                  
                />
               {/*<ItemList products={products} setCart={setCart} cart={cart}/>*/}
            </View>
        </View>

        <Modal
             visible={openModal} 
             animationType="slide"
             transparent={true}
        >   
          <View style={styles.modalView2}>
          <View style={styles.headerContainerModal2} >
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


                <TextInput
                  mode="flat"
                  label={"Message"}
                  placeholder={"Send a direct message"}
                  placeholderTextColor="#545F71"
                  style={styles.textInputStock}
                  onChangeText={setMessage}
                  fontSize ={18}
                  textColor="#545F71"
                  outlineColor="#545F71"
                  activeOutlineColor="rgba(66, 133, 244, 1)"
                  value={message}
                  multiline={true}
                  numberOfLines={4}
                  //keyboardType="numeric"
                  //maxLength={max}   
              />
            
            <TouchableOpacity style={styles.checkOutButton2} onPress={sendMessage}>
            <Text style={{
                fontWeight:'bold',
                fontSize:20,
                color:'#FFFFFF'
            }}>
               Send
            </Text>
            </TouchableOpacity>
            </View>

            
          </View>
         
        </Modal>

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
    height: FULL_HEIGHT*0.17,
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
  },modalContentContainer:{
    width:FULL_WIDTH*0.85,
    height:FULL_HEIGHT*0.40,
    display: 'flex',
    alignItems: 'center',
    paddingVertical:FULL_HEIGHT*0.03,
    paddingHorizontal:FULL_HEIGHT*0.01,
    backgroundColor:'#FFFFFF',
    elevation:8,
    borderRadius:15,
    justifyContent: 'space-around',
    alignItems: 'center'
   },headerContainerModal2:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.075,
    display:'flex',
    justifyContent: 'center',
    paddingHorizontal:FULL_WIDTH*0.02,
    position:'absolute',
    zIndex:5,
    top:FULL_HEIGHT*0.25
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
    },modalView2:{
        display: 'flex',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
       },textInputStock:{
        width:'95%',
        backgroundColor:'rgba(255,255,255,0.6)',
        borderColor:'#545F71',
        alignSelf: 'center',
        marginTop:15
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
        fontSize:20,
        fontWeight:'500',
        color:'#545F71',
       },
 });
 
 export default StoreScreen;
 