// import React from 'react';

import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Add from './components/add-combination/new-suit-screen';
import Suit from './components/suit/suit';
import Gallery from './components/gallery-screen/gallery-screen';
import Closet from './components/closet-screen/closet-screen';

export default createSwitchNavigator(
  {
    Add,
    Closet: createStackNavigator(
      {
        Suit,
        Gallery,
        Closet,
      },
      { initialRouteName: 'Closet' },
    ),
  },
  { initialRouteName: 'Closet' },
);

/* global __DEV__ */
if (__DEV__) {
  // eslint-disable-next-line global-require
  require('react-native').YellowBox.ignoreWarnings([
    'Warning: Failed child context type: Invalid child context',
  ]);
}
