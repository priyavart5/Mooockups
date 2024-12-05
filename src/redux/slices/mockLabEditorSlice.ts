import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MockLabState {
  background: {
    type: 'transparent' | 'importImage' | 'unsplash' | 'pixabay' | 'gradient';
    backgroundSrc: string;
    solidColor: string;
    opacity: number;
    scale: number;
    noise: number;
    blur: number;
  };
  shadow: {
    shadowSrc: string;
    scale: number;
    opacity: number;
  };
//   deviceShade: {
//     shadeSrc: string;
//   };
}

const initialState: MockLabState = {
  background: {
    type: 'transparent',
    backgroundSrc: '',
    solidColor: '#121212',
    opacity: 1,
    scale: 0.5,
    noise: 0,
    blur: 0,
  },
  shadow: {
    shadowSrc: '',
    scale: 0.5,
    opacity: 1,
  },
//   deviceShade: {
//     shadeSrc: '',
//   },
};

const mockLabEditorSlice = createSlice({
  name: 'mockLab',
  initialState,
  reducers: {
    // Frame Actions
    setBackgroundType: (state, action: PayloadAction<'transparent' | 'importImage' | 'unsplash' | 'pixabay' | 'gradient'>) => {
        state.background.type = action.payload;
    },
    setBackgroundSrc: (state, action: PayloadAction<string>) => {
        state.background.backgroundSrc = action.payload;
    },
    setSolidColor: (state, action: PayloadAction<string>) => {
        state.background.solidColor = action.payload;
    },
    setBackgroundOpacity: (state, action: PayloadAction<number>) => {
        state.background.opacity = action.payload;
    },
    setBackgroundScale: (state, action: PayloadAction<number>) => {
        state.background.scale = action.payload;
    },
    setBackgroundNoise: (state, action: PayloadAction<number>) => {
        state.background.noise = action.payload;
    },
    setBackgroundBlur: (state, action: PayloadAction<number>) => {
        state.background.blur = action.payload;
    },

    setShadowSrc: (state, action: PayloadAction<string>) => {
      state.shadow.shadowSrc = action.payload;
    },
    setShadowScale: (state, action: PayloadAction<number>) => {
      state.shadow.scale = action.payload;
    },
    setShadowOpacity: (state, action: PayloadAction<number>) => {
      state.shadow.opacity = action.payload;
    },


    // Mockup Actions

    // setDeviceShadeSrc: (state, action: PayloadAction<string>) => {
    //   state.deviceShade.shadeSrc = action.payload;
    // },
    // clearDeviceShade: (state) => {
    //   state.deviceShade.shadeSrc = '';
    // },

  },
});

export const {
    // Frame
    setBackgroundType,
    setBackgroundSrc,
    setSolidColor,
    setBackgroundOpacity,
    setBackgroundScale,
    setBackgroundBlur,
    setBackgroundNoise,
    setShadowSrc,
    setShadowScale,
    setShadowOpacity,

    // Mockup
    // setDeviceShadeSrc,
    // clearDeviceShade,
} = mockLabEditorSlice.actions;

export default mockLabEditorSlice.reducer;
