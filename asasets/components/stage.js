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
const Stage = ({heading,image}) => {

    return (
   <View style={styles.container}>
        <Image
            source={image}
            style={{
                width:30,
                height:30,
                tintColor:"#545F71"
            }}
        />

       <Text style={styles.tittle}>
        {heading}
       </Text>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
   width : '100%',
   height : FULL_HEIGHT*0.06,
   display: 'flex',
   alignItems: 'center',
   flexDirection:'row',
 

  },tittle:{
    color:"#545F71",
    fontSize:24,
    fontWeight: '500',
  }
});

export default Stage;

