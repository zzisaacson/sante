import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import BackgroundGraphics from '../components/BackgroundGraphics';

const { width } = Dimensions.get('window');
const IPHONE_ASPECT_RATIO = 19.5 / 9;
const containerHeight = width * IPHONE_ASPECT_RATIO - 64;

export default function PostPreview() {
  const { type, data } = useLocalSearchParams();
  const parsedData = JSON.parse(data as string);

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundGraphics type={type as 'workout' | 'meal'} />
      <ScrollView style={styles.scrollView}>
        <View style={[styles.postContainer, { height: containerHeight }]}>
          {/* Header Image */}
          <Image
            source={
              type === 'workout'
                ? require('../assets/workout-placeholder.png')
                : require('../assets/meal-placeholder.png')
            }
            style={styles.headerImage}
            resizeMode="cover"
          />

          <View style={styles.contentContainer}>
            {type === 'workout' ? (
              <>
                <Text style={styles.postTitle}>{parsedData.title}</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Type</Text>
                    <Text style={styles.statValue}>{parsedData.type}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Location</Text>
                    <Text style={styles.statValue}>{parsedData.location}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Date</Text>
                    <Text style={styles.statValue}>{parsedData.date}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Time</Text>
                    <Text style={styles.statValue}>{parsedData.time}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Distance</Text>
                    <Text style={styles.statValue}>{parsedData.distance}</Text>
                  </View>
                </View>

                {parsedData.commentary && (
                  <View style={styles.commentaryContainer}>
                    <Text style={styles.commentaryText}>{parsedData.commentary}</Text>
                  </View>
                )}

                <Text style={styles.sectionTitle}>Exercises</Text>
                {parsedData.exercises.map((exercise: any, index: number) => (
                  <View key={index} style={styles.exerciseContainer}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <View style={styles.exerciseDetails}>
                      <View style={styles.exerciseStat}>
                        <Text style={styles.exerciseStatLabel}>Reps</Text>
                        <Text style={styles.exerciseStatValue}>{exercise.reps}</Text>
                      </View>
                      <View style={styles.exerciseStat}>
                        <Text style={styles.exerciseStatLabel}>Rest</Text>
                        <Text style={styles.exerciseStatValue}>{exercise.rest}</Text>
                      </View>
                      <View style={styles.exerciseStat}>
                        <Text style={styles.exerciseStatLabel}>Weight</Text>
                        <Text style={styles.exerciseStatValue}>{exercise.weight}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <>
                <Text style={styles.postTitle}>{parsedData.title}</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Difficulty</Text>
                    <Text style={styles.statValue}>{parsedData.difficulty}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Time to Cook</Text>
                    <Text style={styles.statValue}>{parsedData.timeCook}</Text>
                  </View>
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

          <View style={styles.footer}>
            <Text style={styles.footerText}>Create your own at samplewebsite.com</Text>
          </View>
        </View>

        {/* Edit button placed outside the white container */}
        <View style={styles.editButtonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.back()}
          >
            <Text style={styles.editButtonText}>Edit Post</Text>
          </TouchableOpacity>
        </View>
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
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 20,
    position: 'relative',
    flex: 1,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  statItem: {
    width: '50%',
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  commentaryContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  commentaryText: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  exerciseContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exerciseStat: {
    alignItems: 'center',
  },
  exerciseStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  exerciseStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  editButtonContainer: {
    padding: 20,
    paddingTop: 90,
    alignItems: 'center',
    marginBottom: 40,
  },
  editButton: {
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 