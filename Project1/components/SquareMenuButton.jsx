import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const SquareMenuButton = ({ onPress, color }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.menuButton}>
            <View style={{ flexDirection: "row", gap: 6 }}>
                <View
                    style={{ ...styles.dot, backgroundColor: color ? color : "#000" }}
                />
                <View
                    style={{ ...styles.dot, backgroundColor: color ? color : "#000" }}
                />
            </View>
            <View style={{ height: "20%" }} />
            <View style={{ flexDirection: "row", gap: 6 }}>
                <View
                    style={{ ...styles.dot, backgroundColor: color ? color : "#000" }}
                />
                <View
                    style={{ ...styles.dot, backgroundColor: color ? color : "#000" }}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "white",
        margin: 2,
    },
});

export default SquareMenuButton;
