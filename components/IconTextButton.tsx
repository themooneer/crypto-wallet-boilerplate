import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";

import { COLORS, FONTS, SIZES } from "../constants";

const IconTextButton = ({ label, icon, containerStyle, onPress }: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        resizeMode="contain"
        source={icon}
        style={{
          width: 20,
          height: 20,
        }}
      />

      <Text
        style={{
          marginLeft: SIZES.base,
          ...FONTS.h4,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default IconTextButton;
