import React,{useState} from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CampusStore from '../screens/campusStore';
import Home from '../screens/home';
import ListItem from '../screens/listItem';
import MarketPlace from '../screens/marketPlace';
import MyProfile from '../screens/myProfile';
import Login from '../screens/login';
import Welcome from '../screens/welcome';
import PersonalDetails from '../screens/register/personalDetails';
import Address from '../screens/register/address';
import AccountType from '../screens/register/accountType';
import ChoosePassword from '../screens/register/choosePassword';
import ProfilePicture from '../screens/register/profilePicture';
import Product from '../screens/product';
import CartScreen from '../screens/cartScreen';
import Inbox from '../screens/inbox';
import Chats from '../screens/chats';
import MyProducts from '../screens/myProducts';
import MyOrders from '../screens/myOrders';
import OrderScreen from '../screens/orderScreen';
import StoreScreen from '../screens/storeScreen';
import TrackOrders from '../screens/trackOrders';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const  MyTabs =({ route })=> {
  const token = route.params?.token;
  const products =route.params?.gProducts;
  const socket = route.params?.socket;
  const profile = route.params?.profile;
  //const cart = route.params?.gCart;
  const currentUser = route.params?.currentUser;
  const [cart,setGlobalCart] = useState(route.params?.gCart)
  const HomeScreenComponent = (props) => <Home {...props} token={token} gProducts={products} gCart={cart} socket={socket} currentUser={currentUser} profile={profile}/>;
  const MarketPlaceScreenComponent = (props) => <MarketPlace {...props} token={token} gProducts={products} gCart={cart} setGlobalCart={setGlobalCart}socket={socket} currentUser={currentUser} profile={profile}/>;
  const ListItemScreenComponent = (props) => <ListItem {...props} token={token} gProducts={products} gCart={cart} socket={socket} currentUser={currentUser} profile={profile}/>;
  const CampusStoreScreenComponent = (props) => <CampusStore {...props} token={token} gProducts={products} gCart={cart} socket={socket} currentUser={currentUser} profile={profile}/>;
  const MyProfileScreenComponent = (props) => <MyProfile {...props} token={token} gProducts={products} gCart={cart} socket={socket} currentUser={currentUser} profile={profile}/>;


  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#F8C134"
      inactiveColor='#2C2C4C'
      screenOptions={{
        //tabBarActiveTintColor: '#e91e63',
        headerShown:false,
        tabBarHideOnKeyboard:true
      }}
      barStyle={{ backgroundColor: '#FFFFFF',
                    borderTopColor: '#2C2C4C',
                    borderTopWidth:0.5,
                    height: 50,
                    paddingVertical:0
                }}
      shifting = {true}
      labeled ={false}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenComponent}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/home1.png')} // Use your custom icon path
              style={{ width: 35, height: 35, tintColor: color,marginTop: 0  }} // Define dimensions and color
            />
          ),
        }}
      />
      <Tab.Screen
        name="MarketPlace"
        component={MarketPlaceScreenComponent}
        options={{
          tabBarLabel: 'MarketPlace',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/FastCartnav.png')} // Use your custom icon path
              style={{ width: 35, height: 35, tintColor: color,marginTop: 0   }} // Define dimensions and color
            />
          ),
        }}
      />
      <Tab.Screen
        name="ListItem"
        component={ListItemScreenComponent}
        options={{
          tabBarLabel: 'List Item',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/PlusMathnav.png')} // Use your custom icon path
              style={{ width: 35, height: 35, tintColor: color,marginTop: 0   }} // Define dimensions and color
            />
          ),
        }}
      />
    <Tab.Screen
        name="CampusStore"
        component={CampusStoreScreenComponent}
        options={{
          tabBarLabel: 'Campus Store',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/SmallBusinessnav.png')} // Use your custom icon path
              style={{ width: 35, height: 35, tintColor: color,marginTop: 0  }} // Define dimensions and color
            />
          ),
        }}
      />
    <Tab.Screen
        name="MyProfile"
        component={MyProfileScreenComponent}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/Usernav.png')} // Use your custom icon path
              style={{ width: 35, height: 35, tintColor: color,marginTop: 0   }} // Define dimensions and color
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome" // Change this to the initial route you want
      screenOptions={{
        headerShown: false, // Hide the header
        gestureEnabled: true, // Enable horizontal gesture animation
        gestureDirection: 'horizontal', // Set gesture direction to horizontal
        
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeTabs" component={MyTabs} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="AccountType" component={AccountType} />
      <Stack.Screen name="ChoosePassword" component={ChoosePassword} />
      <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="MyProducts" component={MyProducts} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="StoreScreen" component={StoreScreen} />
      <Stack.Screen name="TrackOrders" component={TrackOrders} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
