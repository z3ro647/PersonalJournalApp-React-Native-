import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ImagePickerSection = ({ imageUri, setImageUri }) => {
    const handleImagePick = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    return (
        <View style={styles.imageSection}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>No Image Available</Text>
                </View>
            )}
            <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
                <Text style={styles.imageButtonText}>Choose/Change Image</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    imageSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePreview: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
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
    imageButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ImagePickerSection;
