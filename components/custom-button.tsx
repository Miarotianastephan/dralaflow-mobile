import { OnboardingData } from '@/data/data';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, useWindowDimensions } from 'react-native';
import Animated, { AnimatedRef, interpolateColor, SharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

type Props = {
    dataLength: number;
    flatlistIndex: SharedValue<number>;
    flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
    x: SharedValue<number>;
}

const CustomButton = ({dataLength, flatlistIndex, flatlistRef, x}: Props) => {
    const {width: SCREEN_WIDTH}= useWindowDimensions();
    const navigation = useNavigation();

    const buttonAnimation = useAnimatedStyle(() => {
        return {
            width: flatlistIndex.value === dataLength -1 ?
            withSpring(140) : withSpring(60),
            height: 60
        }
    })

    const animatedButtonColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            x.value,
            [0, SCREEN_WIDTH, 2* SCREEN_WIDTH],
            ['#005b4f', '#1e2169', '#f15937']
        )
        return { backgroundColor };
    })

    const arrowAnimation = useAnimatedStyle(() => {
        return {
            width: 30,
            height: 30,
            opacity: flatlistIndex.value === dataLength -1 ? withTiming(0) : withTiming(1),
            transform: [
                {
                    translateX: flatlistIndex.value === dataLength -1 ? 
                    withTiming(100) : withTiming(0)
                }
            ]
        }
    })

    const textAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: flatlistIndex.value === dataLength -1 ? 
            withTiming(1) : withTiming(0),
            transform: [{
                translateX: flatlistIndex.value === dataLength -1 ? 
                withTiming(0) : withTiming(-100)
            }]
        }
    })

  return (
    <TouchableWithoutFeedback
        onPress={() => {
            if(flatlistIndex.value < dataLength - 1){
                flatlistRef.current?.scrollToIndex({
                    index: flatlistIndex.value + 1,
                    animated: true
                })
            }else{
                // navigation.goBack();
            }
        }}    
    >
      <Animated.View style={[styles.container, animatedButtonColor, buttonAnimation]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
            Get started
        </Animated.Text>
        <Animated.Image 
            source={require('../assets/images/ArrowIcon.png')} 
            style={[styles.arrowIcon, arrowAnimation]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: 60,
        height: 60,
    },
    arrowIcon: {
        position: 'absolute',
        width: 30,
        height: 30,
    },
    textButton:{
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 16
    }
})