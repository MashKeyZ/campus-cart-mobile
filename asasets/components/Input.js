import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import { TextInput } from 'react-native-paper';


const FULL_WIDTH = Dimensions.get('window').width;
const FULL_HEIGHT = Dimensions.get('window').height;
const Input = ({setText,required,text,name,maxLength}) => {
  const max = maxLength||100
    return (
   <View style={styles.container}>
    <Text style={{
        color:'red',
        fontSize:14,
        position:'absolute',
        right:0,
        top:0,
    }}>{required?'*':''}</Text>
     <TextInput
        mode="outlined"
        label={name}
        placeholder={name}
        placeholderTextColor="#545F71"
        style={styles.textInput}
        onChangeText={setText}
        fontSize ={18}
        textColor="rgba(66, 133, 244, 1)"
        outlineColor="#545F71"
        activeOutlineColor="rgba(66, 133, 244, 1)"
        value={text}
        maxLength={max}
        required
        
              
     />


   </View>
  );
}

const styles = StyleSheet.create({
  container:{
   width : '100%',
   height : FULL_HEIGHT*0.11,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   

  },tittle:{
    color:"#545F71",
    fontSize:24,
    fontWeight: '500',
  },textInput:{
    width:'95%',
    backgroundColor:'rgba(255,255,255,0.8)',
    borderColor:'#545F71',
  }
});

export default Input;
