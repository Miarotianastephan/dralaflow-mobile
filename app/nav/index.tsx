import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, XStack, YStack } from 'tamagui';

export default function HomeScreen() {
  const [salary, setSalary] = useState<number>(0);
  const [month, setMonth] = useState<string>('');

  useEffect(() => {
    // TODO: Get salary and month from AsyncStorage or global state
    // For now, using placeholder values
    const now = new Date();
    const monthName = now.toLocaleString(undefined, { month: 'long' });
    const year = now.getFullYear();
    setMonth(`${monthName} ${year}`);
  }, []);

  const formattedCurrency = (value: number) => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'MGA',
        maximumFractionDigits: 0,
      }).format(value);
    } catch (e) {
      return `${Math.round(value)} Ar`;
    }
  };

  const needs = salary * 0.5;
  const wants = salary * 0.3;
  const savings = salary * 0.2;

  const BudgetCard = ({
    title,
    amount,
    percentage,
    color,
  }: {
    title: string;
    amount: number;
    percentage: number;
    color: string;
  }) => (
    <Card
      style={{
        backgroundColor: '#f5f5f5',
        borderLeftWidth: 4,
        borderLeftColor: color,
        marginBottom: 12,
      }}
      padding="$4"
    >
      <XStack justifyContent="space-between" alignItems="center">
        <YStack>
          <Text style={{ fontSize: 14, color: '#666' }}>{title}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginTop: 4 }}>
            {formattedCurrency(amount)}
          </Text>
        </YStack>
        <Text style={{ fontSize: 16, fontWeight: '600', color }}>{percentage}%</Text>
      </XStack>
    </Card>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Dashboard</Text>
          <Text style={styles.monthLabel}>{month}</Text>
        </View>

        {/* Total Salary Card */}
        <Card
          style={{
            backgroundColor: '#005b4f',
            borderRadius: 12,
            marginBottom: 24,
          }}
          padding="$5"
        >
          <Text style={{ color: '#fff', fontSize: 14, opacity: 0.8 }}>Total Salary</Text>
          <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 8 }}>
            {formattedCurrency(salary)}
          </Text>
        </Card>

        {/* Budget Allocation */}
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16 }}>Budget Allocation</Text>

        <BudgetCard title="Needs (Essentials)" amount={needs} percentage={50} color="#1e2169" />
        <BudgetCard title="Wants (Entertainment)" amount={wants} percentage={30} color="#f15937" />
        <BudgetCard title="Savings (Future)" amount={savings} percentage={20} color="#005b4f" />

        {/* Quick Stats */}
        <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 24, marginBottom: 16 }}>
          Quick Stats
        </Text>

        <Card
          style={{
            backgroundColor: '#f9f9f9',
            marginBottom: 12,
          }}
          padding="$4"
        >
          <XStack justifyContent="space-between">
            <YStack>
              <Text style={{ fontSize: 12, color: '#999' }}>Spent This Month</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 4 }}>
                {formattedCurrency(0)}
              </Text>
            </YStack>
            <YStack alignItems="flex-end">
              <Text style={{ fontSize: 12, color: '#999' }}>Remaining</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 4 }}>
                {formattedCurrency(salary)}
              </Text>
            </YStack>
          </XStack>
        </Card>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  monthLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});
