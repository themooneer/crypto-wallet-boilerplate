import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import MainLayout from "./MainLayout";
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketActions";
import { useFocusEffect } from "@react-navigation/core";
import { SIZES, FONTS, dummyData, COLORS, icons } from "../constants";
import BalanceInfo from "../components/BalanceInfo";
import IconTextButton from "../components/IconTextButton";
import Chart from "../components/Chart";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }: any) => {
  const [selectedCoin, setSelectedCoin] = useState(coins[0] || null);

  useFocusEffect(
    useCallback(() => {
      getHoldings(dummyData.holdings);
      getCoinMarket();
    }, [])
  );

  useEffect(() => {
    if (coins.length) setSelectedCoin(coins[0]);
  }, [coins]);
  const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  const valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  const percChange = (valueChange / (totalWallet - valueChange)) * 100;
  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        {/** Balance info section */}

        <BalanceInfo
          title="Your wallet"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: 50,
          }}
        />

        {/** Buttons */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
          />
        </View>
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
        {/** Header Section - Wallet info */}
        {renderWalletInfoSection()}
        {/** Chart section  */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding,
          }}
          chartPrices={selectedCoin?.sparkline_in_7d?.price}
        />
        {/** Top crypto section */}
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View
              style={{
                marginBottom: SIZES.radius,
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                Top CryptoCurrencies
              </Text>
            </View>
          }
          renderItem={({ item }: any) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: 55,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setSelectedCoin(item)}
              >
                {/**Logo */}
                <View style={{ width: 35 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: 20, width: 20 }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      color: priceColor,
                      ...FONTS.body4,
                      textAlign: "right",
                    }}
                  >
                    $ {item.current_price}
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
                        color: priceColor,
                        marginLeft: 5,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: 50,
              }}
            />
          }
        />
      </View>
    </MainLayout>
  );
};

const mapStateToProps = (state: any) => ({
  myHoldings: state.marketReducer.myHoldings,
  coins: state.marketReducer.coins,
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
  getCoinMarket: (
    coins,
    currency,
    orderBy,
    sparkline,
    priceChangePerc,
    perPage,
    page
  ) =>
    dispatch(
      getCoinMarket(
        coins,
        currency,
        orderBy,
        sparkline,
        priceChangePerc,
        perPage,
        page
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
