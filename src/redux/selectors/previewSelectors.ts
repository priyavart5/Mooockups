// redux/selectors/previewSelectors.ts
import { RootState } from '../store';

export const selectPreviewState = (state: RootState) => state.preview.isPreview;
