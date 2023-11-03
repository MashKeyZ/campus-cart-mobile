/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import axios from 'axios';
import React, { useEffect, useState } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   Image,
   TouchableOpacity,
   FlatList
 } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
 import LinearGradient from 'react-native-linear-gradient';
import HeaderProduct from '../components/headerProduct2';
import Loading from '../components/loading';
import Location from '../components/location';
import MoreDetailsModal from '../components/moreDetailsModal';
import {serverURL} from '../internet';
 

 const FULL_WIDTH = Dimensions.get('window').width;
const FULL_HEIGHT = Dimensions.get('window').height;

const SelectImage =({path,current,setCurrentImage,data})=>{
    console.log('Path changed: ' + path);
    console.log(data)
    const change = ()=>{
        setCurrentImage(path)
    }

return(
    <TouchableOpacity style={[styles.imgCont,{
        borderColor:path==current?"#4285F4":'#FFFFFF'
    }]} onPress={change}>
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

    </TouchableOpacity>
)
}

 const Product = ({navigation,route}) => {
    const token = route.params?.token;
    const productId = route.params?.productId;
    const productImages = route.params?.productImages
    const {produc,newCart} = route.params
    console.log("product Images")
    console.log(productImages)
    console.log(productId)

                //console.log('Images '+productImages)
    const [product,setProduct] = useState([])
    const [images,setImages] = useState([])
    const [cart,setCart] = useState([])
    const [currentImage,setCurrentImage] = useState()
    const [modalOn, setModal] =useState(false)
    const [errorMessage,setErrorMassege] = useState('')
    const [error,setError] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const [name,setName] = useState('')
    const [reviews,setReviews] = useState([])
    const [review,setReview] =useState('')
    const [stars, setStars,] = useState(5)

    const goBack=()=>{
        navigation.goBack()
    }

    const openModal=()=>{
        setModal(!modalOn)
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
          const response = await axios.get(`${serverURL}/products/${productId}`, config);
    
          if(response.status==201){
            //console.log('Response:', response.data);
            const updatedProducts = response.data.product || [];
            const newCart = response.data.cart || [];
            const newImages = response.data.images || [];
            const newReviews = response.data.reviews ||[]
            console.log('Reviews')
            console.log(newReviews)

            setCurrentImage(newImages[0]?.imagePath)
            setProduct(updatedProducts)
            setImages(newImages)
            setReviews(newReviews)
            setCart(newCart)
            setName(updatedProducts?.firstName?.split(' ')[0]+' '+updatedProducts?.lastName?.split(' ')[0])
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

      async function sendReview(){
        try {
            //setDialog(false)
            setLoading(true)
            //console.log(registrationData)
            const config = {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            };
            const date = new Date()
            const rev={
                productId:productId,
                firstName:'You ',
                lastName:'',
                createdAt: date.getDate()+' '+date.getTime() ,
                stars:stars,
                review:review,
            }
  
               const response = await axios.post(`${serverURL}/reviews/addreview`,{
                productId:productId,
                stars:stars,
                review:review,
               }, config);
      
            if(response.status==201){
                console.log("Review response")
              console.log(response)
              setReviews((prev)=>[...prev,rev])
              //setProducts(newProducts)
              
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
    <LinearGradient
        colors={['rgba(155,165,183,0.01)', 'rgba(155,165,183,0.10)', 'rgba(155,165,183,0.5)']}
        style={{ flex: 1 }}
      >
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
    </View>
  
    <View style={styles.bodyContainer}>
        <View style={styles.imageCont}>
        <Image
                    source={currentImage?{uri:currentImage}:require('../images/logo.png')} // Replace with the actual image path
                    style={{
                    flex: 1,
                    width: undefined,
                    height: undefined,
                    borderRadius: 5, // Optional: Add border radius or other styles
                    }}
                    resizeMode="contain" // Adjust the resizeMode based on your requirement
                />

        </View>
        <View style={styles.imageListCont}>
            {/*images? images.map((image)=>(
                <SelectImage key={image.name} path={image.path} current={currentImage} setCurrentImage={setCurrentImage} />
            )):''*/}
            <FlatList
            data={images}
            horizontal={true} // Set this prop to make it horizontal
            keyExtractor={(item,index) => index}
            renderItem={({ item })=>(<SelectImage data={item} path={item?.imagePath} current={currentImage} setCurrentImage={setCurrentImage} />)}
            />

        </View>
    </View>
    <View style={styles.footerContainer}>
        <View style={styles.userCont}>
            <HeaderProduct options={{user:product?.name||name,path:product?.image,ratings:product?.productRatings}}/>
            <Location university={product?.university}/>
        </View>
        <View style={styles.nameCont}>
            <Text style={{
                fontSize:24,
                fontWeight: 'bold',
                color:'#2C2C4C',
            }}>
                {product?.productName}
            </Text>

        </View>
        <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
                <Text style={{
                    fontSize:20,
                    fontWeight: 'bold',
                    color:'#2C2C4C',
                }}>
                    R {product?.price}
                </Text>
                <Text style={{
                    fontSize:16,
                    fontWeight: '600',
                    color:'#9BA5B7',
                }}>
                   {product?.prePrice? 'Was R '+product?.prevPrice:''}
                </Text>

            </View>
            <View style={styles.cartContainer}>
                {cart?.includes(productId)?
                <TouchableOpacity style={styles.addToCartBtn} >
                <Text style={{
                    fontSize:18,
                    fontWeight: 'bold',
                    color:'#545F71',
                    alignSelf:'center'
                }}>
                    Remove
                </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.addToCartBtn}>
                <Text style={{
                    fontSize:18,
                    fontWeight: 'bold',
                    color:'#545F71',
                    alignSelf:'center'
                }}>
                    Add to Cart
                </Text>
                </TouchableOpacity>
            }
                

                
            </View>
        </View>
        <Text style={{
                    fontSize:20,
                    fontWeight: 'bold',
                    color:'#545F71',
                    
                }}>
                    Description
                </Text>
        <View style={{width:'100%',height:'22%'}}>

        
        <ScrollView >
        <Text style={{
                    fontSize:16,
                    fontWeight: '300',
                    color:'#545F71',
                    
                }}>
                    {product?.productDescription}
                </Text>
        </ScrollView>
        </View>

                <Text style={{
                    fontSize:20,
                    fontWeight: 'bold',
                    color:'#545F71',
                    alignSelf:'flex-end',
                    position: 'absolute',
                    zIndex:10,
                    top:"60%",
                    paddingHorizontal:8
                   
                }} onPress={openModal}>
                    More Details
                </Text>

       

        {/*   Add any content or components you want to display within the gradient background */}
      
    </View>
    <MoreDetailsModal change={openModal} state={modalOn} product={product} stars={stars} setStars={setStars} review={review} setReview={setReview} reviews={reviews} sendReview={sendReview}/>
    <Loading state={isLoading}/>
    </LinearGradient>
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
    position:'absolute',
    zIndex: 10,
    display:'flex',
    justifyContent: 'center',
    paddingHorizontal:FULL_WIDTH*0.02
   },bodyContainer:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.60,
    paddingHorizontal:FULL_WIDTH*0.02,
    
   },
   footerContainer:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.55,
    paddingHorizontal:FULL_WIDTH*0.02,
   },imageCont:{
    width : '100%',
    height:'85%',
    
   },imageListCont :{
    width : '100%',
    height:'15%',
    display:'flex',
    flexDirection:'row',
    justifyContent : 'center',
    alignItems : 'center',
    
    
   },imgCont:{
    width: 60,
    height:70,
    borderRadius : 10,
    marginHorizontal:5,
    borderWidth:3.5
   },userCont:{
    width:'100%',
    height:'11%',
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   },priceRow:{
    width:'100%',
    height:'15%',
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth:1,
    borderBottomColor: '#2C2C4C'
   },nameCont:{
    width:'100%',
    height:'auto',
   },priceContainer:{
    width:'50%',
    height:'90%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
   },
   cartContainer:{
    width:'50%',
    height:'90%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent:'center'
   },addToCartBtn:{
    backgroundColor:'#F8C134',
    borderRadius:15,
    width:'90%',
    height:'75%',
    justifyContent:'center'
   }
 });
 
 export default Product;
 