import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { colors } from "../constant/theme";


export default function Login() { 

    return(
        <View style={styles.overlay}>
            <Text style={styles.title}>Login screen</Text>
            <Link href='/auth/signin' push asChild>
                <Button title="Create a new account"/>
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