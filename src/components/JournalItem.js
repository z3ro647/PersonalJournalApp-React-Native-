import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const JournalItem = ({ journal, onEdit, onDetail }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{journal.title}</Text>
      <Text style={styles.date}>{new Date(journal.date).toLocaleDateString()}</Text>
      <Text style={styles.content}>
        {journal.content.length > 100
          ? `${journal.content.substring(0, 100)}...`
          : journal.content}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailButton} onPress={onDetail}>
          <Text style={styles.detailButtonText}>Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  content: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 5,
  },
  detailButton: {
    flex: 1,
    backgroundColor: "#17a2b8",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 5,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default JournalItem;
