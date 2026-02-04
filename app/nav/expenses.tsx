import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, XStack, YStack } from 'tamagui';

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  icon: string;
  categoryType: 'needs' | 'wants' | 'savings';
}

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    category: 'Food & Groceries',
    amount: 5000,
    date: '2026-01-28',
    icon: 'shopping-cart',
    categoryType: 'needs',
  },
  {
    id: '2',
    title: 'Movie Tickets',
    category: 'Entertainment',
    amount: 15000,
    date: '2026-01-27',
    icon: 'film',
    categoryType: 'wants',
  },
  {
    id: '3',
    title: 'Bank Transfer',
    category: 'Savings',
    amount: 50000,
    date: '2026-01-26',
    icon: 'save',
    categoryType: 'savings',
  },
  {
    id: '4',
    title: 'Electricity Bill',
    category: 'Utilities',
    amount: 12000,
    date: '2026-01-25',
    icon: 'zap',
    categoryType: 'needs',
  },
  {
    id: '5',
    title: 'Restaurant',
    category: 'Dining',
    amount: 25000,
    date: '2026-01-24',
    icon: 'utensils',
    categoryType: 'wants',
  },
];

export default function ExpensesScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);

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

  const getCategoryColor = (categoryType: 'needs' | 'wants' | 'savings') => {
    switch (categoryType) {
      case 'needs':
        return '#1e2169';
      case 'wants':
        return '#f15937';
      case 'savings':
        return '#005b4f';
      default:
        return '#999';
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Card
      style={{
        marginBottom: 12,
        backgroundColor: '#f9f9f9',
        borderLeftWidth: 4,
        borderLeftColor: getCategoryColor(item.categoryType),
      }}
      padding="$3"
    >
      <TouchableOpacity>
        <XStack justifyContent="space-between" alignItems="center">
          <XStack alignItems="center" gap="$3" flex={1}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: getCategoryColor(item.categoryType),
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
                {item.category}
              </Text>
              <Text style={{ fontSize: 11, color: '#ccc', marginTop: 2 }}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </YStack>
          </XStack>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
            {formattedCurrency(item.amount)}
          </Text>
        </XStack>
      </TouchableOpacity>
    </Card>
  );

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>Total Spent: {formattedCurrency(totalSpent)}</Text>
      </View>

      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="inbox" size={48} color="#ccc" />
          <Text style={{ marginTop: 12, color: '#999', fontSize: 16 }}>
            No transactions yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#005b4f',
    fontWeight: '600',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
