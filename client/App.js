// import React from 'react';

import { createStackNavigator } from 'react-navigation';
import Home from './components/home-screen/home-screen';
import Add from './components/add-combination/new-suit-screen';
import Suit from './components/suit/suit';
import Gallery from './components/gallery-screen/gallery-screen';
import Closet from './components/closet-screen/closet-screen';

export default createStackNavigator(
  { Home, Add, Suit, Gallery, Closet },
  { initialRouteName: 'Closet' },
);

if (__DEV__) {
  // eslint-disable-next-line global-require
  require('react-native').YellowBox.ignoreWarnings([
    'Warning: Failed child context type: Invalid child context',
  ]);
}
