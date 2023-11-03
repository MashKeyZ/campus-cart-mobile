import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';


const FULL_WIDTH = Dimensions.get('window').width;
const FULL_HEIGHT = Dimensions.get('window').height;
const Location = ({university}) => {

    return (
    <View style={styles.bottom}>
    <Image
                    source={require('../images/location.png')}
                    style={{
                        width:20,
                        height:20,
                        
                    }}/>

        <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
            color:'#545F71',
            fontWeight:'700',
            fontSize:10,
                    
        }}>{university}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
   width : '50%',
   height : FULL_HEIGHT*0.06,
   display: 'flex',
   alignItems: 'center',
   flexDirection:'row',
 

  },tittle:{
    color:"#545F71",
    fontSize:24,
    fontWeight: '500',
  },bottom:{
    display:'flex',
    flexDirection:'row',
   }
});

export default Location;


