// src/navigation/StackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/DashboardScreen";
import AddJournalScreen from "../screens/AddJournalScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MainNavigator from "./MainNavigator";
import EditJournalScreen from "../screens/EditJournalScreen";
import DetailJournalScreen from "../screens/DetailJournalScreen";
import SearchScreen from "../screens/SearchScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      {/* The main app navigation with tabs */}
      <Stack.Screen
        name="MainTabs"
        component={MainNavigator}
        options={{ headerShown: false }} // Hide the header for tabs screen
      />
      <Stack.Screen
        name="EditJournal"
        component={EditJournalScreen}
        options={{ headerShown: true, title: "Edit Journal" }}
      />
      {/* Other stack-based screens */}
      <Stack.Screen
        name="AddJournal"
        component={AddJournalScreen}
        options={{ headerShown: true, title: "Add Journal" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true, title: "Login" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: true, title: "Profile" }}
      />
      <Stack.Screen
        name="DetailJournal"
        component={DetailJournalScreen}
        options={{ headerShown: true, title: "Journal Details" }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: true, title: "Search Journal" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
