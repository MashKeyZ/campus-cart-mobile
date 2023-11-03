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


 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const Filter = ({filter,setDoNotUpdate,doNotUpdate}) => {
    const [selected,setSelected]= useState('All')

    let elements = ["All","Electronics","Stationary","Food","Clothing","Text Books","Kota","Search","Promotion"]
    const filterOut=(text)=>{
      setDoNotUpdate(!doNotUpdate)
        setSelected(text)
        filter(text)
    }
    const Component= ({text})=>{
        return(
            <TouchableOpacity onPress={()=>filterOut(text)}>
                <Text style={{textAlign:'center',fontSize:14,fontWeight:'500',color:"#545F71",
                                backgroundColor:selected==text?"#D9D9D9":"#FFFFFF",
                                paddingHorizontal:10,
                                paddingVertical:5,
                                borderRadius:100,
                                elevation: selected==text?5:0,   
                                    }}>
                    {text}
                </Text>
            </TouchableOpacity>

        )
    }
   return (
    <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {elements.map((text,index) => (
                <Component 
                text={text}
                 key={text}
                 style={{ marginRight: index !== elements.length - 1 ? 10 : 0 }}
                 />
            ))}
        </ScrollView>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    width : '100%',
    height : '5%',
    //paddingHorizontal : FULL_WIDTH *0.02,
   },backGround:{
     height: FULL_HEIGHT,
     width: FULL_WIDTH,
     backgroundColor:'#545F71',
   },headerCont:{
    display:'flex',
    flexDirection:'row',
    width:'auto',
    height: 50,
    justifyContent:'space-between',
    alignItems: 'center',
   },tittle:{
    fontSize:36,
    fontWeight:'bold',
   },body:{
    width:'100%',
    height:'20%',
    backgroundColor:'#FFFFFF',
   }
   
 });
 
 export default Filter;
 