import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../constants/styles";

const Tab = ({ text, onPress }) => {
  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={styles.text}
        activeOpacity={0.5}
        onPress={onPress}
      >
        <Text style={styles.text1}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    width: 100,
    height: 55,
    borderRadius: colors.br,
    backgroundColor: colors.mainColor,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "trasnparent",
  },

  text1: {
    color: colors.backgroundColor,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Tab;
