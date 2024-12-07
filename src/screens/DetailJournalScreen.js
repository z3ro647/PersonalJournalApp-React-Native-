import React from "react";
import { View, StyleSheet } from "react-native";
import JournalDetailHeader from "../components/JournalDetailHeader";
import JournalImage from "../components/JournalImage";
import JournalContent from "../components/JournalContent";
import BackButton from "../components/BackButton";

const DetailJournalScreen = ({ route, navigation }) => {
  const { title, content, mood, imageUri, date } = route.params;

  return (
    <View style={styles.container}>
      <JournalDetailHeader title={title} date={date} mood={mood} />
      <JournalImage imageUri={imageUri} />
      <JournalContent content={content} />
      <BackButton onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
});

export default DetailJournalScreen;
