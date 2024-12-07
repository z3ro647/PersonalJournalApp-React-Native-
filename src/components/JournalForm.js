// src/screens/JournalForm.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Import Firebase
import { AuthContext } from '../context/AuthContext'; // Import user context
import { Ionicons } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker

const JournalForm = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mood, setMood] = useState('');
    const [imageUri, setImageUri] = useState(null); // To store image URI
    const { user } = useContext(AuthContext); // Logged-in user context

    const handleAddJournal = async () => {
        if (!user) return; // Ensure user is logged in

        if (!title || !content) {
            Alert.alert('Error', 'Please fill all the fields before submitting.');
            return;
        }

        try {
            // Prepare the journal data
            const journalData = {
                title,
                content,
                mood, // Optional mood field
                date: new Date().toISOString(), // Add date
                uid: user.uid, // Add user's UID
            };

            // If an image is selected, include the image URL in the journal data
            if (imageUri) {
                journalData.imageUri = imageUri;
            }

            // Add the journal entry to Firestore
            await addDoc(collection(db, 'journals'), journalData);

            // Clear form fields
            setTitle('');
            setContent('');
            setMood('');
            setImageUri(null);

            Alert.alert('Success', 'Journal added successfully.');
            navigation.goBack(); // Navigate back to the previous screen
        } catch (error) {
            console.error('Error adding journal:', error);
            Alert.alert('Error', 'An error occurred while adding the journal. Please try again.');
        }
    };

    const handleImagePick = () => {
        // Launch image picker
        launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                // Get the image URI from the response
                setImageUri(response.assets[0].uri);
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add Journal</Text>

            {/* Title Input */}
            <View style={styles.inputContainer}>
                <Ionicons name="book" size={24} color="#007BFF" style={styles.icon} />
                <TextInput
                    placeholder="Journal Title"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
            </View>

            {/* Content Input */}
            <View style={styles.inputContainer}>
                <Ionicons name="text" size={24} color="#007BFF" style={styles.icon} />
                <TextInput
                    placeholder="Write your journal..."
                    value={content}
                    onChangeText={setContent}
                    multiline
                    style={[styles.input, styles.contentInput]}
                />
            </View>

            {/* Mood Input (Optional) */}
            <View style={styles.inputContainer}>
                <Ionicons name="happy" size={24} color="#FF4500" style={styles.icon} />
                <TextInput
                    placeholder="Mood (optional)"
                    value={mood}
                    onChangeText={setMood}
                    style={styles.input}
                />
            </View>

            {/* Image Picker */}
            <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
                <Ionicons name="image" size={24} color="#FF4500" style={styles.icon} />
                <Text style={styles.imageButtonText}>Choose Image (Optional)</Text>
            </TouchableOpacity>

            {/* Display selected image */}
            {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleAddJournal}>
                <Text style={styles.submitButtonText}>Add Journal</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 16,
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        padding: 8,
    },
    contentInput: {
        height: 150, // Adjust height for content text input
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    imageButtonText: {
        fontSize: 16,
        color: '#FF4500',
        marginLeft: 10,
    },
    imagePreview: {
        width: 200,
        height: 200,
        marginVertical: 10,
        alignSelf: 'center',
        borderRadius: 8,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        elevation: 5,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default JournalForm;
