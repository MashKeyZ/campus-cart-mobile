import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';


const FULL_WIDTH = Dimensions.get('window').width;
const FULL_HEIGHT = Dimensions.get('window').height;
const RegHeader = ({step}) => {

    let colors = ["#545F71","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9"] 
    for(let i =0;i<step;i++){
        colors[i]="#545F71"
        console.log(colors[i])
    }

    return (
   <View style={styles.container}>
       <Text style={styles.tittle}>
         Step {step}
       </Text>
       <View style={styles.divider}></View>
       <View style={styles.progCont}>
            <View style={[styles.progress,{backgroundColor:colors[0]}]}></View>
            <View style={[styles.progress,{backgroundColor:colors[1]}]}></View>
            <View style={[styles.progress,{backgroundColor:colors[2]}]}></View>
            <View style={[styles.progress,{backgroundColor:colors[3]}]}></View>
            <View style={[styles.progress,{backgroundColor:colors[4]}]}></View>
       </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
   width : '100%',
   height : FULL_HEIGHT*0.10,
   display: 'flex',

  },tittle:{
    color:"#545F71",
    fontSize:36,
    fontWeight: 'bold',
  },divider:{
    backgroundColor:'#545F71',
    width:'100%',
    height:'12%',
  },progCont:{
    width:'100%',
    height:'10%',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   },progress:{
    width:'19%',
    height:'60%',
    borderRadius:35,
   }
});

export default RegHeader;
