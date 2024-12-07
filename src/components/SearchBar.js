import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SearchBar = ({ searchQuery, setSearchQuery, searchBy, setSearchBy }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search journals..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.verticalSpacing}></View>
      <Picker
        selectedValue={searchBy}
        style={styles.picker}
        onValueChange={setSearchBy}
      >
        <Picker.Item label="Search by Title" value="title" />
        <Picker.Item label="Search by Description" value="description" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  verticalSpacing: {
    height: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});

export default SearchBar;
