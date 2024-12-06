// src/redux/slices/mockLabSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// ************************
// Mockup Interfaces
// ************************
interface MockupDeviceState{
    brand: string;
    model: string;
    screenPixels: string;
    image: string;
    shade: Shade[];
    Layout: unknown[];
}

interface Shade {
    name: string;
    featuredSrc: string;
    canvasSrc: string;
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



// ************************
// Frame Interfaces
// ************************

interface FrameTransparentState{
    transparent: boolean;
}

interface FrameBackgroundState{
    backgroundType: 'importImage' | 'unsplash' | 'pixabay' | 'gradient' | 'none';
    backgroundSrc: string;
    backgroundScale: number,
    backgroundOpacity: number,
}

interface FrameShadowState {
    shadowSrc : string;
    shadowScale: number;
    shadowOpacity: number;
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
    frameTransparent: FrameTransparentState;
    frameBackground: FrameBackgroundState;
    frameShadow: FrameShadowState;
    frameNoise: frameNoiseState;
    frameBlur: frameBlurState;
}

const defaultDevice = {
    brand : 'Apple',
    model : 'iPad Mini',
    screenPixels : '1488 x 2266',
    image : 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Shade/Featured+Image/Space+Grey.webp',
    shade : [
        {
            name: 'Space Grey',
            featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Shade/Featured+Image/Space+Grey.webp',
            canvasSrc : 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Shade/Canvas+Image/Space+Grey.png'
        },
        {
            name: 'Blue',
            featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Shade/Featured+Image/Blue.webp',
            canvasSrc : 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Shade/Canvas+Image/Blue.png'
        },
        {
            name: 'Purple',
            featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Shade/Featured+Image/Purple.webp',
            canvasSrc : 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Shade/Canvas+Image/Purple.png'
        },
        {
            name: 'Starlight',
            featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Shade/Featured+Image/Starlight.webp',
            canvasSrc : 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Shade/Canvas+Image/Starlight.png'
        },
    ],
    Layout : []
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


    frameTransparent : { transparent: false},
    frameBackground: { 
        backgroundType: 'gradient', 
        backgroundSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Frame/Gradient/Canvas+Image/Galactic20Ring20-2016.webp',
        backgroundScale: 0,
        backgroundOpacity: 1,
    },
    frameShadow: { 
        shadowSrc: '',
        shadowScale: 0,
        shadowOpacity: 0.5,
    },
    frameNoise: {noise : 0},
    frameBlur: {blur : 0},
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

    setFrameTransparent(state, action: PayloadAction<boolean>) {
        state.frameTransparent.transparent = action.payload;
    },
    
    setFrameBackgroundType(state, action: PayloadAction<'importImage' | 'unsplash' | 'pixabay' | 'gradient' | 'none'>) {
        state.frameBackground.backgroundType = action.payload;
    },

    setFrameBackgroundSrc(state, action: PayloadAction<string>) {
        state.frameBackground.backgroundSrc = action.payload;
    },
    
    setFrameBackgroundScale(state, action: PayloadAction<number>) {
        state.frameBackground.backgroundScale = action.payload;
    },

    setFrameBackgroundOpacity(state, action: PayloadAction<number>) {
        state.frameBackground.backgroundOpacity = action.payload;
    },

    setFrameShadow(state, action: PayloadAction<string>) {
        state.frameShadow.shadowSrc = action.payload;
    },

    setFrameShadowOpacity(state, action: PayloadAction<number>) {
        state.frameShadow.shadowOpacity = action.payload;
    },

    setFrameShadowScale(state, action: PayloadAction<number>) {
        state.frameShadow.shadowScale = action.payload;
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

    setFrameTransparent,
    setFrameBackgroundType,
    setFrameBackgroundSrc,
    setFrameBackgroundScale,
    setFrameBackgroundOpacity,
    setFrameShadow,
    setFrameShadowOpacity,
    setFrameShadowScale,
    setFrameNoise,
    setFrameBlur,
} = mockLabSlice.actions;

export default mockLabSlice.reducer;
