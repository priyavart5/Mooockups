// src/redux/slices/mockLabSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Shade {
    name: string;
    featuredSrc: string;
    canvasSrc: string;
}

interface MockupDeviceState{
    brand: string;
    model: string;
    screenPixels: string;
    image: string;
    shade: Shade[];
    Layout: unknown[];
}

interface MockupShadeState {
    shadeSrc: string;
}

interface MockupLayoutState {
    layoutSrc: string;
}

interface MockupShadowState {
    shadowValue: string;
}

interface MockupShadowOpacityState {
    shadowOpacityValue: number;
}

interface MockupScaleState {
    scaleValue: number;
}

interface MockupRotationState{
    rotationValue: number;
}

interface MockupPosition_X_State{
    position_X_Value: number;
}
  
interface MockupPosition_Y_State{
    position_Y_Value: number;
}



// interface FrameBackgroundState {
//   type: 'transparent' | 'uploaded' | 'unsplash' | 'pexels' | 'pixabay';
//   src?: string;
// }

interface FrameGradientState {
    gradientSrc: string;
}

interface FrameGradientOpacityState {
    gradientOpacityValue: number;
}

interface FrameGradientScaleState {
    gradientScaleValue: number;
}

interface FrameGradientRotationState {
    gradientRotationValue: number;
}

interface FrameShadowState {
    shadowSrc : string;
}

interface FrameShadowOpacityState {
    shadowOpacityValue: number;
}

interface FrameShadowScaleState {
    shadowScaleValue: number;
}

interface FrameShadowRotationState {
    shadowRotationValue: number;
}

interface FrameSolidColorState{
    color: string;
}

interface FrameSolidColorOpacityState{
    colorOpacityValue: number;
}

interface frameNoiseState{
    noise : number;
}

interface frameBlurState{
    blur : number;
}

interface MockLabState {
    // Mockup
    mockupSelectedDevice: MockupDeviceState;

    mockupShade: MockupShadeState;

    mockupLayout: MockupLayoutState;

    mockupShadow: MockupShadowState;
    mockupShadowOpacity: MockupShadowOpacityState;

    mockupScale: MockupScaleState;

    mockupRotation: MockupRotationState;

    mockupPositionX: MockupPosition_X_State;
    mockupPositionY: MockupPosition_Y_State;

    // Frame
    //   frameBackground: FrameBackgroundState;

    frameGradient: FrameGradientState;
    frameGradientOpacity: FrameGradientOpacityState;
    frameGradientScale: FrameGradientScaleState;
    frameGradientRotation: FrameGradientRotationState;


    frameShadow: FrameShadowState;
    frameShadowOpacity: FrameShadowOpacityState;
    frameShadowScale: FrameShadowScaleState;
    frameShadowRotation: FrameShadowRotationState;

    frameSolidColor: FrameSolidColorState;
    frameSolidColorOpacity: FrameSolidColorOpacityState;

    frameNoise: frameNoiseState;
    frameBlur: frameBlurState;
}

const defaultDevice = {
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    screenPixels: '3120 x 1440',
    image: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Violet.webp',
    shade: [
        {
            name: 'Titanium Gray',
            featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Gray.webp',
            canvasSrc: '',
        },
        {
            name: 'Titanium Black',
            featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Black.webp',
            canvasSrc: '',
        },
        {
            name: 'Titanium Violet',
            featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Violet.webp',
            canvasSrc: '',
        },
        {
            name: 'Titanium Yellow',
            featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Yellow.webp',
            canvasSrc: '',
        },
    ],
    Layout: [],
};

const initialState: MockLabState = {
    mockupSelectedDevice: defaultDevice,

    mockupShade: { shadeSrc: '' },

    mockupLayout: { layoutSrc: '' },

    mockupShadow: { shadowValue: '' },
    mockupShadowOpacity: { shadowOpacityValue: 1 },

    mockupScale: { scaleValue: 1 },
    mockupRotation: { rotationValue: 0 },

    mockupPositionX: {position_X_Value: 0},
    mockupPositionY: {position_Y_Value : 0},

    // frameBackground: { type: 'transparent' },
    frameGradient: { gradientSrc: ''},
    frameGradientOpacity: { gradientOpacityValue : 1},
    frameGradientScale: { gradientScaleValue : 1},
    frameGradientRotation: { gradientRotationValue : 1},

    frameShadow: { shadowSrc: ''},
    frameShadowOpacity: { shadowOpacityValue : 1},
    frameShadowScale: { shadowScaleValue : 1},
    frameShadowRotation: { shadowRotationValue : 1},

    frameSolidColor: { color: '#ffffff' },
    frameSolidColorOpacity: { colorOpacityValue: 1 },

    frameNoise: {noise : 1},
    frameBlur: {blur : 1},
};

