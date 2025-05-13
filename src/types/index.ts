export interface ColorPaletteProps {
  skinTone: string;
  isVisible: boolean;
}

export interface SkinToneAdjusterProps {
  currentSkinTone: string;
  onSkinToneChange: (newTone: string) => void;
  isVisible: boolean;
}

export interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  onSkinToneDetected: (skinTone: string) => void;
}

export type SkinToneType = 'light' | 'medium' | 'tan' | 'brown' | 'dark';

export interface ColorRecommendation {
  name: string;
  colors: string[];
}