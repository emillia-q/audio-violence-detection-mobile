import { Platform } from 'react-native';

const textWhite = '#FFFFFF';

export const Colors = {
  shared: {
    background: '#101A2D',
    surface: '#1A2940',
    text: '#F1F6FC',
    muted: '#A8B8CC',
    textActive: textWhite,
    textInactive: '#A8B8CC',
    border: '#32455F',
    placeholder: '#71839C',
    primaryButton: '#4F46E5',
    primaryButtonText: textWhite,
    link: '#818CF8',
    tint: '#4F46E5',
  },

  default: {
    background: '#101A2D',
    surface: '#1A2940',
    text: '#F1F6FC',
    muted: '#A8B8CC',
    textActive: textWhite,
    textInactive: '#A8B8CC',
    border: '#32455F',
    placeholder: '#71839C',
    primaryButton: '#4F46E5',
    primaryButtonText: textWhite,
    link: '#818CF8',
    tint: '#4F46E5',
  },

  user: {
    background: '#102842',
    surface: '#193958',
    text: '#EAF4FF',
    muted: '#A9C4DB',
    textActive: textWhite,
    textInactive: '#A9C4DB',
    border: '#2C5579',
    placeholder: '#7FA4C2',
    primaryButton: '#237DB5',
    primaryButtonText: textWhite,
    link: '#7DCDFF',
    tint: '#47A7E3',
  },

  trustedUser: {
    background: '#07162D',
    surface: '#0D2748',
    text: '#EAF2FF',
    muted: '#A3BDD9',
    textActive: textWhite,
    textInactive: '#A3BDD9',
    border: '#1C456E',
    placeholder: '#7298BF',
    primaryButton: '#164E8C',
    primaryButtonText: textWhite,
    link: '#9DD6FF',
    tint: '#519FDD',
  },
};


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
