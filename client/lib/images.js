import { FileSystem } from 'expo';

export function getImageName(suitId) {
  return `file://${FileSystem.documentDirectory}/${suitId}.png`;
}

export async function saveSuitImage(suitId, photo) {
  await FileSystem.copyAsync({
    from: photo,
    to: getImageName(suitId),
  });
}
