import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ColorsList } from "../../functions/Colors";
import { heightPercentage, widthPercentage } from "../../functions/Dimensions";

const ButtonStyle = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: heightPercentage(7),
        backgroundColor: ColorsList("green"),
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: widthPercentage(5),
      }}
    >
      <Text
        style={{ color: ColorsList("white"), fontWeight: "bold", fontSize: 20 }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonStyle;
