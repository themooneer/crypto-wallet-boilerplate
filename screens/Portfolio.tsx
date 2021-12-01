import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import MainLayout from "./MainLayout";

import { connect } from "react-redux";

import { useFocusEffect } from "@react-navigation/core";
import { getHoldings } from "../stores/market/marketActions";

import BalanceInfo from "../components/BalanceInfo";
import Chart from "../components/Chart";

import { COLORS, SIZES, FONTS, dummyData, icons } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
const Portfolio = ({ getHoldings, myHoldings }: any) => {
  useFocusEffect(
    useCallback(() => {
      getHoldings(dummyData.holdings);
    }, [])
  );

  const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  const valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  const percChange = (valueChange / (totalWallet - valueChange)) * 100;
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    if (!selectedCoin) {
      setSelectedCoin(myHoldings[0]);
    }
  }, [myHoldings]);
  function renderCurrentBalanceSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        <Text
          style={{
            marginTop: 50,
            color: COLORS.white,
            ...FONTS.largeTitle,
          }}
        >
          Portfolio
        </Text>
        <BalanceInfo
          title="Current Balance"
          displayAmount={totalWallet}
          changePct={valueChange}
          containerStyle={{}}
        />
      </View>
    );
  }
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header Section - current Balance */}
        {renderCurrentBalanceSection()}
        {/* Chart Section */}
        <Chart chartPrices={(selectedCoin as any)?.sparkline_in_7d?.value} />
        {/** Your assets */}

        <FlatList
          data={myHoldings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              {/* Section Title */}
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.white,
                }}
              >
                Your assets
              </Text>
              {/* Header Label */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ flex: 1, color: COLORS.lightGray3 }}>Asset</Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            console.log(item);
            return (
              <TouchableOpacity
                style={{ flexDirection: "row", height: 55 }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* Asset */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                {/* Price */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                      alignSelf: "flex-end",
                    }}
                  >
                    $ {item.current_price.toLocaleString()}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          width: 10,
                          height: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}
                    <Text
                      style={{
                        ...FONTS.body5,
                        color: priceColor,
                        marginLeft: 5,
                        lineHeight: 15,
                        alignSelf: "flex-end",
                      }}
                    >
                      {item?.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}
                  >
                    $ {item.total.toLocaleString()}
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.lightGray3,
                      ...FONTS.body5,
                      lineHeight: 15,
                    }}
                  >
                    {item.qty} {item.symbol.toUpperCase()}
                  </Text>
                </View>
                {/* Holdings */}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  myHoldings: state.marketReducer.myHoldings,
});

const mapDispatchToProps = (dispatch: any) => ({
  getHoldings: (
    holdings,
    currency,
    orderBy,
    sparkline,
    priceChangePerc,
    perPage,
    page
  ) =>
    dispatch(
      getHoldings(
        holdings,
        currency,
        orderBy,
        sparkline,
        priceChangePerc,
        perPage,
        page
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
