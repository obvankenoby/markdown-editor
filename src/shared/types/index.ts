export type Theme = 'light' | 'dark';

export interface Document {
  id: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface EditorSettings {
  fontSize: number;
  lineHeight: number;
  theme: Theme;
  autoSave: boolean;
  autoSaveInterval: number;
}

export type EditorAction =
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<EditorSettings> }
  | { type: 'RESET' };

export interface EditorState {
  document: Document;
  settings: EditorSettings;
  isSaving: boolean;
  lastSaved: number | null;
}
