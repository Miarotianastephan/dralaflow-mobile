import * as React from 'react';
import { colors } from '../constant/theme';
import { Text } from 'react-native';
import { Input, Label, XStack } from 'tamagui';

const InputText = (props: {label: string, idName: string}) => {
  const [text, setText] = React.useState("");

  return (
        <XStack alignItems="center" gap="$2" style={{ marginVertical: 8 }}>
            <Label width={90} htmlFor={props.idName} style={{ color: colors.darkModeGreenBlack }}>
                {props.label}
            </Label>
            <Input style={{ backgroundColor: colors.backgroundGreenWhiteLetters, color: colors.darkModeGreenBlack }} flex={1} id={props.idName} />
      </XStack>
  );
};

export default InputText;