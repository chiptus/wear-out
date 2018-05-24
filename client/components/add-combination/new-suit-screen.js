// import React from 'react';

import { createStackNavigator } from 'react-navigation';
import Camera from './camera';
import SaveSuit from './save-suit';
const Screen = createStackNavigator(
  { Camera, SaveSuit },
  { initialRouteName: 'Camera' },
);

export default Screen;
