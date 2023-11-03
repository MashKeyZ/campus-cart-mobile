/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
     Modal,
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Dimensions
 } from 'react-native';
 import { ActivityIndicator, MD2Colors } from 'react-native-paper';
 
 const Loading = ({state}) => {
   return (
        <Modal 
             visible={state} 
             animationType="slide"
             transparent={true}
        >   
        <View style={styles.modalView}>
            <ActivityIndicator animating={state} color={MD2Colors.red800} size="large" />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    //backgroundColor:'red'
   }
 });
 
 export default Loading;
 