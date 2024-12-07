import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const JournalImage = ({ imageUri }) => (
  <>
    {imageUri ? (
      <Image source={{ uri: imageUri }} style={styles.image} />
    ) : (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>No Image Available</Text>
      </View>
    )}
  </>
);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
  },
});

export default JournalImage;
