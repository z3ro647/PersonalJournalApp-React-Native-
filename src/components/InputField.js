import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputField = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "none",
  textContentType = "none",
  ...props
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
    autoCapitalize={autoCapitalize}
    textContentType={textContentType}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
});

export default InputField;
