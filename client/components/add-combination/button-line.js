import React from 'react';
import { Button, View } from 'react-native';

const FlipButton = ({ onPress }) => (
  <Button
    style={{
      flex: 0.1,
    }}
    onPress={onPress}
    title="Flip"
  />
);

export default ({ onFlipPress, onSnapPress }) => (
  <View
    style={{
      flex: 0.2,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    {/* <FlipButton onPress={onFlipPress} /> */}
    <Button onPress={onSnapPress} title="Snap" style={{ flex: 0.1 }} />
  </View>
);
