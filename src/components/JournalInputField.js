import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const JournalInputField = ({ value, onChangeText, placeholder, multiline = false }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={multiline}
                style={[styles.input, multiline && styles.textArea]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default JournalInputField;
