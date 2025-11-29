import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "./constant/theme";

// Landing screen that mirrors the provided PNG capture.
// This file includes comments explaining the choices so you
// can learn the core React Native + Expo concepts used here.

export default function Index() {
  const router = useRouter();

  // The background image is the visual reference (the PNG
  // you provided). We use `ImageBackground` to render full
  // screen artwork with content layered on top.

  return (
    // SafeAreaView ensures content doesn't overlap device notches
    // on iOS and provides a consistent safe area on Android.
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        // `resizeMode: cover` makes the image fill the screen
        // while preserving aspect ratio. This produces a
        // full-bleed splash/landing visual like the capture.
        style={styles.background}
        resizeMode="cover"
      >
        {/* Overlay container for text and buttons */}
        <View style={styles.overlay}>
          {/* Logo or hero mark (optional). The image is placed
              as a separate element so you can swap or animate it
              later without changing the background artwork. */}
          <Image
            source={require("../assets/logo/dralaflow-with-white-bg.png")}
            style={styles.logo}
            accessibilityLabel="App logo"
          />

          {/* App title: use Text components for typographic layout.
              Inline styles are OK for small projects; for larger
              apps extract them to separate files. */}
          <Text style={styles.title}>Drala Flow</Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            Move with intention — breath, flow, and presence.
          </Text>

          {/* Primary CTA button. TouchableOpacity provides a press
              feedback and works cross-platform. We navigate using
              `expo-router`'s useRouter hook here. */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => {
              // Replace this with a real route once you add screens.
              // For now we demonstrate navigation usage.
              console.log("Get Started pressed");
              // Example navigation: router.push('/home')
            }}
            accessibilityRole="button"
            accessibilityLabel="Get started"
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          {/* Secondary action: small text button */}
          <TouchableOpacity
            style={styles.buttonlearn}
            activeOpacity={0.8}
            onPress={() => console.log("Learn more pressed")}
            accessibilityRole="button"
          >
            <Text style={styles.learnMore}>Learn more</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle} numberOfLines={2}>
            Forgot password?
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

// Styles grouped at the bottom make the UI easier to maintain.
// `StyleSheet.create` is optional but helps with better error
// messages and native optimizations.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundGreenWhiteLetters,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.backgroundGreenWhiteLetters,
  },
  overlay: {
    // Use flex to push content toward center-bottom like the PNG.
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  logo: {
    width: 109,
    height: 114.78,
    marginBottom: 12,
  },
  title: {
    color: colors.mainGreen,
    fontSize: 54,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: colors.darkModeGreenBlack,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    maxWidth: 340,
  },
  button: {
    backgroundColor: colors.mainGreen,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 28,
    marginBottom: 12,
    minWidth: 220,
    alignItems: "center",
  },
  buttonlearn: {
    backgroundColor: colors.lightGreen,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 28,
    marginBottom: 12,
    minWidth: 220,
    alignItems: "center",
  },
  buttonText: {
    color: colors.lettersIcons,
    fontWeight: "700",
    fontSize: 16,
  },
  learnMore: {
    color: colors.darkModeGreenBar,
    fontWeight: "700",
    fontSize: 16,
  },
});

