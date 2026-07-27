import { Platform } from 'react-native';

const backgroundDark = '#0F172A';
const textSilver = '#E2E8F0';
const borderDefault = '#334155';

export const Colors = {
  default: {
    background: backgroundDark,
    text: textSilver,
    border: borderDefault,
    placeholder: '#94A3B8',
    primaryButton: '#2563EB',
    primaryButtonText: '#FFFFFF',
    link: '#60A5FA',
    tint: '#2563EB',
  },

  user: {
    background: backgroundDark,
    text: textSilver,
    border: borderDefault,
    placeholder: '#94A3B8',
    primaryButton: '#3B82F6',
    primaryButtonText: '#FFFFFF',
    link: '#60A5FA',
    tint: '#3B82F6',
  },

  trustedUser: {
    background: backgroundDark,
    text: textSilver,
    border: borderDefault,
    placeholder: '#94A3B8',
    primaryButton: '#1E40AF',
    primaryButtonText: '#FFFFFF',
    link: '#93C5FD',
    tint: '#1E40AF',
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
