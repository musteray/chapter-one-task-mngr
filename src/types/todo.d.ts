export type EditingId = string | null;
export interface Task {
  id: string,
  text: string,
  completed: boolean,
  createdAt: string,
}