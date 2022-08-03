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

  const [displayTooltipBefore, setDisplayTooltipBefore] = useState(false);
  const [displayTooltipAfter, setDisplayTooltipAfter] = useState(false);
  const [displayTooltipFilePath, setDisplayTooltipFilePath] = useState(false);

  const [fileSize, setFileSize] = useState(null)

  const compressImage = async (uri) => {
    const compressValue = sliderValue <= 0.3 ? 0.3 : sliderValue;
    const result = await manipulateAsync(uri, [], {
      compress: parseFloat(compressValue),
      format: SaveFormat.JPEG,
      base64: true,
    });
    return result;
  };

  function bytesToSize(base64Length) {
    const bytes = 4 * Math.ceil((base64Length / 3))*0.5624896334383812;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }

  const handlePickImage = async () => {
    const getImage = await pickImage();
    if (getImage) {
      setImage(getImage.uri);
      setFileSize(bytesToSize(getImage.base64.length));
    }
  };

  const handleCompressImage = async () => {
    const compressResult = await compressImage(image);
    setImageCompressed(compressResult.uri);
    setFileSize(bytesToSize(compressResult.base64.length));
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

  const handleDisplayToolTipBefore = () => {
    setDisplayTooltipBefore(true);
    setTimeout(() => {
      setDisplayTooltipBefore(false);
    }, 2000);
  };

  const handleDisplayToolTipAfter = () => {
    setDisplayTooltipBefore(false);
    setDisplayTooltipAfter(true);
    setTimeout(() => {
      setDisplayTooltipAfter(false);
    }, 2000);
  };

  const handleDisplayToolFilePath = () => {
    setDisplayTooltipFilePath(true);
    setTimeout(() => {
      setDisplayTooltipFilePath(false);
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
            handleDisplayToolTipBefore();
            setShowImageCompare(true);
          }}
          onPressOut={() => {
            handleDisplayToolTipAfter();
            setShowImageCompare(false);
          }}
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

     {fileSize && <Text style={{textAlign: "center"}}>{fileSize}</Text>}

      {displayTooltipBefore && <ToolTip title={"Before"} />}
      {displayTooltipAfter && <ToolTip title={"After"} />}
      {displayTooltipFilePath && <ToolTip title={"Save At /pied-pipper"} />}

      <SliderStyle onValueChange={handleSlider} value={sliderValue} />

      {imageCompressed ? (
        <ButtonStyle
          onPress={() => {
            handleSaveImage();
            handleDisplayToolFilePath();
          }}
        >
          Save
        </ButtonStyle>
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
