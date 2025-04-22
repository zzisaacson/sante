import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type BackgroundGraphicsProps = {
  type: 'workout' | 'meal';
};

export default function BackgroundGraphics({ type }: BackgroundGraphicsProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={type === 'workout' ? ['#4CAF50', '#2196F3'] : ['#FF9800', '#F44336']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  circle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -50,
    right: -50,
  },
  circle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    bottom: 100,
    left: -50,
  },
  circle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: '50%',
    right: '20%',
  },
}); 