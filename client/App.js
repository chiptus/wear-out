// import React from 'react';

import { createStackNavigator } from 'react-navigation';
import Home from './components/home-screen/home-screen';
import Add from './components/add-combination/new-suit-screen';
import Suit from './components/suit/suit';

export default createStackNavigator(
  { Home, Add, Suit },
  { initialRouteName: 'Add' },
);
