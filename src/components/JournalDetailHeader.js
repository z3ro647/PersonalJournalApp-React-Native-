import React from "react";
import { View, Text, StyleSheet } from "react-native";

const JournalDetailHeader = ({ title, date, mood }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
    <Text style={styles.mood}>Mood: {mood || "Not specified"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  mood: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#555",
  },
});

export default JournalDetailHeader;
