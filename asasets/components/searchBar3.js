/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState} from 'react';
 import {
   TextInput,
   StyleSheet,
   Text,
   View,
   Dimensions,
   Image,
   TouchableOpacity
 } from 'react-native';

 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const SearchBar3 = () => {
    const [searchQuery, onChangeQuery] = useState('');


   return (
    <View style={styles.body}>
        <View style={styles.shadowCont}>
        <TextInput
            style={styles.input}
            onChangeText={onChangeQuery}
            value={searchQuery}
            placeholder="Try Search by university..."
            placeholderTextColor="#545F71"
            fontSize ={16}
            color="#303054"
        />
        <TouchableOpacity style={styles.searchCont}>
            <Image
                source={require('../images/search.png')}
                style={{width: 25,
                        height: 25, 
                        tintColor: "#303054",
                    }}
            />
        </TouchableOpacity>
        </View>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   body:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

   },input:{
    width: '99%',
    height: 40,
    borderRadius:100/2,
    borderColor: '#303054',
    borderWidth: 1,
    paddingHorizontal:15,
    backgroundColor:'rgba(248, 250, 254, 1)',
 
   },searchCont:{
    position:'absolute',
    right: 24,
    bottom:10,
   },shadowCont:{
    width: '95%',
    height: 43,
    borderRadius:100/2,
    elevation: 10,
    
   }
   
 });
 
 export default SearchBar3;
 