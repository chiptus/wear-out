import React from 'react';
import { Text, View, Image } from 'react-native';
import { FileSystem } from 'expo';
import { getSuit } from '../../lib/state';

export default class SuitScreen extends React.Component {
  state = {
    suit: null,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const suit = await getSuit(id);
    this.setState({ suit });
  }

  render() {
    const { suit } = this.state;
    if (!suit) {
      return (
        <View>
          <Text>no suit available</Text>
        </View>
      );
    }
    console.log(suit);
    return (
      <View>
        <Image
          source={{
            uri: `file://${FileSystem.documentDirectory}/${suit.id}.png`,
          }}
          style={{ width: 250, height: 250 }}
        />
        <Text>{suit.description}</Text>
      </View>
    );
  }

  static navigationOptions = {
    title: 'Suit',
  };
}
