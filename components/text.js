import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const MyText = ({children, style, ...props}) => (
  <Text {...props} style={[styles.default, style]}>{children}</Text>
)

export const DangerText = ({children, style, ...props}) => (
  <Text {...props} style={[styles.danger, style]}>{children}</Text>
)

export const H1 = ({children, style, ...props}) => (
  <Text {...props} style={[styles.default, styles.h1, style]}>{children}</Text>
)

export const H2 = ({children, style, ...props}) => (
  <Text {...props} style={[styles.default, styles.h2, style]}>{children}</Text>
)

export const H3 = ({children, style, ...props}) => (
  <Text {...props} style={[styles.default, styles.h3, style]}>{children}</Text>
)

export const styles = StyleSheet.create({
  default: {
    color: 'white',
  },
  danger: {
    color: '#d9534f',
  },
  h1: {
    fontSize: 24,
  },
  h2: {
    fontSize: 20,
  },
  h3: {
    fontSize: 16,
  },
  searchBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});
