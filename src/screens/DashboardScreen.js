import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";
import AddButton from "../components/AddButton";
import JournalItem from "../components/JournalItem";

const DashboardScreen = ({ navigation }) => {
  const [journals, setJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const journalsQuery = query(
      collection(db, "journals"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(journalsQuery, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (journal) =>
            journal.date.split("T")[0] ===
            new Date().toISOString().split("T")[0]
        );

      setJournals(data);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredJournals = journals.filter((journal) =>
    searchBy === "title"
      ? journal.title.toLowerCase().includes(searchQuery.toLowerCase())
      : journal.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Journal Entries</Text>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
      />
      <AddButton onPress={() => navigation.navigate("AddJournal")} />
      {filteredJournals.length > 0 ? (
        <FlatList
          data={filteredJournals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JournalItem
              journal={item}
              onEdit={() =>
                navigation.navigate("EditJournal", {
                  journalId: item.id,
                  initialTitle: item.title,
                  initialContent: item.content,
                  initialMood: item.mood,
                  initialImageUri: item.imageUri,
                })
              }
              onDetail={() =>
                navigation.navigate("DetailJournal", {
                  title: item.title,
                  content: item.content,
                  mood: item.mood,
                  imageUri: item.imageUri,
                  date: item.date,
                })
              }
            />
          )}
        />
      ) : (
        <Text style={styles.noJournalsText}>No journal entries for today.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  noJournalsText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});

export default DashboardScreen;
