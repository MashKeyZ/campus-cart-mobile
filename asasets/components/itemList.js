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
   ScrollView,
   FlatList
 } from 'react-native';
import MarketProduct from './marketProduct';


 const FULL_HEIGHT = Dimensions.get('window').height;
 const FULL_WIDTH = Dimensions.get('window').width;
 const ItemList = ({products,setCart,cart}) => {

  
   return (
    <SafeAreaView style={styles.container}>
    {/*<ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.gridContainer}>
        {products.map((item, index) => (
          <MarketProduct key={index} product={item} path={item.path} />
        ))}
      </View>
    </ScrollView>*/}
    
    <FlatList
                data={products}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                  <MarketProduct product={item} path={item.path} setCart={setCart}cart={cart} productId={item.productId} />
                )}
                
              />
  </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
   container:{
    width : '100%',
    height : '100%',
    //paddingHorizontal : FULL_WIDTH *0.02,
   
   }, scrollViewContent: {
    flexGrow: 1,
  },  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height:'95%',
  },
   
 });
 
 export default ItemList;
 