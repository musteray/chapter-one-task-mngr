import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { SafeView } from '@/src/components/safe-view';
import { FlatList } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useTodo from '@/src/hooks/use-todo';

export default function Home() {
  const {
    tasks,
    task,
    editingId,
    handleAddTask,
    toggleComplete,
    editTask,
    deleteTask,
    setTask
  } = useTodo();

  // Render individual task item
  const renderTask = ({ item }: any) => (
    <ThemedView style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => toggleComplete(item.id)}
        activeOpacity={0.7}
      >
        <ThemedView style={styles.checkboxContainer}>
          <ThemedView style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
            {item.completed && (
              <Ionicons name="checkmark" size={18} color="white" />
            )}
          </ThemedView>
        </ThemedView>
        <ThemedText style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
          {item.text}
        </ThemedText>
      </TouchableOpacity>
      
      <ThemedView style={styles.taskActions}>
        <TouchableOpacity 
          onPress={() => editTask(item)}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil" size={20} color="#4A90E2" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => deleteTask(item.id)}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color="#E74C3C" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeView>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerTitle}>Todo List</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Stay organized, stay productive</ThemedText>
        </ThemedView>

        {/* Statistics */}
        <ThemedView style={styles.statsContainer}>
          <ThemedView style={styles.statItem}>
            <ThemedText style={styles.statNumber}>{totalTasks}</ThemedText>
            <ThemedText style={styles.statLabel}>Total</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: '#27AE60' }]}>{completedTasks}</ThemedText>
            <ThemedText style={styles.statLabel}>Done</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: '#F39C12' }]}>{pendingTasks}</ThemedText>
            <ThemedText style={styles.statLabel}>Pending</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Task List */}
        <ThemedView style={styles.listContainer}>
          {tasks.length === 0 ? (
            <ThemedView style={styles.emptyContainer}>
              <Ionicons name="clipboard-outline" size={64} color="#BDC3C7" />
              <ThemedText style={styles.emptyText}>No tasks yet</ThemedText>
              <ThemedText style={styles.emptySubtext}>Add your first task below</ThemedText>
            </ThemedView>
          ) : (
            <FlatList
              data={tasks}
              renderItem={renderTask}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </ThemedView>

        {/* Input Section */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <ThemedView style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="What needs to be done?"
              placeholderTextColor="#95A5A6"
              value={task}
              onChangeText={setTask}
              onSubmitEditing={handleAddTask}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={[styles.addButton, task.trim() === '' && styles.addButtonDisabled]}
              onPress={handleAddTask}
              activeOpacity={0.7}
              disabled={task.trim() === ''}
            >
              <Ionicons
                name={editingId ? "checkmark" : "add"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  taskContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BDC3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#27AE60',
    borderColor: '#27AE60',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#95A5A6',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 20,
    color: '#7F8C8D',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95A5A6',
    marginTop: 8,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2C3E50',
    marginRight: 12,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: '#BDC3C7',
    shadowOpacity: 0.1,
  },
});
