import React from "react";

import { View, Text } from "react-native";

import { constants, COLORS, FONTS, SIZES, icons } from "../constants";

const HeaderBar = ({ title }) => {
  return (
    <View
      style={{
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: "flex-end",
      }}
    >
      <Text style={{ color: COLORS.white, ...FONTS.largeTitle }}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
