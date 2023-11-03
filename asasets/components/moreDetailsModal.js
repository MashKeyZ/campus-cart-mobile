/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useRef, useState } from 'react';
 import {
     Modal,
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableOpacity,
   ScrollView,
   Image,
   FlatList
 } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
 import { ActivityIndicator, MD2Colors, TextInput } from 'react-native-paper';
import ReviewComponent from './reviewComponent';

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
 
 const MoreDetailsModal = ({state,change,product,stars, setStars,review,setReview,reviews,sendReview}) => {
    const [openModal,setModal] = useState(false)
    const flatListRef = useRef(null)

    const add=()=>{
        if(stars<5){
            setStars(prev=>{return prev+1})
        }
    }
    const minus=()=>{
        if(stars>0){
            setStars(prev=>{return prev-1})
        }
    }

    const send=async()=>{
        setModal(false)
        await sendReview()
    }
   return (
        <Modal 
             visible={state} 
             animationType="slide"
             transparent={true}
        >   
        <View style={styles.modalView}>
        <LinearGradient
        colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0.765983893557423)', 'rgba(255,255,255,0.19343487394957986)']}
        start={{ x: 0, y: 1 }} // Change the y-coordinate to start from the bottom
        end={{ x: 0, y: 0 }}   // Change the y-coordinate to end at the top
        style={styles.gradient}
        >
            <View style={styles.headerContainer} >
                <TouchableOpacity onPress={change} style={{
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
            <View style={styles.bodyContainer}>
                <ScrollView>
                    <View style={styles.tableContainer}>
                        <Text style={{
                            color:'#545F71',
                            fontSize:24,
                            fontWeight: 'bold',
                            paddingHorizontal:5,
                            paddingVertical:5

                        }}>Details</Text>
                        <TableRow tittle="Name" description={product.productName}/>
                        <TableRow tittle="Price" description={product.price}/>
                        <TableRow tittle="Category" description={product.category}/>
                        <TableRow tittle="Condition" description={product?.pCondition}/>
                        <TableRow tittle="Damages" description={product?.damages||'None'}/>
                        <TableRow tittle="Cash on Delevery" description="Yes"/>
                        <TableRow tittle="Delevery Note" description={product?.deleveryNote||'None'}/>
                        <TableRow tittle="Stock" description={product?.stockQuantity>0?'Available':'Sold Out'}/>

                    </View>

                    <View style={styles.reviewsContianer}>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{
                            color:'#545F71',
                            fontSize:24,
                            fontWeight: 'bold',
                            paddingHorizontal:5,
                            paddingVertical:5

                        }}>Reviews</Text>
                        <Text style={{
                            color:'#545F71',
                            fontSize:24,
                            fontWeight: 'bold',
                            paddingHorizontal:5,
                            paddingVertical:5

                        }} onPress={()=>setModal(true)}>Add Review</Text>
                    </View>
               
                   
                    </View>

                </ScrollView>
                
            </View>
            <View style={{width:'100%',height:FULL_HEIGHT*0.4}}>
                <FlatList
                        data={reviews}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item,index }) => (
                            <ReviewComponent item={item}/>
                        )}
                        ref={flatListRef}
                        onContentSizeChange={() => {
                        flatListRef.current.scrollToEnd({animated: true});
                        }}
                        />
                </View>
    </LinearGradient>
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
                  label={"Review"}
                  placeholder={"Review"}
                  placeholderTextColor="#545F71"
                  style={styles.textInputStock}
                  onChangeText={setReview}
                  fontSize ={18}
                  textColor="#545F71"
                  outlineColor="#545F71"
                  activeOutlineColor="rgba(66, 133, 244, 1)"
                  value={review}
                  multiline={true}
                  numberOfLines={4}
                  //keyboardType="numeric"
                  //maxLength={max}   
              />
            <View style={styles.quantityCont}>
            <TouchableOpacity style={styles.increamentButton} onPress={minus} >
                <Image style={{
                  width:15,
                  height:30,
                }}
                source={require('../images/minus.png')}
                />
            </TouchableOpacity>

            <Text style={{
              color:'#2C2C4C',
              fontSize:24,
              fontWeight: '700',
              paddingHorizontal:10
            }}>
              {stars}
            </Text>

            <TouchableOpacity style={styles.increamentButton} onPress={add}>
            <Image style={{
                  width:20,
                  height:20,
                }}
                source={require('../images/PlusMathnav.png')}
                />
            </TouchableOpacity>
          </View> 
            <TouchableOpacity style={styles.checkOutButton2} onPress={send}>
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
        </Modal>
       
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
    paddingHorizontal:FULL_WIDTH*0.02,

   },bodyContainer:{
    width : FULL_WIDTH,
    height : FULL_HEIGHT*0.40,
    paddingHorizontal:FULL_WIDTH*0.02,
    //backgroundColor:'black'
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
    backgroundColor:'#FFFFFF',
    elevation:3,
    borderRadius:10,
    paddingVertical:5,
    paddingHorizontal:2,
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
 
 export default MoreDetailsModal;
 