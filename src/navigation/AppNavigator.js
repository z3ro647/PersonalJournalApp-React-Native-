// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import AuthNavigator from './AuthNavigator';  // Auth screens (Login, Signup)
import StackNavigator from './StackNavigator';  // Stack Navigator for main app
import { AuthContext } from '../context/AuthContext';

const AppNavigator = () => {
    const { user } = useContext(AuthContext);  // Check if user is logged in

    // If the user is logged in, show the MainNavigator (which has tabs)
    return user ? <StackNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
