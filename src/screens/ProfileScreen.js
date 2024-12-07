import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { AuthContext } from '../context/AuthContext';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInfo from '../components/ProfileInfo';
import ProfileButtons from '../components/ProfileButtons';
import EditProfileModal from '../components/EditProfileModal';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);  // Access user context
  const [modalVisible, setModalVisible] = useState(false);  // Modal visibility
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');  // User's display name
  const [newPhotoURL, setNewPhotoURL] = useState(user?.photoURL || null);  // User's profile image

  // Handle logout functionality
  const handleLogout = async () => {
    await signOut(auth);  // Sign out from Firebase
    setUser(null);  // Clear the user from context
    navigation.replace('Login');  // Redirect to login screen
  };

  // Handle profile update (Name & Photo)
  const handleSaveProfileChanges = async () => {
    try {
      await updateProfile(auth.currentUser, {  // Update profile with new details
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      });
      
      // Update user context with new profile data
      setUser({
        ...user,
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      });

      setModalVisible(false);  // Close the modal after saving changes
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Update Failed', 'An error occurred while updating your profile.');
    }
  };

  // Handle image selection for profile picture
  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setNewPhotoURL(response.assets[0].uri);  // Set the selected image URI
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Profile Header Component */}
      <ProfileHeader 
        photoURL={newPhotoURL} 
        displayName={user?.displayName || user?.email} 
      />
      
      {/* Profile Info Component (Email, Join Date) */}
      <ProfileInfo 
        email={user?.email} 
        joinDate={new Date(user?.metadata?.creationTime).toLocaleDateString()} 
      />

      {/* Profile Action Buttons (Edit Profile, Logout) */}
      <ProfileButtons 
        onEditPress={() => setModalVisible(true)} 
        onLogoutPress={handleLogout} 
      />

      {/* Modal for editing profile */}
      <EditProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveProfileChanges}
        displayName={newDisplayName}
        onDisplayNameChange={setNewDisplayName}
        onSelectImage={handleSelectImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F9',
  },
});

export default ProfileScreen;
