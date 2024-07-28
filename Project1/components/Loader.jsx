import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const Loader = ({ width = 50, height = 50, color = "#ffffff" }) => {
  const [rotateAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnimation]);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ rotate }], width: width, height: height, borderColor: color },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  circle: {
    display: "flex",
    alignSelf: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderTopColor: "#FFFFFF",
    borderRightColor: "#FFFFFF",
  },
});

export default Loader;
