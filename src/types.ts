export type DevicePlatform = 'android' | 'ios' | 'web';
export type ThemeMode = 'light' | 'dark';

export type ScreenType = 'cadastro' | 'login' | 'dashboard' | 'products' | 'settings' | 'form' | 'chat' | 'custom';

export interface PaletteOption {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accentGreen: string;
  neutralGray: string;
  surfaceLight: string;
  surfaceDark: string;
  backgroundLight: string;
  backgroundDark: string;
}

export interface ScreenConfig {
  id: ScreenType;
  title: string;
  subtitle: string;
  iconName: string;
  showAppBar: boolean;
  showBottomNav: boolean;
  showFAB: boolean;
  showDrawer: boolean;
  appBarTitle: string;
  customPrompt?: string;
  customCode?: string;
}

export interface FlutterProjectFile {
  path: string;
  name: string;
  content: string;
  language: string;
}

export interface FlutterExportConfig {
  appName: string;
  packageName: string;
  useMaterial3: boolean;
  targetPlatforms: ('android' | 'ios' | 'web')[];
  includeAuth: boolean;
  includeGithubActions: boolean;
}
