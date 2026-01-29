import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "tamagui";
import InputText from "../../components/input-text";
import { colors } from "../../constant/theme";


export default function Login() { 

    return(
        <View style={styles.overlay}>
            <Text style={styles.title}>Register screen</Text>
            <InputText label="Email" idName="email"/>
            <InputText label="Password" idName="password"/>
            <InputText label="Confirm password" idName="confirmPassword"/>
            <Button 
                style={styles.button}
                onPress={() => console.log('register pressed')}
            >
                <Text style={styles.buttonText}>Register</Text>
            </Button>
            <Link href='/auth/login' dismissTo asChild>
                <Button variant="outlined">
                    <Text style={styles.subtitle}>
                        Return to login
                    </Text>
                </Button>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: colors.backgroundGreenWhiteLetters,
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingBottom: 80,
    },title: {
        textAlign: "center",
        color: colors.mainGreen,
        fontSize: 44,
        fontWeight: "700",
        marginBottom: 8,
    },subtitle: {
        color: colors.darkModeGreenBlack,
        fontSize: 16,
        textAlign: "center",
        maxWidth: 340,
    },button: {
        marginVertical: 8,
        backgroundColor: colors.mainGreen,
    },buttonText: {
            color: colors.lettersIcons,
            fontWeight: "700",
            fontSize: 16,
    }
})