import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderImage = () => (
    <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>No Image Available</Text>
    </View>
);

const styles = StyleSheet.create({
    placeholder: {
        width: 200,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    placeholderText: {
        fontSize: 16,
        color: '#888',
    },
});

export default PlaceholderImage;
