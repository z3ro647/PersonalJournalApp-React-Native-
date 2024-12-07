import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const JournalList = ({ filteredJournals }) => {
  return (
    <FlatList
      data={filteredJournals}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.journalItem}>
          <Text style={styles.journalTitle}>{item.title}</Text>
          <Text style={styles.journalDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
          <Text style={styles.journalContent}>
            {item.content.length > 100
              ? `${item.content.substring(0, 100)}...`
              : item.content}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  journalItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 16,
  },
  journalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  journalDate: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  journalContent: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
});

export default JournalList;
