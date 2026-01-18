
export interface ProfileState {
  description: string;
  backgroundEffect: string;
  profileOpacity: number;
  profileBlur: number;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  iconColor: string;
  usernameEffects: string[];
  location: string;
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
