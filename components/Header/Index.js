import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { ColorsList } from "../../functions/Colors";
import { heightPercentage, widthPercentage } from "../../functions/Dimensions";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: heightPercentage(12),
        backgroundColor: ColorsList("white"),
        paddingHorizontal: widthPercentage(7),
        paddingTop: heightPercentage(3),
      }}
    >
      <FontAwesome5
        name="leaf"
        size={50}
        color={ColorsList("green")}
        style={{ width: widthPercentage(15) }}
      />
      <Text
        style={{
          color: ColorsList("green"),
          fontSize: 25,
          fontWeight: "bold",
          paddingLeft: widthPercentage(2),
        }}
      >
        Pied Pipper
      </Text>
    </View>
  );
};

export default Header;
