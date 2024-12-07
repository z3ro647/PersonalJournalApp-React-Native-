import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SignupButton = ({ onPress, loading }) => {
  return loading ? (
    <ActivityIndicator size="large" color="#007BFF" />
  ) : (
    <TouchableOpacity style={styles.signupButton} onPress={onPress}>
      <Text style={styles.signupButtonText}>Sign Up</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signupButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignupButton;
