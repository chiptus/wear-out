// import React from 'react';

import { createStackNavigator } from 'react-navigation';
import Home from './components/home-screen/home-screen';
import Add from './components/add-combination/add-combination';

export default createStackNavigator(
  { Home, Add },
  { initialRouteName: 'Home' },
);
