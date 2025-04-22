import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';

type Exercise = {
  name: string;
  reps: string;
  rest: string;
  weight: string;
};

type PostType = 'workout' | 'meal' | null;

export default function CreatePost() {
  const [postType, setPostType] = useState<PostType>(null);
  const [workoutData, setWorkoutData] = useState({
    title: '',
    type: '',
    commentary: '',
    location: '',
    date: '',
    time: '',
    distance: '',
    exercises: [] as Exercise[],
  });

  const [mealData, setMealData] = useState({
    title: '',
    difficulty: '',
    timeCook: '',
    ingredients: '',
    instructions: '',
  });

  const addExercise = () => {
    setWorkoutData({
      ...workoutData,
      exercises: [...workoutData.exercises, { name: '', reps: '', rest: '', weight: '' }],
    });
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string) => {
    const newExercises = [...workoutData.exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setWorkoutData({ ...workoutData, exercises: newExercises });
  };

  const generatePost = () => {
    if (postType === 'workout') {
      router.push({
        pathname: '/post-preview',
        params: { type: 'workout', data: JSON.stringify(workoutData) }
      });
    } else if (postType === 'meal') {
      router.push({
        pathname: '/post-preview',
        params: { type: 'meal', data: JSON.stringify(mealData) }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Create Your Post</Text>
        
        {/* Workout Post Option */}
        <TouchableOpacity
          style={[styles.optionBox, postType === 'workout' && styles.selectedBox]}
          onPress={() => setPostType('workout')}
        >
          <Text style={styles.optionTitle}>Make a Workout Post</Text>
        </TouchableOpacity>

        {postType === 'workout' && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Title/Caption"
              value={workoutData.title}
              onChangeText={(text) => setWorkoutData({ ...workoutData, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Type of Activity"
              value={workoutData.type}
              onChangeText={(text) => setWorkoutData({ ...workoutData, type: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Commentary"
              value={workoutData.commentary}
              onChangeText={(text) => setWorkoutData({ ...workoutData, commentary: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={workoutData.location}
              onChangeText={(text) => setWorkoutData({ ...workoutData, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={workoutData.date}
              onChangeText={(text) => setWorkoutData({ ...workoutData, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Time"
              value={workoutData.time}
              onChangeText={(text) => setWorkoutData({ ...workoutData, time: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Distance"
              value={workoutData.distance}
              onChangeText={(text) => setWorkoutData({ ...workoutData, distance: text })}
            />

            <Text style={styles.sectionTitle}>Exercises</Text>
            {workoutData.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChangeText={(text) => updateExercise(index, 'name', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Reps"
                  value={exercise.reps}
                  onChangeText={(text) => updateExercise(index, 'reps', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Rest"
                  value={exercise.rest}
                  onChangeText={(text) => updateExercise(index, 'rest', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Weight"
                  value={exercise.weight}
                  onChangeText={(text) => updateExercise(index, 'weight', text)}
                />
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addExercise}>
              <Text style={styles.addButtonText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Meal Post Option */}
        <TouchableOpacity
          style={[styles.optionBox, postType === 'meal' && styles.selectedBox]}
          onPress={() => setPostType('meal')}
        >
          <Text style={styles.optionTitle}>Make a Meal Post</Text>
        </TouchableOpacity>

        {postType === 'meal' && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={mealData.title}
              onChangeText={(text) => setMealData({ ...mealData, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Difficulty"
              value={mealData.difficulty}
              onChangeText={(text) => setMealData({ ...mealData, difficulty: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Time to Cook"
              value={mealData.timeCook}
              onChangeText={(text) => setMealData({ ...mealData, timeCook: text })}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ingredients"
              value={mealData.ingredients}
              onChangeText={(text) => setMealData({ ...mealData, ingredients: text })}
              multiline
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Instructions"
              value={mealData.instructions}
              onChangeText={(text) => setMealData({ ...mealData, instructions: text })}
              multiline
            />
          </View>
        )}

        {postType && (
          <TouchableOpacity style={styles.generateButton} onPress={generatePost}>
            <Text style={styles.generateButtonText}>Generate Post</Text>
          </TouchableOpacity>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedBox: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  generateButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 