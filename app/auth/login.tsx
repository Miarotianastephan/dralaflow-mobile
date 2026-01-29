import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "tamagui";
import InputText from "../../components/input-text";
import { colors } from "../../constant/theme";

export default function Login() {
  const router = useRouter();

    return (
        <View style={styles.overlay}>
            <Text style={styles.title}>Login screen</Text>
            <InputText label="Email" idName="email" />
            <InputText label="Password" idName="password" />
            <Button 
                style={styles.button}
                onPress={() => router.push('/welcome/board')}
            >
                <Text style={styles.buttonText}>Login</Text>
            </Button>
            <Link href='/auth/signin' push asChild>
                <Button variant="outlined">
                    <Text style={styles.subtitle}>
                        Create a new account
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
    }, title: {
        color: colors.mainGreen,
        textAlign: "center",
        fontSize: 44,
        fontWeight: "700",
        marginBottom: 8,
    }, subtitle: {
        color: colors.darkModeGreenBlack,
        fontSize: 16,
        textAlign: "center",
        maxWidth: 340,
    }, button: {
        marginVertical: 8,
        backgroundColor: colors.mainGreen,
    }, buttonText: {
        color: colors.lettersIcons,
        fontWeight: "700",
        fontSize: 16,
    }
})