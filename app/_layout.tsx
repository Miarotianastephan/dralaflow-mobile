import { Stack } from "expo-router";

export default function RootLayout() {
  // We hide the automatic header provided by `expo-router` so
  // our landing screen can render a full-bleed design like the
  // provided PNG capture.
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
