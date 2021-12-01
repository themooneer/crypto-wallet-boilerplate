import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from "react-native";

import { connect } from "react-redux";
import { getCoinMarket } from "../stores/market/marketActions";

import { constants, COLORS, FONTS, SIZES, icons } from "../constants";
import MainLayout from "./MainLayout";
import HeaderBar from "../components/HeaderBar";
import TextButton from "../components/TextButton";
import { LineChart } from "react-native-chart-kit";

const marketTabs = constants.marketTabs.map((mt) => ({
  ...mt,
  ref: React.createRef(),
}));
const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = marketTabs.map((_, i) => i * SIZES.width);
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((m) => m.x),
  });
  console.log(measureLayout.map((m) => m.x));

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: (SIZES.width - SIZES.radius * 2) / 2,
        backgroundColor: COLORS.lightGray3,
        borderRadius: SIZES.radius,
        transform: [{ translateX }],
      }}
    />
  );
};
const Tabs = ({ scrollX }: any) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();
  useEffect(() => {
    let ml = [] as any;
    marketTabs.forEach((mt: any) => {
      console.log(mt.ref.current);
      mt?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({ x, y, width, height });
          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);
  return (
    <View style={{ flexDirection: "row" }} ref={containerRef}>
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}
      {marketTabs.map((mt: any, index) => (
        <TouchableOpacity
          key={"MarketTab-" + index}
          style={{
            flex: 1,
          }}
        >
          <View
            ref={mt.ref}
            style={{
              paddingHorizontal: 15,
              alignContent: "center",
              justifyContent: "center",
              height: 40,
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{mt.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Market = ({ getCoinMarket, coins }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    getCoinMarket();
  }, []);

  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}
      >
        <Tabs scrollX={scrollX} />
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}
      >
        <TextButton label={"USD"} />
        <TextButton
          label={"% (7d"}
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
        <TextButton
          label={"Top"}
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.FlatList
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => "" + item.id}
        onScroll={Animated.event(
          [{ nativeEven: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}
            >
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency === 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}
                    >
                      {/* Coins */}

                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{ height: 20, width: 20 }}
                        />
                        <Text
                          style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.h3,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      {/* Line Chart */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          width={100}
                          height={60}
                          data={{
                            labels: [],
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          chartConfig={{ color: () => priceColor }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>

                      {/* Figures */}
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
                                  item.price_change_percentage_7d_in_currency >
                                  0
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
                            {item?.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
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
        {/* Header bar */}
        <HeaderBar title="Market" />
        {/* Tab Bar  */}
        {renderTabBar()}
        {/* Buttons  */}
        {renderButtons()}
        {/* Market List */}
        {renderList()}

        <Text>Market Screen</Text>
      </View>
    </MainLayout>
  );
};
const mapStateToProps = (state: any) => ({
  coins: state.marketReducer.coins,
});

const mapDispatchToProps = (dispatch: any) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Market);
