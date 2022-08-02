import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import Header from "../components/Header/Index";
import { ColorsList } from "../functions/Colors";
import ButtonStyle from "../components/Button/ButtonStyle";
import { heightPercentage, widthPercentage } from "../functions/Dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SliderStyle from "../components/Slider/SliderStyle";
import { pickImage } from "../functions/pickImage";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { saveImage } from "../functions/saveImage";
import ToolTip from "../components/Tooltip/Tooltip";

const Main = () => {
  const [image, setImage] = useState(null);
  const [imageCompressed, setImageCompressed] = useState(null);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [showImageCompare, setShowImageCompare] = useState(false);
  const [displayTooltip, setDisplayTooltip] = useState(false);

  const compressImage = async (uri) => {
    const result = await manipulateAsync(uri, [], {
      compress: parseFloat(sliderValue),
      format: SaveFormat.JPEG,
    });
    return result.uri;
  };

  const handlePickImage = async () => {
    const imageUri = await pickImage();
    if (imageUri) {
      setImage(imageUri);
    }
  };

  const handleCompressImage = async () => {
    const compressResult = await compressImage(image);
    setImageCompressed(compressResult);
  };

  const handleSaveImage = async () => {
    await saveImage(imageCompressed);
    setImage(null);
    setImageCompressed(null);
  };

  const handleSlider = (value) => {
    const rounderValue = value.toFixed(1);
    setSliderValue(rounderValue);
  };

  const handleDisplayToolTip = () => {
    setDisplayTooltip(true);
    setTimeout(() => {
      setDisplayTooltip(false);
    }, 2000);
  };

  return (
    <View style={{ backgroundColor: ColorsList("grayOpacity"), flex: 1 }}>
      <Header />
      {!image ? (
        <TouchableOpacity
          style={style.imageContainer}
          onPress={handlePickImage}
        >
          <MaterialCommunityIcons
            name="folder-image"
            size={50}
            color={ColorsList("gray")}
          />
          <Text style={{ color: ColorsList("gray") }}>Choice Image</Text>
        </TouchableOpacity>
      ) : imageCompressed ? (
        <Pressable
          onLongPress={() => {
            handleDisplayToolTip();
            setShowImageCompare(true);
          }}
          onPressOut={() => setShowImageCompare(false)}
          onPress={handlePickImage}
        >
          <Image
            source={{ uri: !showImageCompare ? imageCompressed : image }}
            style={style.imageContainer}
          />
        </Pressable>
      ) : (
        <TouchableOpacity onPress={handlePickImage}>
          <Image source={{ uri: image }} style={style.imageContainer} />
        </TouchableOpacity>
      )}

      {displayTooltip && <ToolTip title={"before"} />}
      <SliderStyle onValueChange={handleSlider} value={sliderValue} />

      {imageCompressed ? (
        <ButtonStyle onPress={handleSaveImage}>Save</ButtonStyle>
      ) : (
        <ButtonStyle onPress={handleCompressImage}>Compress</ButtonStyle>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const style = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: heightPercentage(50),
    backgroundColor: ColorsList("white"),
    marginHorizontal: widthPercentage(5),
    marginVertical: heightPercentage(5),
    borderRadius: 20,
  },
});

export default Main;
