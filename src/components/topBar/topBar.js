// TopBar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function TopBar() {
  return (
    <View style={styles.topBar} />
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    height: 90,
    backgroundColor: '#6D0E0E',
    position: 'absolute',
    top: 0,
  },
});
