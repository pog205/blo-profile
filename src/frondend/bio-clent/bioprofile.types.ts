// ============================================================================
// Enums
// ============================================================================

export enum SocialPlatform {
  GitHub = 'GitHub',
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter',
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  YouTube = 'YouTube',
  TikTok = 'TikTok',
  Discord = 'Discord',
}

export enum MouseEffectType {
  None = 'None',
  Particles = 'Particles',
  Trail = 'Trail',
  Ripple = 'Ripple',
}

export enum BackgroundEffectType {
  None = 'None',
  Gradient = 'Gradient',
  Animated = 'Animated',
  Particles = 'Particles',
}

// ============================================================================
// BioProfile Data Interfaces
// ============================================================================

/**
 * Profile basic settings.
 */
export interface ProfileSettings {
  slug: string;
  name: string;
  englishName: string;
  location?: string;
  description?: string;
  avatarUrl: string;
  backgroundUrl: string;
}

/**
 * Color scheme configuration.
 */
export interface ColorScheme {
  accent: string;
  text: string;
  background: string;
  icons: string;
}

/**
 * Theme and color settings.
 */
export interface ThemeSettings {
  fontFamily: string;
  colors: ColorScheme;
  profileOpacity: number;
  profileBlur: number;
}

/**
 * Music track data.
 */
export interface MusicData {
  title: string;
  musicUrl: string;
  order: number;
}

/**
 * Social link data.
 */
export interface SocialLinkData {
  platform: SocialPlatform;
  url: string;
  icon: string;
}

/**
 * Visual effects settings.
 */
export interface EffectSettings {
  mouseEffect: MouseEffectType;
  backgroundEffect: BackgroundEffectType;
}

// ============================================================================
// Technical & Simulation Props
// ============================================================================

/**
 * Technical properties - rendering, styling, and UI configuration.
 */
export interface TechnicalProps {
  theme: ThemeSettings;
  musics: MusicData[];
  socialLinks: SocialLinkData[];
}

/**
 * Simulation properties - interactive effects and animations.
 */
export interface SimulationProps {
  effects: EffectSettings;
}

// ============================================================================
// BioProfile Interface
// ============================================================================

/**
 * Complete BioProfile data structure with separated technical and simulation props.
 */
export interface BioProfile {
  profile: ProfileSettings;
  technicalProps: TechnicalProps;
  simulationProps: SimulationProps;
}

// ============================================================================
// Helper Types
// ============================================================================

/**
 * Complete BioProfile data (original JSON structure for backward compatibility).
 */
export interface BioProfileData {
  profile: ProfileSettings;
  theme: ThemeSettings;
  musics: MusicData[];
  socialLinks: SocialLinkData[];
  effects: EffectSettings;
}

/**
 * Converts BioProfileData to BioProfile structure.
 */
export function toBioProfile(data: BioProfileData): BioProfile {
  return {
    profile: data.profile,
    technicalProps: {
      theme: data.theme,
      musics: data.musics,
      socialLinks: data.socialLinks,
    },
    simulationProps: {
      effects: data.effects,
    },
  };
}

/**
 * Converts BioProfile to BioProfileData structure.
 */
export function fromBioProfile(bioProfile: BioProfile): BioProfileData {
  return {
    profile: bioProfile.profile,
    theme: bioProfile.technicalProps.theme,
    musics: bioProfile.technicalProps.musics,
    socialLinks: bioProfile.technicalProps.socialLinks,
    effects: bioProfile.simulationProps.effects,
  };
}
