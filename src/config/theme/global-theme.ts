import { StyleSheet } from "react-native";

export const globalTheme = StyleSheet.create({
    globalMargin: {
        marginHorizontal: 20
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20
    },
    fabTop: {
        position: "absolute",
        top: 10,
        right: 20,
        zIndex: 5000
    }
})