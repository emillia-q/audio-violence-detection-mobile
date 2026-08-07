import { Platform } from 'react-native';

const textWhite = '#FFFFFF';

const commonColors = {
  textActive: textWhite,
  danger: '#FB7185',
};

export const Colors = {
  default: {
    ...commonColors,
    background: '#101A2D',
    surface: '#1A2940',
    text: '#F1F6FC',
    muted: '#A8B8CC',
    textInactive: '#A8B8CC',
    border: '#32455F',
    placeholder: '#71839C',
    primaryButton: '#4F46E5',
    primaryButtonText: textWhite,
    link: '#818CF8',
    tint: '#4F46E5',
    surfaceElevated: '#243752',
    success: '#34D399',
    warning: '#FBBF24',
    disabled: '#52657D',
  },

  user: {
    ...commonColors,
    background: '#102842',
    surface: '#193958',
    surfaceElevated: '#234665',
    text: '#EAF4FF',
    muted: '#A9C4DB',
    textInactive: '#A9C4DB',
    border: '#2C5579',
    placeholder: '#7FA4C2',
    primaryButton: '#237DB5',
    primaryButtonText: textWhite,
    link: '#7DCDFF',
    tint: '#47A7E3',
    success: '#42D3A4',
    warning: '#F5C451',
    disabled: '#496982',
  },

  trustedUser: {
    ...commonColors,
    background: '#07162D',
    surface: '#0D2748',
    surfaceElevated: '#133657',
    text: '#EAF2FF',
    muted: '#A3BDD9',
    textInactive: '#A3BDD9',
    border: '#1C456E',
    placeholder: '#7298BF',
    primaryButton: '#164E8C',
    primaryButtonText: textWhite,
    link: '#9DD6FF',
    tint: '#519FDD',
    success: '#32C995',
    warning: '#EFBF4A',
    disabled: '#345371',
  },
};

export type ThemeName = 'default' | 'user' | 'trustedUser';
export type AppTheme = (typeof Colors)[ThemeName];

export function getTheme(name: ThemeName): AppTheme {
  return Colors[name];
}


export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
