import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import { Switch, TextInput } from 'react-native-paper';


const FULL_WIDTH = Dimensions.get('window').width;
const FULL_HEIGHT = Dimensions.get('window').height;
const RadioButtons = ({setType,type,options}) => {

    //const [isSwitchOn, setIsSwitchOn] = React.useState(type);
    const onToggleSwitch = () => setType(!type);

    return (
   <View style={styles.container}>
    <Text style={{
        fontSize:16,
        fontWeight:'600',
        color:"#545F71",

    }}>
        {options.tittle}
    </Text>
    <View style={styles.textInput}>
    <Text style={{
        fontSize:16,
        fontWeight:'600',
        color:"#545F71",

    }}>
        {options.opt1}
    </Text>
    <Switch value={type} onValueChange={onToggleSwitch} />

    <Text style={{
        fontSize:16,
        fontWeight:'600',
        color:"#545F71",

    }}>
        {options.opt2}
    </Text>
    <Switch value={!type} onValueChange={onToggleSwitch} />

    </View>
    
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
   width : '100%',
   height : FULL_HEIGHT*0.11,
   display: 'flex',
   //alignItems: 'center',
   justifyContent: 'center',
   paddingHorizontal:10
   

  },tittle:{
    color:"#545F71",
    fontSize:24,
    fontWeight: '500',
  },textInput:{
    width:'100%',
    height:'50%',
    //backgroundColor:'#FFFFFF',
    borderColor:'#545F71',
    display: 'flex',
    alignItems: 'center',
    //justifyContent: 'center',
    flexDirection:'row'
  }
});

export default RadioButtons;
