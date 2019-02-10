import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './Home/HomeView';
import CategoryScreen from './Category/CategoryView';
import ShoppingCartScreen from './ShoppingCart/ShoppingCartView';
import ProfileScreen from './Profile/ProfileView';
import SideBar from '../components/SideBar';

const DrawerNav = createDrawerNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
    contentComponent: props => <SideBar {...props} />,
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: DrawerNav,
    Category: CategoryScreen,
    ShoppingCart: ShoppingCartScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
