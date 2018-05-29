import uuid from 'uuid/v4';
import { AsyncStorage } from 'react-native';

export async function getSuits() {
  const suitsString = await AsyncStorage.getItem('suits');
  try {
    const suits = JSON.parse(suitsString);
    suits.ids = suits.ids || [];
    suits.byId = suits.byId || {};
    return suits;
  } catch (e) {
    return {
      byId: {},
      ids: [],
    };
  }
}

export async function getSuit(id) {
  const suits = await getSuits(id);
  return suits.byId[id];
}

export async function saveSuit({ description }) {
  const id = uuid();

  const suits = await getSuits();
  suits.ids.push(id);
  suits.byId[id] = {
    description,
    createdAt: Date.now(),
    id,
  };
  await AsyncStorage.setItem('suits', JSON.stringify(suits));
  return id;
}
