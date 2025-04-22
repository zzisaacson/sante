import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function PostPreview() {
  const { type, data } = useLocalSearchParams();
  const parsedData = JSON.parse(data as string);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {type === 'workout' ? 'Workout Post Preview' : 'Meal Post Preview'}
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postContainer}>
          {type === 'workout' ? (
            <>
              <Text style={styles.postTitle}>{parsedData.title}</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>{parsedData.type}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Location:</Text>
                <Text style={styles.detailValue}>{parsedData.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>{parsedData.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Time:</Text>
                <Text style={styles.detailValue}>{parsedData.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Distance:</Text>
                <Text style={styles.detailValue}>{parsedData.distance}</Text>
              </View>
              {parsedData.commentary && (
                <View style={styles.commentaryContainer}>
                  <Text style={styles.commentaryLabel}>Commentary:</Text>
                  <Text style={styles.commentaryText}>{parsedData.commentary}</Text>
                </View>
              )}
              <Text style={styles.sectionTitle}>Exercises</Text>
              {parsedData.exercises.map((exercise: any, index: number) => (
                <View key={index} style={styles.exerciseContainer}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.exerciseDetails}>
                    <Text>Reps: {exercise.reps}</Text>
                    <Text>Rest: {exercise.rest}</Text>
                    <Text>Weight: {exercise.weight}</Text>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <>
              <Text style={styles.postTitle}>{parsedData.title}</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Difficulty:</Text>
                <Text style={styles.detailValue}>{parsedData.difficulty}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Time to Cook:</Text>
                <Text style={styles.detailValue}>{parsedData.timeCook}</Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                <Text style={styles.sectionText}>{parsedData.ingredients}</Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Instructions</Text>
                <Text style={styles.sectionText}>{parsedData.instructions}</Text>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 100,
  },
  detailValue: {
    flex: 1,
  },
  commentaryContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  commentaryLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentaryText: {
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  exerciseContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionText: {
    lineHeight: 24,
  },
  postButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 