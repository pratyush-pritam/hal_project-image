import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../constants/styles";

const ChartComponent = () => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width - 35}
        height={220}
        yAxisLabel="₹"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: colors.backgroundColor,
          backgroundGradientFrom: colors.primaryColor,
          backgroundGradientTo: colors.secondaryColor,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default ChartComponent;

const styles = StyleSheet.create({});
