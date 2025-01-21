import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedMockupState {
  isMockupSelected: boolean;
  mockupName: string;
  mockupSrc: string;
}

interface ImportFileState {
  file: string | null;
  fileName: string;
  width: number | null;
  height: number | null;
  type: 'image' | 'video' | null;
  duration: number | null;
}

interface MockFitToolsState{
  // Mockup
  alignVertical: string;
  alignHorizontal: string;
  scale: number;
  rotation: number;
  resize: string;
  // Effects 
  brightness: number;
  contrast: number;
  highlights: number;
  saturation: number;
  shadow: number;
  noise: number;
}


interface MockLabState {
  selectedMockup : SelectedMockupState,
  preview: boolean,
  importFile: ImportFileState,
  mockFitTools: MockFitToolsState
}

const initialState : MockLabState = {
    selectedMockup : {
      isMockupSelected: true,
      mockupName: 'MoacBookPROM3',
      mockupSrc : 'https://mooockups.s3.ap-south-1.amazonaws.com/MockFit/mockup.png'
    },
    preview : false,
    importFile : {
      file: null,
      fileName: 'Import file',
      width: null,
      height: null,
      type: null,
      duration: null,
    },
    mockFitTools : {
      alignVertical: 'center',
      alignHorizontal: 'center',
      scale: 3,
      rotation: 0,
      resize: '',
      brightness: 0,
      contrast: 0,
      highlights: 0,
      saturation: 0,
      shadow: 0,
      noise: 0,
    }
};

const previewSlice = createSlice({
  name: 'mockFit',
  initialState,
  reducers: {
    setSelectedMockup: (state, action: PayloadAction<any>) => {
      state.selectedMockup = action.payload;
    },
    setPreview: (state, action: PayloadAction<any>) => {
      state.preview = action.payload;
    },
    setFile: ( state,action: PayloadAction<ImportFileState> ) => {
      const { file, fileName, width, height, type, duration } = action.payload;
      state.importFile.file = file;
      state.importFile.fileName = fileName;
      state.importFile.width = width;
      state.importFile.height = height;
      state.importFile.type = type;
      state.importFile.duration = type === 'video' ? duration ?? null : null;
    },
    clearFile: (state) => {
      state.importFile.file = null;
      state.importFile.fileName = 'Import file';
      state.importFile.width = null;
      state.importFile.height = null;
      state.importFile.type = null;
      state.importFile.duration = null;

    },

    setMockFitTools: (state: any,action: PayloadAction<{ property: keyof MockFitToolsState; value: any }>) => {
      const { property, value } = action.payload;
      if (property in state.mockFitTools) {
        state.mockFitTools[property] = value;
      }
    },

  },
});

export const { 
  setSelectedMockup,
  setPreview,
  setFile,
  clearFile,
  setMockFitTools
 } = previewSlice.actions;
export default previewSlice.reducer;
