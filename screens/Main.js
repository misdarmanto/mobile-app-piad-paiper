import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
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
import { pickImage } from "../functions/pickImage";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { saveImage } from "../functions/saveImage";
import ToolTip from "../components/Tooltip/Tooltip";
import { HStack, Progress, Slider, Text } from "native-base";
import { bytesToSize } from "../functions/byteToSize";

const Main = () => {
  const [image, setImage] = useState(null);
  const [imageCompressed, setImageCompressed] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [showImageCompare, setShowImageCompare] = useState(false);

  const [displayTooltipBefore, setDisplayTooltipBefore] = useState(false);
  const [displayTooltipAfter, setDisplayTooltipAfter] = useState(false);
  const [displayTooltipFilePath, setDisplayTooltipFilePath] = useState(false);

  const [fileSize, setFileSize] = useState({ before: null, after: null });

  const compressImage = async (uri) => {
    const convertSliderValue = sliderValue / 100;
    const compressValue = convertSliderValue <= 0.3 ? 0.3 : convertSliderValue;
    const result = await manipulateAsync(uri, [], {
      compress: parseFloat(compressValue),
      format: SaveFormat.JPEG,
      base64: true,
    });
    return result;
  };

  const handlePickImage = async () => {
    const getImage = await pickImage();
    if (getImage) {
      setImage(getImage.uri);
      const imageSize = bytesToSize(getImage.base64.length);
      setFileSize({ ...fileSize, before: imageSize });
    }
  };

  const handleCompressImage = async () => {
    const compressResult = await compressImage(image);
    setImageCompressed(compressResult.uri);
    const imageSize = bytesToSize(compressResult.base64.length);
    setFileSize({ ...fileSize, after: imageSize });
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

      {image && !imageCompressed && (
        <Text style={{ textAlign: "center" }}> size: {fileSize.before}</Text>
      )}
      {imageCompressed && (
        <>
          
            <Progress mb={4} w={"16"} value={55} bgColor="teal.500" />
            <Text style={{ textAlign: "center" }}>
              before: {fileSize.before}
            </Text>
       
          <Text style={{ textAlign: "center" }}>after: {fileSize.after}</Text>
        </>
      )}

      {displayTooltipBefore && <ToolTip title={"Before"} />}
      {displayTooltipAfter && <ToolTip title={"After"} />}
      {displayTooltipFilePath && <ToolTip title={"Save At /pied-pipper"} />}

      <HStack justifyContent="center" my="5" space={2}>
        <Slider
          w="3/4"
          maxW="300"
          defaultValue={50}
          onChange={handleSlider}
          minValue={0}
          colorScheme={ColorsList("green")}
          maxValue={100}
          accessibilityLabel="hello world"
          step={1}
        >
          <Slider.Track>
            <Slider.FilledTrack bg={ColorsList("green")} />
          </Slider.Track>
          <Slider.Thumb bg={ColorsList("green")} />
        </Slider>
        <Text>{parseInt(sliderValue)} %</Text>
      </HStack>

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
