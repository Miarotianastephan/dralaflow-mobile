import CustomButton from "@/components/custom-button";
import Pagination from "@/components/pagination";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ViewToken } from "react-native";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import RenderItem from "../../components/render-item";
import data, { OnboardingData } from "../../data/data";

export default function Board() {
    const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>()
    const x = useSharedValue(0);
    const flatlistIndex = useSharedValue(0);

    const [salary, setSalary] = useState<string>('');
    const [monthLabel, setMonthLabel] = useState<string>('');

    useEffect(() => {
        const now = new Date();
        const month = now.toLocaleString(undefined, { month: 'long' });
        const year = now.getFullYear();
        setMonthLabel(`${month} ${year}`);
    }, [])

    const onViewableItemsChanged = ({viewableItems}: {viewableItems: ViewToken[]}) => {
        if(viewableItems[0] && viewableItems[0].index !== null){
            flatlistIndex.value = viewableItems[0].index;
        }
    }

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        }
    })
    return (
        <View style={{flex: 1}}>
            <Animated.FlatList 
                ref={flatlistRef}
                onScroll={onScroll}
                data={data} 
                renderItem={({item, index}) => {
                    return (
                        <RenderItem
                            item={item}
                            index={index}
                            x={x}
                            salary={salary}
                            setSalary={setSalary}
                            month={monthLabel}
                        />
                    )
                }}
                keyExtractor={item => item.id.toString()}
                scrollEventThrottle={16} // control how often scrl event will fire 
                horizontal={true}
                bounces={false}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    minimumViewTime: 300,
                    viewAreaCoveragePercentThreshold: 10
                }}
            />
            <View style={styles.bottomContainer}>
                <Pagination data={data} x={x}/>
                <CustomButton 
                    flatlistRef={flatlistRef} 
                    flatlistIndex={flatlistIndex} 
                    dataLength={data.length}
                    x={x}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})