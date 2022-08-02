import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import { heightPercentage, widthPercentage } from "../../functions/Dimensions";
import { ColorsList } from "../../functions/Colors";
import { View, Text } from "react-native";

const SliderStyle = ({onValueChange, value}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: widthPercentage(3),
        marginVertical: heightPercentage(2),
      }}
    >
      <Slider
        style={{
          height: heightPercentage(5),
          width: widthPercentage(80),
        }}
        minimumValue={0}
        value={value}
        maximumValue={1}
        onValueChange={onValueChange}
        minimumTrackTintColor={ColorsList("green")}
        maximumTrackTintColor="#000000"
      />
      <Text>{value *100} %</Text>
    </View>
  );
};

export default SliderStyle;
