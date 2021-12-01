import React from "react";
import { View, Text, Dimensions } from "react-native";

import moment from "moment";

import Spline from "cubic-spline";

import { SIZES, FONTS, COLORS } from "../constants";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import monotoneCubicInterpolation from "../helpers";

const DemoChart = ({ data }) => {
  const chartDATA = {
    labels: [],
    datasets: [
      {
        data: data.ys,
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // optional
        strokeWidth: 1, // optional
      },
    ],
  };
  return (
    <LineChart
      data={chartDATA}
      width={Dimensions.get("window").width} // from react-native
      height={200}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#e26a00",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          r: "1",
          strokeWidth: "1",
          stroke: "#fff",
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

const Chart = ({ containerStyle, chartPrices }) => {
  const starUnixTimestamp = moment().subtract(7, "day").unix();

  const data = chartPrices
    ? chartPrices.map((item, index) => {
        return { x: starUnixTimestamp + (index + 1) * 3600, y: item };
      })
    : [];

  const points = monotoneCubicInterpolation({ data, range: 40 });

  if (!points || !points.length) return null;

  const xs = points.map((d) => d.x);
  const ys = points.map((d) => d.y);

  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <DemoChart data={{ ys }} />
    </View>
  );
};

export default Chart;
