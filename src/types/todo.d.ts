export type EditingId = string | null;
export interface Task {
  id: string,
  text: string,
  completed: boolean,
  createdAt: string,
}

export interface UseTodo {
  tasks: Task[];
  task: string;
  editingId: EditingId;
  handleAddTask: () => void;
  toggleComplete: (id: string) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setTask: (text: string) => void;
}