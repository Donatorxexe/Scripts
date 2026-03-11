// Store types and constants

export interface ThemeColor {
  name: string;
  color: string;
}

export const THEMES: ThemeColor[] = [
  { name: 'Teal',      color: '#00d4aa' },
  { name: 'Purple',    color: '#a855f7' },
  { name: 'Blue',      color: '#3b82f6' },
  { name: 'Red',       color: '#ef4444' },
  { name: 'Orange',    color: '#f59e0b' },
  { name: 'Green',     color: '#22c55e' },
  { name: 'Pink',      color: '#ec4899' },
  { name: 'Cyan',      color: '#06b6d4' },
];

export interface Config {
  hitboxSize: number;
  hitboxTransparency: number;
  flySpeed: number;
  aimbotFOV: number;
  aimSmooth: number;
  aimbotPart: 'Head' | 'Torso' | 'Closest';
  teamCheck: boolean;
  visibleCheck: boolean;
}

export interface ToggleState {
  esp: boolean;
  aimbot: boolean;
  fly: boolean;
  hitbox: boolean;
  noclip: boolean;
  locked: boolean;
}

export const DEFAULT_CONFIG: Config = {
  hitboxSize: 10,
  hitboxTransparency: 0.7,
  flySpeed: 150,
  aimbotFOV: 200,
  aimSmooth: 20,
  aimbotPart: 'Head',
  teamCheck: true,
  visibleCheck: false,
};

export const DEFAULT_TOGGLES: ToggleState = {
  esp: true,
  aimbot: false,
  fly: false,
  hitbox: false,
  noclip: false,
  locked: false,
};

export type TabId = 'status' | 'config' | 'aimbot' | 'actions' | 'customize';

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

export const TABS: Tab[] = [
  { id: 'status',    label: 'Status',    icon: '📊' },
  { id: 'config',    label: 'Config',    icon: '⚙️' },
  { id: 'aimbot',    label: 'Aimbot',    icon: '🎯' },
  { id: 'actions',   label: 'Actions',   icon: '⚡' },
  { id: 'customize', label: 'Style',     icon: '🎨' },
];
