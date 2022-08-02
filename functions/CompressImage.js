import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export const compressImage = async (uri) => {
  const result = await manipulateAsync(uri, [], {
    compress: 0.2,
    format: SaveFormat.JPEG,
  });
  return result;
};
