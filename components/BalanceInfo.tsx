import React from "react";
import { View, Text, Image } from "react-native";

import { SIZES, COLORS, FONTS, icons } from "../constants";

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      {/* Title - Section */}
      <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>{title}</Text>
      {/* Figures - section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>$</Text>
        <Text
          style={{ ...FONTS.h2, color: COLORS.white, marginLeft: SIZES.base }}
        >
          {displayAmount.toLocaleString()}
        </Text>
        <Text
          style={{
            color: COLORS.lightGray3,
            ...FONTS.h3,
          }}
        >
          USD
        </Text>
      </View>
      {/* Change Pourcentage - section */}

      <View
        style={{
          flexDirection: "row",
        }}
      >
        {changePct != 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: "center",
              tintColor: changePct >= 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                changePct >= 0 ? [{ rotate: "45deg" }] : [{ rotate: "125deg" }],
            }}
          />
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: "flex-end",
            color: changePct >= 0 ? COLORS.lightGreen : COLORS.red,
          }}
        >
          {changePct.toFixed(2)}
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: "flex-end",
            color: COLORS.lightGray3,
            ...FONTS.body5,
          }}
        >
          7d change
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
