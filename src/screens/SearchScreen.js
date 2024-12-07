import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../context/AuthContext';
import DatePickerButton from '../components/DatePickerButton';
import SearchBar from '../components/SearchBar';
import JournalItem from '../components/JournalItem';

const SearchScreen = ({ navigation }) => {
  const [journals, setJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const journalsQuery = query(
      collection(db, 'journals'),
      where('uid', '==', user.uid)
    );

    const unsubscribeJournals = onSnapshot(journalsQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJournals(data);
    });

    return () => unsubscribeJournals();
  }, [user]);

  const filteredJournals = journals.filter((journal) => {
    const journalDate = journal.date.split('T')[0];
    const selectedFormattedDate = selectedDate.toISOString().split('T')[0];

    if (journalDate !== selectedFormattedDate) return false;

    if (searchBy === 'title') {
      return journal.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return journal.content.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Journals</Text>

      <DatePickerButton
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
      />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
      />

      {filteredJournals.length > 0 ? (
        <FlatList
          data={filteredJournals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JournalItem
              journal={item}
              onEdit={() =>
                navigation.navigate('EditJournal', {
                  journalId: item.id,
                  initialTitle: item.title,
                  initialContent: item.content,
                  initialMood: item.mood,
                  initialImageUri: item.imageUri,
                })
              }
              onDetail={() =>
                navigation.navigate('DetailJournal', {
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
        <Text style={styles.noJournalsText}>No journal entries found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  noJournalsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
