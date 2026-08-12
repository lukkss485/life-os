export type GlassConfig = {
  angle: number;
  highlightStrength: number;
  spread: number;
  highlightOpacity: number;
  rimOpacity: number;
  contactShadowOpacity: number;
  dropShadowOpacity: number;
  glassOpacity: number;
  blur: number;
  depth: number;
  chromaticAberration: number;
  distortionStrength: number;
};

export const DEFAULT_GLASS_CONFIG: GlassConfig = {
  angle: 45,
  highlightStrength: 1,
  spread: 2,
  highlightOpacity: 0.5,
  rimOpacity: 0.15,
  contactShadowOpacity: 0.12,
  dropShadowOpacity: 0.4,
  glassOpacity: 10,
  blur: 0,
  depth: 10,
  chromaticAberration: 0,
  distortionStrength: 300,
};