import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
    allowsEditing: true,
    // aspect: [4, 3],
    base64: true,
    quality: 1,
  });
  return !result.cancelled ? result : null;
};
