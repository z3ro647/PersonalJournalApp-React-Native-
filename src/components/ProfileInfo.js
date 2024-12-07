import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileInfo = ({ email, joinDate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Email: {email}</Text>
      <Text style={styles.infoText}>Joined: {joinDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});

export default ProfileInfo;
