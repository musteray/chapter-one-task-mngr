import { useState } from "react";
import { Alert } from "react-native";

import { EditingId, Task, UseTodo } from "@/src/types/todo";

export default function useTodo(): UseTodo {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<EditingId>(null);

  // Add or update task
  const handleAddTask = () => {
    if (task.trim() === '') {
      Alert.alert('Empty Task', 'Please enter a task description.');
      return;
    }

    if (editingId) {
      // Update existing task
      setTasks(tasks.map(item => 
        item.id === editingId 
          ? { ...item, text: task }
          : item
      ));
      setEditingId(null);
    } else {
      // Add new task
      const newTask = {
        id: Date.now().toString(),
        text: task,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
    }
    
    setTask('');
  };

  // Toggle task completion
  const toggleComplete = (id: string) => {
    setTasks(tasks.map(item =>
      item.id === id 
        ? { ...item, completed: !item.completed }
        : item
    ));
  };

  // Delete task with confirmation
  const deleteTask = (id: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => setTasks(tasks.filter(item => item.id !== id)),
          style: 'destructive'
        },
      ]
    );
  };

  // Edit task
  const editTask = (item: Task) => {
    setTask(item.text);
    setEditingId(item.id);
  };

  return {
    tasks,
    task,
    editingId,
    setTask,
    handleAddTask,
    toggleComplete,
    editTask,
    deleteTask
  }
}