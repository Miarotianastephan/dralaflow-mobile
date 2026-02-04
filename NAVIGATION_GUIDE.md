# Navigation Guide - Fin App

This document explains the navigation flow and folder structure for the Fin App's onboarding and home sections.

## 📁 Folder Structure

```
app/
├── welcome/
│   └── board.tsx                 # Onboarding carousel with 3 screens
├── nav/                          # Main app navigation (tabs)
│   ├── _layout.tsx              # Tab navigation layout
│   ├── index.tsx                # Home/Dashboard screen
│   ├── expenses.tsx             # Expenses Transaction screen
│   └── profile.tsx              # Profile/Settings screen
└── auth/
    ├── login.tsx
    └── signin.tsx
```

## 🔄 Navigation Flow

### 1. **Onboarding → Home Navigation**

#### In `app/welcome/board.tsx`:
- Displays 3 onboarding screens in a horizontal carousel
- Collects user salary and month information
- Passes data to child components via React Context or AsyncStorage (TODO)

#### In `components/custom-button.tsx`:
```typescript
onPress={() => {
    if(flatlistIndex.value < dataLength - 1){
        // Scroll to next onboarding screen
        flatlistRef.current?.scrollToIndex({
            index: flatlistIndex.value + 1,
            animated: true
        })
    }else{
        // Navigate to home (nav) after final screen
        navigation.replace('nav');
    }
}}
```

**Key Points:**
- `navigation.replace('nav')` - Replaces the onboarding screen with the nav stack
- This prevents users from going back to onboarding
- `replace` instead of `navigate` ensures clean navigation history

---

## 🏠 Home Screen Structure (Tab Navigation)

### Location: `/app/nav/_layout.tsx`

The main app uses **Expo Router Tabs** for bottom navigation with 3 screens:

```typescript
<Tabs
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: '#005b4f',    // Active tab color
    tabBarInactiveTintColor: '#999',     // Inactive tab color
  }}
>
  <Tabs.Screen name="index" ... />       // Home
  <Tabs.Screen name="expenses" ... />    // Expenses
  <Tabs.Screen name="profile" ... />     // Profile
</Tabs>
```

### Tab Pages:

#### 1️⃣ **Home Screen** (`/app/nav/index.tsx`)
- **Purpose:** Dashboard displaying financial overview
- **Features:**
  - Shows total monthly salary
  - Displays budget allocation (50% Needs, 30% Wants, 20% Savings)
  - Shows quick stats (Spent this month, Remaining)
  - Currency formatted in MGA (Ariary)
- **Data Source:** Currently uses placeholder values (TODO: Connect to AsyncStorage/Database)

```typescript
// Example allocation cards
- Needs (50%): 50000 Ar
- Wants (30%): 30000 Ar
- Savings (20%): 20000 Ar
```

#### 2️⃣ **Expenses Screen** (`/app/nav/expenses.tsx`)
- **Purpose:** List all user expenses/transactions
- **Features:**
  - Displays all transactions with:
    - Category icon (shopping, film, zap, etc.)
    - Title and category name
    - Amount in MGA
    - Date
  - Shows total spent this month
  - Categorizes by type: Needs, Wants, Savings
  - Color-coded by category
- **Data Source:** Currently uses sample data (TODO: Connect to database)

#### 3️⃣ **Profile Screen** (`/app/nav/profile.tsx`)
- **Purpose:** User settings and account management
- **Features:**
  - User profile avatar and info
  - Settings options:
    - **Edit Profile** - Update personal information
    - **Change Monthly Salary** - Update salary input
    - **Open New Month** - Start a new budget tracking period
    - **Notification Settings** - Manage app notifications
    - **Budget Preferences** - Customize 50/30/20 allocation
    - **About** - App information and version
  - **Logout Button** - Sign out from the app

---

## 💾 Data Flow (TODO)

Currently, the app uses placeholder data. To complete integration:

### Store Salary & Month Information:
```typescript
// In app/welcome/board.tsx or global state
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save after onboarding
await AsyncStorage.setItem('userSalary', salary);
await AsyncStorage.setItem('userMonth', monthLabel);

// Retrieve in home screen
const salary = await AsyncStorage.getItem('userSalary');
const month = await AsyncStorage.getItem('userMonth');
```

### Store Transactions:
```typescript
// In app/nav/expenses.tsx
// Implement database (SQLite, Firebase, or backend API)
// Fetch and display user transactions
```

---

## 🎨 Design System

### Colors Used:
- **Primary (Needs):** `#1e2169` (Dark Blue)
- **Secondary (Wants):** `#f15937` (Orange)
- **Tertiary (Savings):** `#005b4f` (Teal)
- **Accent:** `#ffa3ce` (Pink), `#bae4fd` (Light Blue), `#faeb8a` (Yellow)

### Currency Formatting:
All amounts displayed in **MGA (Ariary)** with fallback to "Ar" suffix:
```typescript
const formattedCurrency = (value: number) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'MGA',
    maximumFractionDigits: 0,
  }).format(value);
};
```

---

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install expo-router expo-icons tamagui
```

### 2. Navigation from Get Started Button
The button automatically navigates when clicked on the final onboarding screen:
- Button component watches `flatlistIndex.value`
- On last screen (index 2), clicking button triggers `navigation.replace('nav')`
- This loads the tab navigation with 3 screens

### 3. Key Files Modified
- `components/custom-button.tsx` - Added navigation logic
- `app/nav/_layout.tsx` - Created tab navigation
- `app/nav/index.tsx` - Home/Dashboard
- `app/nav/expenses.tsx` - Transactions list
- `app/nav/profile.tsx` - Settings/Profile

---

## 📝 Next Steps

1. **Implement Data Persistence:**
   - Use AsyncStorage to save/retrieve salary and month
   - Connect database for transactions

2. **Implement Features:**
   - Edit profile functionality
   - Change salary modal
   - New month reset logic
   - Notification settings

3. **Add Expense Tracking:**
   - Create add expense modal/screen
   - Implement expense categories
   - Add expense filtering/sorting

4. **Authentication:**
   - Link logout button to authentication system
   - Implement user accounts

---

## 🚀 Quick Start

1. Complete onboarding (enter salary, confirm)
2. Click "Get Started" button → navigates to Home
3. Use bottom tabs to switch between:
   - 🏠 Home (Dashboard)
   - 📉 Expenses (Transactions)
   - 👤 Profile (Settings)
4. Logout from Profile tab

---

## 📱 Icons Used (Feather Icons)

- Home: `home`
- Expenses: `trending-down`
- Profile: `user`
- Settings: `edit`, `dollar-sign`, `calendar`, `bell`, `sliders`, `info`
- Actions: `log-out`, `shopping-cart`, `film`, `save`, `zap`, `utensils`

---

**Last Updated:** January 29, 2026  
**Framework:** Expo Router + Tamagui + React Native
