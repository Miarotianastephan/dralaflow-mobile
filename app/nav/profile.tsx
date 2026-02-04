import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, XStack, YStack } from 'tamagui';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
}

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          // TODO: Handle logout and navigate to welcome screen
          // navigation.replace('welcome');
        },
        style: 'destructive',
      },
    ]);
  };

  const handleOpenNewMonth = () => {
    Alert.alert(
      'New Month',
      'This will start a new budget tracking month. Are you sure?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Start New Month',
          onPress: () => {
            // TODO: Reset expenses and start new month tracking
            Alert.alert('Success', 'New month budget started!');
          },
          style: 'default',
        },
      ]
    );
  };

  const settingItems: SettingItem[] = [
    {
      id: '1',
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: 'edit',
      onPress: () => {
        Alert.alert('Edit Profile', 'Profile editing feature coming soon');
      },
    },
    {
      id: '2',
      title: 'Change Monthly Salary',
      description: 'Update your monthly salary',
      icon: 'dollar-sign',
      onPress: () => {
        Alert.alert('Change Salary', 'Salary editing feature coming soon');
      },
    },
    {
      id: '3',
      title: 'Open New Month',
      description: 'Start tracking for a new month',
      icon: 'calendar',
      onPress: handleOpenNewMonth,
    },
    {
      id: '4',
      title: 'Notification Settings',
      description: 'Manage app notifications',
      icon: 'bell',
      onPress: () => {
        Alert.alert('Notifications', 'Notification settings coming soon');
      },
    },
    {
      id: '5',
      title: 'Budget Preferences',
      description: 'Customize 50/30/20 allocation',
      icon: 'sliders',
      onPress: () => {
        Alert.alert(
          'Budget Preferences',
          'Customize your budget allocation ratio (currently 50/30/20)'
        );
      },
    },
    {
      id: '6',
      title: 'About',
      description: 'App version and information',
      icon: 'info',
      onPress: () => {
        Alert.alert('About', 'Fin App v1.0.0\n\nA simple expense tracking app');
      },
    },
  ];

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <Card
        style={{
          marginBottom: 12,
          backgroundColor: '#f9f9f9',
        }}
        padding="$3"
      >
        <XStack justifyContent="space-between" alignItems="center">
          <XStack alignItems="center" gap="$3" flex={1}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#005b4f',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather name={item.icon as any} size={20} color="#fff" />
            </View>
            <YStack flex={1}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, color: '#999', marginTop: 2 }}>
                {item.description}
              </Text>
            </YStack>
          </XStack>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </XStack>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.userName}>User Account</Text>
        <Text style={styles.userEmail}>user@example.com</Text>
      </View>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Settings</Text>
        {settingItems.map((item) => renderSettingItem(item))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
          activeOpacity={0.8}
        >
          <XStack alignItems="center" justifyContent="center" gap="$2">
            <Feather name="log-out" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </XStack>
        </TouchableOpacity>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#005b4f',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  userEmail: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#f15937',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 24,
    marginBottom: 24,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
