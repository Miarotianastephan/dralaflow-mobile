import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { DynamicColorIOS } from 'react-native';

export default function NavLayout() {
  return (
    <NativeTabs
      labelStyle={{
        // For the text color
        color: DynamicColorIOS({
          dark: 'white',
          light: '#005b4f',
        }),
      }}
      // For the selected icon color
      tintColor={DynamicColorIOS({
        dark: 'white',
        light: '#005b4f',
      })}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon md="home" sf="house.fill"/>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="expenses">
        <Icon md="trending_down" sf="chart.line.downtrend.xyaxis" />
        <Label>Expenses</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon md="person" sf="person.fill" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
