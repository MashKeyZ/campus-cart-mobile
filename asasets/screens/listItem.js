/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState,useEffect} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableOpacity,
   Image,
   ScrollView,
   KeyboardAvoidingView,
   Platform,
   Keyboard
 } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import Input from '../components/input2';
import DropDown from "react-native-paper-dropdown";
import RadioButtons from '../components/radioButtons';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import Loading from '../components/loading';
import {serverURL} from '../internet';

 const FULL_WIDTH = Dimensions.get('window').width;
 const FULL_HEIGHT = Dimensions.get('window').height;
 
 const ListItem = ({token,route}) => {
  const [productName,setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [showDropDown, setShowDropDown] = useState(false);
  const [category,setCategory] = useState('')
  const [quantity,setQuantity] = useState('')
  const [newItem,setCondition] = useState(true)
  const [damages,setDamages] = useState('')
  const [deliveryType,setDeliveryType] = useState(true)
  const [deliveryNote,setDeliveryNote] = useState('')
  const [paymentMethod,setPaymentMethod] = useState(true)
  const [description,setDescription] = useState('')
  const [isLoading,setLoading] = useState(false)
  const [imagesPath,setImagePath] = useState([])
  const [errorMessage,setErrorMassege] = useState('')
  const [error,setError] = useState(false)



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

  const categoryList = [
    {
      label: "Text Book",
      value: "Text Book",
    },
    {
      label: "Clothing",
      value: "Clothing",
    },
    {
      label: "Stationary",
      value: "Stationary",
    },
    {
      label: "Electronics",
      value: "Electronics",
    },
    {
      label: "Food",
      value: "Food",
    },
  ];

  const selectPicture = (index) => {
    console.log("pick image")
    ImagePicker.openPicker({
      width: FULL_WIDTH,
      height: FULL_HEIGHT,
      cropping: true,
      compressImageQuality: 0.8,
      freeStyleCropEnabled:true
    })
      .then((image) => {
        console.log(image.path);
        return uploadImageToServer(image.path); // Return the promise chain here
      })
      .then((res) => {
        console.log(res)
        const newArray = [...imagesPath]
        newArray[index]=res.imageUrl
        setImagePath(newArray); // Assuming the image URL is returned in the response
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        
      });
  };
  
  const uploadImageToServer = async (path) => {
    const formData = new FormData();
    formData.append('image', {
      uri: path,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
  
    setLoading(true);
  
    try {
      const response = await axios.post(`${serverURL}/upload/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Image uploaded successfully:', response.data);
      return response.data; // Return the response for the next promise chain
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Throw the error to be caught in the next .catch()
    }
  };


  const uploadProduct =async()=>{
    if(imagesPath.length==0 || productName==='' ||price==='' || category===''||quantity==='' ||description ===''){
      setErrorMassege('Please fill all required fields');
      setError(true);
      return;
    }

    try {
      setLoading(true)
      //console.log(registrationData)
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.post(`${serverURL}/products/`, {
        product:{
          productName:productName,
          price:parseFloat(price),
          stockQuantity:parseInt(quantity),
          category:category,
          pCondition:newItem?'New':'Used',
          damages:damages,
          delevery:!deliveryType,
          deleveryNote:deliveryNote,
          acceptCash:paymentMethod,
          productDescription:description,
          images:imagesPath,
        }
      }, config);
      console.log(response)

      if(response.status==201){
        console.log('Response:', response.data);
        console.log("navigate")
        //navigation.replace('Login',{token:response.data.token})
      }else if(response.status==500){
        //console.log("Failed "+response.data.message)
        setErrorMassege('An error occured, please try again try again')
        setError(true)
      }else if(response.status==401){
        //console.log("Failed "+response.data.message)
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
  //setPIntendedScreens(false)

   return (

    <SafeAreaView style={styles.container}>
      <Image
        source={require('../images/handCampaign.png')}
        style={{
          width:FULL_WIDTH,
          height:FULL_HEIGHT,
          position: 'absolute',
          zIndex:-10
        }}
      />
      
        <View style={styles.headerContainer} >
            <View style={styles.tittleContainer}>
                <Text style={styles.tittleText}>
                    List Item
                </Text>
            </View>
            <HelperText type="error" visible={error}>
                  {errorMessage}
            </HelperText>
        </View>
        <View style={styles.body}>
          <View style={styles.formContainer}>
          
            <ScrollView             
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="always">

           
              <View style={styles.imagesContainer}>
              {imagesPath.length>=0?
                <TouchableOpacity style={styles.imageCont} onPress={()=>selectPicture(0)}>
                    {imagesPath[0] === undefined || imagesPath[0] === null || imagesPath[0] === ''?
                    <View style={styles.selectorContainer}>
                    <Image
                      source={require('../images/pick-image.png')}
                      style={{
                            width:50,
                            height:50,
                    }}
                      />
                        <Text style={{color:"#545F71",fontWeight:'700',fontSize:12}}>
                          Pick Image
                        </Text>
                    </View>:
                        <Image

                        source={{uri:imagesPath[0]}} 
                        style={{
                        //flex: 1,
                        width: '100%',
                        height: '100%',
                        borderRadius: 15, 
                        }}
                        resizeMode="center" 
                    />
                    }
                </TouchableOpacity>
                :''}
              {imagesPath.length>=1?
                <TouchableOpacity style={styles.imageCont} onPress={()=>selectPicture(1)}>
                    {imagesPath[1] === undefined || imagesPath[1] === null || imagesPath[1] === ''?
                    <View style={styles.selectorContainer}>
                    <Image
                      source={require('../images/pick-image.png')}
                      style={{
                            width:50,
                            height:50,
                    }}
                      />
                        <Text style={{color:"#545F71",fontWeight:'700',fontSize:12}}>
                          Pick Image
                        </Text>
                    </View>:
                        <Image
                        source={{uri:imagesPath[1]}} // Replace with the actual image path
                        style={{
                        //flex: 1,
                        width: '100%',
                        height: '100%',
                        borderRadius: 15, // Optional: Add border radius or other styles
                        }}
                        resizeMode="center" // Adjust the resizeMode based on your requirement
                        />
                    }
                </TouchableOpacity>
                :''}
              {imagesPath.length>=2?
                <TouchableOpacity style={styles.imageCont} onPress={()=>selectPicture(2)}>
                    {imagesPath[2] === undefined || imagesPath[2] === null || imagesPath[2] === ''?
                    <View style={styles.selectorContainer}>
                    <Image
                      source={require('../images/pick-image.png')}
                      style={{
                            width:50,
                            height:50,
                    }}
                      />
                        <Text style={{color:"#545F71",fontWeight:'700',fontSize:12}}>
                          Pick Image
                        </Text>
                    </View>
                  :
                    <Image
                      source={{uri:imagesPath[2]}} // Replace with the actual image path
                      style={{
                      //flex: 1,
                      width: '100%',
                      height: '100%',
                      borderRadius: 15, // Optional: Add border radius or other styles
                      }}
                      resizeMode="center" // Adjust the resizeMode based on your requirement
                  />}
                </TouchableOpacity>
                :''}

              </View>
              <Input required={true} maxLength={100} name="Product Name" text={productName} setText={setProductName}/>
              <TextInput
                  mode="flat"
                  label={"Price (R)"}
                  placeholder={"Price"}
                  placeholderTextColor="#545F71"
                  style={styles.textInputPrice}
                  onChangeText={handlePriceChange}
                  fontSize ={18}
                  textColor="rgba(66, 133, 244, 1)"
                  outlineColor="#545F71"
                  activeOutlineColor="rgba(66, 133, 244, 1)"
                  value={price}
                  keyboardType="numeric"
                  //maxLength={max}   
              />
            <View style={styles.textInputDrop}>
              <DropDown
                  label={"Select Category"}
                  mode={"flat"}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={category}
                  setValue={setCategory}
                  list={categoryList}
                  activeOutlineColor="rgba(66, 133, 244, 1)"
                  outlineColor="#545F71"
                  placeholderTextColor="#545F71"
                />
            </View>

            <TextInput
                  mode="flat"
                  label={"Stock Quantity"}
                  placeholder={"Stock Quantity"}
                  placeholderTextColor="#545F71"
                  style={styles.textInputStock}
                  onChangeText={handleQuantityChange}
                  fontSize ={18}
                  textColor="rgba(66, 133, 244, 1)"
                  outlineColor="#545F71"
                  activeOutlineColor="rgba(66, 133, 244, 1)"
                  value={quantity}
                  keyboardType="numeric"
                  //maxLength={max}   
              />
              
              <RadioButtons setType={setCondition} type={newItem} options={{opt1:"New",opt2:"Used",tittle:"Condition"}}/>
              {
                newItem?'':<Input required={false} maxLength={100} name="List Any Damages" text={damages} setText={setDamages}/>
              }
              <RadioButtons setType={setDeliveryType} type={deliveryType} options={{opt1:"Collection",opt2:"Delivery",tittle:"Delivery Type"}}/>
              {
                deliveryType?'':<Input required={false} maxLength={100} name="Delevery Note" text={deliveryNote} setText={setDeliveryNote}/>
              }
               <RadioButtons setType={setPaymentMethod} type={paymentMethod} options={{opt1:"Cash",opt2:"",tittle:"Payment Method"}}/>
               <TextInput
                  mode="flat"
                  label={"Product Description"}
                  placeholder={"Product Description"}
                  placeholderTextColor="#545F71"
                  style={styles.textInputDes}
                  onChangeText={setDescription}
                  fontSize ={18}
                  textColor="rgba(66, 133, 244, 1)"
                  outlineColor="#545F71"
                  activeOutlineColor="rgba(66, 133, 244, 1)"
                  value={description}
                  multiline={true}
                  numberOfLines = {5}
                  //keyboardType="numeric"
                  //maxLength={max}   
              />

              <View style={styles.footerButtonContainer}>
                  <TouchableOpacity style={styles.footerButton} onPress={uploadProduct}>
                    <Text style={{color:"#FFFFFF",fontWeight:'500',fontSize:24}}>
                          Done
                      </Text>
                  </TouchableOpacity>
              </View>
            </ScrollView>
          
          </View>
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
    paddingHorizontal:FULL_WIDTH*0.02,
   },tittleContainer:{
    width:'50%',
    height:'100%',
    justifyContent:'center'
   },tittleText:{
    fontSize:32,
    fontWeight:'500',
    color:'#545F71',
   },body:{
    height:FULL_HEIGHT*0.835,
    weight: FULL_WIDTH,
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',

   },formContainer:{
    height:FULL_HEIGHT*0.78,
    width:FULL_WIDTH*0.96,
    backgroundColor:'rgba(255,255,255,0.8)',
    borderRadius:15
   },textInputPrice:{
    width:'95%',
    backgroundColor:'rgba(255,255,255,0.6)',
    borderColor:'#545F71',
    alignSelf: 'center'
  },textInputDrop:{
    width:'95%',
    backgroundColor:'rgba(255,255,255,0.6)',
    borderColor:'#545F71',
    alignSelf: 'center',
    marginTop:15
  },textInputStock:{
    width:'95%',
    backgroundColor:'rgba(255,255,255,0.6)',
    borderColor:'#545F71',
    alignSelf: 'center',
    marginTop:15
  },  scrollViewContent: {
    
  },textInputDes:{
    width:'95%',
    backgroundColor:'rgba(255,255,255,0.6)',
    borderColor:'#545F71',
    alignSelf: 'center',
    marginVertical:15
  },imagesContainer:{
    width:'100%',
    height:FULL_HEIGHT*0.2,
    //backgroundColor:'black',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },imageCont:{
    width: '30%',
    height:'90%',
    borderWidth:1,
    borderRadius:15,
    borderColor:'#545F71',
    display:'flex',
    justifyContent: 'center',
    alignItems:'center'
  },selectorContainer:{
    width:'100%',
    height:'70%',
    justifyContent: 'center',
    alignItems:'center'
  },footerButtonContainer:{
    width:'100%',
    height:FULL_HEIGHT*0.1,
    //backgroundColor:'blue',
    justifyContent: 'center',
    alignItems:'center',
  },footerButton:{
    width:'90%',
    height:'70%',
    borderRadius:15,
    backgroundColor:'#545F71',
    justifyContent: 'center',
    alignItems:'center',
  }
 });
 
 export default ListItem;
 