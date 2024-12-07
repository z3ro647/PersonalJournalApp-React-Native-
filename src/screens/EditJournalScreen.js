import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ImagePickerSection from '../components/ImagePickerSection';
import JournalInputField from '../components/JournalInputField';
import SubmitButton from '../components/SubmitButton';

const EditJournalScreen = ({ route, navigation }) => {
    const { journalId, initialTitle, initialContent, initialMood, initialImageUri } = route.params;

    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [mood, setMood] = useState(initialMood);
    const [imageUri, setImageUri] = useState(initialImageUri);

    const handleUpdateJournal = async () => {
        if (!title || !content) {
            Alert.alert('Error', 'Title and content are required.');
            return;
        }

        try {
            const journalDocRef = doc(db, 'journals', journalId);

            // Prepare updated data without changing the date
            const updatedData = { title, content, mood };

            if (imageUri) {
                updatedData.imageUri = imageUri;
            }

            // Update the document in Firestore
            await updateDoc(journalDocRef, updatedData);

            Alert.alert('Success', 'Journal updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating journal:', error);
            Alert.alert('Error', 'An error occurred while updating the journal.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Input fields for title, content, and mood */}
            <JournalInputField
                value={title}
                onChangeText={setTitle}
                placeholder="Journal Title"
            />
            <JournalInputField
                value={content}
                onChangeText={setContent}
                placeholder="Journal Content"
                multiline
            />
            <JournalInputField
                value={mood}
                onChangeText={setMood}
                placeholder="Mood (Optional)"
            />

            {/* Image picker section */}
            <ImagePickerSection imageUri={imageUri} setImageUri={setImageUri} />

            {/* Submit button */}
            <SubmitButton onPress={handleUpdateJournal} title="Update Journal" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
});

export default EditJournalScreen;
