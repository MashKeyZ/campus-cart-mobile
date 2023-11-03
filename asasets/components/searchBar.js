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
 const SearchBar = ({handleTextInputClick}) => {
    const [searchQuery, onChangeQuery] = useState('');


   return (
    <View style={styles.body}>
        <TextInput
            style={styles.input}
            onChangeText={onChangeQuery}
            value={searchQuery}
            placeholder="Search..."
            placeholderTextColor="#FFFFFF"
            fontSize ={16}
            color="#FFFFFF"
        />
        <TouchableOpacity style={styles.searchCont} onPress={handleTextInputClick}>
            <Image
                source={require('../images/search.png')}
                style={{width: 25,
                        height: 25, 
                        tintColor: "#FFFFFF",
                        
                    }}
            />
        </TouchableOpacity>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
   body:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

   },input:{
    width: '95%',
    height: 40,
    borderRadius:100/2,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal:15,
    backgroundColor:'rgba(217, 217, 217, 0.12)',

   },searchCont:{
    position:'absolute',
    right: 24,
   }
   
 });
 
 export default SearchBar;
 