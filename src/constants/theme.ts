import { Platform } from 'react-native';

const backgroundDark = '#0B1121'; // Main bg
const surfaceDark = '#1E293B'; // Inputs
const textSilver = '#F8FAFC'; // Headers
const textGray = '#94A3B8'; // Descriptions & labels
const borderGray = '#334155';
const textWhite = '#FFFFFF';

export const Colors = {
  default: {
    background: backgroundDark,
    surface: surfaceDark,
    text: textSilver,
    muted: textGray,
    textActive: textWhite,
    textInactive: textGray,
    border: borderGray,
    placeholder: '#64748B',
    primaryButton: '#4F46E5',
    primaryButtonText: textWhite,
    link: '#818CF8',
    tint: '#4F46E5',
  },

  user: {
    background: backgroundDark,
    surface: surfaceDark,
    text: textSilver,
    muted: textGray,
    textActive: textWhite,
    textInactive: textGray,
    border: borderGray,
    placeholder: '#64748B',
    primaryButton: '#0284C7',
    primaryButtonText: textWhite,
    link: '#38BDF8',
    tint: '#0284C7',
  },

  trustedUser: {
    background: backgroundDark,
    surface: surfaceDark,
    text: textSilver,
    muted: textGray,
    textActive: textWhite,
    textInactive: textGray,
    border: borderGray,
    placeholder: '#64748B',
    primaryButton: '#1E3A8A',
    primaryButtonText: textWhite,
    link: '#93C5FD',
    tint: '#1E3A8A',
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
