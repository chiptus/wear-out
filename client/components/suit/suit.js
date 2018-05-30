import React from 'react';
import { Text, View, Image } from 'react-native';
import { getSuit } from '../../lib/state';
import { getImageName } from '../../lib/images';
import { format } from 'date-fns';
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
            uri: getImageName(suit.id),
          }}
          style={{ width: 250, height: 250 }}
        />
        <Text>{suit.description}</Text>
        <Text>{format(suit.createdAt, 'DD/MM/YYYY')}</Text>
      </View>
    );
  }

  static navigationOptions = {
    title: 'Suit',
  };
}
