import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/styles'
import { useNavigation } from '@react-navigation/native'

const Menu = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.menu}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Contact")}
            >
                <Text style={styles.boxTitle}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("About")}
            >
                <Text style={styles.boxTitle}>About</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        top: 60,
        right: 25,
        zIndex: 1,
        backgroundColor: "#fff",
        borderRadius: 7,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        paddingVertical: 20,
        gap: 8,
    },
    boxTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.textColor,
        textAlign: "center",

    },
})