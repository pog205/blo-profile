
export interface ProfileState {
  // Profile Settings
  name: string;
  description: string;
  location: string;
  avatarUrl: string;
  backgroundUrl: string;

  // Theme Settings
  fontFamily: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  iconColor: string;
  profileOpacity: number;
  profileBlur: number;

  // Effects
  backgroundEffect: string;
  mouseEffectUrl: string;

  // UI-only
  usernameEffects: string[];
}

export enum NavItem {
  Custom = 'Custom',
  Links = 'Links',
  Shop = 'Shop',
  Analytics = 'Analytics',
  Settings = 'Settings'
}

export interface NodeData {
  label: string;
  icon?: string;
  url?: string;
}

export interface AppNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}
