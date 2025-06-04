
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorState {
  fields: Record<string, any>;
  editHistory: {
    fieldId: string;
    value: any;
    timestamp: number;
  }[];
  editMode: 'inline' | 'form';
}

const initialState: EditorState = {
  fields: {},
  editHistory: [],
  editMode: 'inline',
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ fieldId: string; value: any }>) => {
      const { fieldId, value } = action.payload;
      
      // Update the field
      state.fields[fieldId] = value;
      
      // Add to history
      state.editHistory.push({
        fieldId,
        value,
        timestamp: Date.now(),
      });
      
      // Limit history to last 100 edits
      if (state.editHistory.length > 100) {
        state.editHistory = state.editHistory.slice(-100);
      }
    },
    
    setEditMode: (state, action: PayloadAction<'inline' | 'form'>) => {
      state.editMode = action.payload;
    },
    
    bulkUpdateFields: (state, action: PayloadAction<Record<string, any>>) => {
      const updates = action.payload;
      
      Object.entries(updates).forEach(([fieldId, value]) => {
        state.fields[fieldId] = value;
        
        state.editHistory.push({
          fieldId,
          value,
          timestamp: Date.now(),
        });
      });
      
      // Limit history after bulk updates
      if (state.editHistory.length > 100) {
        state.editHistory = state.editHistory.slice(-100);
      }
    },
    
    resetField: (state, action: PayloadAction<string>) => {
      const fieldId = action.payload;
      delete state.fields[fieldId];
    },
    
    resetAllFields: (state) => {
      state.fields = {};
    }
  },
});

export const { updateField, setEditMode, bulkUpdateFields, resetField, resetAllFields } = editorSlice.actions;

export default editorSlice.reducer;
