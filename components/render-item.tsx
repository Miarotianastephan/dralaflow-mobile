import LottieView from 'lottie-react-native'
import React from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { Input, Label, XStack } from 'tamagui'
import { OnboardingData } from '../data/data'

type Props = {
  item: OnboardingData,
  index: number,
  x: SharedValue<number>,
  salary?: string,
  setSalary?: (v: string) => void,
  month?: string
}

const RenderItem = ({index, item, x, salary = '', setSalary, month = ''}: Props) => {
  const {width:SCREEN_WIDTH} = useWindowDimensions();

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      [200, 0, -200],
      Extrapolation.CLAMP
    );
    return {
      transform: [{translateY: translateYAnimation}]
    }
  })

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      [1, 4, 4],
      Extrapolation.CLAMP
    );
    return {
      transform: [{scale: scale}]
    }
  })


  const salaryNumber = Number((salary || '').toString().replace(/[^0-9.-]+/g, '')) || 0;

  const formattedCurrency = (value: number) => {
    try{
      return new Intl.NumberFormat(undefined, {style: 'currency', currency: 'MGA', maximumFractionDigits: 0}).format(value);
    }catch(e){
      return `${Math.round(value)} Ar`;
    }
  }

  return (
    <View style={[styles.itemContainer, {width:SCREEN_WIDTH}]}> 
      <View style={styles.circleContainer}>
        <Animated.View 
          style={[{
            width: SCREEN_WIDTH, 
            height: SCREEN_WIDTH,
            backgroundColor: item.backgroundColor,
            borderRadius: SCREEN_WIDTH / 2,
          }, circleAnimation]} 
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>
        <LottieView 
          source={item.animation}
          style={{width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9}}  
          autoPlay
          loop
        />
      </Animated.View>

      {/* Screen specific content while preserving animation */}
      {index === 0 && (
        <Text style={[styles.itemText, {color: item.textColor}]}>Welcome{"\n"}to Fin App</Text>
      )}

      {index === 1 && (
        <KeyboardAvoidingView behavior="padding" style={{width: '100%'}} enabled>
          <ScrollView contentContainerStyle={{paddingHorizontal: 24}} showsVerticalScrollIndicator={false}>
            <Text style={[styles.itemText, {fontSize: 32, color: item.textColor, marginBottom: 8}]}>Tell us your salary</Text>
            <XStack alignItems="center" gap="$2" style={{ marginVertical: 12}}>
              <Label width={90} htmlFor="salary" style={{ color: '#333', fontWeight: 'bold' }}>Salary</Label>
              <Input id="salary" keyboardType="numeric" value={salary} onChangeText={setSalary} style={{ flex: 1 }} />
            </XStack>
            <XStack alignItems="center" gap="$2" style={{ marginVertical: 12 }}>
              <Label width={90} htmlFor="month" style={{ color: '#333', fontWeight: 'bold' }}>Month</Label>
              <Text style={{flex: 1, fontSize: 16, color: '#333'}}>{month}</Text>
            </XStack>
            {/* <View style={{height: 80}} /> */}
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      {index === 2 && (
        <View style={{width: '100%', paddingHorizontal: 24}}>
          <Text style={[styles.itemText, {fontSize: 28, color: item.textColor, marginBottom: 8}]}>Budget Summary</Text>
          <View style={{marginBottom: 12}}>
            <Text style={{fontSize: 16, color: '#444'}}>Salary: {formattedCurrency(salaryNumber)}</Text>
            <Text style={{fontSize: 16, color: '#444'}}>Month: {month}</Text>
          </View>
          <View style={{marginTop: 8}}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>Allocation</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
              <Text>Needs (50%)</Text>
              <Text>{formattedCurrency(salaryNumber * 0.5)}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
              <Text>Wants (30%)</Text>
              <Text>{formattedCurrency(salaryNumber * 0.3)}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
              <Text>Savings (20%)</Text>
              <Text>{formattedCurrency(salaryNumber * 0.2)}</Text>
            </View>
          </View>
        </View>
      )}

    </View>
  )
}

export default RenderItem

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 120,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: -150,
    zIndex: -1,
  }
})