const mockLabSlice = createSlice({
  name: 'mockLab',
  initialState,
  reducers: {

    // Mockup Reducer
    setMockupSelectedDevice(state, action: PayloadAction<MockupDeviceState>) {
        state.mockupSelectedDevice = action.payload;
    },

    setMockupShade(state, action: PayloadAction<string>) {
        state.mockupShade.shadeSrc = action.payload;
    },

    setMockupLayout(state, action: PayloadAction<string>) {
        state.mockupLayout.layoutSrc = action.payload;
    },

    setMockupShadow(state, action: PayloadAction<string>) {
        state.mockupShadow.shadowValue = action.payload;
    },

    setMockupShadowOpacity(state, action: PayloadAction<number>) {
        state.mockupShadowOpacity.shadowOpacityValue = action.payload;
    },

    setMockupScale(state, action: PayloadAction<number>) {
        state.mockupScale.scaleValue = action.payload;
    },

    setMockupRotation(state, action: PayloadAction<number>) {
        state.mockupRotation.rotationValue = action.payload;
    },

    setMockupPositionX(state, action: PayloadAction<number>) {
        state.mockupPositionX.position_X_Value = action.payload;
    },

    setMockupPositionY(state, action: PayloadAction<number>) {
        state.mockupPositionY.position_Y_Value = action.payload;
    },


    // Frame Reducer

    // setFrameBackground(state, action: PayloadAction<FrameBackgroundState>) {
    //   state.frameBackground = action.payload;
    // },

    setFrameGradient(state, action: PayloadAction<string>) {
      state.frameGradient.gradientSrc = action.payload;
    },

    setFrameGradientOpacity(state, action: PayloadAction<number>) {
        state.frameGradientOpacity.gradientOpacityValue = action.payload;
    },

    setFrameGradientScale(state, action: PayloadAction<number>) {
        state.frameGradientScale.gradientScaleValue = action.payload;
    },

    setFrameGradientRotation(state, action: PayloadAction<number>) {
        state.frameGradientRotation.gradientRotationValue = action.payload;
    },

    setFrameShadow(state, action: PayloadAction<string>) {
        state.frameShadow.shadowSrc = action.payload;
    },

    setFrameShadowOpacity(state, action: PayloadAction<number>) {
        state.frameShadowOpacity.shadowOpacityValue = action.payload;
    },

    setFrameShadowScale(state, action: PayloadAction<number>) {
        state.frameShadowScale.shadowScaleValue = action.payload;
    },

    setFrameShadowRotation(state, action: PayloadAction<number>) {
        state.frameShadowRotation.shadowRotationValue = action.payload;
    },

    setFrameSolidColor(state, action: PayloadAction<string>) {
        state.frameSolidColor.color = action.payload;
    },

    setFrameSolidColorOpacity(state, action: PayloadAction<number>) {
        state.frameSolidColorOpacity.colorOpacityValue = action.payload;
    },

    setFrameNoise(state, action: PayloadAction<number>) {
        state.frameNoise.noise = action.payload;
    },

    setFrameBlur(state, action: PayloadAction<number>) {
        state.frameBlur.blur = action.payload;
    },
  },
});

export const {
    setMockupSelectedDevice,
    setMockupShade,
    setMockupLayout,
    setMockupShadow,
    setMockupShadowOpacity,
    setMockupScale,
    setMockupRotation,
    setMockupPositionX,
    setMockupPositionY,
    // setFrameBackground,
    setFrameGradient,
    setFrameGradientOpacity,
    setFrameGradientScale,
    setFrameGradientRotation,
    setFrameShadow,
    setFrameShadowOpacity,
    setFrameShadowScale,
    setFrameShadowRotation,
    setFrameSolidColor,
    setFrameSolidColorOpacity,
    setFrameNoise,
    setFrameBlur,
} = mockLabSlice.actions;

export default mockLabSlice.reducer;
