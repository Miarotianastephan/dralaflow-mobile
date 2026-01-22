import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { colors } from "../constant/theme";


export default function Login() { 

    return(
        <View style={styles.overlay}>
            <Text style={styles.title}>Register screen</Text>
            <Link href='/auth/login' dismissTo asChild>
                <Button title="Return to login"/>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 80,
    },title: {
        color: colors.mainGreen,
        fontSize: 44,
        fontWeight: "700",
        marginBottom: 8,
    },
})