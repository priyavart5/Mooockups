// src/redux/slices/mockLabSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// ************************
// Mockup Interfaces
// ************************

interface Shade {
    name: string;
    shadeSrc: string;
    layoutSrc: string;
}

interface MockupSelectedLayoutState {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface MockupDeviceState{
    brand: string;
    model: string;
    screenPixels: string;
    image: string;
    shade: Shade[];
    layout: MockupSelectedLayoutState[];
}

interface MockupLayoutSourceState {
    layoutSrc: string;
}

interface MockupShadowState {
    shadowOpacity: number;
}

interface MockupScaleState {
    scale: number;
}

interface MockupRotationState{
    rotation: number;
}

interface MockupPositionState{
    position_X: number;
    position_Y: number;
}



// ************************
// Frame Interfaces
// ************************

interface FrameLayoutState{
    type: string,
    name: string,
    aspectRatio: number,
    width: number,
    height: number
}

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
    mockupLayoutSource: MockupLayoutSourceState;
    mockupSelectedLayout: MockupSelectedLayoutState;
    mockupShadow: MockupShadowState;
    mockupScale: MockupScaleState;
    mockupRotation: MockupRotationState;
    mockupPosition: MockupPositionState

    // Frame
    frameLayout: FrameLayoutState;
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
    image : 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Space+Grey/space-grey.webp',
    shade : [
        {
            name: 'Blue',
            shadeSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Blue/blue.webp',
            layoutSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Blue/blue.png'
        },
        {
            name: 'Purple',
            shadeSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Purple/purple.webp',
            layoutSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Purple/purple.png'
        },
        {
            name: 'Space Grey',
            shadeSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Space+Grey/space-grey.webp',
            layoutSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Space+Grey/space-grey.png'
        },
        {
            name: 'Starlight',
            shadeSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Starlight/starlight.webp',
            layoutSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Starlight/starlight.png'
        },
    ],
    layout : [
        {
            name: "Center Layout",
            x: 100,
            y: 200,
            width: 500,
            height: 700,
            rotation: 90,
        },
        {
            name: "Top Left Layout",
            x: 0,
            y: 0,
            width: 500,
            height: 700,
            rotation: 180,
        },
        {
            name: 'bottom-left',
            x: 0,
            y: 100,
            width: 500,
            height: 700,
            rotation: 230,
        },
    ]
};

const initialState: MockLabState = {
    mockupSelectedDevice: defaultDevice,
    mockupLayoutSource: { layoutSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Tablet/iPad+Mini/Blue/blue.png' },
    mockupSelectedLayout: { 
        name: "Center layout",
        x: 100,
        y: 200,
        width: 500,
        height: 700
    },
    mockupShadow: { 
        shadowOpacity: 0,
    },
    mockupScale: { scale: 3 },
    mockupRotation: { rotation: 0 },
    mockupPosition: {
        position_X: 0,
        position_Y: 0,
    },


    frameLayout : {
        type: 'Default',
        name: '',
        aspectRatio: 16/9,
        width: 1920,
        height: 1080,
    },
    frameTransparent : { transparent: false},
    frameBackground: { 
        backgroundType: 'gradient', 
        backgroundSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Frame/Gradient/Canvas+Image/Spectral20Light20-2050.webp',
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

    setMockupLayoutSource(state, action: PayloadAction<string>){
        state.mockupLayoutSource.layoutSrc = action.payload;
    },
    
    setSelectedMockupLayout(state, action: PayloadAction<MockupSelectedLayoutState>) {
        state.mockupSelectedLayout = action.payload;
    },

    setMockupShadowOpacity(state, action: PayloadAction<number>) {
        state.mockupShadow.shadowOpacity = action.payload;
    },

    setMockupScale(state, action: PayloadAction<number>) {
        state.mockupScale.scale = action.payload;
    },

    setMockupRotation(state, action: PayloadAction<number>) {
        state.mockupRotation.rotation = action.payload;
    },

    setMockupPositionX(state, action: PayloadAction<number>) {
        state.mockupPosition.position_X = action.payload;
    },

    setMockupPositionY(state, action: PayloadAction<number>) {
        state.mockupPosition.position_Y = action.payload;
    },


    // Frame Reducer

    setSelectedFrameLayout(state, action: PayloadAction<FrameLayoutState>){
        state.frameLayout = action.payload;
    },

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
    setMockupLayoutSource,
    setSelectedMockupLayout,
    setMockupShadowOpacity,
    setMockupScale,
    setMockupRotation,
    setMockupPositionX,
    setMockupPositionY,

    setSelectedFrameLayout,
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
