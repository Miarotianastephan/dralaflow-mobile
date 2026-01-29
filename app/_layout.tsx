import { Stack } from "expo-router";
import { createTamagui,TamaguiProvider, View } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4'

const config = createTamagui(defaultConfig)

export default function RootLayout() {
  // We hide the automatic header provided by `expo-router` so
  // our landing screen can render a full-bleed design like the
  // provided PNG capture.
  return (
 <TamaguiProvider config={config}>
   <Stack
     screenOptions={{
       headerShown: false,
     }}
   />
 </TamaguiProvider>
  );
}
